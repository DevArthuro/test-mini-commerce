import { Customer, VISIBILITY_CUSTOMER_INFO } from './customer.entity';
import { Invoice, VISIBILITY_INVOICE_INFO } from './invoice.entity';
import {
  PRODUCT_BOUGHT_VISIBILITY_INFO,
  ProductBought,
} from './product.entity';
import { TransactionStatus } from './transaction.entity';

export class Order {
  constructor(
    public readonly id: string,
    public readonly customer: Customer,
    public readonly products: ProductBought[],
    public readonly feeDelivery: number,
    public readonly feeBought: number,
    public readonly tokenizedCard: string,
    public readonly reference: string,
    public readonly status: OrderStatus,
    public readonly created_at: string,
    public readonly invoice?: Invoice,
  ) {}

  public getTokenizedCard(): string {
    return this.tokenizedCard;
  }

  public getCustomer(): Customer {
    return this.customer;
  }

  public toCalculateOrder(): number {
    const totalProduct = this.products.reduce(
      (calculate, product) => product.total + calculate,
      0,
    );
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
    const aditionalFields: { invoice?: VISIBILITY_INVOICE_INFO } = {};

    if (this.invoice) {
      aditionalFields.invoice = this.invoice.toValue();
    }

    return {
      customer: this.customer.toValue(),
      products: this.products.map((product) => product.toValue()),
      totalOrder: this.toCalculateOrder(),
      feeBought: `${this.feeBought * 100}%`,
      feeDelivery: `${this.feeDelivery * 100}%`,
      reference: this.reference,
      status: this.status,
      ...aditionalFields,
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
  products: PRODUCT_BOUGHT_VISIBILITY_INFO[];
  invoice?: VISIBILITY_INVOICE_INFO;
  totalOrder: number;
  reference: string;
  status: OrderStatus;
  feeDelivery: string;
  feeBought: string;
}
