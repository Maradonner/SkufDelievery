import {ApiProperty} from "@nestjs/swagger";

export class CartItemDto {
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

    @ApiProperty({ example: 1 })
    quantity: number;
}

