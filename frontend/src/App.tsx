import './App.css'
import {ShopList} from "./pages/shop/ShopList.tsx";
import React from "react";
import {Cart} from "./pages/cart/Cart.tsx";


function App() {
    return (
        <>
            <Cart></Cart>
            <ShopList></ShopList>
        </>
    )
}

export default App
