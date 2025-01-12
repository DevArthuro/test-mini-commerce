import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length, Matches } from 'class-validator';

export class DeliveryInterface {
  @ApiProperty({
    example: 'CO',
  })
  @Matches(/^[A-Z]{3}$/, {
    message: 'Country code must be 2 uppercase letters',
  })
  countryCode: string;

  @ApiProperty({
    example: 'Colombia',
  })
  @IsString()
  @Length(2, 50)
  country: string;

  @ApiProperty({
    example: 'Risalda',
  })
  @IsString()
  @Length(2, 50)
  region: string;

  @ApiProperty({
    example: 'Pereira',
  })
  @IsString()
  @Length(2, 50)
  city: string;

  @ApiProperty({
    example: 'c2 c3',
  })
  @IsString()
  @Length(5, 100)
  address: string;
}
