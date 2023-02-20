import { createContext, useContext, useEffect, useReducer } from "react";
import { ADD_TO_CART } from "../actions";
import reducer from "../reducers/cart_reducer";

const getLocalStorage = () => {
    let cart = localStorage.getItem('cart');
    if (cart) {
        return JSON.parse(cart);
    }
    else return [];
}

const initialState = {
    cart: getLocalStorage(),
    total_items: 0,
    total_amount: 0,
    shipping_fee: 534,
};

const CartContext = createContext();

export const CartProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer,initialState);

    const addToCart = (id, color, amount, product) => {
        dispatch({ type:ADD_TO_CART, payload: {id, color, amount, product}});
    }

    const removeItem = (id) => {};

    const toggleAmount = (id, value) => {};

    const clearCart = () => {};

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
    }, [state.cart]);
    

    const values = {...state, addToCart, removeItem, toggleAmount, clearCart};
    
    return (
    <CartContext.Provider value={values}>{children}</CartContext.Provider>
    )
};

export const useCartContext = () => useContext(CartContext);