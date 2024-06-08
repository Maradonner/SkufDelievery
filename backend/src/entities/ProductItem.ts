import {MenuCategory} from "./MenuCategory.ts";

export interface ProductItem {
    id: number;
    name: string;
    description: string;
    price: string;
    weight: string;
    imageSrc: string;

    categoryId: number | undefined
    category: MenuCategory | null;

    available: boolean | undefined
}