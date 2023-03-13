import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteFromCart, addToCart } from "../../rtk/Slices/cart-slice";
import { useSelector, useDispatch } from "react-redux";

import "./cart.css";

export default function Cart(){

  
    const cart = useSelector((state) => state.cart);
  
    const dispatch = useDispatch();
    const totalPrice = cart.reduce((acc, products) => {
        acc += products.price * products.quantity;
        return acc;
    }, 0)

  
    return(
        <>
        {cart.length <= 0 && <h2 className="cart-h2">Your cart is empty</h2>}

        {cart.length > 0 &&
        <>
        <table>
            <thead>
                <tr>
                    <td>Title</td>
                    <td>Price</td>
                    <td>Img</td>
                    <td>Quantity</td>
                    <td>Delete</td>
                </tr>
            </thead>
            <tbody>
                {cart.map((product) => (
                    <tr key={product.id}>
                        <td>{product.title}</td>
                        <td>{totalPrice} $</td>
                        <td><img src={product.mainImg}></img></td>
                        <td>{product.quantity}</td>
                        <td><button onClick={() => dispatch(deleteFromCart(product))}>Delete</button></td>
                    </tr>))
                    }
            </tbody>
            </table>
        <Link className="btn" to="/checkout">Checkout</Link>
    </>
}
        </>
    )
}