import { IsDate, IsEnum, IsString } from 'class-validator';
import { TransactionStatus } from '../entities/transaction.entity';

export class TransactionInterface {
  @IsString()
  referenceService: string;

  @IsString()
  paymentMethod: string;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsString()
  finalizedAt: string;
}
