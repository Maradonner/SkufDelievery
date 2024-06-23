import React from "react";
import {CartItemComponentProps} from "../../models/cart/CartItemComponentProps.ts";
import {truncateString} from "../../utils/truncateString.ts";
import {Icon, MinusIcon} from "../shared/Icon.tsx";

export const CartItem: React.FC<CartItemComponentProps> = ({ item, onIncrease, onDecrease }) => (
    <div className="mb-4 p-4 bg-white rounded-lg shadow">
        <div className="flex items-center justify-between">
            <div className="flex space-x-2">
                <img
                    alt={item.name}
                    className="w-12 h-12 rounded-full"
                    height="50"
                    src={item.imageSrc}
                    style={{
                        aspectRatio: "50/50",
                        objectFit: "cover",
                    }}
                    width="50"
                />
                <div>
                    <div className="font-bold">{truncateString(item.name, 20)}</div>
                    <div className="text-sm text-gray-500">{item.price}₽ - {item.weight} г</div>
                </div>
            </div>
            <div className="flex items-center space-x-4">
                <button className="px-3 py-1" onClick={onDecrease}>
                    <MinusIcon className="w-4 h-4" />
                </button>
                <div className="text-lg font-medium">{item.quantity}</div>
                <button className="px-3 py-1" onClick={onIncrease}>
                    <Icon className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
);