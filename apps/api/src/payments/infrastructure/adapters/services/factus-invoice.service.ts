import { Injectable } from '@nestjs/common';
import axios, { Axios } from 'axios';
import { InvoiceFacturation } from 'src/payments/domain/ports/invoiceFacturation,port';
import { AUTH_INTERFACE } from './interfaces/factus';

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
}
