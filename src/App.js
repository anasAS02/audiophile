import Header from './Components/Header/Header.js';
import Home from './Pages/Home/Home.js';
import Headphones from './Pages/Headphones/Headphones.js';
import Speakers from './Pages/Speakers/Speakers';
import Earphones from './Pages/Earphones/Earphones.js';
import ProductOne from "./Components/Products/showProduct/ProductOne";
import ProductTwo from "./Components/Products/showProduct/ProductTwo";
import ProductThree from "./Components/Products/showProduct/ProductThree";
import ProductFour from "./Components/Products/showProduct/ProductFour";
import ProductFive from "./Components/Products/showProduct/ProductFive";
import ProductSix from "./Components/Products/showProduct/ProductSix";
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import { ReactDOM } from "react";
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/headphones" element={<Headphones />} /> 
        <Route path="/headphones/product1" element={<ProductOne/>} />
        <Route path="/headphones/product2" element={<ProductTwo/>} />
        <Route path="/headphones/product3" element={<ProductThree/>} />
        <Route />
        <Route path="/Speakers" element={<Speakers />} />
        <Route path="/Speakers/product4" element={<ProductFour/>} />
        <Route path="/Speakers/product5" element={<ProductFive/>} />
        <Route />
        <Route path="/Earphones" element={<Earphones />} />
        <Route path="/Earphones/product6" element={<ProductSix/>} />
        <Route />
        <Route path='/Cart' element={<Cart />}/>
        <Route path='/checkout' element={<Checkout />}/>
      </Routes>
    </div>
  );
}

export default App;
