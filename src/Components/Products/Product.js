import "./product.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteFromCart, addToCart } from "../../rtk/Slices/cart-slice";
import Model from "../Model/Model";
import ProductsBar from "../ProductsBAR/ProductsBar";
import Footer from "../Footer/Footer";

export default function Product(props){
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const cart = useSelector((state) => state.cart);
    let quantity = 0;
    
    useEffect(() => {
        fetch(`https://anasAS02.github.io/api/db.json`)
            .then((res) => res.json())
            .then((data) => setProducts(data[props.api][props.id]))
    }, []);
    
    for(let i = 0; i < cart.length; i++){
        if(cart[i].id == products.id){
            quantity = cart[i].quantity;
        }
    }

    return(
        <div className="pro">
            <Link className="back" to="/">Go Back</Link>
        <div className="head">
            <div className="image">
                <img src={products.mainImg}></img>
            </div>
            <div className="text">
                <h2>{products.title}</h2>
                <p>{products.info}</p>
                <span>{products.price} $</span>
            <div className="btns">
                <span>
                    <span onClick={() => dispatch(deleteFromCart(products))}>
                    <i className="fa-solid fa-trash"></i>
                    </span>
                    {quantity}
                    <span onClick={() => dispatch(addToCart(products))}>
                    <i className="fa-solid fa-plus"></i>
                    </span>
                </span>
                <button onClick={() => dispatch(addToCart(products))}>Add To Cart</button>
        </div>
            </div>
            </div>
            <div className="info">
                <div className="features">
                    <h2>features</h2>
                    <p>{products.featuresOne}</p>
                    <p>{products.featuresTwo}</p>
                </div>
                <div className="in-the-box">
                    <h2>in the box</h2>
                    <span>
                        x1
                        <p>{products.boxOne}</p>
                    </span>
                    <span>
                        x2
                        <p>{products.boxTwo}</p>
                    </span>
                    <span>
                        x1
                        <p>{products.boxThree}</p>
                    </span>
                    <span>
                        x1
                        <p>{products.boxFour}</p>
                    </span>
                </div>
            </div>
            <div className="images">
                <div className="left">
                    <img src={products.imgTwo}></img>
                    <img src={products.imgThree}></img>
                </div>
                <div className="right">
                    <img src={products.imgFour}></img>
                </div>
            </div>
            <ProductsBar />
            <Model />
            <Footer />
        </div>

    )
}