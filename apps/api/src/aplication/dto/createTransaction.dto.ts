import { IsString } from 'class-validator';
export class CreateTransactionDTO {
  @IsString()
  orderReference: string;
}
