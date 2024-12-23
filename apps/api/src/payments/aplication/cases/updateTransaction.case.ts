import { PaymentGatewayPort } from 'src/payments/domain/ports/paymentGateway.port';
import { VISIBILITY_TRANSACTION_INFO } from 'src/payments/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/payments/domain/repositories/transaction.repository';
import { updateTransactionDTO } from '../dto/updateTransaction.dto';
import { Injectable } from 'src/shared/injectable';

@Injectable()
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
