import { createContext, useContext, useEffect, useState } from "react";


const CartContext = createContext();

export default function CartProvider({ children }) {
  const [carts, setCarts] = useState(() => {
    const stored = localStorage.getItem('carts');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('carts', JSON.stringify(carts))
  }, [carts])

  // add cart items
  const addToCart = (product, quantity) => {
    if(!product || !product.id) return;
    if(quantity === 0) {
      alert('Cannot add 0 quantity')
      return;
    }
    alert('Added to cart!')
    setCarts((prev) => {
      const exist = prev.find((item) => item.id === product.id);
      if(exist) {
        return prev.map((item) => {
          return (item.id === product.id) ?
            { ...item, quantity: item.quantity + quantity } :
            item
        });
      } else {
        return [...prev, {...product, quantity}];
      }
    });
  }

  const allQuantity = () => {
    const getQuantity = carts.reduce((total, item) => total += item.quantity, 0);
    return getQuantity;
  }

  return (
    <CartContext.Provider value={{carts, addToCart, allQuantity}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);