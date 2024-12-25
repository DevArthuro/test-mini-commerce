import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CustomerInterface {
  @ApiProperty()
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty()
  @IsString()
  @Length(2, 50)
  lastname: string;

  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Matches(/^\+\d{1,3}\d{9,15}$/, {
    message: 'Phone number must be in international format',
  })
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  @Length(2, 10)
  typeDocument: string;

  @ApiProperty()
  @IsString()
  @Length(5, 20)
  document: string;
}
