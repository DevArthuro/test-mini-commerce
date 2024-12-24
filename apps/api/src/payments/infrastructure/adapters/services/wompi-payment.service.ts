import { Card } from 'src/payments/domain/entities/card.entity';
import {
  PaymentTokenized,
  PaymentTransaction,
} from 'src/payments/domain/entities/payment.entity';
import { PaymentGatewayPort } from 'src/payments/domain/ports/paymentGateway.port';
import {
  Currency,
  PaymentMethod,
  RequestTokenizedCard,
  RequestTransaction,
  ResponseMerchants,
  ResponseTokenizedCard,
  ResponseTransaction,
  TypeDocument,
} from './interfaces/wompi';
import { Injectable } from '@nestjs/common';
import axios, { Axios, AxiosError } from 'axios';
import { Order } from 'src/payments/domain/entities/order.entity';

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
      console.error(error);
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
      console.log((error as AxiosError).message);
      return;
    }

    console.log('pass here');

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
        type: PaymentMethod.CARD,
        installments: 1,
        token: order.getTokenizedCard(),
      },
      payment_method_type: PaymentMethod.CARD,
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

      const statusSerialize = transaction.data.data.status;

      const paymentTransactionEntity = new PaymentTransaction(
        transaction.data.data.id,
        transaction.data.data.created_at,
        transaction.data.data.finalized_at,
        transaction.data.data.amount_in_cents,
        transaction.data.data.currency,
        String(transaction.data.data.payment_method),
        statusSerialize,
      );

      console.log(paymentTransactionEntity.toValue());

      return paymentTransactionEntity;
    } catch (error) {
      console.log((error as AxiosError)?.toJSON());
    }
  }

  // async confirmPayment(
  //   transaction: Transaction,
  // ): Promise<PaymentTransaction | null> {
  //   try {
  //     const transactionResponse =
  //       await this.axiosIntance.get<ResponseTransaction>(
  //         `/transactions/${transaction.id}`,
  //       );

  //     const statusSerialize = transactionResponse.data.data.status;
  //     let parceStatus: TransactionStatusPayment;

  //     switch (statusSerialize) {
  //       case TransactionStatus.APPROVED:
  //         parceStatus = TransactionStatusPayment.APPROVED;
  //         break;
  //       case TransactionStatus.PENDING:
  //         parceStatus = TransactionStatusPayment.PENDING;
  //         break;
  //       case TransactionStatus.DECLINED:
  //       case TransactionStatus.ERROR:
  //       case TransactionStatus.VOIDED:
  //         parceStatus = TransactionStatusPayment.PENDING;
  //         break;
  //     }

  //     const paymentTransactionEntity = new PaymentTransaction(
  //       transactionResponse.data.data.id,
  //       transactionResponse.data.data.created_at,
  //       transactionResponse.data.data.finalized_at,
  //       transactionResponse.data.data.amount_in_cents,
  //       transactionResponse.data.data.currency,
  //       String(transactionResponse.data.data.payment_method),
  //       parceStatus,
  //     );

  //     return paymentTransactionEntity;
  //   } catch (error) {
  //     const errorAxios = error instanceof AxiosError;
  //     if (errorAxios) {
  //       console.log(errorAxios);
  //     }
  //     throw new Error('Unkonwn error');
  //   }
  // }
}
