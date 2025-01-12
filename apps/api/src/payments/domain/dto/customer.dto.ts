import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length, Matches } from 'class-validator';

export class CustomerInterface {
  @ApiProperty({
    example: "Julian"
  })
  @IsString()
  @Length(2, 50)
  name: string;

  @ApiProperty({
    example: "tabares"
  })
  @IsString()
  @Length(2, 50)
  lastname: string;

  @ApiProperty({
    example: "julian.tabares@gmail.com"
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: "+573204206767"
  })
  @Matches(/^\+\d{1,3}\d{9,15}$/, {
    message: 'Phone number must be in international format',
  })
  phoneNumber: string;

  @ApiProperty({
    example: "CC"
  })
  @IsString()
  @Length(2, 10)
  typeDocument: string;

  @ApiProperty({
    example: "1234567890"
  })
  @IsString()
  @Length(5, 20)
  document: string;
}
