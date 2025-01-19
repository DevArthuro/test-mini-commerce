import { Injectable } from '@nestjs/common';
import { ProductsInterface } from 'src/payments/aplication/dto/createOrder.dto';
import { TransactionInterface } from 'src/payments/domain/dto/transaction.dto';
import { Card } from 'src/payments/domain/entities/card.entity';
import { Customer } from 'src/payments/domain/entities/customer.entity';
import { Delivery } from 'src/payments/domain/entities/delivery.entity';
import { Order, OrderStatus } from 'src/payments/domain/entities/order.entity';
import {
  Product,
  ProductBought,
} from 'src/payments/domain/entities/product.entity';
import {
  Transaction,
  TransactionStatus,
} from 'src/payments/domain/entities/transaction.entity';
import { TransactionRepository } from 'src/payments/domain/repositories/transaction.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InMemoryTransactionRepository implements TransactionRepository {
  constructor(private prisma: PrismaService) {}

  async create(
    transaction: TransactionInterface,
    order: Order,
  ): Promise<Transaction> {
    const transactionCreated = await this.prisma.transaction.create({
      data: {
        orderId: order.id,
        status: transaction.status,
        referencePayment: transaction.referenceService,
        finalizedAt: transaction.finalizedAt,
        paymentMethod: transaction.paymentMethod,
      },
      include: {
        order: {
          include: {
            customer: {
              include: {
                card: true,
                delivery: true,
              },
            },
          },
        },
      },
    });

    return this.parsePrismaClientToEntity(transactionCreated);
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id },
      include: {
        order: {
          include: {
            customer: {
              include: {
                card: true,
                delivery: true,
              },
            },
          },
        },
      },
    });

    if (!transaction) {
      return null;
    }

    return this.parsePrismaClientToEntity(transaction);
  }

  async findByOrderId(orderId: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findFirst({
      where: { orderId },
      include: {
        order: {
          include: {
            customer: {
              include: {
                card: true,
                delivery: true,
              },
            },
          },
        },
      },
    });

    if (!transaction) {
      return null;
    }

    return this.parsePrismaClientToEntity(transaction);
  }

  async updateStatus(
    id: string,
    status: TransactionStatus,
    finalized_at: string,
  ): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.update({
      where: { id },
      data: { status, finalizedAt: finalized_at },
      include: {
        order: {
          include: {
            customer: {
              include: {
                card: true,
                delivery: true,
              },
            },
          },
        },
      },
    });

    return this.parsePrismaClientToEntity(transaction);
  }

  private async parsePrismaClientToEntity(
    transaction: any,
  ): Promise<Transaction> {
    const order = transaction.order;
    const products = await Promise.all<ProductBought[]>(
      order.products.map(
        async (productOrder: ProductsInterface): Promise<ProductBought> => {
          const product = await this.prisma.product.findFirst({
            where: { id: productOrder.productId },
          });

          const total = Number(product.price) * productOrder.quantity;

          return new ProductBought(
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
        },
      ),
    );

    return new Transaction(
      transaction.id,
      new Order(
        order.id,
        new Customer(
          order.customer.id,
          new Delivery(
            order.customer.delivery.id,
            order.customer.delivery.countryCode,
            order.customer.delivery.address,
            order.customer.delivery.region,
            order.customer.delivery.city,
            order.customer.delivery.address,
          ),
          new Card(
            order.customer.card.id,
            order.customer.card.number,
            order.customer.card.cvc,
            order.customer.card.expMonth,
            order.customer.card.expYear,
            order.customer.card.cardName,
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
        order.createdAt,
      ),
      TransactionStatus[transaction.status],
      transaction.referencePayment,
      transaction.finalizedAt,
      transaction.paymentMethod,
    );
  }
}
