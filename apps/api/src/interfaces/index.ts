import { TransactionStatus } from 'src/payments/domain/entities/transaction.entity';

export interface CardInterface {
  number: string;
  cvc: string;
  expMonth: string;
  expYear: string;
  cardName: string;
}

export interface DeliveryInterface {
  countryCode: string;
  country: string;
  region: string;
  city: string;
  address: string;
}

export interface CustomerInterface {
  name: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  typeDocument: string;
  document: string;
}

export interface ProductInterface {
  name: string;
  description: string;
  stock: number;
  price: number;
  imageUrl: string;
}

export interface OrderInteface {
  tokenizedCard: string;
  quantity: number;
}

export interface TransactionInterface {
  referenceService: string;
  status: TransactionStatus;
  finalizedAt: Date;
}
