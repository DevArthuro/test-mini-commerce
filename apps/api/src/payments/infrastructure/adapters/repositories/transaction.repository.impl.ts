import { Injectable } from '@nestjs/common';
import { TransactionInterface } from 'src/payments/domain/dto/transaction.dto';
import { Card } from 'src/payments/domain/entities/card.entity';
import { Customer } from 'src/payments/domain/entities/customer.entity';
import { Delivery } from 'src/payments/domain/entities/delivery.entity';
import { Order, OrderStatus } from 'src/payments/domain/entities/order.entity';
import { Product } from 'src/payments/domain/entities/product.entity';
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
            product: true,
          },
        },
      },
    });

    return this.parsePrismaClientToEntity(transactionCreated);
  }

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
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
            product: true,
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
            product: true,
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
    finalized_at: Date,
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
            product: true,
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
      ),
      TransactionStatus[transaction.status],
      transaction.referencePayment,
      transaction.finalizedAt,
    );
  }
}
