import { createContext, useReducer } from "react";
export const ProductContext = createContext({} as any);

const initialState = {
  products: [],
  isLoading: false,
  error: "",
};

const productReducer = (state: any, action: any) => {
  switch (action.type) {
    case "GET":
      return {
        ...state,
        products: action.payload,
      };
    case "ADD":
      return {
        ...state,
        products: [...state.products, action.payload],
      };
    case "PUT":
      return {
        ...state,
        products: state.products.map((item: any) =>
          item.id == action.payload.id ? action.payload : item
        ),
      };
    case "REMOVE":
      return {
        ...state,
        products: state.products.filter(
          (item: any) => item.id != state.products.id
        ),
      };
    default:
      return state;
  }
};

const ProductProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  return (
    <ProductContext.Provider value={[ state, dispatch ]}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductProvider;
