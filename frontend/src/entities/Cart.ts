import {CartItem} from "./CartItem.ts";

export interface Cart {
    id: string;
    userId: string;
    items: CartItem[];
    createdAt: Date;
    updatedAt: Date;
}