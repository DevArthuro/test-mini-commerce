import { Customer } from './customer.entity';
import { Product } from './product.entity';

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
    public readonly transactions: string,
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
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}
