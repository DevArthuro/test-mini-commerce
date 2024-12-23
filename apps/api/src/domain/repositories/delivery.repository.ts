import { DeliveryInterface } from 'src/interfaces';
import { Delivery } from '../entities/delivery.entity';

export interface DeliveryRepository {
  createDelivery(customer: DeliveryInterface): Promise<Delivery>;
  findById(id: string): Promise<Delivery | null>;
}
