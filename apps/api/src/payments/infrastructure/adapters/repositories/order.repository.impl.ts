import { Injectable } from '@nestjs/common';
import { OrderInteface } from 'src/payments/domain/dto/order.dto';
import { Card } from 'src/payments/domain/entities/card.entity';
import { Customer } from 'src/payments/domain/entities/customer.entity';
import { Delivery } from 'src/payments/domain/entities/delivery.entity';
import { Order, OrderStatus } from 'src/payments/domain/entities/order.entity';
import { Product } from 'src/payments/domain/entities/product.entity';
import { OrderRepository } from 'src/payments/domain/repositories/order.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { v4 } from 'uuid';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  constructor(private prisma: PrismaService) {}

  private async parsePrismaClientToEntity(order: any): Promise<Order> {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id: order.customer.deliveryId },
    });
    const card = await this.prisma.card.findUnique({
      where: { id: order.customer.cardId },
    });
    return new Order(
      order.id,
      new Customer(
        order.customer.id,
        new Delivery(
          delivery.id,
          delivery.countryCode,
          delivery.address,
          delivery.region,
          delivery.city,
          delivery.address,
        ),
        new Card(
          card.id,
          card.number,
          card.cvc,
          card.expMonth,
          card.expYear,
          card.cardName,
        ),
        order.customer.name,
        order.customer.lastname,
        order.customer.email,
        order.customer.phoneNumber,
        order.customer.typeDocument,
        order.customer.document,
      ),
      new Product(
        order.product.id,
        order.product.name,
        order.product.description,
        order.product.stock,
        Number(order.product.price),
        order.product.imageUrl,
      ),
      Number(order.feeDelivery),
      Number(order.feeBought),
      order.tokenizedCard,
      order.reference,
      order.quantity,
      OrderStatus[order.status],
    );
  }

  async create(
    order: OrderInteface,
    customer: Customer,
    product: Product,
  ): Promise<Order> {
    const orderCreated = await this.prisma.order.create({
      data: {
        customerId: customer.id,
        productId: product.id,
        feeBought: 0.5,
        feeDelivery: 0.5,
        quantity: order.quantity,
        reference: `Mini_commerce_${v4().slice(-8)}`,
        status: OrderStatus.PENDING,
        tokenizedCard: order.tokenizedCard,
      },
      include: {
        customer: true,
        product: true,
      },
    });

    if (!orderCreated) throw new Error('The order is not created');

    return this.parsePrismaClientToEntity(orderCreated);
  }

  async findById(id: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        customer: true,
        product: true,
      },
    });

    if (!order) {
      return null;
    }

    return this.parsePrismaClientToEntity(order);
  }

  async findByReference(reference: string): Promise<Order | null> {
    const order = await this.prisma.order.findUnique({
      where: { reference },
      include: {
        customer: true,
        product: true,
      },
    });

    if (!order) {
      return null;
    }

    return this.parsePrismaClientToEntity(order);
  }

  async updateStatus(id: string, status: OrderStatus): Promise<Order | null> {
    const order = await this.prisma.order.update({
      where: { id },
      data: { status },
      include: {
        customer: true,
        product: true,
      },
    });

    return this.parsePrismaClientToEntity(order);
  }
}
