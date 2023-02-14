import { createContext, useContext, useEffect, useReducer } from "react";
import {
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
} from "../actions";
import reducer from "../reducers/products_reducer";
import axios from "axios";
import { products_url as url } from "../utils/constants";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
};

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => dispatch({ type: SIDEBAR_OPEN });

  const closeSidebar = () => dispatch({ type: SIDEBAR_CLOSE });

  const fetchProducts = async (url) => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const res = await axios.get(url);
      const products = res.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products});
    } catch (error) {
      dispatch({type: GET_PRODUCTS_ERROR});
    }
  };

  useEffect(() => {
    fetchProducts(url);
  }, []);

  const values = { ...state, openSidebar, closeSidebar };

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
