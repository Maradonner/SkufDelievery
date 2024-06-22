import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {CartService} from "../services/CartService";
import {AddToCartDto} from "../dto/Cart/AddToCartDto";
import {Cart} from "@prisma/client";
import {RemoveFromCartDto} from "../dto/Cart/RemoveFromCartDto";

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    @ApiOperation({ summary: 'Add a product to the cart' })
    @ApiResponse({ status: 201, description: 'The product has been added to the cart.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async addToCart(@Body() data: AddToCartDto): Promise<Cart> {
        return this.cartService.addToCart(data);
    }

    @Delete('remove')
    @ApiOperation({ summary: 'Remove a product from the cart' })
    @ApiResponse({ status: 200, description: 'The product has been removed from the cart.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async removeFromCart(@Body() data: RemoveFromCartDto): Promise<Cart> {
        return this.cartService.removeFromCart(data);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get the cart for a user' })
    @ApiResponse({ status: 200, description: 'Cart retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Cart not found.' })
    async getCart(@Param('userId') userId: string): Promise<Cart> {
        return this.cartService.getCart(userId);
    }
}