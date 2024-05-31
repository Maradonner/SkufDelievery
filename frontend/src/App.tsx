import './App.css'
import {Cart} from "./pages/cart/Cart.tsx";
import {CartItemProps} from "./models/cart/CartItemProps.ts";
import {OrderDetails} from "./entities/OrderDetails.ts";
import {ShopList} from "./pages/shop/ShopList.tsx";
import React from "react";
import {OrderCheck} from "./pages/order/OrderCheck.tsx";


const sampleOrderDetails : OrderDetails = {
    orderNumber: "00000-0000000",
    createdDate: "17 April 2024, 15:02",
    address: "Russia, Moscow, Tsyrk",
    items: [
        {
            id: 0,
            name: "Milkshake",
            price: "305",
            imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            description: '',
            weight: '',
            categoryId: undefined,
            category: null,
            available: undefined
        },
        {
            id: 1,
            name: "Burger with chicken patty",
            price: "425",
            imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            description: '',
            weight: '',
            categoryId: undefined,
            category: null,
            available: undefined
        },
        {
            id: 2,
            name: "Viennese waffles",
            price: "265",
            imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            description: '',
            weight: '',
            categoryId: undefined,
            category: null,
            available: undefined
        }
    ],
    totalCost: 995,
    deliveryCost: 159,
    serviceFee: 49,
    totalAmount: 1203
};

const initialItems: CartItemProps[] = [
    {
        name: 'Салат с пастрами',
        price: 595,
        weight: 290,
        imageSrc: 'https://generated.vusercontent.net/placeholder.svg',
        quantity: 1,
    },
    {
        name: 'Салатик',
        price: 132,
        weight: 123,
        imageSrc: 'https://generated.vusercontent.net/placeholder.svg',
        quantity: 11,
    },
    {
        name: 'Салатик Салатик Салатик Салатик Салатик Салатик Салатик Салатик',
        price: 132,
        weight: 123,
        imageSrc: 'https://generated.vusercontent.net/placeholder.svg',
        quantity: 11,
    },
];

const initialTotalCost = initialItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

function App() {
    return (
        <>
            <OrderCheck orderDetails={sampleOrderDetails}></OrderCheck>
            <Cart initialItems={initialItems} initialTotalCost={initialTotalCost} />
            <ShopList></ShopList>
        </>
    )
}

export default App
