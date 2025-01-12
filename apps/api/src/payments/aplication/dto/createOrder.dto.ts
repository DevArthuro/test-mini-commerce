import { IsArray, IsNumber, IsObject, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CardInterface } from 'src/payments/domain/dto/card.dto';
import { CustomerInterface } from 'src/payments/domain/dto/customer.dto';
import { DeliveryInterface } from 'src/payments/domain/dto/delivery.dto';

export class CreateOrderDTO {
  @ApiProperty({
    isArray: true,
    type: () => ProductsInterface,
  })
  @IsArray()
  products: ProductsInterface[];

  @ApiProperty()
  @IsObject()
  cardInfo: CardInterface;

  @ApiProperty()
  @IsObject()
  customer: CustomerInterface;

  @ApiProperty()
  @IsObject()
  delivery: DeliveryInterface;
}

export class ProductsInterface {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

