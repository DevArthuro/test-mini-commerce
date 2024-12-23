export class Order {
  constructor(
    public readonly id: string,
    public readonly order: Order,
    public readonly status: TransactionStatus,
    public readonly tokenizedCard: string,
    public readonly feeDelivery: number,
    public readonly feeBought: number,
    public readonly referenceService: string,
    public readonly finalizedAt: number,
  ) {}
}

export enum TransactionStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}
