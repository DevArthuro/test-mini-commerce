import { Card } from 'src/payments/domain/entities/card.entity';
import { Customer } from 'src/payments/domain/entities/customer.entity';
import { Delivery } from 'src/payments/domain/entities/delivery.entity';
import { CustomerRepository } from 'src/payments/domain/repositories/customer.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CustomerInterface } from 'src/payments/domain/dto/customer.dto';

@Injectable()
export class InMemoryCustomerRepository implements CustomerRepository {
  constructor(private prisma: PrismaService) {}
  async createCustomer(
    customer: CustomerInterface,
    delivery: Delivery,
    card: Card,
  ): Promise<Customer> {
    const customerCreated = await this.prisma.customer.create({
      data: {
        document: customer.document,
        email: customer.email,
        name: customer.name,
        lastname: customer.lastname,
        phoneNumber: customer.phoneNumber,
        typeDocument: customer.typeDocument,
        cardId: card.id,
        deliveryId: delivery.id,
      },
    });

    const customerEntity = new Customer(
      customerCreated.id,
      delivery,
      card,
      customerCreated.name,
      customer.lastname,
      customer.email,
      customer.phoneNumber,
      customer.typeDocument,
      customer.document,
    );

    return customerEntity;
  }
}
