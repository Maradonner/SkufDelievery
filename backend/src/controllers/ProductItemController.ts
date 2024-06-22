import {Controller, Post, Body, Param, Put, ParseIntPipe, Delete} from '@nestjs/common';
import { ProductItem } from '@prisma/client';
import {ApiTags, ApiOperation, ApiResponse, ApiParam} from '@nestjs/swagger';
import {ProductItemService} from "../services/ProductItemService";
import {CreateProductItemDto} from "../dto/CreateProductItemDto";
import {UpdateProductItemDto} from "../dto/UpdateProductItemDto";

@ApiTags('product-items')
@Controller('product-items')
export class ProductItemController {
    constructor(private readonly productItemService: ProductItemService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new product item for a menu category' })
    @ApiResponse({ status: 201, description: 'The product item has been successfully created.' })
    @ApiResponse({ status: 404, description: 'Menu category not found.' })
    async create(@Body() data: CreateProductItemDto): Promise<ProductItem> {
        return this.productItemService.create(data);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update a product item in a menu category' })
    @ApiParam({ name: 'id', required: true, description: 'Product item ID' })
    @ApiResponse({ status: 200, description: 'The product item has been successfully updated.' })
    @ApiResponse({ status: 404, description: 'Product item or menu category not found.' })
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateProductItemDto
    ): Promise<ProductItem> {
        return this.productItemService.update(id, data);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete a product item' })
    @ApiParam({ name: 'id', required: true, description: 'Product item ID' })
    @ApiResponse({ status: 200, description: 'The product item has been successfully deleted.' })
    @ApiResponse({ status: 404, description: 'Product item not found.' })
    async delete(@Param('id', ParseIntPipe) id: number): Promise<ProductItem> {
        return this.productItemService.delete(id);
    }
}