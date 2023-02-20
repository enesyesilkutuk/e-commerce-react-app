import { createContext, useContext, useEffect, useReducer } from "react";
import { ADD_TO_CART, CLEAR_CART, COUNT_CART_TOTALS, REMOVE_CART_ITEM, TOGGLE_CART_ITEM_AMOUNT } from "../actions";
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
    };

    const removeItem = (id) => {
        dispatch({type: REMOVE_CART_ITEM, payload: id});
    };

    const toggleAmount = (id, value) => {
        dispatch({type: TOGGLE_CART_ITEM_AMOUNT, payload: {id, value}});
    };

    const clearCart = () => {
        dispatch({type: CLEAR_CART});
    };

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(state.cart));
        dispatch({type: COUNT_CART_TOTALS});
    }, [state.cart]);
    

    const values = {...state, addToCart, removeItem, toggleAmount, clearCart};
    
    return (
    <CartContext.Provider value={values}>{children}</CartContext.Provider>
    )
};

export const useCartContext = () => useContext(CartContext);