import { Injectable } from "@nestjs/common";
import axios, { Axios } from "axios";
import { InvoiceFacturation } from "src/payments/domain/ports/invoiceFacturation,port";

@Injectable()
export class Factus implements InvoiceFacturation {
  private axiosIntance: Axios;
  private user = process.env.USER_FACTUS;
  private password = process.env.PASSWORD_FACTUS;
  private client_id = process.env.CLIENT_ID;
  private client_secret = process.env.CLIENT_SECRET;

  constructor() {
    this.axiosIntance = axios.create({
      baseURL: process.env.BASE_URL_FACTUS,
    });
  }
}
