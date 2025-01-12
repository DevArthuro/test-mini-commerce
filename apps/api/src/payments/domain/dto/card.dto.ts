import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class CardInterface {
  @ApiProperty({
    examples: ['4242424242424242', '4111111111111111'],
    default: '4242424242424242',
  })
  @Matches(/^[0-9]{16}$/, { message: 'Card number must be 16 digits' })
  number: string;

  @ApiProperty({
    example: '124',
  })
  @Matches(/^[0-9]{3,4}$/, { message: 'CVC must be 3 or 4 digits' })
  cvc: string;

  @ApiProperty({
    example: '08',
  })
  @Matches(/^(0[1-9]|1[0-2])$/, {
    message: 'ExpMonth must be a valid month (01-12)',
  })
  expMonth: string;

  @ApiProperty({
    example: '25',
  })
  @Matches(/^[0-9]{2}$/, {
    message: 'ExpYear must be a valid year (last two digits)',
  })
  expYear: string;

  @ApiProperty({
    example: 'Card name',
  })
  @IsString()
  @Length(3, 50)
  cardName: string;
}
