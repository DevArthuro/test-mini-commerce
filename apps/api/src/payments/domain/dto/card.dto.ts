import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class CardInterface {
  @ApiProperty()
  @Matches(/^[0-9]{16}$/, { message: 'Card number must be 16 digits' })
  number: string;

  @ApiProperty()
  @Matches(/^[0-9]{3,4}$/, { message: 'CVC must be 3 or 4 digits' })
  cvc: string;

  @ApiProperty()
  @Matches(/^(0[1-9]|1[0-2])$/, {
    message: 'ExpMonth must be a valid month (01-12)',
  })
  expMonth: string;

  @ApiProperty()
  @Matches(/^[0-9]{2}$/, {
    message: 'ExpYear must be a valid year (last two digits)',
  })
  expYear: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  cardName: string;
}
