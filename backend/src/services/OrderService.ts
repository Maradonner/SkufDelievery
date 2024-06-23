import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {CreateOrderDto} from "../dto/Order/CreateOrderDto";
import {OrderDetailsDto} from "../dto/Order/OrderDetailsDto";
import {ProductItem} from "@prisma/client";
import { OrderDetails, OrderState  } from '@prisma/client';


@Injectable()
export class OrderService {
    constructor(private prisma: PrismaService) {}

    async create(data: CreateOrderDto): Promise<OrderDetailsDto> {
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
        const totalCost = data.productItems.reduce((sum, item) => {
            const product = productItems.find((p) => p.id === item.productId);
            return sum + parseFloat(product.price) * item.quantity;
        }, 0);
        const deliveryCost = 10.0; // Example fixed delivery cost
        const serviceFee = 5.0; // Example fixed service fee
        const totalAmount = totalCost + deliveryCost + serviceFee;

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
            totalCost: order.totalCost,
            deliveryCost: order.deliveryCost,
            serviceFee: order.serviceFee,
            totalAmount: order.totalAmount,
            state: order.state,
            items,
        };
    }

    async viewOrder(orderNumber: string): Promise<OrderDetailsDto> {
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

        if (!order) {
            throw new NotFoundException(`Order with orderNumber ${orderNumber} not found`);
        }

        return this.mapOrderDetails(order);
    }
}