import Header from './Components/Header/Header.js';
import Home from './Pages/Home/Home.js';
import Headphones from './Pages/Headphones/Headphones.js';
import Speakers from './Pages/Speakers/Speakers';
import Earphones from './Pages/Earphones/Earphones.js';
import Cart from "./Pages/Cart/Cart";
import Checkout from "./Pages/Checkout/Checkout";
import Signup from './Pages/Auth/Signup/Signup.js';
import Login from './Pages/Auth/Login/Login.js';
import Product from './Components/Products/Product.js';
import Dashboard from './Pages/Dashboard/Dashboard.js';
import { Routes, Route } from 'react-router-dom';
import MyOrders from './Pages/Auth/Orders/MyOrders.js';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/headphones" element={<Headphones />} /> 
        <Route />
        <Route path="/Speakers" element={<Speakers />} />
        <Route />
        <Route path="/Earphones" element={<Earphones />} />
        <Route />
        <Route path='products/:productId' element={<Product />}/>
        <Route path='/Cart' element={<Cart />}/>
        <Route path='/checkout' element={<Checkout />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/dashboard' element={<Dashboard />}/>
        <Route path='/my-orders' element={<MyOrders />}/>
      </Routes>
    </div>
  );
}

export default App;
