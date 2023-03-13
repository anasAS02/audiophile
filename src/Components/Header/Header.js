import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import pOne from "../../imgs/1.png";
import pTwo from "../../imgs/2.png";
import pThree from "../../imgs/3.png";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";


export default function Header(){
  
  const [isTheCartActive, setIsTheCartActive] = useState(false);
  
  const activeCart = () => {
    setIsTheCartActive(true);
  }

  
  const cart = useSelector((state) => state.cart);  

  useEffect(() => {
    {cart.length > 0 && setIsTheCartActive(true)}
  }, [cart.length])
  
  
  const [isMenuActive, setIsMenuActive] = useState(false);

  const openNav = () => {
    setIsMenuActive(true);
  }
  
  const closeNav = () => {
    setIsMenuActive(false);
  }

  return (
    <div className="header">
        <div className="logo">

          <span onClick={openNav}>
            <i className="fa-solid fa-bars-staggered open"></i>
          </span>

          <Link to="/">audiophile</Link>
          
          <div id="menu" className={`menu${isMenuActive ? " active" : ""}`}>

          <span className="close" onClick={closeNav}>
          <i className="fa-solid fa-circle-xmark"></i>
          </span>
            <div className="box">
              <img src={pOne} alt=""/>
              <div className="text">
              <p>
              Earphones
                <Link to="/Earphones">Shop
                <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </p>
              </div>
            </div>
            
            <div className="box">
              <img src={pTwo} alt=""/>
              <div className="text">
              <p>
              Headphones
                <Link to="/Headphones">Shop
                <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </p>
              </div>
            </div>
            
            <div className="box">
              <img src={pThree} alt=""/>
              <div className="text">
              <p>
              Speakers
                <Link to="/Speakers">Shop
                <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </p>
              </div>
            </div>
          </div>
        </div>

        <div className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Headphones">Headphones</NavLink>
          <NavLink to="/speakers">Speakers</NavLink>
          <NavLink to="/earphones">Earphones</NavLink>
        </div>

        <div className={`cart${isTheCartActive ? " active" : ""}`}>
          <p>{cart.length}</p>
          <Link to="/Cart"> <i className="fa-solid fa-cart-shopping"></i></Link>
        </div>
    </div>
  );
}