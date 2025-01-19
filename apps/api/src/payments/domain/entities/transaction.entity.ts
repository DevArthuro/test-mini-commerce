import { Order, VISIBILITY_ORDER_INFO } from './order.entity';

export class Transaction {
  constructor(
    public readonly id: string,
    public readonly order: Order,
    public readonly status: TransactionStatus,
    public readonly referenceService: string,
    public readonly finalizedAt: string | null,
    public readonly paymentMethod: PaymentMethod,
  ) {}

  public isFinalized(): boolean {
    return this.status !== TransactionStatus.PENDING;
  }

  public toTotalTransaction(): number {
    return this.order.toCalculateOrder();
  }

  public toValue(): VISIBILITY_TRANSACTION_INFO {
    return {
      id: this.id,
      order: this.order.toValue(),
      status: this.status,
      finalizedAt: this.finalizedAt,
    };
  }
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
  FINALIZED = 'FINALIZED',
}

export enum PaymentMethod {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export interface VISIBILITY_TRANSACTION_INFO {
  id: string;
  order: VISIBILITY_ORDER_INFO;
  status: TransactionStatus;
  finalizedAt: string;
}
