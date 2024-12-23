import { PaymentGatewayPort } from 'src/domain/ports/paymentGateway.port';
import { VISIBILITY_TRANSACTION_INFO } from 'src/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/domain/repositories/transaction.repository';
import { updateTransactionDTO } from '../dto/updateTransaction.dto';

export class updateTransactionCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly paymentAdapter: PaymentGatewayPort,
  ) {}

  async execute(
    dto: updateTransactionDTO,
  ): Promise<VISIBILITY_TRANSACTION_INFO | null> {
    const transaction = await this.transactionRepository.findById(
      dto.transactionId,
    );
    if (!transaction) {
      throw new Error('transaction not found');
    }
    const paymentIntent = await this.paymentAdapter.confirmPayment(transaction);
    return paymentIntent.toValue();
  }
}
