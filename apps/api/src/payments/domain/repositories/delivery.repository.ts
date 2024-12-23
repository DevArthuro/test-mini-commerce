import { DeliveryInterface } from 'src/interfaces';
import { Delivery } from '../entities/delivery.entity';

export abstract class DeliveryRepository {
  abstract createDelivery(customer: DeliveryInterface): Promise<Delivery>;
  abstract findById(id: string): Promise<Delivery | null>;
}
