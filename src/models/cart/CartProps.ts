import {CartItemProps} from "./CartItemProps.ts";

export interface CartProps {
    initialItems: CartItemProps[];
    initialTotalCost: number;
}