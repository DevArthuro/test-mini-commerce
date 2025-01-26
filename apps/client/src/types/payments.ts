import { ProductsRes } from "./orders";

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

export enum TypesInvoce {
  FACTUS = "Factus Invoice",
  INVOICE_DIAN = "DIAN Invoice",
  QR_DIAN = "QR Invoice",
}
export interface Invoice {
  id: string;
  linksInvoice: {
    link: string;
    referenceName: TypesInvoce;
  }[];
}

export interface ResponseCreatePayment {
  data: {
    id: string;
    order: {
      customer: CustomerPayment;
      products: ProductsRes[];
      paymentAmount: number;
      reference: string;
      feeBought: string;
      feeDelivery: string;
      status: PaymentStatus;
      paymentDate: string | null;
      invoice: Invoice;
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
