import { CustomerRepository } from 'src/payments/domain/repositories/customer.repository';
import { OrderRepository } from 'src/payments/domain/repositories/order.repository';
import { ProductRepository } from 'src/payments/domain/repositories/product.repository';
import { CreateOrderDTO } from '../dto/createOrder.dto';
import { VISIBILITY_ORDER_INFO } from 'src/payments/domain/entities/order.entity';
import { CardRepository } from 'src/payments/domain/repositories/card.repository';
import { DeliveryRepository } from 'src/payments/domain/repositories/delivery.repository';
import { PaymentGatewayPort } from 'src/payments/domain/ports/paymentGateway.port';
import {
  ERROR_ORDER_TYPE,
  OrderException,
} from 'src/payments/domain/errors/OrderExeption.error';
import {
  ERROR_PRODUCTS_TYPE,
  ProductsException,
} from 'src/payments/domain/errors/ProductsExeption.error';
import {
  ERROR_PAYMENTS_TYPE,
  PaymentsException,
} from 'src/payments/domain/errors/PaymentsExeption.error';
import { PrismaClientValidationError } from '@prisma/client/runtime/library';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateOrderCase {
  constructor(
    private readonly customerRepository: CustomerRepository,
    private readonly orderRepository: OrderRepository,
    private readonly productRepository: ProductRepository,
    private readonly cardRepository: CardRepository,
    private readonly deliveryRepository: DeliveryRepository,
    private readonly paymentAdapter: PaymentGatewayPort,
  ) {}

  async execute(dto: CreateOrderDTO): Promise<VISIBILITY_ORDER_INFO | null> {
    let card;
    let delivery;
    let customer;
    let payment;

    try {
      card = await this.cardRepository.createCard(dto.cardInfo);
      delivery = await this.deliveryRepository.createDelivery(dto.delivery);
      customer = await this.customerRepository.createCustomer(
        dto.customer,
        delivery,
        card,
      );
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new OrderException(
          (error as Error).message,
          ERROR_ORDER_TYPE.ORDER_UNKNOWN_DATA,
        );
      }
      throw error;
    }
    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new ProductsException(
        'Product not found',
        ERROR_PRODUCTS_TYPE.PRODUCT_NOT_FOUND,
      );
    }
    if (dto.quantity <= 0 || product.stock < dto.quantity) {
      throw new ProductsException(
        'The stock is not available',
        ERROR_PRODUCTS_TYPE.STOCK_NOT_AVAILABLE,
      );
    }
    try {
      payment = await this.paymentAdapter.getTokenizedCard(card);
    } catch (error) {
      throw new PaymentsException(
        error.message,
        ERROR_PAYMENTS_TYPE.PAYMENT_NOT_TOKENIZED,
      );
    }
    try {
      const order = await this.orderRepository.create(
        { quantity: dto.quantity, tokenizedCard: payment.tokenizedCard },
        customer,
        product,
      );

      return order.toValue();
    } catch (error) {
      if (error instanceof PrismaClientValidationError) {
        throw new OrderException(
          (error as Error).message,
          ERROR_ORDER_TYPE.ORDER_NOT_CREATED,
        );
      }
      throw error;
    }
  }
}
