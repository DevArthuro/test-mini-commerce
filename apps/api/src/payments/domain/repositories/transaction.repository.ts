import { Transaction, TransactionStatus } from '../entities/transaction.entity';
import { Order } from '../entities/order.entity';
import { TransactionInterface } from '../dto/transaction.dto';

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
    finalized_at: Date,
  ): Promise<Transaction | null>;
}
