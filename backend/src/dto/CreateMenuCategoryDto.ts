import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsUUID} from 'class-validator';


export class CreateMenuCategoryDto {
    @ApiProperty({ example: 'Appetizers' })
    @IsString()
    title: string;

    @ApiProperty({ example: 'restaurant-uuid' })
    @IsUUID()
    restaurantId: string;
}