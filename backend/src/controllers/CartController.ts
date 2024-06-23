import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Body, Controller, Delete, Get, NotFoundException, Post, Req} from "@nestjs/common";
import {CartService} from "../services/CartService";
import {AddToCartDto} from "../dto/Cart/AddToCartDto";
import {RemoveFromCartDto} from "../dto/Cart/RemoveFromCartDto";
import {DecreaseCartItemDto} from "../dto/Cart/DecreaseCartItemDto";
import {IncreaseCartItemDto} from "../dto/Cart/IncreaseCartItemDto";
import {CartForDisplayDto} from "../dto/Cart/CartForDisplayDto";
import { Request } from 'express';


@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) {}

    @Post('add')
    @ApiOperation({ summary: 'Add a product to the cart' })
    @ApiResponse({ status: 201, description: 'The product has been added to the cart.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async addToCart(@Req() req: Request, @Body() data: AddToCartDto): Promise<CartForDisplayDto> {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.cartService.addToCart(userId, data);
    }

    @Delete('remove')
    @ApiOperation({ summary: 'Remove a product from the cart' })
    @ApiResponse({ status: 200, description: 'The product has been removed from the cart.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async removeFromCart(@Req() req: Request, @Body() data: RemoveFromCartDto): Promise<CartForDisplayDto> {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.cartService.removeFromCart(userId, data);
    }

    @Post('decrease')
    @ApiOperation({ summary: 'Decrease the count of a product in the cart by one' })
    @ApiResponse({ status: 200, description: 'The product count has been decreased by one.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async decreaseCartItem(@Req() req: Request, @Body() data: DecreaseCartItemDto): Promise<CartForDisplayDto> {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.cartService.decreaseCartItem(userId, data);
    }

    @Post('increase')
    @ApiOperation({ summary: 'Increase the count of a product in the cart by one' })
    @ApiResponse({ status: 200, description: 'The product count has been increased by one.' })
    @ApiResponse({ status: 404, description: 'Product or cart not found.' })
    async increaseCartItem(@Req() req: Request, @Body() data: IncreaseCartItemDto): Promise<CartForDisplayDto> {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.cartService.increaseCartItem(userId, data);
    }

    @Get()
    @ApiOperation({ summary: 'Get the cart for a user' })
    @ApiResponse({ status: 200, description: 'Cart retrieved successfully.' })
    @ApiResponse({ status: 404, description: 'Cart not found.' })
    async getCart(@Req() req: Request): Promise<CartForDisplayDto> {
        const userId = req.session.userId;
        if (!userId) {
            throw new NotFoundException('User not found in session');
        }
        return this.cartService.getCart(userId);
    }
}