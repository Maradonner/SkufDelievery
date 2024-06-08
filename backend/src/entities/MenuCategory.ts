import {ProductItem} from "./ProductItem";

export interface MenuCategory {
    id: number;
    title: string;
    items: ProductItem[];
}