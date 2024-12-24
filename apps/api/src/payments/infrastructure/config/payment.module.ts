import { Module } from '@nestjs/common';
import { InMemoryProductRepository } from '../adapters/repositories/product.repository.impl';
import { ProductRepository } from 'src/payments/domain/repositories/product.repository';
import { GetProductsCase } from 'src/payments/aplication/cases/getProducts.case';
import { ProductController } from '../adapters/controllers/product.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { InMemoryCardRepository } from '../adapters/repositories/card.repository.impl';
import { CardRepository } from 'src/payments/domain/repositories/card.repository';
import { InMemoryCustomerRepository } from '../adapters/repositories/customer.repository.impl';
import { CustomerRepository } from 'src/payments/domain/repositories/customer.repository';
import { InMemoryDeliveryRepository } from '../adapters/repositories/delivery.repository.impl';
import { DeliveryRepository } from 'src/payments/domain/repositories/delivery.repository';
import { InMemoryOrderRepository } from '../adapters/repositories/order.repository.impl';
import { OrderRepository } from 'src/payments/domain/repositories/order.repository';
import { Wompi } from '../adapters/services/wompi-payment.service';
import { PaymentGatewayPort } from 'src/payments/domain/ports/paymentGateway.port';
import { OrderController } from '../adapters/controllers/order.controller';
import { CreateOrderCase } from 'src/payments/aplication/cases/createOrder.case';

@Module({
  controllers: [ProductController, OrderController],
  providers: [
    GetProductsCase,
    CreateOrderCase,
    InMemoryProductRepository,
    {
      provide: ProductRepository,
      useClass: InMemoryProductRepository,
    },
    InMemoryCardRepository,
    {
      provide: CardRepository,
      useClass: InMemoryCardRepository,
    },
    InMemoryCustomerRepository,
    {
      provide: CustomerRepository,
      useClass: InMemoryCustomerRepository,
    },
    InMemoryDeliveryRepository,
    {
      provide: DeliveryRepository,
      useClass: InMemoryDeliveryRepository,
    },
    InMemoryOrderRepository,
    {
      provide: OrderRepository,
      useClass: InMemoryOrderRepository,
    },
    Wompi,
    {
      provide: PaymentGatewayPort,
      useClass: Wompi,
    },
  ],
  exports: [GetProductsCase, CreateOrderCase],
  imports: [PrismaModule],
})
export class PaymentModule {}
