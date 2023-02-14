import { createContext, useContext, useReducer } from "react";
import { SIDEBAR_CLOSE, SIDEBAR_OPEN, } from "../actions";
import reducer from "../reducers/products_reducer";

const initialState = {
    isSidebarOpen: false,
};

const ProductsContext = createContext();

export const ProductsProvider = ({children}) => {
    
    const [state, dispatch] = useReducer(reducer, initialState);

    const openSidebar = () => dispatch({type: SIDEBAR_OPEN});

    const closeSidebar = () => dispatch({type: SIDEBAR_CLOSE});

    const values = {...state, openSidebar, closeSidebar};
    
    return (
        <ProductsContext.Provider value={values}>{children}</ProductsContext.Provider>
    )
}

export const useProductsContext = () => useContext(ProductsContext);