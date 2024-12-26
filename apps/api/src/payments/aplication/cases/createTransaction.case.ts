import { OrderRepository } from 'src/payments/domain/repositories/order.repository';
import { PaymentGatewayPort } from 'src/payments/domain/ports/paymentGateway.port';
import { CreateTransactionDTO } from '../dto/createTransaction.dto';
import { VISIBILITY_TRANSACTION_INFO } from 'src/payments/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/payments/domain/repositories/transaction.repository';
import {
  ERROR_PAYMENTS_TYPE,
  PaymentsException,
} from 'src/payments/domain/errors/PaymentsExeption.error';
import {
  ERROR_ORDER_TYPE,
  OrderException,
} from 'src/payments/domain/errors/OrderExeption.error';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateTransactionCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly orderRepository: OrderRepository,
    private readonly paymentAdapter: PaymentGatewayPort,
  ) {}

  async execute(
    dto: CreateTransactionDTO,
  ): Promise<VISIBILITY_TRANSACTION_INFO | null> {
    let paymentIntent;
    let transaction;

    const order = await this.orderRepository.findByReference(
      dto.orderReference,
    );

    if (!order) {
      throw new OrderException(
        'order not found',
        ERROR_ORDER_TYPE.ORDER_NOT_FOUND,
      );
    }

    const isOrderUsed = await this.transactionRepository.findByOrderId(
      order.id,
    );

    if (isOrderUsed) {
      throw new PaymentsException(
        'order is already used',
        ERROR_PAYMENTS_TYPE.ORDER_IS_ALREADY_USED,
      );
    }

    try {
      paymentIntent = await this.paymentAdapter.createPaymentIntent(order);
      if (!paymentIntent) {
        throw new Error("can't create payment intent");
      }
      transaction = await this.transactionRepository.create(
        {
          referenceService: paymentIntent.id,
          finalizedAt: paymentIntent.finalizedAt,
          status: paymentIntent.status,
        },
        order,
      );
    } catch (error) {
      throw new PaymentsException(
        error.message,
        ERROR_PAYMENTS_TYPE.PAYMENT_IS_NOT_ALLOWED,
      );
    }

    return transaction.toValue();
  }
}
