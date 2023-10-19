import Title from "../../Components/Title/Title";
import Products from "../../Components/Products/Products";
import ProductsBar from "../../Components/ProductsBAR/ProductsBar";
import Model from "../../Components/Model/Model";
import Footer from "../../Components/Footer/Footer";
import { EARPHONES } from "../../Apis";

export default function Earphones() {

    return(
        <div className="earphones">
            <Title name={"Earphones"}/>
            <Products api={EARPHONES}/>
            <ProductsBar />
            <Model />
            <Footer />
        </div>
    )
}