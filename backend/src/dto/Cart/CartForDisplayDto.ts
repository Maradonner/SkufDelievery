import {ApiProperty} from "@nestjs/swagger";
import {CartItemDto} from "./CartItemDto";

export class CartForDisplayDto {
    @ApiProperty({ type: [CartItemDto] })
    items: CartItemDto[];

    @ApiProperty({ example: 17.97 })
    totalCost: number;

    @ApiProperty({ example: 10 })
    deliveryCost: number;

    @ApiProperty({ example: 5 })
    serviceFee: number;

    @ApiProperty({ example: 32.97 })
    totalAmount: number;
}