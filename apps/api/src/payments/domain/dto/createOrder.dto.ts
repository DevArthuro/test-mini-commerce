import { IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CardInterface } from './card.dto';
import { CustomerInterface } from './customer.dto';
import { DeliveryInterface } from './delivery.dto';

export class CreateOrderDTO {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsObject()
  cardInfo: CardInterface;

  @ApiProperty()
  @IsObject()
  customer: CustomerInterface;

  @ApiProperty()
  @IsObject()
  delivery: DeliveryInterface;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}
