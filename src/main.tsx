import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ShopList} from "./pages/shop/ShopList.tsx";
import {MenuList} from "./pages/menu/MenuList.tsx";

const categories = [
    {
        title: "Burgers",
        items: [
            {
                name: "Cheeseburger",
                description: "Beef patty, cheddar cheese, lettuce, tomato, onion, pickles.",
                price: "$8.99",
                weight: "6 oz",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Bacon Cheeseburger",
                description: "Beef patty, cheddar cheese, bacon, lettuce, tomato, onion.",
                price: "$9.99",
                weight: "7 oz",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Veggie Burger",
                description: "Vegetable patty, lettuce, tomato, onion, pickles.",
                price: "$7.99",
                weight: "5 oz",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
        ],
    },
    {
        title: "Hot Dogs",
        items: [
            {
                name: "Classic Hot Dog",
                description: "All-beef hot dog, ketchup, mustard, relish.",
                price: "$4.99",
                weight: "4 oz",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Chili Cheese Dog",
                description: "All-beef hot dog, chili, cheddar cheese, onions.",
                price: "$5.99",
                weight: "5 oz",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Slaw Dog",
                description: "All-beef hot dog, coleslaw, barbecue sauce.",
                price: "$5.49",
                weight: "5 oz",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
        ],
    },
    {
        title: "Sides",
        items: [
            {
                name: "French Fries",
                description: "Crispy golden fries.",
                price: "$3.99",
                weight: "Small",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Onion Rings",
                description: "Crispy breaded onion rings.",
                price: "$4.49",
                weight: "Small",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Mozzarella Sticks",
                description: "Breaded and fried mozzarella cheese.",
                price: "$5.99",
                weight: "6 pc",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Mozzarella Sticks",
                description: "Breaded and fried mozzarella cheese.",
                price: "$5.99",
                weight: "6 pc",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Mozzarella Sticks",
                description: "Breaded and fried mozzarella cheese.",
                price: "$5.99",
                weight: "6 pc",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Mozzarella Sticks",
                description: "Breaded and fried mozzarella cheese.",
                price: "$5.99",
                weight: "6 pc",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Mozzarella Sticks",
                description: "Breaded and fried mozzarella cheese.",
                price: "$5.99",
                weight: "6 pc",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
        ],
    },
    {
        title: "Drinks",
        items: [
            {
                name: "Soft Drink",
                description: "Coke, Sprite, or Dr. Pepper.",
                price: "$2.49",
                weight: "16 oz",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Iced Tea",
                description: "Freshly brewed and served over ice.",
                price: "$2.79",
                weight: "16 oz",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
            {
                name: "Milkshake",
                description: "Vanilla, chocolate, or strawberry.",
                price: "$4.99",
                weight: "16 oz",
                imageSrc: "https://generated.vusercontent.net/placeholder.svg",
            },
        ],
    },
];

const router = createBrowserRouter([
    {
        path: "/",
        element: <div><App/></div>
    },
    {
        path: "/menu",
        element: <div><MenuList categories={categories}/></div>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
