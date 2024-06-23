import {ProductItem} from "./ProductItem.ts";

export interface CartItem {
    id: number;
    cartId: string;
    productId: number;
    quantity: number;
    product: ProductItem;
}