import React from 'react'

export default function cartReducer(state, action) {
  switch(action.type) {
    case 'ADD_TO_CART': {
      const { product, quantity } = action.payload;
      const exist = state.find((item) => item.id === product.id);
      
      if(exist) {
        return state.map((item) => {
          return (item.id === product.id) ?
            { ...item, quantity: item.quantity + quantity } :
            item
        });
      } else {
        return [...state, {...product, quantity}];
      }
    }

    case 'UPDATE_CART_QUANTITY': {
      const { id, quantity } = action.payload;

      if(quantity <= 0){
        return state.filter(item => item.id !== id)
      } else {
        return state.map(item => {
          return (item.id === id) ? {...item, quantity} : item
        })
      }
    }

    case 'REMOVE_CART_ITEM': {
      const { id } = action.payload; 
      return state.filter(item => item.id !== id);
    }

    case 'TOTAL_ITEM_AMOUNT': 
      return state.reduce((total, item) => total += (item.price * item.quantity), 0)
    
    case 'CHECKOUT_CART':
      return [];

    case 'GET_ALL_ITEMS':
      return state.length;

    default:
      return state;
  }
}
