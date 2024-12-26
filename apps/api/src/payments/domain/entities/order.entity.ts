import { Customer, VISIBILITY_CUSTOMER_INFO } from './customer.entity';
import { Product, PRODUCT_VISIBILITY_INFO } from './product.entity';
import { TransactionStatus } from './transaction.entity';

export class Order {
  constructor(
    public readonly id: string,
    public readonly customer: Customer,
    public readonly product: Product,
    public readonly feeDelivery: number,
    public readonly feeBought: number,
    public readonly tokenizedCard: string,
    public readonly reference: string,
    public readonly quantity: number,
    public readonly status: OrderStatus,
  ) {}

  public getTokenizedCard(): string {
    return this.tokenizedCard;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public toCalculateOrder(): number {
    const totalProduct = this.product.price * this.quantity;
    const totalFeeDelivery = totalProduct * this.feeDelivery;
    const totalFeeBought = totalProduct * this.feeBought;
    return totalProduct + totalFeeDelivery + totalFeeBought;
  }

  public isFinalized(): boolean {
    return this.status !== OrderStatus.PENDING;
  }

  public serializeOrderStatus(
    transactionStatus: TransactionStatus,
  ): OrderStatus {
    switch (transactionStatus) {
      case TransactionStatus.PENDING:
        return OrderStatus.PENDING;
      case TransactionStatus.APPROVED:
        return OrderStatus.PAID;
      case TransactionStatus.FINALIZED:
      case TransactionStatus.REJECTED:
        return OrderStatus.FAILED;
    }
  }

  public toValue(): VISIBILITY_ORDER_INFO {
    return {
      customer: this.customer.toValue(),
      product: this.product.toValue(),
      totalOrder: this.toCalculateOrder(),
      reference: this.reference,
      quantity: this.quantity,
      status: this.status,
    };
  }
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}

export interface VISIBILITY_ORDER_INFO {
  customer: VISIBILITY_CUSTOMER_INFO;
  product: PRODUCT_VISIBILITY_INFO;
  totalOrder: number;
  reference: string;
  quantity: number;
  status: OrderStatus;
}
