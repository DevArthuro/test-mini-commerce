import { IsString } from 'class-validator';
export class updateTransactionDTO {
  @IsString()
  transactionId: string;
}
