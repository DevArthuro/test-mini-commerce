import { IsNumber, IsObject, IsString } from 'class-validator';
import {
  CardInterface,
  CustomerInterface,
  DeliveryInterface,
} from 'src/interfaces';

export class CreateOrderDTO {
  @IsString()
  productId: string;

  @IsObject()
  cardInfo: CardInterface;

  @IsObject()
  customer: CustomerInterface;

  @IsObject()
  delivery: DeliveryInterface;

  @IsNumber()
  quantity: number;
}
