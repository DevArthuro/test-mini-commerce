import { Product } from "./products";

export interface RequestBodyCreateOrder {
  products: ProductsReq[];
  cardInfo: CardInfo;
  customer: CustomerOrder;
  delivery: DeliveryOrder;
}

export interface ProductsReq {
  productId: string;
  quantity: number;
}

export interface ProductsRes {
  total: number;
  quantity: number;
  product: Product;
}

export interface DeliveryOrder {
  countryCode: string;
  country: string;
  region: string;
  city: string;
  address: string;
}

export interface CustomerOrder {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  typeDocument: string;
  document: string;
}

export interface CardInfo {
  number: string;
  cvc: string;
  expMonth: string;
  expYear: string;
  cardName: string;
}

export interface ResponseCreateOrder {
  data: {
    customer: {
      id: string;
      delivery: DeliveryOrder & { id: string };
      card: {
        number: string;
        exp_date: string;
        cardName: string;
      };
      fullName: string;
      email: string;
      phoneNumber: string;
      fullDocument: string;
    };
    products: ProductsRes[];
    totalOrder: number;
    feeBought: string;
    feeDelivery: string;
    reference: string;
    status: OrderStatus;
  };
  status: number;
  error: boolean;
}

export enum OrderStatus {
  PENDING = "PENDING",
  PAID = "PAID",
  FAILED = "FAILED",
}