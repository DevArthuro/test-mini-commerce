import { TransactionInterface } from 'src/interfaces';
import { Transaction, TransactionStatus } from '../entities/transaction.entity';
import { Order } from '../entities/order.entity';

export abstract class TransactionRepository {
  abstract create(
    transaction: TransactionInterface,
    order: Order,
  ): Promise<Transaction>;
  abstract findById(id: string): Promise<Transaction | null>;
  abstract findByOrderId(orderId: string): Promise<Transaction | null>;
  abstract updateStatus(
    id: string,
    status: TransactionStatus,
  ): Promise<Transaction | null>;
}
