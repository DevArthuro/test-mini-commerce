import { Delivery } from '../entities/delivery.entity';

export interface DeliveryRepository {
  createDelivery(customer: Delivery): Promise<Delivery>;
  findById(id: string): Promise<Delivery | null>;
}
