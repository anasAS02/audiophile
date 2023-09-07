import { useEffect, useState } from "react";
import { deleteFromCart, addToCart, deleteItem } from "../../rtk/Slices/cart-slice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Model from "../Model/Model";
import ProductsBar from "../ProductsBAR/ProductsBar";
import Footer from "../Footer/Footer";
import "./product.css";

export default function Product(props){

    const [products, setProducts] = useState([]);

    useEffect(() => {
        fetch(`https://anasAS02.github.io/api/db.json`)
            .then((res) => res.json())
            .then((data) => setProducts(data[props.api][props.id]))
    }, []);

    
    const cart = useSelector((state) => state.cart);

    
    const quantity = cart.map((products) => (
        (products.quantity)
    ))

    const dispatch = useDispatch();

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
                        {quantity.slice(-1)}
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