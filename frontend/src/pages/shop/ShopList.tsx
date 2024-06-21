import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "../shared/Icon";
import { Restaurant } from "../../entities/Restaurant";
import {API} from "../../api";

export const ShopList: React.FC = () => {
    const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const api = new API();

        api.getRestaurants()
            .then((data) => {
                if (Array.isArray(data)) {
                    setRestaurants(data);
                    console.log(data)
                } else {
                    throw new Error("Invalid response format");
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setError("Failed to fetch restaurants.");
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            <main className="container mx-auto px-4 md:px-6 py-8">
                <h2 className="text-2xl font-bold mb-4">Restaurants Near You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {restaurants.map((restaurant) => (
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
