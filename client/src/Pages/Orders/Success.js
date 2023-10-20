import './Success.css';
import axios from "axios";
import { SAVE_ORDER } from "../../Apis";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { useEffect, useRef } from 'react';

export default function Success(){
    const email = Cookies.get('email');
    const token = Cookies.get('token');
    const totalAmount = localStorage.getItem('totalAmount');
    const items = useSelector((state) => state.cart.cartItems);
    const shouldSave = useRef(true);
    
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const saveOrder = () => {
        axios.post(SAVE_ORDER, {items, email, totalAmount}, config);
            setTimeout(() => {
                window.location.pathname = '/my-orders';
                localStorage.removeItem('cartItems');
                localStorage.removeItem('totalAmount');
            }, 3000)
    }

    useEffect(() => {
        if(shouldSave.current){
            shouldSave.current = false;
            saveOrder();
        }
    }, [])

    return(
        items.length > 0 &&
        <div className='success'>
            <div className="head">
                <i className="fa-solid fa-circle-check"></i>
                <p>Thank You <br/>
                    For Your Order
                </p>
            </div>
        <div className="body">
        <div className="order">
        {items.map((item, i) => (
            <div key={i}>
                <div className="info">
                    <img src={item.mainImg}></img>
                    <span>
                        {item.title}
                        <p>
                        {item.price} $ per one
                        </p>
                        <p>
                        Quantity: {item.quantity}
                        </p>
                    </span>
                </div>
            </div>
        ))}
                    <span className="grand-total">
                            Grand Total
                        <p>
                        {totalAmount} $
                        </p>
                    </span>
                    </div>
                </div>
        </div>
        )
}