import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { InvoiceFacturation } from 'src/payments/domain/ports/invoiceFacturation,port';
import {
  AUTH_INTERFACE,
  CREATE_INVOICE,
  ITEMS_INVOICE,
  NUMERIC_RANGE,
  NUMERIC_RANGE_ENUM,
  PAYMENT_METHOD_CODE_FACTUS,
  RESPONSE_CREATE_INVOICE,
  RESPONSE_GET_INVOICE,
  RESPONSE_NUMERIC_RANGE,
  TYPE_DOCUMENT_FACTUS,
} from './interfaces/factus';
import { Invoice } from 'src/payments/domain/entities/invoice.entity';
import {
  PaymentMethod,
  Transaction,
} from 'src/payments/domain/entities/transaction.entity';
import { TYPE_DOCUMENT } from 'src/payments/domain/dto/customer.dto';
import { ProductBought } from 'src/payments/domain/entities/product.entity';

@Injectable()
export class Factus implements InvoiceFacturation {
  private axiosIntance: Axios;
  private user = process.env.USER_FACTUS;
  private password = process.env.PASSWORD_FACTUS;
  private client_id = process.env.CLIENT_ID;
  private client_secret = process.env.CLIENT_SECRET;

  private token: string;
  private tokenRefresh: string;
  private dueTokenDate: number;
  private tokenType: string;

  constructor() {
    this.axiosIntance = axios.create({
      baseURL: process.env.BASE_URL_FACTUS,
    });
  }

  private getBearerToken(): string {
    return `${this.tokenType} ${this.token}`;
  }

  private async getRefreshAuthToken(): Promise<AUTH_INTERFACE | null> {
    try {
      const response = await this.axiosIntance.post<AUTH_INTERFACE>(
        '/oauth/token',
        {
          grant_type: 'refresh_token',
          client_id: this.client_id,
          client_secret: this.client_secret,
          refresh_token: this.tokenRefresh,
        },
      );

      const data = response.data;

      return data;
    } catch (error) {
      return;
    }
  }

  private async getAuthToken(): Promise<string | null> {
    let refresh = false;
    if (this.dueTokenDate && this.dueTokenDate > new Date().setSeconds(0)) {
      return this.getBearerToken();
    } else if (this.dueTokenDate && this.tokenRefresh) {
      refresh = true;
    }
    try {
      let response: AUTH_INTERFACE;
      if (refresh) {
        response = await this.getRefreshAuthToken();
      } else {
        const responseToken = await this.axiosIntance.post<AUTH_INTERFACE>(
          '/oauth/token',
          {
            grant_type: 'password',
            client_id: this.client_id,
            client_secret: this.client_secret,
            username: this.user,
            password: this.password,
          },
        );

        response = responseToken.data;
      }

      this.token = response.access_token;
      this.tokenType = response.token_type;
      this.tokenRefresh = response.refresh_token;
      this.dueTokenDate = new Date().setSeconds(response.expires_in);

      return this.getBearerToken();
    } catch (error) {
      return;
    }
  }

  private parseIdentificationId(
    typeDocument: TYPE_DOCUMENT,
  ): TYPE_DOCUMENT_FACTUS {
    switch (typeDocument) {
      case TYPE_DOCUMENT.CC:
        return TYPE_DOCUMENT_FACTUS['Cédula ciudadanía'];
      case TYPE_DOCUMENT.NIT:
        return TYPE_DOCUMENT_FACTUS['NIT'];
      case TYPE_DOCUMENT.CE:
        return TYPE_DOCUMENT_FACTUS['Cédula de extranjería'];
      case TYPE_DOCUMENT.PP:
        return TYPE_DOCUMENT_FACTUS['Pasaporte'];
      case TYPE_DOCUMENT.RC:
        return TYPE_DOCUMENT_FACTUS['Registro civil'];
      case TYPE_DOCUMENT.TE:
        return TYPE_DOCUMENT_FACTUS['Tarjeta de extranjería'];
      case TYPE_DOCUMENT.TI:
        return TYPE_DOCUMENT_FACTUS['Tarjeta de identidad'];
    }
  }

