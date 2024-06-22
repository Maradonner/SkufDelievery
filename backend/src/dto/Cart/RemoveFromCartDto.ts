import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class RemoveFromCartDto {
    @ApiProperty({ example: 'user-uuid' })
    @IsString()
    userId: string;

    @ApiProperty({ example: 1 })
    @IsNumber()
    productId: number;
}