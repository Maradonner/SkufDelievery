import {ApiOperation, ApiParam, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {CreateMenuCategoryDto} from "../dto/CreateMenuCategoryDto";
import {MenuCategoryService} from "../services/MenuCategoryService";
import {MenuCategory} from "@prisma/client";

@ApiTags('menu-categories')
@Controller('menu-categories')
export class MenuCategoryController {
    constructor(private readonly menuCategoryService: MenuCategoryService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new menu category' })
    @ApiResponse({ status: 201, description: 'The menu category has been successfully created.' })
    @ApiResponse({ status: 404, description: 'Restaurant not found.' })
    async create(@Body() data: CreateMenuCategoryDto): Promise<MenuCategory> {
        return this.menuCategoryService.create(data);
    }

    @Get('restaurant/:id')
    @ApiOperation({ summary: 'Get menu for a specific restaurant' })
    @ApiParam({ name: 'id', required: true, description: 'Restaurant ID' })
    @ApiResponse({ status: 200, description: 'Menu retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Restaurant not found.' })
    async getMenuForRestaurant(@Param('id') restaurantId: string): Promise<MenuCategory[]> {
        return this.menuCategoryService.getMenuForRestaurant(restaurantId);
    }
}