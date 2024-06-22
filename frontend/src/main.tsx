import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MenuList} from "./pages/menu/MenuList.tsx";
import ErrorBoundary from "./pages/shared/ErrorBoundary.tsx";


const router = createBrowserRouter([
    {
        path: "/SkufDelievery/",
        element: <App />,
        errorElement: <div>Page not found</div>,
    },
    {
        path: "/SkufDelievery/menu/:restaurantId",
        element: <MenuList />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ErrorBoundary>
            <RouterProvider router={router} />
        </ErrorBoundary>
    </React.StrictMode>,
)