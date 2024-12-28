import axios from "axios";
import { ResponseProduct } from "../types/products";


export class Products {
  constructor() {}
  public async getProducts(): Promise<ResponseProduct | string> {
    try {
      const response = await axios.get<ResponseProduct>(
        `${import.meta.env.VITE_BASE_API_URL}/products`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return (error as Error).message;
    }
  }
}
