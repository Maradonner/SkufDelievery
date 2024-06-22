import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Post} from "@nestjs/common";
import {OrderService} from "../services/OrderService";
import {CreateOrderDto} from "../dto/CreateOrderDto";
import {OrderDetails} from "@prisma/client";
import {CalculatedOrderDetailsDto} from "../dto/CalculatedOrderDetailsDto";
import {CalculateOrderDto} from "../dto/CalculateOrderDto";

@ApiTags('orders')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    @ApiOperation({ summary: 'Create a new order' })
    @ApiResponse({ status: 201, description: 'The order has been successfully created.' })
    @ApiResponse({ status: 404, description: 'One or more product items not found.' })
    async create(@Body() data: CreateOrderDto): Promise<OrderDetails> {
        return this.orderService.create(data);
    }

    @Post('calculate')
    @ApiOperation({ summary: 'Calculate order details' })
    @ApiResponse({ status: 200, description: 'Order details calculated successfully.' })
    @ApiResponse({ status: 404, description: 'One or more product items not found.' })
    async calculateOrder(@Body() data: CalculateOrderDto): Promise<CalculatedOrderDetailsDto> {
        return this.orderService.calculateOrder(data);
    }
}