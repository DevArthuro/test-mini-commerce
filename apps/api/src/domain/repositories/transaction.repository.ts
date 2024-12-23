import { Transaction, TransactionStatus } from '../entities/transaction.entity';

export interface TransactionRepository {
  create(transaction: Transaction): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findByOrderId(orderId: string): Promise<Transaction | null>;
  updateStatus(
    id: string,
    status: TransactionStatus,
  ): Promise<Transaction | null>;
}
