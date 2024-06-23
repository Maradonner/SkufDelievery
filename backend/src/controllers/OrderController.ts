import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Get, Param, Post} from "@nestjs/common";
import {OrderService} from "../services/OrderService";
import {OrderDetailsDto} from "../dto/Order/OrderDetailsDto";
import {CreateOrderDto} from "../dto/Order/CreateOrderDto";

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
    @ApiResponse({ status: 404, description: 'One or more product items not found.' })
    async create(@Body() data: CreateOrderDto): Promise<OrderDetailsDto> {
        return this.orderService.create(data);
    }

    @Get(':orderNumber')
    @ApiOperation({ summary: 'View order details' })
    @ApiResponse({ status: 200, description: 'Order details retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Order not found.' })
    async viewOrder(@Param('orderNumber') orderNumber: string): Promise<OrderDetailsDto> {
        return this.orderService.viewOrder(orderNumber);
    }
}