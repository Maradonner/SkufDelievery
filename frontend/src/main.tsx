import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {MenuList} from "./pages/menu/MenuList.tsx";


const router = createBrowserRouter([
    {
        path: "/",
        element: <div><App/></div>
    },
    {
        path: "/menu/:restaurantId",
        element: <div><MenuList/></div>
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router}/>
    </React.StrictMode>,
)
