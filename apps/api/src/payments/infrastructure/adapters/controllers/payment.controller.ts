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
import { CreateTransactionCase } from 'src/payments/aplication/cases/createTransaction.case';
import { GetTransactionCase } from 'src/payments/aplication/cases/getTransaction.case';
import { CreateTransactionDTO } from 'src/payments/aplication/dto/createTransaction.dto';
import { GetTransactionByIdDTO } from 'src/payments/aplication/dto/getTransaction.dto';
import { OrderException } from 'src/payments/domain/errors/OrderExeption.error';
import {
  ERROR_PAYMENTS_TYPE,
  PaymentsException,
} from 'src/payments/domain/errors/PaymentsExeption.error';

@ApiTags('Transactions')
@Controller('transactions')
export class PaymentController {
  constructor(
    private readonly CreateTransactionCase: CreateTransactionCase,
    private readonly GetTransactionCase: GetTransactionCase,
  ) {}

  @Post('create')
  @ApiOperation({ summary: 'Create transaction by order reference' })
  @ApiResponse({ status: 201, description: 'Transaction Created.' })
  @ApiResponse({
    status: 400,
    description: 'Payment is not created by multiple type errors',
  })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Unexpected error.',
  })
  async createTransaction(
    @Body() dto: CreateTransactionDTO,
    @Res() response: Response,
  ) {
    try {
      const transaction = await this.CreateTransactionCase.execute(dto);
      return response
        .json({ data: transaction, status: HttpStatus.CREATED, error: false })
        .status(HttpStatus.CREATED);
    } catch (error) {
      if (error instanceof PaymentsException) {
        throw new HttpException(error.getTypeError(), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof OrderException) {
        throw new HttpException(error.getTypeError(), HttpStatus.NOT_FOUND);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('/:transactionId')
  @ApiOperation({ summary: 'Get transaction and update order and stock' })
  @ApiResponse({ status: 200, description: 'Transaction already updated' })
  @ApiResponse({
    status: 400,
    description: 'Transaction and order have problems',
  })
  @ApiResponse({ status: 404, description: 'Transaction not found' })
  @ApiResponse({
    status: 500,
    description: 'Internal Server Error: Unexpected error.',
  })
  async getTransaction(
    @Param() dto: GetTransactionByIdDTO,
    @Res() response: Response,
  ) {
    try {
      const transaction = await this.GetTransactionCase.execute(dto);
      return response
        .json({ data: transaction, status: HttpStatus.CREATED, error: false })
        .status(HttpStatus.OK);
    } catch (error) {
      if (error instanceof PaymentsException) {
        if (error.getTypeError() === ERROR_PAYMENTS_TYPE.PAYMENT_NOT_FOUND) {
          throw new HttpException(error.getTypeError(), HttpStatus.NOT_FOUND);
        }
        throw new HttpException(error.getTypeError(), HttpStatus.BAD_REQUEST);
      }
      if (error instanceof OrderException) {
        throw new HttpException(error.getTypeError(), HttpStatus.BAD_REQUEST);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
