import { PaymentMethod, TransactionStatus } from './transaction.entity';

export class PaymentTokenized {
  constructor(
    public readonly tokenizedCard: string,
    public readonly expiresAt: Date,
  ) {}

  public toValue() {
    return {
      tokenizedCard: this.tokenizedCard,
      expiresAt: this.expiresAt,
    };
  }
}

export class PaymentTransaction {
  constructor(
    public readonly id: string,
    public readonly createdAt: Date,
    public readonly finalizedAt: string | null,
    public readonly amount: number,
    public readonly currency: string,
    public readonly paymentMethod: PaymentMethod,
    public readonly status: TransactionStatus,
  ) {}

  public toValue() {
    return {
      id: this.id,
      createdAt: this.createdAt,
      finalizedAt: this.finalizedAt,
      amount: this.amount,
      currency: this.currency,
      paymentMethod: this.paymentMethod,
      status: this.status,
    };
  }
}
