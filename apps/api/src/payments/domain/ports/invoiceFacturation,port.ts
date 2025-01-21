import { CREATE_INVOICE } from 'src/payments/infrastructure/adapters/services/interfaces/factus';
import { Invoice } from '../entities/invoice.entity';
import { Transaction } from '../entities/transaction.entity';

export abstract class InvoiceFacturation {
  abstract createInvoice(transaction: Transaction): Promise<CREATE_INVOICE>;
}
