import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsBoolean, IsOptional } from 'class-validator';

export class UpdateProductItemDto {
    @ApiProperty({ example: 'Spring Rolls' })
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'Delicious spring rolls' })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ example: '5.99' })
    @IsString()
    @IsOptional()
    price?: string;

    @ApiProperty({ example: '200g' })
    @IsString()
    @IsOptional()
    weight?: string;

    @ApiProperty({ example: 'http://example.com/image.jpg' })
    @IsString()
    @IsOptional()
    imageSrc?: string;

    @ApiProperty({ example: true })
    @IsBoolean()
    @IsOptional()
    available?: boolean;

    @ApiProperty({ example: 1 })
    @IsNumber()
    @IsOptional()
    categoryId?: number;
}
