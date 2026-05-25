import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: '' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: '' })
  @IsString()
  description!: string;

  @ApiProperty({ example: 999 })
  @IsNumber()
  price!: number;
}
