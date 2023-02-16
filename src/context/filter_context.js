import { createContext, useContext, useEffect, useReducer } from "react";
import { useProductsContext } from "./products_context";
import reducer from "../reducers/filter_reducer";
import { LOAD_PRODUCTS, SET_GRIDVIEW, SET_LISTVIEW } from "../actions";

const initialState = {
  filtered_products: [],
  all_products: [],
  grid_view: true,
};

const FilterContext = createContext();

export const FilterProvider = ({ children }) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const setGridView = () => {
    dispatch({type: SET_GRIDVIEW});
  };

  const setListView = () => {
    dispatch({type: SET_LISTVIEW});
  };

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
  }, [products]);

  const values = { ...state, setGridView, setListView};

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
