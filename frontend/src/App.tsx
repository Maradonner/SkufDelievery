import './App.css'
import {Cart} from "./pages/cart/Cart.tsx";
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
            price: 305,
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
            price: 425,
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
            price: 265,
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


function App() {
    return (
        <>
            <OrderCheck orderDetails={sampleOrderDetails}></OrderCheck>
            <Cart></Cart>
            <ShopList></ShopList>
        </>
    )
}

export default App
