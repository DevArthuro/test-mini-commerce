import { Card } from 'src/payments/domain/entities/card.entity';
import {
  PaymentTokenized,
  PaymentTransaction,
} from 'src/payments/domain/entities/payment.entity';
import { PaymentGatewayPort } from 'src/payments/domain/ports/paymentGateway.port';
import {
  Currency,
  PaymentMethod as PaymentMethodWompi,
  RequestTokenizedCard,
  RequestTransaction,
  ResponseMerchants,
  ResponseTokenizedCard,
  ResponseTransaction,
  TransactionStatusWompi,
  TypeDocument,
} from './interfaces/wompi';
import { Injectable } from '@nestjs/common';
import axios, { Axios, AxiosError } from 'axios';
import { Order } from 'src/payments/domain/entities/order.entity';
import {
  PaymentMethod,
  Transaction,
  TransactionStatus,
} from 'src/payments/domain/entities/transaction.entity';

@Injectable()
export class Wompi implements PaymentGatewayPort {
  private axiosIntance: Axios;
  private wompiPubKey = process.env.PUBLIC_WOMPI_KEY;
  private wompiPrivKey = process.env.PRIVATE_WOMPI_KEY;
  private wompiIntegrityKey = process.env.INTEGRITY_KEY_WOMPI;

  constructor() {
    this.axiosIntance = axios.create({
      baseURL: process.env.BASE_URL_WOMPI,
    });
  }

  async getTokenizedCard(data: Card): Promise<PaymentTokenized | null> {
    const body: RequestTokenizedCard = {
      number: data.number,
      exp_month: data.expMonth,
      exp_year: data.expYear,
      cvc: data.cvc,
      card_holder: data.cardName,
    };

    try {
      const tokenizedCard = await this.axiosIntance.post<ResponseTokenizedCard>(
        '/tokens/cards',
        body,
        {
          headers: {
            Authorization: `Bearer ${this.wompiPubKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      return new PaymentTokenized(
        tokenizedCard.data.data.id,
        tokenizedCard.data.data.expires_at,
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error('WOMPI_ERROR');
      }
      throw error;
    }
  }

  async createPaymentIntent(order: Order): Promise<PaymentTransaction | null> {
    let tokenAuthAcceptTratments: string | null;
    let tokenAcceptTerms: string | null;
    try {
      const confirmUserPermissions =
        await this.axiosIntance.get<ResponseMerchants>(
          `/merchants/${this.wompiPubKey}`,
        );

      tokenAuthAcceptTratments =
        confirmUserPermissions.data.data.presigned_personal_data_auth
          .acceptance_token;
      tokenAcceptTerms =
        confirmUserPermissions.data.data.presigned_acceptance.acceptance_token;
    } catch (error) {
      throw new Error(error.message);
    }

    const signature = await this.generateSignature(order);

    const body: RequestTransaction = {
      accept_personal_auth: tokenAuthAcceptTratments ?? '',
      acceptance_token: tokenAcceptTerms ?? '',
      amount_in_cents: order.toCalculateOrder() * 100,
      currency: Currency.COP,
      customer_data: {
        full_name: order.customer.toValue().fullName,
        legal_id: order.customer.document,
        legal_id_type: TypeDocument[order.customer.typeDocument],
        phone_number: order.customer.phoneNumber,
      },
      customer_email: order.customer.email,
      payment_method: {
        type: PaymentMethodWompi.CARD,
        installments: 1,
        token: order.getTokenizedCard(),
      },
      payment_method_type: PaymentMethodWompi.CARD,
      redirect_url: null,
      reference: order.reference,
      shipping_address: {
        address_line_1: order.customer.delivery.address,
        city: order.customer.delivery.city,
        country: order.customer.delivery.countryCode,
        phone_number: order.customer.phoneNumber,
        region: order.customer.delivery.region,
      },
      signature,
      taxes: [],
    };

    try {
      const transaction = await this.axiosIntance.post<ResponseTransaction>(
        '/transactions',
        body,
        {
          headers: {
            Authorization: `Bearer ${this.wompiPrivKey}`,
            'Content-Type': 'application/json',
          },
        },
      );

      const paymentTransactionEntity = new PaymentTransaction(
        transaction.data.data.id,
        transaction.data.data.created_at,
        transaction.data.data.finalized_at,
        transaction.data.data.amount_in_cents,
        transaction.data.data.currency,
        this.parsePaymentMethod(
          transaction.data.data.payment_method.extra.card_type,
        ),
        this.getStatusSerialized(transaction.data.data.status),
      );

      return paymentTransactionEntity;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error('WOMPI_ERROR');
      }
      throw error;
    }
  }

  public parsePaymentMethod(paymentMethodWompi: string) {
    switch (paymentMethodWompi) {
      case 'CREDIT':
        return PaymentMethod.CREDIT;
      case 'DEBIT':
        return PaymentMethod.DEBIT;
      default:
        return PaymentMethod.CREDIT;
    }
  }

  async confirmPayment(transaction: Transaction): Promise<Transaction> {
    try {
      const transactionResponse =
        await this.axiosIntance.get<ResponseTransaction>(
          `/transactions/${transaction.referenceService}`,
        );

      const statusSerialize = this.getStatusSerialized(
        transactionResponse.data.data.status,
      );

      const TransactionEntity = new Transaction(
        transaction.id,
        transaction.order,
        statusSerialize,
        transactionResponse.data.data.id,
        transactionResponse.data.data.finalized_at,
        transaction.paymentMethod,
      );

      return TransactionEntity;
    } catch (error) {
      if (error instanceof AxiosError) {
        throw new Error('WOMPI_ERROR');
      }
      throw new Error('Unkonwn error');
    }
  }

  private async generateSignature(order: Order): Promise<string> {
    const secretConcat = `${order.reference}${order.toCalculateOrder() * 100}COP${this.wompiIntegrityKey}`;

    const encondedText = new TextEncoder().encode(secretConcat);
    const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');

    return hashHex;
  }

  private getStatusSerialized(
    status: TransactionStatusWompi,
  ): TransactionStatus {
    switch (status) {
      case TransactionStatusWompi.APPROVED:
        return TransactionStatus.APPROVED;
      case TransactionStatusWompi.PENDING:
        return TransactionStatus.PENDING;
      case TransactionStatusWompi.DECLINED:
      case TransactionStatusWompi.VOIDED:
      case TransactionStatusWompi.ERROR:
        return TransactionStatus.REJECTED;
      default:
        return TransactionStatus.FINALIZED;
    }
  }
}
