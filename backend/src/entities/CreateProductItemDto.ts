import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class CreateProductItemDto {
    @ApiProperty({ example: 'Spring Rolls' })
    @IsString()
    name: string;

    @ApiProperty({ example: 'Delicious spring rolls' })
    @IsString()
    description: string;

    @ApiProperty({ example: '5.99' })
    @IsString()
    price: string;

    @ApiProperty({ example: '200g' })
    @IsString()
    weight: string;

    @ApiProperty({ example: 'http://example.com/image.jpg' })
    @IsString()
    imageSrc: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    categoryId: number;

    @ApiProperty({ example: true })
    @IsBoolean()
    @IsOptional()
    available?: boolean;
}
