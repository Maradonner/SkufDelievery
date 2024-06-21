import { Injectable } from '@nestjs/common';
import { Restaurant, Prisma } from '@prisma/client';
import {PrismaService} from "../prisma.service";

@Injectable()
export class RestaurantService {
    constructor(private prisma: PrismaService) {}

    async getAll(): Promise<Restaurant[]> {
        return this.prisma.restaurant.findMany();
    }

    async getOne(id: string): Promise<Restaurant | null> {
        return this.prisma.restaurant.findUnique({
            where: { id },
        });
    }

    async create(data: Prisma.RestaurantCreateInput): Promise<Restaurant> {
        return this.prisma.restaurant.create({
            data,
        });
    }

    async update(id: string, data: Prisma.RestaurantUpdateInput): Promise<Restaurant> {
        return this.prisma.restaurant.update({
            where: { id },
            data,
        });
    }

    async delete(id: string): Promise<Restaurant> {
        return this.prisma.restaurant.delete({
            where: { id },
        });
    }
}
