import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { CreateOrderCase } from 'src/payments/aplication/cases/createOrder.case';
import { CreateOrderDTO } from 'src/payments/aplication/dto/createOrder.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderCase: CreateOrderCase) {}

  @Post('create')
  createOrderC(@Body() dto: CreateOrderDTO) {
    try {
      const order = this.createOrderCase.execute(dto);
      return order;
    } catch (error) {
      return new NotFoundException((error as Error).message);
    }
  }
}
