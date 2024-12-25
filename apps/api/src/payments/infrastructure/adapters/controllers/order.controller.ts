import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  NotFoundException,
  Post,
} from '@nestjs/common';
import { CreateOrderCase } from 'src/payments/aplication/cases/createOrder.case';
import { CreateOrderDTO } from 'src/payments/aplication/dto/createOrder.dto';
import { OrderException } from 'src/payments/domain/errors/OrderExeption.error';
import { PaymentsException } from 'src/payments/domain/errors/PaymentsExeption.error';
import { ProductsException } from 'src/payments/domain/errors/ProductsExeption.error';

@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderCase: CreateOrderCase) {}

  @Post('create')
  async createOrderC(@Body() dto: CreateOrderDTO) {
    try {
      const order = await this.createOrderCase.execute(dto);
      return order;
    } catch (error) {
      if (error instanceof ProductsException) {
        return new HttpException(error.getTypeError(), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof PaymentsException) {
        return new HttpException(error.getTypeError(), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof OrderException) {
        return new HttpException(error.getTypeError(), HttpStatus.BAD_REQUEST);
      }
      return new NotFoundException((error as Error).message);
    }
  }
}
