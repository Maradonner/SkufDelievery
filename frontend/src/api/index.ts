import axios, { AxiosInstance } from "axios";
import {Restaurant} from "../entities/Restaurant.ts";
import {MenuCategory} from "../entities/MenuCategory.ts";

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
}

