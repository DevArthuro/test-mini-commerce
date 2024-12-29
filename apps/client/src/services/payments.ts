import axios, { AxiosError } from "axios";
import { RequestBodyCreatePayment, ResponseCreatePayment } from "../types/payments";

export class Paymenets {
  private fetchInstance;
  constructor() {
    this.fetchInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
    });
  }
  public async createTransaction(
    body: RequestBodyCreatePayment
  ): Promise<ResponseCreatePayment["data"] | string> {
    try {
      const response = await this.fetchInstance.post<ResponseCreatePayment>(
        `/transactions/create`,
        body
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
      return "the transaction is not created";
    }
  }

  public async getTransactionById(
    id: string
  ): Promise<ResponseCreatePayment["data"] | string> {
    try {
      const response = await this.fetchInstance.get<ResponseCreatePayment>(
        `/transactions/${id}`
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
      return "the transactions is not getter";
    }
  }
}
