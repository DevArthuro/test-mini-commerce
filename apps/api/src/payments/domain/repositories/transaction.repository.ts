import { TransactionInterface } from 'src/interfaces';
import { Transaction, TransactionStatus } from '../entities/transaction.entity';
import { Order } from '../entities/order.entity';

export interface TransactionRepository {
  create(transaction: TransactionInterface, order: Order): Promise<Transaction>;
  findById(id: string): Promise<Transaction | null>;
  findByOrderId(orderId: string): Promise<Transaction | null>;
  updateStatus(
    id: string,
    status: TransactionStatus,
  ): Promise<Transaction | null>;
}
