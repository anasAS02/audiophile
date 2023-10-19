import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./Slices/cart-slice";

export const store = configureStore({
    reducer: {
        cart: cartSlice,
    }
})