import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateOrderCase } from 'src/payments/aplication/cases/createOrder.case';
import { GetOrderByReference } from 'src/payments/aplication/cases/getOrderByReference.case';
import { CreateOrderDTO } from 'src/payments/aplication/dto/createOrder.dto';
import { GetOrderByReferenceDTO } from 'src/payments/aplication/dto/getOrderByReference.dto';
import { OrderException } from 'src/payments/domain/errors/OrderExeption.error';
import { PaymentsException } from 'src/payments/domain/errors/PaymentsExeption.error';
import { ProductsException } from 'src/payments/domain/errors/ProductsExeption.error';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    private readonly createOrderCase: CreateOrderCase,
    private readonly getOrderByReference: GetOrderByReference,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create order and tokenized card' })
  @ApiResponse({ status: 201, description: 'Order Created.' })
  @ApiResponse({ status: 400, description: 'Bad Request: Invalid input data.' })
  @ApiResponse({ status: 404, description: 'Not Found: Resource not found.' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Unexpected error.',
  })
  async createOrder(@Body() dto: CreateOrderDTO, @Res() res: Response) {
    try {
      const order = await this.createOrderCase.execute(dto);
      return res
        .json({ data: order, status: HttpStatus.CREATED, error: false })
        .status(HttpStatus.CREATED);
    } catch (error) {
      if (error instanceof ProductsException) {
        throw new HttpException(
          { message: error.getTypeError(), error: true },
          HttpStatus.NOT_FOUND,
        );
      }
      if (error instanceof PaymentsException) {
        throw new HttpException(
          { message: error.getTypeError(), error: true },
          HttpStatus.BAD_REQUEST,
        );
      }
      if (error instanceof OrderException) {
        throw new HttpException(
          { message: error.getTypeError(), error: true },
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(
        'Unexpected error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('/:orderReference')
  @ApiOperation({ summary: 'Get order by Id' })
  @ApiResponse({ status: 200, description: 'Order Found.' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Unexpected error.',
  })
  async getOrderReference(
    @Param() params: GetOrderByReferenceDTO,
    @Res() res: Response,
  ) {
    try {
      const order = await this.getOrderByReference.execute(params);
      return res
        .json({ data: order, error: false, status: HttpStatus.OK })
        .status(HttpStatus.OK);
    } catch (error) {
      if (error instanceof OrderException) {
        throw new HttpException(
          { message: error.getTypeError(), error: true },
          HttpStatus.NOT_FOUND,
        );
      }
      throw new HttpException(
        'Unexpected error.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
