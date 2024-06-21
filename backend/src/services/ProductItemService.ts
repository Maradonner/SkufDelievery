import {Injectable, NotFoundException} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {Prisma, ProductItem} from '@prisma/client';
import {CreateProductItemDto} from "../dto/CreateProductItemDto";
import {UpdateProductItemDto} from "../dto/UpdateProductItemDto";

@Injectable()
export class ProductItemService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateProductItemDto): Promise<ProductItem> {
        // Check if the category exists
        const category = await this.prisma.menuCategory.findUnique({
            where: { id: data.categoryId },
        });

        if (!category) {
            throw new NotFoundException(`Menu category with ID ${data.categoryId} not found`);
        }

        // Explicitly map CreateProductItemDto to Prisma.ProductItemCreateInput
        const productItemCreateInput: Prisma.ProductItemCreateInput = {
            name: data.name,
            description: data.description,
            price: data.price,
            weight: data.weight,
            imageSrc: data.imageSrc,
            available: data.available,
            category: data.categoryId
                ? {
                    connect: { id: data.categoryId },
                }
                : undefined,
        };

        return this.prisma.productItem.create({
            data: productItemCreateInput,
        });
    }

    async update(id: number, data: UpdateProductItemDto): Promise<ProductItem> {
        // Check if the product item exists
        const productItem = await this.prisma.productItem.findUnique({
            where: { id },
        });

        if (!productItem) {
            throw new NotFoundException(`Product item with ID ${id} not found`);
        }

        // If categoryId is provided, check if the category exists
        if (data.categoryId) {
            const category = await this.prisma.menuCategory.findUnique({
                where: { id: data.categoryId },
            });

            if (!category) {
                throw new NotFoundException(`Menu category with ID ${data.categoryId} not found`);
            }
        }

        // Update the product item
        return this.prisma.productItem.update({
            where: { id },
            data,
        });
    }
}
