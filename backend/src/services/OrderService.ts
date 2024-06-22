import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OrderDetails, OrderState  } from '@prisma/client';
import {CreateOrderDto} from "../dto/CreateOrderDto";
import {CalculateOrderDto} from "../dto/CalculateOrderDto";
import {CalculatedOrderDetailsDto} from "../dto/CalculatedOrderDetailsDto";

@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateOrderDto): Promise<OrderDetails> {
        // Validate that all product items exist
        const productItems = await this.prisma.productItem.findMany({
            where: {
                id: {
                    in: data.productItems,
                },
            },
        });

        if (productItems.length !== data.productItems.length) {
            throw new NotFoundException('One or more product items not found');
        }

        // Calculate costs
        const totalCost = productItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
        const deliveryCost = 10.0; // Example fixed delivery cost
        const serviceFee = 5.0; // Example fixed service fee
        const totalAmount = totalCost + deliveryCost + serviceFee;

        // Create the order
        return this.prisma.orderDetails.create({
            data: {
                orderNumber: this.generateOrderNumber(), // Assuming a method to generate unique order numbers
                createdDate: new Date(),
                address: data.address,
                totalCost,
                deliveryCost,
                serviceFee,
                totalAmount,
                state: OrderState.PENDING, // Set default state
                items: {
                    create: data.productItems.map((productId) => ({
                        product: { connect: { id: productId } },
                    })),
                },
            },
        });
    }

    private generateOrderNumber(): string {
        return 'order-' + Math.random().toString(36).substr(2, 9);
    }


    async calculateOrder(data: CalculateOrderDto): Promise<CalculatedOrderDetailsDto> {
        // Validate that all product items exist
        const productItems = await this.prisma.productItem.findMany({
            where: {
                id: {
                    in: data.productItems,
                },
            },
        });

        if (productItems.length !== data.productItems.length) {
            throw new NotFoundException('One or more product items not found');
        }

        // Calculate costs
        const totalCost = productItems.reduce((sum, item) => sum + parseFloat(item.price), 0);
        const deliveryCost = 10.0; // Example fixed delivery cost
        const serviceFee = 5.0; // Example fixed service fee
        const totalAmount = totalCost + deliveryCost + serviceFee;

        // Return calculated order details
        return {
            totalCost,
            deliveryCost,
            serviceFee,
            totalAmount,
            productItems: productItems.map(item => ({
                id: item.id,
                name: item.name,
                description: item.description,
                price: item.price,
                weight: item.weight,
                imageSrc: item.imageSrc,
                available: item.available,
            })),
        };
    }
}