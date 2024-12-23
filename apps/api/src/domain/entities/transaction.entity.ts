import { Order } from './order.entity';

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly order: Order,
    public readonly status: TransactionStatus,
    public readonly referenceService: string,
    public readonly finalizedAt: number,
  ) {}
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
