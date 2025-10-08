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

  // update quantity
  const updateQuantity = (id, quantity) => {
    setCarts((prev) => {
      if(quantity <= 0){
        return prev.filter(item => item.id !== id)
      } else {
        return prev.map(item => {
          return (item.id === id) ? {...item, quantity} : item
        })
      }
    })
  }

  // remove item
  const removeItem = (id) => {
    setCarts((prev) => {
      return prev.filter(item => item.id !== id);
    })
  }

  // total amount
  const totalAmount = () => {
    const total = carts.reduce((total, item) => total += (item.price * item.quantity), 0)
    return total;
  }

  // checkout all
  const checkOut = () => {
    const check = confirm('Are you sure you want to checkout your cart?');
    if(check) {
      alert('Checkout successful')
      setCarts([]);
    }
  }

  const allQuantity = () => {
    const getQuantity = carts.reduce((total, item) => total += item.quantity, 0);
    return getQuantity;
  }

  return (
    <CartContext.Provider value={{carts, addToCart, allQuantity, updateQuantity, removeItem, totalAmount, checkOut}}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext);