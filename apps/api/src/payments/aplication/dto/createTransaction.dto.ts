import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class CreateTransactionDTO {
  @ApiProperty()
  @IsString()
  orderReference: string;
}
