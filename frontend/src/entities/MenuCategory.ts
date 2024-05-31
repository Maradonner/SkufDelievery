import {ProductItem} from "./ProductItem.ts";

export interface MenuCategory {
    id: number;
    title: string;
    items: ProductItem[];
}