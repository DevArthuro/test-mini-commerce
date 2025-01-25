import { Transaction, VISIBILITY_TRANSACTION_INFO } from './transaction.entity';

export class Invoice {
  constructor(
    public readonly id: string,
    public readonly linksInvoice: linksInvoice[],
    public readonly transaction: Transaction,
  ) {}

  public toValue(): VISIBILITY_INVOICE_INFO {
    return {
      id: this.id,
      linksInvoice: this.linksInvoice,
      transaction: this.transaction.toValue(),
    };
  }
}

export interface VISIBILITY_INVOICE_INFO {
  id: string;
  linksInvoice: linksInvoice[];
  transaction: VISIBILITY_TRANSACTION_INFO;
}

export interface linksInvoice {
  link: string;
  referenceName: string;
}
