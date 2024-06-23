import {ApiProperty} from "@nestjs/swagger";
import {IsNumber} from "class-validator";

export class RemoveFromCartDto {
    @ApiProperty({ example: 1 })
    @IsNumber()
    productId: number;
}