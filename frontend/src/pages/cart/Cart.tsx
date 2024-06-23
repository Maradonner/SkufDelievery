import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate from react-router-dom
import { CartItem } from "./CartItem";
import { CartSummary } from "./CartSummary";
import { CartItemProps } from "../../models/cart/CartItemProps";
import { API } from "../../api";  // Adjust the import path accordingly

const api = new API();

export const Cart: React.FC = () => {
    const [items, setItems] = useState<CartItemProps[]>([]);
    const [totalCost, setTotalCost] = useState<number>(0);
    const [deliveryCost, setDeliveryCost] = useState<number>(0);
    const [serviceFee, setServiceFee] = useState<number>(0);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [address, setAddress] = useState<string>("");
    const navigate = useNavigate();  // Initialize useNavigate

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const cart = await api.getCart();
                setItems(cart.items);
                setTotalCost(cart.totalCost);
                setDeliveryCost(cart.deliveryCost);
                setServiceFee(cart.serviceFee);
                setTotalAmount(cart.totalAmount);
            } catch (error) {
                console.error("Failed to fetch cart:", error);
            }
        };

        fetchCart();
    }, []);

    const handleIncrease = async (index: number) => {
        const productId = items[index].id;

        try {
            const updatedCart = await api.increaseCartItem(productId);
            setItems(updatedCart.items);
            setTotalCost(updatedCart.totalCost);
            setDeliveryCost(updatedCart.deliveryCost);
            setServiceFee(updatedCart.serviceFee);
            setTotalAmount(updatedCart.totalAmount);
        } catch (error) {
            console.error("Failed to increase cart item:", error);
        }
    };

    const handleDecrease = async (index: number) => {
        const productId = items[index].id;

        try {
            const updatedCart = await api.decreaseCartItem(productId);
            setItems(updatedCart.items);
            setTotalCost(updatedCart.totalCost);
            setDeliveryCost(updatedCart.deliveryCost);
            setServiceFee(updatedCart.serviceFee);
            setTotalAmount(updatedCart.totalAmount);
        } catch (error) {
            console.error("Failed to decrease cart item:", error);
        }
    };

    const handleClear = () => {
        setItems([]);
        setTotalCost(0);
        setDeliveryCost(0);
        setServiceFee(0);
        setTotalAmount(0);
    };

    const handlePay = async () => {
        const productItems = items.map(item => ({ productId: item.id, quantity: item.quantity }));

        try {
            const order = await api.createOrder(address, productItems);
            console.log("Order created successfully:", order);
            handleClear();
            navigate(`/order/${order.orderNumber}`, { state: { order } });  // Redirect to order details page with order data
        } catch (error) {
            console.error("Failed to create order:", error);
        }
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
            <CartSummary deliveryCost={deliveryCost} totalCost={totalCost} />
            <button
                className={`w-full bg-[#FFD600] text-black font-bold py-3 rounded-lg ${items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={items.length === 0}
                onClick={handlePay}
            >
                Верно, о коплате
                <span className="ml-2">{totalAmount}₽</span>
            </button>
        </div>
    );
};
