import "./products-style.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Products(props){

    const [products, setProducts] = useState([]);

    useEffect(() => {

        fetch(`https://astalaat02.github.io/api/db.json`)
        .then((res) => res.json())
        .then((data) => setProducts(data[props.api]));
            
    }, []);


    return(
        <div className="products">
            {products.map((product, i) => (
                <div key={i} className="product">
                    <div className="img">
                        <img src={product.mainImg}></img>
                    </div>
                    <div className="text">
                        <h2>{product.title}</h2>
                        <p>{product.info}</p>
                        <Link to={`product${product.id}`}>See Product</Link>
                    </div>
                </div>
            ))}
        </div>
    )
}