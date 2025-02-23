import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class GetOrderByReferenceDTO {
  @ApiProperty()
  @IsString()
  orderReference: string;
}
