import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MenuList} from "./pages/menu/MenuList.tsx";
import ErrorBoundary from "./pages/shared/ErrorBoundary.tsx";
import {OrderCheck} from "./pages/order/OrderCheck.tsx";
import {Cart} from "./pages/cart/Cart.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <div>Page not found</div>,
    },
    {
        path: "/menu/:restaurantId",
        element: <MenuList />,
    },
    {
        path: "/order/:orderNumber",
        element: <OrderCheck  />,
    },
    {
        path: "/cart",
        element: <Cart  />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    </React.StrictMode>,
)