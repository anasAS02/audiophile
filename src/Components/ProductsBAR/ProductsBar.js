import "./products.css";
import img1 from "./imgs/1.png";
import img2 from "./imgs/2.png";
import img3 from "./imgs/3.png";
import { Link } from "react-router-dom";

export default function ProductsBar() {
    return(
        <div className="con">
            <div className="box">
              <img src={img1} alt=""/>
              <div className="text">
              <p>
              Earphones
                <Link to="/Earphones">Shop
                <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </p>
              </div>
            </div>
            
            <div className="box">
              <img src={img2} alt=""/>
              <div className="text">
              <p>
              Headphones
                <Link to="/Headphones">Shop
                <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </p>
              </div>
            </div>
            
            <div className="box">
              <img src={img3} alt=""/>
              <div className="text">
              <p>
              Speakers
                <Link to="/Speakers">Shop
                <i className="fa-solid fa-chevron-right"></i>
                </Link>
              </p>
              </div>
            </div>
        </div>
    )
}