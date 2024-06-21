import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { MenuCategory } from '@prisma/client';
import {CreateMenuCategoryDto} from "../dto/CreateMenuCategoryDto";

@Injectable()
export class MenuCategoryService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateMenuCategoryDto): Promise<MenuCategory> {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: data.restaurantId },
        });

        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID ${data.restaurantId} not found`);
        }

        return this.prisma.menuCategory.create({
            data,
        });
    }

    async getMenuForRestaurant(restaurantId: string): Promise<MenuCategory[]> {
        const restaurant = await this.prisma.restaurant.findUnique({
            where: { id: restaurantId },
        });

        if (!restaurant) {
            throw new NotFoundException(`Restaurant with ID ${restaurantId} not found`);
        }

        return this.prisma.menuCategory.findMany({
            where: { restaurantId },
            include: { items: true },
        });
    }
}
