import { Product } from "./products";

export interface RequestBodyCreatePayment {
  orderReference: string;
}

export interface CustomerPayment {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  fullDocument: string;
  delivery: DeliveryOrder;
  card: CardInfo;
}

export interface DeliveryOrder {
  countryCode: string;
  country: string;
  region: string;
  city: string;
  address: string;
}

export interface CardInfo {
  number: string;
  exp_date: string;
  cardName: string;
}

export interface ResponseCreatePayment {
  data: {
    id: string;
    payment: {
      customer: CustomerPayment;
      product: Product;
      paymentAmount: number;
      reference: string;
      status: PaymentStatus;
      paymentDate: string | null;
    };
    status: PaymentStatus;
    finalizedAt: string | null;
  };
  status: number;
  error: boolean;
}

export enum PaymentStatus {
  PENDING = "PENDING",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
  FINALIZED = "FINALIZED",
}
