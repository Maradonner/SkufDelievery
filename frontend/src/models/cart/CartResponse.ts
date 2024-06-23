import {CartItem} from "../../entities/CartItem.ts";

export interface CartResponse {
    items: CartItem[];
    totalCost: number;
    deliveryCost: number;
    serviceFee: number;
    totalAmount: number;
}