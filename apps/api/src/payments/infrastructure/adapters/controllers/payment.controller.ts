import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CreateTransactionCase } from 'src/payments/aplication/cases/createTransaction.case';
import { CreateTransactionDTO } from 'src/payments/aplication/dto/createTransaction.dto';
import { OrderException } from 'src/payments/domain/errors/OrderExeption.error';
import { PaymentsException } from 'src/payments/domain/errors/PaymentsExeption.error';

@Controller('transactions')
export class PaymentController {
  constructor(private readonly CreateTransactionCase: CreateTransactionCase) {}

  @Post('create')
  async createTransaction(@Body() dto: CreateTransactionDTO) {
    try {
      const transaction = await this.CreateTransactionCase.execute(dto);
      return transaction;
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
}
