import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {RestaurantService} from "../services/RestaurantService";
import {CreateRestaurantDto} from "../dto/CreateRestaurantDto";
import {Restaurant} from "@prisma/client";

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
    constructor(private readonly restaurantService: RestaurantService) {}

    @ApiOperation({ summary: 'Get all restaurants' })
    @ApiResponse({ status: 200, description: 'Return all restaurants.' })
    @Get()
    async getAll(): Promise<Restaurant[]> {
        return this.restaurantService.getAll();
    }

    @ApiOperation({ summary: 'Get restaurant by ID' })
    @ApiParam({ name: 'id', required: true, description: 'Restaurant ID' })
    @ApiResponse({ status: 200, description: 'Return restaurant by ID.' })
    @Get(':id')
    async getOne(@Param('id') id: string): Promise<Restaurant | null> {
        return this.restaurantService.getOne(id);
    }

    @ApiOperation({ summary: 'Create a new restaurant' })
    @ApiResponse({ status: 201, description: 'The restaurant has been successfully created.' })
    @Post()
    async create(@Body() data: CreateRestaurantDto): Promise<Restaurant> {
        return this.restaurantService.create(data);
    }

    @ApiOperation({ summary: 'Update a restaurant' })
    @ApiParam({ name: 'id', required: true, description: 'Restaurant ID' })
    @ApiResponse({ status: 200, description: 'The restaurant has been successfully updated.' })
    @Put(':id')
    async update(@Param('id') id: string, @Body() data: CreateRestaurantDto): Promise<Restaurant> {
        return this.restaurantService.update(id, data);
    }

    @ApiOperation({ summary: 'Delete a restaurant' })
    @ApiParam({ name: 'id', required: true, description: 'Restaurant ID' })
    @ApiResponse({ status: 200, description: 'The restaurant has been successfully deleted.' })
    @Delete(':id')
    async delete(@Param('id') id: string): Promise<Restaurant> {
        return this.restaurantService.delete(id);
    }
}