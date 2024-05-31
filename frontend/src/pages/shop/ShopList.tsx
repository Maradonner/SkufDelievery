import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "../shared/Icon.tsx";
import {Restaurant} from "../../entities/Restaurant.ts";

const sampleRestaurants: Restaurant[] = [
    { id: "1", name: "Burger King", rating: 4.5, type: "American, Burgers", status: "Open", imageSrc: "https://generated.vusercontent.net/placeholder.svg" },
    { id: "2", name: "Sushi Samurai", rating: 4.8, type: "Japanese, Sushi", status: "Open", imageSrc: "https://generated.vusercontent.net/placeholder.svg" },
    { id: "3", name: "Pizzeria Napoletana", rating: 4.2, type: "Italian, Pizza", status: "Open", imageSrc: "https://generated.vusercontent.net/placeholder.svg" },
    { id: "4", name: "Pho Saigon", rating: 4.7, type: "Vietnamese, Noodles", status: "Open", imageSrc: "https://generated.vusercontent.net/placeholder.svg" },
    { id: "5", name: "Taco Loco", rating: 4.1, type: "Mexican, Tacos", status: "Closed", imageSrc: "https://generated.vusercontent.net/placeholder.svg" },
    { id: "6", name: "Sichuan Spice", rating: 4.6, type: "Chinese, Sichuan", status: "Open", imageSrc: "https://generated.vusercontent.net/placeholder.svg" },
    { id: "7", name: "Kebab House", rating: 4.3, type: "Middle Eastern, Kebabs", status: "Open", imageSrc: "https://generated.vusercontent.net/placeholder.svg" },
    { id: "8", name: "Sushi Deluxe", rating: 4.9, type: "Japanese, Sushi", status: "Open", imageSrc: "https://generated.vusercontent.net/placeholder.svg" },
];

export const ShopList: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">

            <main className="container mx-auto px-4 md:px-6 py-8">
                <h2 className="text-2xl font-bold mb-4">Restaurants Near You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {sampleRestaurants.map((restaurant) => (
                        <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`} className="block no-underline text-current">
                            <div className="bg-white dark:bg-gray-950 rounded-lg shadow-sm overflow-hidden relative">
                                <div
                                    className={`absolute top-4 left-4 px-2 py-1 rounded-md text-white text-xs font-medium ${
                                        restaurant.status === "Closed" ? "bg-red-500" : "bg-green-500"
                                    }`}
                                >
                                    {restaurant.status}
                                </div>
                                <img
                                    alt={restaurant.name}
                                    className="w-full h-48 object-cover"
                                    height="200"
                                    src={restaurant.imageSrc}
                                    style={{
                                        aspectRatio: "300/200",
                                        objectFit: "cover",
                                    }}
                                    width="300"
                                />
                                <div className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-lg font-bold">{restaurant.name}</h3>
                                        <div className="flex items-center gap-1">
                                            <Icon className="w-5 h-5 fill-primary" />
                                            <span className="text-sm font-medium">{restaurant.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-gray-500 dark:text-gray-400 mb-2">{restaurant.type}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </main>

        </div>
    );
};
