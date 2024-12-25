import { TransactionStatus } from 'src/payments/domain/entities/transaction.entity';

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
