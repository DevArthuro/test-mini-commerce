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
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
}
