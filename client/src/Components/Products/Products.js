import "./products-style.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Products(props){
const [products, setProducts] = useState([]);
const [isLoading, setIsLoading] = useState(true);

useEffect(() => {
    axios.get(props.api).then((data) => {setProducts(data.data.data.products); setIsLoading(false)})
}, []);

return(
    isLoading ?
    <LoadingSpinner />
    :
    <div className="products">
        {products.map((product, i) => (
            <div key={i} className="product">
                <div className="img">
                    <img src={product.mainImg}></img>
                </div>
                <div className="text">
                    <h2>{product.title}</h2>
                    <p>{product.info}</p>
                    <Link to={`/products/${product._id}`}>See Product</Link>
                </div>
            </div>
        ))}
    </div>
)
}