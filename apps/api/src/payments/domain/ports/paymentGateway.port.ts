import { Card } from '../entities/card.entity';
import { Order } from '../entities/order.entity';
import {
  PaymentTokenized,
  PaymentTransaction,
} from '../entities/payment.entity';
import { Transaction } from '../entities/transaction.entity';

export interface PaymentGatewayPort {
  TokenizedCard(data: Card): Promise<PaymentTokenized | null>;
  createPaymentIntent(order: Order): Promise<PaymentTransaction | null>;
  confirmPayment(transaction: Transaction): Promise<Transaction>;
}
