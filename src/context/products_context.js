import { createContext, useContext, useEffect, useReducer } from "react";
import {
  SIDEBAR_CLOSE,
  SIDEBAR_OPEN,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";
import reducer from "../reducers/products_reducer";
import axios from "axios";
import { products_url } from "../utils/constants";

const initialState = {
  isSidebarOpen: false,
  products_loading: false,
  products_error: false,
  products: [],
  featured_products: [],
  single_product_loading: false,
  single_product_error: false,
  single_product: {},
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

  const fetchSingleProduct = async (url) => {
    dispatch({type: GET_SINGLE_PRODUCT_BEGIN});
    try {
      const res = await axios.get(url);
      const single_product = res.data;
      dispatch({type: GET_SINGLE_PRODUCT_SUCCESS, payload: single_product});
    } catch (error) {
      dispatch({type: GET_SINGLE_PRODUCT_ERROR});
    }
  }

  useEffect(() => {
    fetchProducts(products_url);
  }, []);

  const values = { ...state, openSidebar, closeSidebar, fetchSingleProduct };

  return (
    <ProductsContext.Provider value={values}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProductsContext = () => useContext(ProductsContext);
