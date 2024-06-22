import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray } from 'class-validator';

export class CalculateOrderDto {
    @ApiProperty({ example: '123 Main St' })
    @IsString()
    address: string;

    @ApiProperty({ example: [1, 2, 3] })
    @IsArray()
    productItems: number[];
}