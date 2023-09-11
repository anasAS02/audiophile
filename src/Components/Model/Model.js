import "./model.css";
import pic from "./imgs/model.jpg";

export default function Model(){
    return(
        <div className="container">
            <div className="text">
                <h2>BRINGING YOU THE <span>BEST</span> AUDIO GEAR</h2>
                <p>Located at the heart of New York City, Audiophile is the premier store for high end headphones, earphones, speakers, and audio accessories. We have a large showroom and luxury demonstration rooms available for you to browse and experience a wide range of our products. Stop by our store to meet some of the fantastic people who make Audiophile the best place to buy your portable audio equipment.</p>
            </div>
            <div className="img">
                <img src={pic} alt=""></img>
            </div>
        </div>
    );
}