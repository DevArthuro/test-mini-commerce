import { PaymentGatewayPort } from 'src/payments/domain/ports/paymentGateway.port';
import {
  Transaction,
  TransactionStatus,
  VISIBILITY_TRANSACTION_INFO,
} from 'src/payments/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/payments/domain/repositories/transaction.repository';
import {
  ERROR_PAYMENTS_TYPE,
  PaymentsException,
} from 'src/payments/domain/errors/PaymentsExeption.error';
import { OrderRepository } from 'src/payments/domain/repositories/order.repository';
import { OrderStatus } from 'src/payments/domain/entities/order.entity';
import { ProductRepository } from 'src/payments/domain/repositories/product.repository';
import {
  ERROR_ORDER_TYPE,
  OrderException,
} from 'src/payments/domain/errors/OrderExeption.error';
import { GetTransactionByIdDTO } from '../dto/getTransaction.dto';
import { Injectable } from '@nestjs/common';
import { InvoiceFacturation } from 'src/payments/domain/ports/invoiceFacturation,port';

@Injectable()
export class GetTransactionCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly orderRepository: OrderRepository,
    private readonly paymentAdapter: PaymentGatewayPort,
    private readonly productRespository: ProductRepository,
    private readonly invoiceRepository: InvoiceFacturation,
  ) {}

  async execute(
    dto: GetTransactionByIdDTO,
  ): Promise<VISIBILITY_TRANSACTION_INFO | null> {
    let paymentIntent: Transaction;
    let transactionUpdated: Transaction;

    const transaction = await this.transactionRepository.findById(
      dto.transactionId,
    );
    if (!transaction) {
      throw new PaymentsException(
        'transaction not found',
        ERROR_PAYMENTS_TYPE.PAYMENT_NOT_FOUND,
      );
    }
    try {
      paymentIntent = await this.paymentAdapter.confirmPayment(transaction);
    } catch (error) {
      throw new PaymentsException(
        error.message,
        ERROR_PAYMENTS_TYPE.PAYMENT_NOT_FOUND,
      );
    }

    if (paymentIntent.status !== transaction.status) {
      transactionUpdated = await this.transactionRepository.updateStatus(
        transaction.id,
        paymentIntent.status,
        paymentIntent.finalizedAt,
      );

      if (!transactionUpdated) {
        throw new PaymentsException(
          'payment not updated',
          ERROR_PAYMENTS_TYPE.PAYMENT_NOT_UPDATED,
        );
      }

      try {
        const orderUpdated = await this.orderRepository.updateStatus(
          transactionUpdated.order.id,
          transaction.order.serializeOrderStatus(transactionUpdated.status),
        );

        if (orderUpdated.status === OrderStatus.FAILED) {
          await Promise.all(
            transaction.order.products.map(async (productOrder) => {
              await this.productRespository.updateStockIncrease(
                productOrder.id,
                productOrder.quantity,
              );
            }),
          );
        }

        transactionUpdated = await this.transactionRepository.findById(
          dto.transactionId,
        );

        if (transactionUpdated.status === TransactionStatus.APPROVED) {
          const createInvoice =
            await this.invoiceRepository.createInvoice(transactionUpdated);

          await this.orderRepository.updateColumn(
            transactionUpdated.order.reference,
            [
              {
                name: 'referenceInvoice',
                value: createInvoice.id,
              },
            ],
          );
        }
      } catch (error) {
        await this.transactionRepository.updateStatus(
          transaction.id,
          TransactionStatus.PENDING,
          null,
        );
        throw new OrderException(
          error.message,
          ERROR_ORDER_TYPE.ORDER_NOT_UPDATED,
        );
      }
    }

    const getTransaction = await this.transactionRepository.findById(
      paymentIntent.id,
    );

    return getTransaction.toValue();
  }
}
