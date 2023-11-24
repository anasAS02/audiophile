import "./product.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, addToCart } from "../../rtk/Slices/cart-slice";
import Model from "../Model/Model";
import ProductsBar from "../ProductsBAR/ProductsBar";
import Footer from "../Footer/Footer";
import axios from 'axios';
import { GET_PRODUCT } from "../../Apis";
import { useParams } from 'react-router-dom';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Product(){
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    let quantity = 0;

    useEffect(() => {
        axios.get(GET_PRODUCT + productId).then((data) => {setProduct(data.data.data); setIsLoading(false)});
    }, [productId]);
    
    for(let i = 0; i < cartItems.length; i++){
        if(cartItems[i]._id == product._id){
            quantity = cartItems[i].quantity;
        }
    }
    return(
        isLoading
        ?
        <LoadingSpinner />
        :
        <div className="pro">
            <Link className="back" to="/">Go Back</Link>
        <div className="head">
            <div className="image">
                <img src={product.mainImg}></img>
            </div>
            <div className="text">
                <h2>{product.title}</h2>
                <p>{product.info}</p>
                <span>{product.price} $</span>
            <div className="btns">
                <span>
                    <span onClick={() => dispatch(deleteFromCart(product))}>
                    <i className="fa-solid fa-trash"></i>
                    </span>
                    {quantity}
                    <span onClick={() => dispatch(addToCart(product))}>
                    <i className="fa-solid fa-plus"></i>
                    </span>
                </span>
                <button onClick={() => dispatch(addToCart(product))}>Add To Cart</button>
        </div>
            </div>
            </div>
            <div className="info">
                <div className="features">
                    <h2>features</h2>
                    <p>{product.featuresOne}</p>
                    <p>{product.featuresTwo}</p>
                </div>
                <div className="in-the-box">
                    <h2>in the box</h2>
                    <span>
                        x1
                        <p>{product.boxOne}</p>
                    </span>
                    <span>
                        x2
                        <p>{product.boxTwo}</p>
                    </span>
                    <span>
                        x1
                        <p>{product.boxThree}</p>
                    </span>
                    <span>
                        x1
                        <p>{product.boxFour}</p>
                    </span>
                </div>
            </div>
            <div className="images">
                <div className="left">
                    <img src={product.imgTwo}></img>
                    <img src={product.imgThree}></img>
                </div>
                <div className="right">
                    <img src={product.imgFour}></img>
                </div>
            </div>
            <ProductsBar />
            <Model />
            <Footer />
        </div>

    )
}