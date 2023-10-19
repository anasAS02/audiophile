import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import pOne from "../../imgs/1.png";
import pTwo from "../../imgs/2.png";
import pThree from "../../imgs/3.png";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useAuth } from "../../Context/AuthContext";
import Cookies from "js-cookie";
import axios from "axios";
import { REFRESH_TOKEN } from "../../Apis";

export default function Header(){
  const role = Cookies.get('role');
  const token = Cookies.get('token');
  const {isLoggedIn, setIsLoggedIn} = useAuth();
  
  const refreshToken = () => {
    axios.post(REFRESH_TOKEN, {token}).then((data) => Cookies.set('token', data.data.token))
  };
  
  useEffect(() => {
    const checkToken = () => {
      if(token){
        setIsLoggedIn(true);
        refreshToken();
      }else{
        setIsLoggedIn(false);
      }
    }
    
    checkToken();
  }, [isLoggedIn, setIsLoggedIn])

  const cart = useSelector((state) => state.cart);  
  const [isMenuActive, setIsMenuActive] = useState(false);
  const [isTheCartActive, setIsTheCartActive] = useState(false);
  const [isListActive, setIsListActive] = useState(false);

  useEffect(() => {
    {cart.length > 0 && setIsTheCartActive(true)}
  }, [cart.length])
  
  const openNav = () => {
    setIsMenuActive(true);
  }
  
  const closeNav = () => {
    setIsMenuActive(false);
  }

  const handleShowList = () => {
    setIsListActive(!isListActive)
  }

  const handleLogout = () => {
    Cookies.remove('token')
    Cookies.remove('email')
    Cookies.remove('role')
    window.location.pathname = '/';
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
          {!isLoggedIn ?
          <Link to="/login"><i className="fa-solid fa-user"></i></Link>
          :
          <Link onClick={handleShowList}> <i className="fa-solid fa-user"></i>
          {isListActive &&
              <div className="list">
                  {role === 'ADMIN' && <Link to="/dashboard">Dashboard</Link>}
                  <Link to="/my-orders">Orders</Link>
                  <Link onClick={handleLogout}>Logout</Link>
              </div>
            }
          </Link>
          }
          <Link to="/Cart"><i className="fa-solid fa-cart-shopping"></i></Link>
          </div>
    </div>
  );
}