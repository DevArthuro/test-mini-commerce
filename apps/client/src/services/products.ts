import axios from "axios";
import { ResponseProduct } from "../types/products";

export class Products {
  private fetchInstance;
  constructor() {
    this.fetchInstance = axios.create({
      baseURL: import.meta.env.VITE_BASE_API_URL,
    });
  }
  public async getProducts(): Promise<ResponseProduct | string> {
    try {
      const response =
        await this.fetchInstance.get<ResponseProduct>(`/products`);
      console.log(response.data);
      return response.data;
    } catch (error) {
      return (error as Error).message;
    }
  }
}
