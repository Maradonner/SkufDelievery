import {Injectable, NotFoundException} from "@nestjs/common";
import {PrismaService} from "../prisma.service";
import {AddToCartDto} from "../dto/Cart/AddToCartDto";
import {RemoveFromCartDto} from "../dto/Cart/RemoveFromCartDto";
import {DecreaseCartItemDto} from "../dto/Cart/DecreaseCartItemDto";
import {IncreaseCartItemDto} from "../dto/Cart/IncreaseCartItemDto";
import {CartForDisplayDto} from "../dto/Cart/CartForDisplayDto";

@Injectable()
export class CartService {
    constructor(private prisma: PrismaService) {}

    async addToCart(data: AddToCartDto): Promise<CartForDisplayDto> {
        // Check if the product exists
        const product = await this.prisma.productItem.findUnique({
            where: { id: data.productId },
        });

        if (!product) {
            throw new NotFoundException(`Product with ID ${data.productId} not found`);
        }

        // Check if the cart exists for the user, if not create one
        let cart = await this.prisma.cart.findUnique({
            where: { userId: data.userId },
            include: { items: true },
        });

        if (!cart) {
            cart = await this.prisma.cart.create({
                data: {
                    userId: data.userId,
                    items: {
                        create: [{ productId: data.productId, quantity: data.quantity }],
                    },
                },
                include: { items: true },
            });
        } else {
            // Check if the product is already in the cart
            const cartItem = cart.items.find((item) => item.productId === data.productId);
            if (cartItem) {
                // Update quantity
                await this.prisma.cartItem.update({
                    where: { id: cartItem.id },
                    data: { quantity: cartItem.quantity + data.quantity },
                });
            } else {
                // Add new product to the cart
                await this.prisma.cartItem.create({
                    data: {
                        cartId: cart.id,
                        productId: data.productId,
                        quantity: data.quantity,
                    },
                });
            }
        }

        return this.calculateCartForDisplay(cart.id);
    }

    async removeFromCart(data: RemoveFromCartDto): Promise<CartForDisplayDto> {
        // Check if the cart exists for the user
        const cart = await this.prisma.cart.findUnique({
            where: { userId: data.userId },
            include: { items: true },
        });

        if (!cart) {
            throw new NotFoundException(`Cart for user ${data.userId} not found`);
        }

        // Check if the product is in the cart
        const cartItem = cart.items.find((item) => item.productId === data.productId);
        if (!cartItem) {
            throw new NotFoundException(`Product with ID ${data.productId} not found in cart`);
        }

        // Remove the product from the cart
        await this.prisma.cartItem.delete({
            where: { id: cartItem.id },
        });

        return this.calculateCartForDisplay(cart.id);
    }

    async decreaseCartItem(data: DecreaseCartItemDto): Promise<CartForDisplayDto> {
        // Check if the cart exists for the user
        const cart = await this.prisma.cart.findUnique({
            where: { userId: data.userId },
            include: { items: true },
        });

        if (!cart) {
            throw new NotFoundException(`Cart for user ${data.userId} not found`);
        }

        // Check if the product is in the cart
        const cartItem = cart.items.find((item) => item.productId === data.productId);
        if (!cartItem) {
            throw new NotFoundException(`Product with ID ${data.productId} not found in cart`);
        }

        if (cartItem.quantity > 1) {
            // Decrease the product quantity by one
            await this.prisma.cartItem.update({
                where: { id: cartItem.id },
                data: { quantity: cartItem.quantity - 1 },
            });
        } else {
            // If the quantity is 1, remove the item from the cart
            await this.prisma.cartItem.delete({
                where: { id: cartItem.id },
            });
        }

        return this.calculateCartForDisplay(cart.id);
    }

    async increaseCartItem(data: IncreaseCartItemDto): Promise<CartForDisplayDto> {
        // Check if the cart exists for the user
        const cart = await this.prisma.cart.findUnique({
            where: { userId: data.userId },
            include: { items: true },
        });

        if (!cart) {
            throw new NotFoundException(`Cart for user ${data.userId} not found`);
        }

        // Check if the product is in the cart
        const cartItem = cart.items.find((item) => item.productId === data.productId);
        if (!cartItem) {
            throw new NotFoundException(`Product with ID ${data.productId} not found in cart`);
        }

        // Increase the product quantity by one
        await this.prisma.cartItem.update({
            where: { id: cartItem.id },
            data: { quantity: cartItem.quantity + 1 },
        });

        return this.calculateCartForDisplay(cart.id);
    }

    async getCart(userId: string): Promise<CartForDisplayDto> {
        const cart = await this.prisma.cart.findUnique({
            where: { userId },
            include: { items: { include: { product: true } } },
        });

        if (!cart) {
            throw new NotFoundException(`Cart for user ${userId} not found`);
        }

        return this.calculateCartForDisplay(cart.id);
    }

    private async calculateCartForDisplay(cartId: string): Promise<CartForDisplayDto> {
        const cart = await this.prisma.cart.findUnique({
            where: { id: cartId },
            include: { items: { include: { product: true } } },
        });

        const items = cart.items.map((item) => ({
            id: item.product.id,
            name: item.product.name,
            description: item.product.description,
            price: item.product.price,
            weight: item.product.weight,
            imageSrc: item.product.imageSrc,
            quantity: item.quantity,
        }));

        const totalCost = items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
        const deliveryCost = 10.0; // Example fixed delivery cost
        const serviceFee = 5.0; // Example fixed service fee
        const totalAmount = parseFloat((totalCost + deliveryCost + serviceFee).toFixed(2));

        return {
            items,
            totalCost,
            deliveryCost,
            serviceFee,
            totalAmount,
        };
    }
}