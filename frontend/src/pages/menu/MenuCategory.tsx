import React from "react";
import {MenuCategoryProps} from "../../models/menu/MenuCategoryProps.ts";

export const MenuCategory: React.FC<MenuCategoryProps> = ({ title, items }) => {
    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">{title}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {items.map((item, index) => (
                    <div key={index} className="grid gap-4">
                        <img
                            alt={item.name}
                            className="rounded-lg object-cover w-full aspect-[3/2]"
                            height={200}
                            src={item.imageSrc}
                            width={300}
                        />
                        <div className="grid gap-2">
                            <h3 className="font-semibold text-lg">{item.name}</h3>
                            <p className="text-gray-500 dark:text-gray-400">{item.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="font-semibold">{item.price}</span>
                                <span className="text-gray-500 dark:text-gray-400">{item.weight}</span>
                            </div>
                            <button className="w-full" >
                                Add to Order
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
