import {ProductItem} from "../../entities/ProductItem.ts";

export interface MenuCategoryProps {
    title: string;
    items: ProductItem[];
}