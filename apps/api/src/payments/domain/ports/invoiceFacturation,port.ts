import { Invoice } from '../entities/invoice.entity';
import { Transaction } from '../entities/transaction.entity';

export abstract class InvoiceFacturation {
  abstract createInvoice(transaction: Transaction): Promise<Invoice | null>;
  abstract getInvoice(referenceInvoice: string): Promise<Invoice | null>;
}
