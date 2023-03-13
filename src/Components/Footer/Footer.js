import { Link } from "react-router-dom";


import "./footer.css";

export default function Footer(){

    return(
        <div className="footer">
            <div className="head">
              <Link className="logo" to="/">audiophile</Link>
                <div className="links">
                    <Link to="/">Home</Link>
                    <Link to="/Headphones">Headphones</Link>
                    <Link to="/speakers">Speakers</Link>
                    <Link to="/earphones">Earphones</Link>
                </div>
            </div>
            <div className="body">
                <p>Audiophile is an all in one stop to fulfill your audio needs. We're a small team of music <br/>
                     lovers and sound specialists who are devoted to helping you get the most out of <br/>
                     personal audio. Come and visit our demo facility - we're open 7 days a week.</p>
                <span className="icons">
                <Link target="blanck" to="https://www.facebook.com/">
                    <i className="fa-brands fa-square-facebook"></i>
                </Link>
                <Link target="blanck" to="https://www.twitter.com/">
                    <i className="fa-brands fa-twitter"></i>
                </Link>
                <Link target="blanck" to="https://www.instagram.com/">
                    <i className="fa-brands fa-instagram"></i>
                </Link>
                </span>
            </div>
            <p>Copyright 2023. All Rights Reserved</p>
        </div>
    );
}