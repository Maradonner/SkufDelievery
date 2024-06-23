import {ApiProperty} from "@nestjs/swagger";

class OrderProductItemDto {
    @ApiProperty({ example: 1 })
    id: number;

    @ApiProperty({ example: 'Product Name' })
    name: string;

    @ApiProperty({ example: 'Product description' })
    description: string;

    @ApiProperty({ example: '5.99' })
    price: string;

    @ApiProperty({ example: '100g' })
    weight: string;

    @ApiProperty({ example: 'http://example.com/image.png' })
    imageSrc: string;

    @ApiProperty({ example: true })
    available: boolean;

    @ApiProperty({ example: 2 })
    quantity: number;
}

export class OrderDetailsDto {
    @ApiProperty({ example: 'order-abc123' })
    orderNumber: string;

    @ApiProperty({ example: '2024-06-22T10:30:00Z' })
    createdDate: Date;

    @ApiProperty({ example: '123 Main St' })
    address: string;

    @ApiProperty({ example: 17.97 })
    totalCost: number;

    @ApiProperty({ example: 10 })
    deliveryCost: number;

    @ApiProperty({ example: 5 })
    serviceFee: number;

    @ApiProperty({ example: 32.97 })
    totalAmount: number;

    @ApiProperty({ example: 'PENDING' })
    state: string;

    @ApiProperty({ type: [OrderProductItemDto] })
    items: OrderProductItemDto[];
}