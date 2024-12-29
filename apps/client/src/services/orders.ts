import axios, { AxiosError, AxiosResponse } from "axios";
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
  ): Promise<Pick<ResponseCreateOrder, "data"> | string> {
    try {
      const response = await this.fetchInstance.post<
        AxiosResponse<ResponseCreateOrder>
      >(`/orders/create`, body);
      return response.data.data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return error.response?.data.message;
      }
      return "the orders is not created";
    }
  }
}
