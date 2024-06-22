import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsEnum, IsString} from "class-validator";

export class CreateOrderDto {
    @ApiProperty({ example: '123 Main St' })
    @IsString()
    address: string;

    @ApiProperty({ example: [1, 2, 3] })
    @IsArray()
    productItems: number[];
}