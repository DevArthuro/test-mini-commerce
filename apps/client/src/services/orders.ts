import axios, { AxiosResponse } from "axios";
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
      return (error as Error).message;
    }
  }
}
