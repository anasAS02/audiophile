import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    initialState: [],
    name: "cartSlice",
    reducers: {
        addToCart: (state, action) => {
            const findProduct = state.find((products) => products.id == action.payload.id);
            if(findProduct){
                findProduct.quantity += 1;
            }else{
                const productClone = {...action.payload, quantity: 1};
                state.push(productClone);
            }
        },
        deleteFromCart: (state, action) => {
            return state.filter((products) => products.id !== action.payload.id)
        },
    }
})

export const {addToCart, deleteFromCart} = cartSlice.actions;
export default cartSlice.reducer;