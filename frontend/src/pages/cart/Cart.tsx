// Cart.tsx
import React, { useState } from "react";
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import {CartProps} from "../../models/cart/CartProps.ts";
import {CartItemProps} from "../../models/cart/CartItemProps.ts";

export const Cart: React.FC<CartProps> = ({ initialItems, initialTotalCost }) => {
    const [items, setItems] = useState<CartItemProps[]>(initialItems);
    const [totalCost, setTotalCost] = useState<number>(initialTotalCost);

    const handleIncrease = (index: number) => {
        const newItems = [...items];
        newItems[index].quantity += 1;
        setItems(newItems);
        updateTotalCost(newItems);
    };

    const handleDecrease = (index: number) => {
        const newItems = [...items];
        if (newItems[index].quantity > 1) {
            newItems[index].quantity -= 1;
        } else {
            newItems.splice(index, 1);
        }
        setItems(newItems);
        updateTotalCost(newItems);
    };

    const handleClear = () => {
        setItems([]);
        setTotalCost(0);
    };

    const updateTotalCost = (items: CartItemProps[]) => {
        const newTotalCost = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        setTotalCost(newTotalCost);
    };

    return (
        <div key="1" className="bg-[#F8F8F8] p-4 rounded-lg max-w-sm mx-auto">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Корзина</h1>
                <button className="text-sm" onClick={handleClear}>Очистить</button>
            </div>
            <div className="flex justify-between space-x-2 mb-4">
                <button className="flex-1">Доставка</button>
                <button className="flex-1">Самовывоз</button>
            </div>
            {items.map((item, index) => (
                <CartItem
                    key={index}
                    item={item}
                    onIncrease={() => handleIncrease(index)}
                    onDecrease={() => handleDecrease(index)}
                />
            ))}
            <CartSummary deliveryCost={159} totalCost={totalCost} />
            <button
                className={`w-full bg-[#FFD600] text-black font-bold py-3 rounded-lg ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={items.length === 0}
            >
                Верно, о коплате
                <span className="ml-2">{totalCost}₽</span>
            </button>
        </div>
    );
};