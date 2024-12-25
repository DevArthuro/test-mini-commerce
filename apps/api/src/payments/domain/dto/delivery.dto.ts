import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class DeliveryInterface {
  @ApiProperty()
  @Matches(/^[A-Z]{3}$/, {
    message: 'Country code must be 2 uppercase letters',
  })
  countryCode: string;

  @ApiProperty()
  @IsString()
  @Length(2, 50)
  country: string;

  @ApiProperty()
  @IsString()
  @Length(2, 50)
  region: string;

  @ApiProperty()
  @IsString()
  @Length(2, 50)
  city: string;

  @ApiProperty()
  @IsString()
  @Length(5, 100)
  address: string;
}
