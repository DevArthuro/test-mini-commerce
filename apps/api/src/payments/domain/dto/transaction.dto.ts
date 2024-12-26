import { IsDate, IsEnum, IsString } from 'class-validator';
import { TransactionStatus } from '../entities/transaction.entity';

export class TransactionInterface {
  @IsString()
  referenceService: string;

  @IsEnum(TransactionStatus)
  status: TransactionStatus;

  @IsDate()
  finalizedAt: Date;
}
