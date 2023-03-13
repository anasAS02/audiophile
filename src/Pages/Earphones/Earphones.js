import Title from "../../Components/Title/Title";
import Products from "../../Components/Products/Products";
import ProductsBar from "../../Components/ProductsBAR/ProductsBar";
import Model from "../../Components/Model/Model";
import Footer from "../../Components/Footer/Footer";

export default function Earphones() {

    return(
        <div className="earphones">
            <Title name={"Earphones"}/>
            <Products api={"earphones"}/>
            <ProductsBar />
            <Model />
            <Footer />
        </div>
    )
}