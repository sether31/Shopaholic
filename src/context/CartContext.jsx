import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
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

  // total amount
  const totalAmount = useMemo(() => {
    return carts.reduce((total, item) => total += (item.price * item.quantity), 0);
  }, [carts])

  // all items in the cart
  const allItems = useMemo(() => {
    return carts.length;
  }, [carts])


  // add cart items
  const addToCart = useCallback((product, quantity) => {
    if(!product || !product.id) return;
    if(quantity === 0) {
      alert('Cannot add 0 quantity');
      return;
    }
    dispatch({ type: "ADD_TO_CART", payload: { product, quantity } });
    alert('Added to cart!');
  }, [dispatch])

  // update quantity
  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: "UPDATE_CART_QUANTITY" , payload: {id, quantity} });
  }, [dispatch])

  // remove item
  const removeItem = useCallback((id) => {
    dispatch({ type: "REMOVE_CART_ITEM", payload: {id} });
  }, [dispatch])

  // checkout all
  const checkOut = useCallback(() => {
    const check = confirm('Are you sure you want to checkout your cart?');
    if(check) {
      alert('Checkout successful')
      dispatch({ type: 'CHECKOUT_CART' });
    }
  }, [dispatch])

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