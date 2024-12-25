import { Injectable } from '@nestjs/common';
import { OrderRepository } from 'src/payments/domain/repositories/order.repository';
import { GetOrderByReferenceDTO } from '../dto/getOrderByReference.dto';
import { VISIBILITY_ORDER_INFO } from 'src/payments/domain/entities/order.entity';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import {
  ERROR_ORDER_TYPE,
  OrderException,
} from 'src/payments/domain/errors/OrderExeption.error';

@Injectable()
export class GetOrderByReference {
  constructor(private readonly orderRepository: OrderRepository) {}

  async execute(
    dto: GetOrderByReferenceDTO,
  ): Promise<VISIBILITY_ORDER_INFO | null> {
    try {
      const order = await this.orderRepository.findByReference(
        dto.orderReference,
      );

      if (!order) {
        throw new OrderException(
          'order not found',
          ERROR_ORDER_TYPE.ORDER_NOT_FOUND,
        );
      }

      return order.toValue();
    } catch (error) {
      if (
        error instanceof PrismaClientValidationError ||
        error instanceof OrderException
      ) {
        throw new OrderException(
          (error as Error).message,
          ERROR_ORDER_TYPE.ORDER_NOT_FOUND,
        );
      }
      throw error;
    }
  }
}
