import { createContext, useContext, useEffect, useReducer } from "react";
import cartReducer from "../reducers/cartReducer";


const loadCartFromStorage = () => {
  try {
    const stored = localStorage.getItem("carts");
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

const CartContext = createContext();

export default function CartProvider({ children }) {
  const [carts, dispatch] = useReducer(cartReducer, [], loadCartFromStorage);

  useEffect(() => {
    localStorage.setItem('carts', JSON.stringify(carts));
  }, [carts])

  // add cart items
  const addToCart = (product, quantity) => {
    if(!product || !product.id) return;
    if(quantity === 0) {
      alert('Cannot add 0 quantity');
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    alert('Added to cart!');
  }

  // update quantity
  const updateQuantity = (id, quantity) => {
    dispatch({ type: "UPDATE_CART_QUANTITY" , payload: {id, quantity} });
  }

  // remove item
  const removeItem = (id) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: {id} });
  }

  // checkout all
  const checkOut = () => {
    const check = confirm('Are you sure you want to checkout your cart?');
    if(check) {
      alert('Checkout successful')
      dispatch({ type: 'CHECKOUT_CART' });
    }
  }

  // total amount
  const totalAmount = () => {
    return carts.reduce((total, item) => total += (item.price * item.quantity), 0);
  }

  // all items in the cart
  const allItems = () => {
    return carts.length;
  }

  return (
    <CartContext.Provider 
      value={{
        carts, 
        addToCart, 
        allItems, 
        updateQuantity, 
        removeItem, 
        totalAmount, 
        checkOut
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);