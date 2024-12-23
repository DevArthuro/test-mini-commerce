import { DeliveryInterface } from 'src/interfaces';
import { Delivery } from '../entities/delivery.entity';

export abstract class DeliveryRepository {
  abstract createDelivery(delivery: DeliveryInterface): Promise<Delivery>;
}
