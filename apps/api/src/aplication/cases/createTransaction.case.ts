import { OrderRepository } from 'src/domain/repositories/order.repository';
import { PaymentGatewayPort } from 'src/domain/ports/paymentGateway.port';
import { CreateTransactionDTO } from '../dto/createTransaction.dto';
import { VISIBILITY_TRANSACTION_INFO } from 'src/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';

export class CreateTransactionCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly orderRepository: OrderRepository,
    private readonly paymentAdapter: PaymentGatewayPort,
  ) {}

  async execute(
    dto: CreateTransactionDTO,
  ): Promise<VISIBILITY_TRANSACTION_INFO | null> {
    const order = await this.orderRepository.findByReference(
      dto.orderReference,
    );
    if (!order) {
      throw new Error('order not found');
    }
    const paymentIntent = await this.paymentAdapter.createPaymentIntent(order);
    if (!paymentIntent) {
      throw new Error("can't create payment intent");
    }
    const transaction = await this.transactionRepository.create(
      {
        referenceService: paymentIntent.id,
        finalizedAt: paymentIntent.finalizedAt,
      },
      order,
    );

    return transaction.toValue();
  }
}
