import { Controller, Get, Post, Body, Param, Req, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import {OrderService} from "../services/OrderService";
import {CreateOrderDto} from "../dto/Order/CreateOrderDto";
import {OrderDetailsDto} from "../dto/Order/OrderDetailsDto";

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
    @ApiResponse({ status: 404, description: 'One or more product items not found.' })
    async create(@Req() req: Request, @Body() data: CreateOrderDto): Promise<OrderDetailsDto> {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.orderService.create(userId, data);
    }

    @Get(':orderNumber')
    @ApiOperation({ summary: 'View order details' })
    @ApiResponse({ status: 200, description: 'Order details retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Order not found.' })
    async viewOrder(@Req() req: Request, @Param('orderNumber') orderNumber: string): Promise<OrderDetailsDto> {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.orderService.viewOrder(userId, orderNumber);
    }

    @Post(':orderNumber/confirm')
    @ApiOperation({ summary: 'Confirm the order' })
    @ApiResponse({ status: 200, description: 'Order confirmed successfully.' })
    @ApiResponse({ status: 404, description: 'Order not found.' })
    async confirmOrder(@Req() req: Request, @Param('orderNumber') orderNumber: string): Promise<OrderDetailsDto> {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.orderService.confirmOrder(userId, orderNumber);
    }

    @Post(':orderNumber/decline')
    @ApiOperation({ summary: 'Decline the order' })
    @ApiResponse({ status: 200, description: 'Order declined successfully.' })
    @ApiResponse({ status: 404, description: 'Order not found.' })
    async declineOrder(@Req() req: Request, @Param('orderNumber') orderNumber: string): Promise<OrderDetailsDto> {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.orderService.declineOrder(userId, orderNumber);
    }
}