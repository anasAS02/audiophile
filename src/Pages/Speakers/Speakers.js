import Title from "../../Components/Title/Title";
import Products from "../../Components/Products/Products";
import ProductsBar from "../../Components/ProductsBAR/ProductsBar";
import Model from "../../Components/Model/Model";
import Footer from "../../Components/Footer/Footer";

export default function Speakers() {

    return(
        <div className="speakers">
        <Title name={"Speakers"}/>
        <Products api={"speakers"}/>
        <ProductsBar />
        <Model />
        <Footer />
        </div>
    )
}