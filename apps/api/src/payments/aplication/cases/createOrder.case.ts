import { CustomerRepository } from 'src/payments/domain/repositories/customer.repository';
import { OrderRepository } from 'src/payments/domain/repositories/order.repository';
import { ProductRepository } from 'src/payments/domain/repositories/product.repository';
import { CreateOrderDTO } from '../dto/createOrder.dto';
import { VISIBILITY_ORDER_INFO } from 'src/payments/domain/entities/order.entity';
import { CardRepository } from 'src/payments/domain/repositories/card.repository';
import { DeliveryRepository } from 'src/payments/domain/repositories/delivery.repository';
import { PaymentGatewayPort } from 'src/payments/domain/ports/paymentGateway.port';

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
    const card = await this.cardRepository.createCard(dto.cardInfo);
    const product = await this.productRepository.findById(dto.productId);
    if (!product) {
      throw new Error('Product not found');
    }
    const delivery = await this.deliveryRepository.createDelivery(dto.delivery);
    const customer = await this.customerRepository.createCustomer(
      dto.customer,
      delivery,
      card,
    );
    const payment = await this.paymentAdapter.TokenizedCard(card);
    if (!payment) {
      throw new Error('Payment Tokenized Error to generate');
    }
    const order = await this.orderRepository.create(
      { quantity: dto.quantity, tokenizedCard: payment.tokenizedCard },
      customer,
      product,
    );

    return order.toValue();
  }
}
