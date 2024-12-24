import { Body, Controller, NotFoundException, Post } from '@nestjs/common';
import { CreateTransactionCase } from 'src/payments/aplication/cases/createTransaction.case';
import { CreateTransactionDTO } from 'src/payments/aplication/dto/createTransaction.dto';

@Controller('transactions')
export class PaymentController {
  constructor(private readonly CreateTransactionCase: CreateTransactionCase) {}

  @Post('create')
  createTransaction(@Body() dto: CreateTransactionDTO) {
    try {
      const transaction = this.CreateTransactionCase.execute(dto);
      return transaction;
    } catch (error) {
      return new NotFoundException((error as Error).message);
    }
  }
}
