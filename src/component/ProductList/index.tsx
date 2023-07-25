import { useContext, useEffect } from "react";
import { ProductContext } from "../../context/productContext";
import axios from "axios";

const ProductList = () => {
  const [state, dispatch] = useContext(ProductContext);
  console.log(state);

  //getAll
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/products`);
        dispatch({ type: "GET", payload: data });
      } catch (error) {}
    };
    fetchProduct();
  }, []);

  //Add
  const addProduct = async (product: any) => {
    try {
      // call api
      const { data } = await axios.post(
        `http://localhost:3000/products/`,
        product
      );
      // rerender
      dispatch({ type: "ADD", payload: data });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //PUT
  const editProduct = async (product: any) => {
    try {
      const { data } = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        product
      );
      dispatch({ type: "PUT", payload: data });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  //DELETE
  const deleteProduct = async (product: any) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:3000/products/${product.id}`
      );
      dispatch({ type: "REMOVE", payload: data });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <button
        className="text-black"
        onClick={() => addProduct({ name: "Test C" })}
      >
        Add
      </button>
      {state?.products?.map((item: any) => (
        <div key={item.id} className="flex">
          <h4>{item.name}</h4>
          <button
            className="text-green-500"
            onClick={() => editProduct({ id: item.id, name: "Update Product" })}
          >
            Edit
          </button>
          <button
            className="text-red-500"
            onClick={() => deleteProduct({ id: item.id })}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
