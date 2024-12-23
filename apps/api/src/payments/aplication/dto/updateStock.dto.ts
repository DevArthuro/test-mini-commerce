import { IsNumber, IsString } from 'class-validator';
export class UpdateStockDTO {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;
}
