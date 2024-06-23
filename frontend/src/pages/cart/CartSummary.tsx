import React from "react";
import {Icon} from "../shared/Icon.tsx";
import {CartSummaryProps} from "../../models/cart/CartSummaryProps.ts";

export const CartSummary: React.FC<CartSummaryProps> = ({ deliveryCost }) => (
    <div className="flex items-start space-x-2 p-4 bg-white rounded-lg mb-4">
        <Icon className="text-yellow-500 w-6 h-6" />
        <div className="flex-1">
            <div className="font-bold">Доставка {deliveryCost} ₽</div>
        </div>
        <Icon className="text-gray-500 w-4 h-4" />
    </div>
);