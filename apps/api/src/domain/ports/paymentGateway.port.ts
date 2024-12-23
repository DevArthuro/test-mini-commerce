import { Card } from '../entities/card.entity';
import { Order } from '../entities/order.entity';
import { Transaction } from '../entities/transaction.entity';

export interface PaymentGatewayPort<T> {
  TokenizedCard(data: Card): Promise<T>;
  createPaymentIntent(order: Order): Promise<T>;
  confirmPayment(transaction: Transaction): Promise<T>;
}
