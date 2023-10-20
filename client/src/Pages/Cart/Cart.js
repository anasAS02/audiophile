import "./cart.css";
import { Link } from "react-router-dom";
import { deleteFromCart } from "../../rtk/Slices/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from '../../Context/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { CREATE_ORDER } from '../../Apis';
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

export default function Cart() {
    const { isLoggedIn } = useAuth();
    const dispatch = useDispatch();

    const [sessionId, setSessionId] = useState(null);
    const items = useSelector((state) => state.cart.cartItems);
    const email = Cookies.get('email');
    const totalAmount = localStorage.getItem('totalAmount');
    const token = Cookies.get('token');
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    }
    const handleCheckout = async () => {

        axios.post(CREATE_ORDER, { items, totalAmount, email }, config)
        .then(async (res) => {
          if (res.status === 200) {
            return res.data;
          } else {
            return Promise.reject(res.data);
          }
        })
          .then(({ url }) => {
            window.location = url;
          })
            .catch((error) => {
                console.error('Error creating Stripe Checkout Session:', error);
            });

        const stripe = await loadStripe(process.env.STRIPE_PUBLISHABLE_KEY);

        if (sessionId) {
            const result = await stripe.redirectToCheckout({ sessionId });
            if (result.error) {
                console.error('Error redirecting to Stripe Checkout:', result.error);
            }
        }
    };

    return (
        isLoggedIn ? (
            <div className="cart-container">
                {items.length === 0 ? (
                    <h2 className="cart-h2">Your cart is empty</h2>
                ) : (
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
                            {items.map((item) => (
                                <tr key={item._id}>
                                    <td>{item.title}</td>
                                    <td>{item.price * item.quantity} $</td>
                                    <td><img src={item.mainImg} alt={item.title} /></td>
                                    <td>{item.quantity}</td>
                                    <td>
                                        <button onClick={() => { dispatch(deleteFromCart(item)); }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                { items.length > 0 &&
                    <button className="btn" onClick={handleCheckout}>
                        Checkout
                    </button>
                }
            </div>
        ) : (
            <h2 className="cart-h2">You must be logged in <Link to='/login'>Login now</Link></h2>
        )
    );
}