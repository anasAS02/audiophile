import "./cart.css";
import { Link } from "react-router-dom";
import { deleteFromCart } from "../../rtk/Slices/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import {useAuth} from '../../Context/AuthContext';

export default function Cart(){
    const {isLoggedIn} = useAuth();
    const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();

return(
    isLoggedIn ?
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
                    <td>{product.price * product.quantity} $</td>
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
    :
    <h2 className="cart-h2">You must be logged in <Link to='/login'>Login now</Link></h2>
)
}