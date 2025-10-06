import React from 'react'

export default function ProductDetails() {
  return (
    <div>
      <h1>Product Details</h1>
    </div>
  )
}


export const productDetailsLoader = async ({params}) => {
  try {
    const res = await fetch(`https://fakestoreapi.com/products/${params.id}`);
    const data = await res.json();
    return data;
  } catch (error) {
    throw new Response('Product not found', {
      status: 404,
      statusText: 'Product not found'
    });
  }
}