  private parseDate(dateForFormat: string) {
    const date = new Date(dateForFormat);
    const localDate = date
      .toLocaleString('es-CO', {
        timeZone: 'America/New_York',
        hour12: false,
      })
      .split(',');

    const localDateTime = localDate[1].trim().split(' ');

    return {
      dateYYYYmmdd: localDate[0].replace(/\//g, '-'),
      dateHHMMss: localDateTime[0],
    };
  }

  private parsePaymentMethod(paymentMethod: PaymentMethod) {
    switch (paymentMethod) {
      case PaymentMethod.CREDIT:
        return PAYMENT_METHOD_CODE_FACTUS.TARJETA_CREDITO;
      case PaymentMethod.DEBIT:
        return PAYMENT_METHOD_CODE_FACTUS.TARJETA_DEBITO;
    }
  }

  private async getNumericRange(
    paymentMethod: PAYMENT_METHOD_CODE_FACTUS,
  ): Promise<NUMERIC_RANGE | null> {
    let numericRangeSelected: NUMERIC_RANGE_ENUM;
    switch (paymentMethod) {
      case PAYMENT_METHOD_CODE_FACTUS.TARJETA_CREDITO:
        numericRangeSelected = NUMERIC_RANGE_ENUM.BILLING;
        break;
      case PAYMENT_METHOD_CODE_FACTUS.TARJETA_DEBITO:
        numericRangeSelected = NUMERIC_RANGE_ENUM.BILLING;
        break;
    }
    try {
      const token = await this.getAuthToken();
      const response = await this.axiosIntance.get<RESPONSE_NUMERIC_RANGE>(
        '/v1/numbering-ranges?filter[id]&filter[document]&filter[resolution_number]&filter[technical_key]&filter[is_active]',
        {
          headers: {
            Authorization: token,
          },
        },
      );

      const data = response.data;

      return data.data.find(
        (numericRange) => numericRange.prefix === numericRangeSelected,
      )!;
    } catch (error) {
      return;
    }
  }

  private convertProductsItemFactus(
    products: ProductBought[],
    extraTaxes: number[],
  ): ITEMS_INVOICE[] {
    const totalTaxes = extraTaxes.reduce((total, tax) => total + tax, 0);
    const taxByEveryProduct = totalTaxes;

    const itemsInvoice = products.map((product): ITEMS_INVOICE => {
      const price = product.total + product.total * taxByEveryProduct;

      return {
        code_reference: product.id,
        is_excluded: 1,
        name: product.product.name,
        price: price / product.quantity,
        quantity: product.quantity,
        tax_rate: `${Number(taxByEveryProduct * 100).toFixed(2)}`,
        discount_rate: 0,
        unit_measure_id: 70,
        standard_code_id: 1,
        tribute_id: 1,
      };
    });

    return itemsInvoice;
  }

  async createInvoice(transaction: Transaction): Promise<Invoice | null> {
    const paymentMethodParse = this.parsePaymentMethod(
      transaction.paymentMethod,
    );

    const numericRange = await this.getNumericRange(paymentMethodParse);

    const docuementIdFactus = this.parseIdentificationId(
      transaction.order.customer.typeDocument,
    );

    const body: CREATE_INVOICE = {
      customer: {
        address: transaction.order.customer.delivery.address,
        company: 'MINI_COMMERCE',
        email: transaction.order.customer.email,
        identification: transaction.order.customer.document,
        identification_document_id: docuementIdFactus,
        legal_organization_id: '2',
        names: transaction.order.customer.toValue().fullName,
        phone: transaction.order.customer.phoneNumber,
        tribute_id: 21,
      },
      billing_period: {
        start_date: this.parseDate(transaction.order.created_at).dateYYYYmmdd,
        start_time: this.parseDate(transaction.order.created_at).dateHHMMss,
        end_date: this.parseDate(transaction.finalizedAt.toString())
          .dateYYYYmmdd.split('-')
          .map((date, index) => {
            if (index === 0) return Number(date) + 1;
            return date;
          })
          .join('-'),
        end_time: this.parseDate(transaction.finalizedAt.toString()).dateHHMMss,
      },
      numbering_range_id: numericRange.id,
      reference_code: transaction.order.reference,
      payment_due_date: this.parseDate(transaction.finalizedAt).dateYYYYmmdd,
      payment_method_code: paymentMethodParse,
      observation: `The transaction was ${transaction.status}`,
      items: this.convertProductsItemFactus(transaction.order.products, [
        transaction.order.feeBought,
        transaction.order.feeDelivery,
      ]),
    };

    try {
      const token = await this.getAuthToken();

      const response = await this.axiosIntance.post<RESPONSE_CREATE_INVOICE>(
        '/v1/bills/validate',
        body,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      const data = response.data;

      const invoiceEntity = new Invoice(data.data.bill.number, [
        { link: data.data.bill.public_url, referenceName: 'Factus Invoice' },
        { link: data.data.bill.qr, referenceName: 'QR Invoice' },
      ]);

      return invoiceEntity;
    } catch (error) {
      return;
    }
  }

  async getInvoice(referenceInvoice: string): Promise<Invoice | null> {
    try {
      if (!referenceInvoice) return;
      const token = await this.getAuthToken();
      const response = await this.axiosIntance.get<RESPONSE_GET_INVOICE>(
        `/v1/bills/show/${referenceInvoice}`,
        {
          headers: {
            Authorization: token,
          },
        },
      );

      const data = response.data;

      const invoiceEntity = new Invoice(data.data.bill.number, [
        { link: data.data.bill.public_url, referenceName: 'Factus Invoice' },
        { link: data.data.bill.qr, referenceName: 'QR Invoice' },
      ]);

      return invoiceEntity;
    } catch (error) {
      return;
    }
  }
}
