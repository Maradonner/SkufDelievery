import { ApiProperty } from '@nestjs/swagger';

class CalculatedProductItemDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Spring Rolls' })
    name: string;

    @ApiProperty({ example: 'Delicious spring rolls' })
    description: string;

    @ApiProperty({ example: '5.99' })
    price: string;

    @ApiProperty({ example: '200g' })
    weight: string;

    @ApiProperty({ example: 'http://example.com/image.jpg' })
    imageSrc: string;

    @ApiProperty({ example: true })
    available: boolean;
}

export class CalculatedOrderDetailsDto {
    @ApiProperty({ example: 100.0 })
    totalCost: number;

    @ApiProperty({ example: 10.0 })
    deliveryCost: number;

    @ApiProperty({ example: 5.0 })
    serviceFee: number;

    @ApiProperty({ example: 115.0 })
    totalAmount: number;

    @ApiProperty({ type: [CalculatedProductItemDto] })
    productItems: CalculatedProductItemDto[];
}