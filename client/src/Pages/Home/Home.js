import "./Home.css";
import Landing from "../../imgs/landing.jpg";
import Model from "../../Components/Model/Model";
import ProductsBar from "../../Components/ProductsBAR/ProductsBar";
import Footer from "../../Components/Footer/Footer";

import { Link } from "react-router-dom";

export default function Home(){
    return(
        <div className="all">
        <div className="home">
            <div className="text">
                <h2>new product</h2>
                <h1>XX99 MARK II <br/> HEADPHONES</h1>
                <p>Experience natural, life like audio and exceptional build quality made for the passionate music enthusiast.</p>
                <Link to="products/652e48e13e62e35a985d0f49">See Product</Link>
            </div>
            <div className="img">
                <img src={Landing} alt=""/>
            </div>
        </div>
            <ProductsBar />
            <div className="products-container">
                <div className="box b-1">
                    <img src={require("./imgs/1.png")} alt=""/>
                    <div className="text">
                        <h1>ZX9 <br/>SPEAKER</h1>
                        <p>Upgrade to premium speakers that are <br/>phenomenally built to deliver truly remarkable <br/>sound.</p>
                        <Link to="/products/652e49123e62e35a985d0f4d">see product</Link>
                    </div>
                </div>
                <div className="box b-2">
                    <img src={require("./imgs/2.jpg")} alt=""/>
                    <div className="text">
                        <p>ZX7 SPEAKER</p>
                        <Link to="/products/652e48ff3e62e35a985d0f4b">see product</Link>
                    </div>
                </div>
                <div className="box b-3">
                    <img src={require("./imgs/3.jpg")} alt=""/>
                    <div className="text">
                        <p>YX1 EARPHONES</p>
                        <Link to="/products/652e49263e62e35a985d0f4f">see product</Link>
                    </div>
                </div>
            </div>
            <Model />
            <Footer />
        </div>
    );
}