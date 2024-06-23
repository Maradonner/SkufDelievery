import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {CreateOrderDto} from "../dto/Order/CreateOrderDto";
import {OrderDetailsDto} from "../dto/Order/OrderDetailsDto";
import {ProductItem} from "@prisma/client";
import { OrderDetails, OrderState  } from '@prisma/client';


@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async create(userId: string, data: CreateOrderDto): Promise<OrderDetailsDto> {
        // Validate that all product items exist
        const productItems = await this.prisma.productItem.findMany({
            where: {
                id: {
                    in: data.productItems.map((item) => item.productId),
                },
            },
        });

        if (productItems.length !== data.productItems.length) {
            throw new NotFoundException('One or more product items not found');
        }

        // Calculate costs
        const totalCost = parseFloat(
            data.productItems.reduce((sum, item) => {
                const product = productItems.find((p) => p.id === item.productId);
                return sum + parseFloat(product.price) * item.quantity;
            }, 0).toFixed(2)
        );
        const deliveryCost = 10.0; // Example fixed delivery cost
        const serviceFee = 5.0; // Example fixed service fee
        const totalAmount = parseFloat((totalCost + deliveryCost + serviceFee).toFixed(2));

        // Create the order
        const order = await this.prisma.orderDetails.create({
            data: {
                orderNumber: this.generateOrderNumber(), // Assuming a method to generate unique order numbers
                createdDate: new Date(),
                address: data.address,
                totalCost,
                deliveryCost,
                serviceFee,
                totalAmount,
                state: OrderState.PENDING, // Set default state
                userId,
                items: {
                    create: data.productItems.map((item) => ({
                        productId: item.productId,
                        quantity: item.quantity,
                    })),
                },
            },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        return this.mapOrderDetails(order);
    }

    async confirmOrder(userId: string, orderNumber: string): Promise<OrderDetailsDto> {
        const order = await this.prisma.orderDetails.update({
            where: { orderNumber },
            data: { state: OrderState.CONFIRMED },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!order || userId !== userId) {
            throw new NotFoundException(`Order with orderNumber ${orderNumber} not found`);
        }

        return this.mapOrderDetails(order);
    }

    async declineOrder(userId: string, orderNumber: string): Promise<OrderDetailsDto> {
        const order = await this.prisma.orderDetails.update({
            where: { orderNumber },
            data: { state: OrderState.CANCELED },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!order || userId !== userId) {
            throw new NotFoundException(`Order with orderNumber ${orderNumber} not found`);
        }

        return this.mapOrderDetails(order);
    }

    private generateOrderNumber(): string {
        return 'order-' + Math.random().toString(36).substr(2, 9);
    }

    private mapOrderDetails(order: OrderDetails & { items: { product: ProductItem; quantity: number }[] }): OrderDetailsDto {
        const items = order.items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            description: item.product.description,
            price: item.product.price,
            weight: item.product.weight,
            imageSrc: item.product.imageSrc,
            available: item.product.available,
            quantity: item.quantity,
        }));

        return {
            orderNumber: order.orderNumber,
            createdDate: order.createdDate,
            address: order.address,
            totalCost: parseFloat(order.totalCost.toFixed(2)),
            deliveryCost: order.deliveryCost,
            serviceFee: order.serviceFee,
            totalAmount: parseFloat(order.totalAmount.toFixed(2)),
            state: order.state,
            items,
        };
    }

    async viewOrder(userId: string, orderNumber: string): Promise<OrderDetailsDto> {
        const order = await this.prisma.orderDetails.findUnique({
            where: { orderNumber },
            include: {
                items: {
                    include: {
                        product: true,
                    },
                },
            },
        });

        if (!order || userId !== userId) {
            throw new NotFoundException(`Order with orderNumber ${orderNumber} not found`);
        }

        return this.mapOrderDetails(order);
    }
}