import { createSlice } from "@reduxjs/toolkit";

const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
const amount = parseFloat(localStorage.getItem('totalAmount')) || 0;

const initialState = {
    cartItems: cartItems,
    amount: amount
};

const handleSaveItem = (cartItems, totalAmount) => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('totalAmount', totalAmount.toString());
};

export const cartSlice = createSlice({
    name: "cartSlice",
    initialState: initialState,
    reducers: {
        addToCart: (state, action) => {
            const findProduct = state.cartItems.find((product) => product._id === action.payload._id);
            if (findProduct) {
                findProduct.quantity += 1;
            } else {
                const productClone = { ...action.payload, quantity: 1 };
                state.cartItems.push(productClone);
            }

            const totalAmount = state.cartItems.reduce((acc, item) => {
                acc += item.price * item.quantity;
                return acc;
            }, 0);

            handleSaveItem(state.cartItems, totalAmount);
        },
        deleteFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((product) => product._id !== action.payload._id);
            
            const totalAmount = state.cartItems.reduce((acc, item) => {
                acc += item.price * item.quantity;
                return acc;
            }, 0);
            handleSaveItem(state.cartItems, totalAmount);
        },
    },
});

export const { addToCart, deleteFromCart } = cartSlice.actions;
export default cartSlice.reducer;
