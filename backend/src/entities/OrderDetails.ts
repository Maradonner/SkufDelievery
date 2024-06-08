import {ProductItem} from "./ProductItem";

export interface OrderDetails {
    orderNumber: string;
    createdDate: string;
    address: string;
    items: ProductItem[];
    totalCost: number;
    deliveryCost: number;
    serviceFee: number;
    totalAmount: number;
}