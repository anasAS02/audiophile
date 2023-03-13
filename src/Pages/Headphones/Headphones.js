import Title from "../../Components/Title/Title";
import Products from "../../Components/Products/Products";
import ProductsBar from "../../Components/ProductsBAR/ProductsBar";
import Model from "../../Components/Model/Model";
import Footer from "../../Components/Footer/Footer";

export default function Headphones() {

    return(
        <div className="headphones">
        <Title name={"Headphones"}/>
        <Products api={"headphones"} />
        <ProductsBar />
        <Model />
        <Footer />
        </div>
    )
}