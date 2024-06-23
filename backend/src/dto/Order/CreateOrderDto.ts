import {ApiProperty} from "@nestjs/swagger";
import {IsArray, IsInt, IsString, ValidateNested} from "class-validator";
import {Type} from "class-transformer";

class ProductItemQuantityDto {
    @ApiProperty({ example: 1 })
    @IsInt()
    productId: number;

    @ApiProperty({ example: 2 })
    @IsInt()
    quantity: number;
}

export class CreateOrderDto {
    @ApiProperty({ example: '123 Main St' })
    @IsString()
    address: string;

    @ApiProperty({ type: [ProductItemQuantityDto] })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductItemQuantityDto)
    productItems: ProductItemQuantityDto[];
}