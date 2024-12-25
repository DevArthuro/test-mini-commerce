import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderCase } from 'src/payments/aplication/cases/createOrder.case';
import { CreateOrderDTO } from 'src/payments/domain/dto/createOrder.dto';
import { OrderException } from 'src/payments/domain/errors/OrderExeption.error';
import { PaymentsException } from 'src/payments/domain/errors/PaymentsExeption.error';
import { ProductsException } from 'src/payments/domain/errors/ProductsExeption.error';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly createOrderCase: CreateOrderCase) {}

  @Post('create')
  @ApiOperation({ summary: 'Create order and tokenized card' })
  @ApiResponse({ status: 201, description: 'Order Created.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Not Found: Resource not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Unexpected error.',
  })
  async createOrderC(@Body() dto: CreateOrderDTO) {
    try {
      const order = await this.createOrderCase.execute(dto);
      return order;
    } catch (error) {
      if (error instanceof ProductsException) {
        return new HttpException(
          'Id product is not available.',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error instanceof PaymentsException) {
        return new HttpException(
          'Card is not processed.',
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error instanceof OrderException) {
        return new HttpException(
          'Order is not created.',
          HttpStatus.BAD_REQUEST,
        );
      }
      return new HttpException(
        'Unexpected error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
