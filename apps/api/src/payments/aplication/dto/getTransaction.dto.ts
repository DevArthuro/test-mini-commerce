import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetTransactionByIdDTO {
  @ApiProperty()
  @IsString()
  transactionId: string;
}
