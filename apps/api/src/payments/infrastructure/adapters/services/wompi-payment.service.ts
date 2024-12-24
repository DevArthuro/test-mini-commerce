import { Card } from 'src/payments/domain/entities/card.entity';
import { PaymentTokenized } from 'src/payments/domain/entities/payment.entity';
import { PaymentGatewayPort } from 'src/payments/domain/ports/paymentGateway.port';
import {
  RequestTokenizedCard,
  ResponseTokenizedCard,
} from './interfaces/wompi';
import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';

@Injectable()
export class Wompi implements PaymentGatewayPort {
  private axiosIntance: Axios;
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
            Authorization: `Bearer ${process.env.PUBLIC_WOMPI_KEY}`,
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
}
