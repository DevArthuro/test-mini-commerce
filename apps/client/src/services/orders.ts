import axios, { AxiosError } from "axios";
import { RequestBodyCreateOrder, ResponseCreateOrder } from "../types/orders";

export class Orders {
  private fetchInstance;
  constructor() {
    this.fetchInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
    });
  }
  public async createOrder(
    body: RequestBodyCreateOrder
  ): Promise<ResponseCreateOrder["data"] | string> {
    try {
      const response = await this.fetchInstance.post<ResponseCreateOrder>(
        `/orders/create`,
        body
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
      return "the orders is not created";
    }
  }

  public async getOrderByReference(
    id: string
  ): Promise<ResponseCreateOrder["data"] | string> {
    try {
      const response = await this.fetchInstance.get<ResponseCreateOrder>(
        `/orders/${id}`
      );
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
      return "the orders is not created";
    }
  }
}
