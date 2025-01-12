import { IsNumber, IsString } from 'class-validator';

export class OrderInteface {
  @IsString()
  tokenizedCard: string;
}
