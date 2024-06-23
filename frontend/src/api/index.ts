import axios, { AxiosInstance } from "axios";
import {Restaurant} from "../entities/Restaurant.ts";
import {MenuCategory} from "../entities/MenuCategory.ts";
import {CartResponse} from "../models/cart/CartResponse.ts";
import {OrderDetails} from "../entities/OrderDetails.ts";

const baseURL = import.meta.env.VITE_BACKEND_URL;
console.log('Backend URL:', baseURL);


export class API {
    client: AxiosInstance;
    url: string;

    constructor() {
        this.url = baseURL;

        this.client = axios.create({
            baseURL: this.url,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
    }

    async getRestaurants(): Promise<Restaurant[]> {
        return this.client
            .get<Restaurant[]>(`/restaurants`)
            .then((res) => res.data);
    }

    async getMenuCategory(restrauntId: string): Promise<MenuCategory[]> {
        return this.client
            .get<MenuCategory[]>(`/menu-categories/restaurant/${restrauntId}`)
            .then((res) => res.data);
    }

    async getCart(): Promise<CartResponse> {
        return this.client
            .get<CartResponse>(`/cart/`)
            .then((res) => res.data);
    }

    async decreaseCartItem(productId: number): Promise<CartResponse> {
        return this.client
            .post<CartResponse>(`/cart/decrease`, { productId })
            .then((res) => res.data);
    }

    async increaseCartItem(productId: number): Promise<CartResponse> {
        return this.client
            .post<CartResponse>(`/cart/increase`, { productId })
            .then((res) => res.data);
    }

    async addToCart(productId: number, quantity: number): Promise<void> {
        return this.client
            .post<void>(`/cart/add`, { productId, quantity })
            .then((res) => res.data);
    }

    async createOrder(address: string, productItems: { productId: number; quantity: number }[]): Promise<OrderDetails> {
        return this.client
            .post<OrderDetails>(`/orders`, { address, productItems })
            .then((res) => res.data);
    }

    async getOrderDetails(orderNumber: string): Promise<OrderDetails> {
        return this.client
            .get<OrderDetails>(`/orders/${orderNumber}`)
            .then((res) => res.data);
    }

    async confirmOrder(orderNumber: string): Promise<void> {
        return this.client
            .post<void>(`/orders/${orderNumber}/confirm`)
            .then((res) => res.data);
    }

    async declineOrder(orderNumber: string): Promise<void> {
        return this.client
            .post<void>(`/orders/${orderNumber}/decline`)
            .then((res) => res.data);
    }
}

