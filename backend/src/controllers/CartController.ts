import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, Param, Post} from "@nestjs/common";
import {CartService} from "../services/CartService";
import {AddToCartDto} from "../dto/Cart/AddToCartDto";
import {RemoveFromCartDto} from "../dto/Cart/RemoveFromCartDto";
import {DecreaseCartItemDto} from "../dto/Cart/DecreaseCartItemDto";
import {IncreaseCartItemDto} from "../dto/Cart/IncreaseCartItemDto";
import {CartForDisplayDto} from "../dto/Cart/CartForDisplayDto";

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    @ApiOperation({ summary: 'Add a product to the cart' })
    @ApiResponse({ status: 201, description: 'The product has been added to the cart.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async addToCart(@Body() data: AddToCartDto): Promise<CartForDisplayDto> {
        return this.cartService.addToCart(data);
    }

    @Delete('remove')
    @ApiOperation({ summary: 'Remove a product from the cart' })
    @ApiResponse({ status: 200, description: 'The product has been removed from the cart.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async removeFromCart(@Body() data: RemoveFromCartDto): Promise<CartForDisplayDto> {
        return this.cartService.removeFromCart(data);
    }

    @Post('decrease')
    @ApiOperation({ summary: 'Decrease the count of a product in the cart by one' })
    @ApiResponse({ status: 200, description: 'The product count has been decreased by one.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async decreaseCartItem(@Body() data: DecreaseCartItemDto): Promise<CartForDisplayDto> {
        return this.cartService.decreaseCartItem(data);
    }

    @Post('increase')
    @ApiOperation({ summary: 'Increase the count of a product in the cart by one' })
    @ApiResponse({ status: 200, description: 'The product count has been increased by one.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async increaseCartItem(@Body() data: IncreaseCartItemDto): Promise<CartForDisplayDto> {
        return this.cartService.increaseCartItem(data);
    }

    @Get(':userId')
    @ApiOperation({ summary: 'Get the cart for a user' })
    @ApiResponse({ status: 200, description: 'Cart retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Cart not found.' })
    async getCart(@Param('userId') userId: string): Promise<CartForDisplayDto> {
        return this.cartService.getCart(userId);
    }
}