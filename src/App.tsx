import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import ViewProduct from "./../src/pages/shop/ViewProduct";
import Cart from "../src/pages/cart/Cart";
import { ShopContextProvider } from "../src/context/ShopContext";
import  Shop  from "../src/pages/shop/Shop";
import NavBar from "./components/NavBar";

const App: React.FC = () => {
  return (
    <ShopContextProvider>
     
      <Router>
      <NavBar/>
      <h1>Charan Shop</h1>
        <Routes>
         
          <Route path="/" element={<Shop />} />
          <Route path="/view-product/:id" element={<ViewProduct />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </Router>
    </ShopContextProvider>
  );
};

export default App;
