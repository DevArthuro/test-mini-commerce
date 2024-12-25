import { Injectable } from '@nestjs/common';
import { DeliveryInterface } from '../../../../../interfaces';
import { Delivery } from 'src/payments/domain/entities/delivery.entity';
import { DeliveryRepository } from 'src/payments/domain/repositories/delivery.repository';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class InMemoryDeliveryRepository implements DeliveryRepository {
  constructor(private prisma: PrismaService) {}
  async createDelivery(delivery: DeliveryInterface): Promise<Delivery> {
    const deliveryCreated = await this.prisma.delivery.create({
      data: {
        address: delivery.address,
        city: delivery.city,
        region: delivery.region,
        country: delivery.country,
        countryCode: delivery.countryCode,
      },
    });

    const deliveryEntity = new Delivery(
      deliveryCreated.id,
      deliveryCreated.countryCode,
      deliveryCreated.address,
      deliveryCreated.region,
      deliveryCreated.city,
      deliveryCreated.address,
    );

    return deliveryEntity;
  }
}
