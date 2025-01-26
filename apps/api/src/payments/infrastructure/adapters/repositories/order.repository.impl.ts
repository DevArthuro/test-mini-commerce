import { Injectable } from '@nestjs/common';
import { ProductsInterface } from 'src/payments/aplication/dto/createOrder.dto';
import { OrderInteface } from 'src/payments/domain/dto/order.dto';
import { Card } from 'src/payments/domain/entities/card.entity';
import { Customer } from 'src/payments/domain/entities/customer.entity';
import { Delivery } from 'src/payments/domain/entities/delivery.entity';
import { Order, OrderStatus } from 'src/payments/domain/entities/order.entity';
import {
  Product,
  ProductBought,
} from 'src/payments/domain/entities/product.entity';
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
    const products = await Promise.all<ProductBought[]>(
      order.products.map(
        async (productOrder: ProductsInterface): Promise<ProductBought> => {
          const product = await this.prisma.product.findFirst({
            where: { id: productOrder.productId },
          });

          const total = Number(product.price) * productOrder.quantity;

          const productBought = new ProductBought(
            product.id,
            total,
            productOrder.quantity,
            new Product(
              product.id,
              product.name,
              product.description,
              product.stock,
              Number(product.price),
              product.imageUrl,
            ),
          );
          return productBought;
        },
      ),
    );
    return new Order(
      order.id,
      new Customer(
        order.customer.id,
        new Delivery(
          delivery.id,
          delivery.countryCode,
          delivery.country,
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
      products,
      Number(order.feeDelivery),
      Number(order.feeBought),
      order.tokenizedCard,
      order.reference,
      OrderStatus[order.status],
      order.created_at,
    );
  }

  async create(
    order: OrderInteface,
    customer: Customer,
    products: ProductsInterface[],
  ): Promise<Order> {
    const orderCreated = await this.prisma.order.create({
      data: {
        customerId: customer.id,
        products: products.map((product) => ({
          productId: product.productId,
          quantity: product.quantity,
        })),
        feeBought: 0.03,
        feeDelivery: 0.05,
        reference: `Mini_commerce_${v4().slice(-8)}`,
        status: OrderStatus.PENDING,
        tokenizedCard: order.tokenizedCard,
      },
      include: {
        customer: true,
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
      },
    });

    return this.parsePrismaClientToEntity(order);
  }

  async updateColumn(
    orderReference: string,
    column: { name: string; value: any }[],
  ): Promise<Order | null> {
    const columnByValue = column.reduce((object, { name, value }) => {
      return {
        ...object,
        [name]: value,
      };
    }, {});

    const order = await this.prisma.order.update({
      data: {
        ...columnByValue,
      },
      where: {
        reference: orderReference,
      },
      include: {
        customer: true,
      },
    });

    return this.parsePrismaClientToEntity(order);
  }
}
