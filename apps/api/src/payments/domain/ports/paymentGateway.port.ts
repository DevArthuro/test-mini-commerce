import { Card } from '../entities/card.entity';
import { Order } from '../entities/order.entity';
import {
  PaymentTokenized,
  PaymentTransaction,
} from '../entities/payment.entity';
import { Transaction } from '../entities/transaction.entity';

export abstract class PaymentGatewayPort {
  abstract getTokenizedCard(data: Card): Promise<PaymentTokenized | null>;
  // abstract createPaymentIntent(
  //    order: Order,
  // ): Promise<PaymentTransaction | null>;
  // abstract confirmPayment(transaction: Transaction): Promise<Transaction>;
}
