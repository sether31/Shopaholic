import { useLoaderData } from 'react-router-dom';
import RateStar from '../../components/RateStar';
import Capitalize from '../../components/Capitalize';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';

export default function ProductDetails() {
  const product =  useLoaderData();
  const [quantity, setQuantity] = useState("1");
  const { addToCart } = useCart();

  const changeQuantity = (value) => {
    setQuantity(Number(value));
  }
  
  const minusQuantity = () => {
     const quant = Number(quantity);
    if(quant === 1) return;
      
    if(quant > 0) {
      setQuantity(String(quant - 1));
    }
  }

  const addQuantity = () => {
    const quant = Number(quantity)
    setQuantity(String(quant + 1))
  }
  
  return (
    <div>
      <div className='grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] my-10 gap-12 p-4'>
        <div className='group'>
          <img 
            src={product.image} 
            alt={product.title}
            className='object-contain h-[400px] duration-500 mx-auto group-hover:scale-105 drop-shadow-lg drop-shadow-black/80' 
          />
        </div>
        <div className='text-gray-800 text:md md:text-lg'>
          <h1 className='text-xl md:text-3xl font-medium text-[#2C3749]'>{product.title}</h1>
          <div className='mt-2 mb-4 text-xl font-medium flex gap-4'>
            <p>&euro;{product.price}</p>
            <p className='text-gray-400 line-through'>
              &euro;{(product.price + (product.price * 0.50)).toFixed(2)}
            </p>
          </div>

          <span className='block w-full h-[2px] bg-gray-300'></span>

          <p className='mt-6 mb-4'>{product.description}</p>
          <p>
            <span className='font-medium'>Category:</span> <Capitalize word={product.category} />
          </p>
          <div className='my-1'>
            <span className='font-medium'>Rating:</span> {' '}
            <RateStar rating={product.rating.rate} count={product.rating.count} />
          </div>

          {/* QUANTITY */}
          <p className='mb-1 font-medium'>Quantity</p>
          <div className='flex gap-1'>
            <button 
              onClick={minusQuantity}
              disabled={quantity === 1}
              className='p-2 bg-gray-200 cursor-pointer'
            >
              -
            </button>
            <input 
              type="number"
              value={quantity}
              onChange={(e) => changeQuantity(e.target.value)}
              className='px-2 text-md font-medium border-2 border-gray-400 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none w-15 focus:outline-gray-700' 
            />
            <button 
              onClick={addQuantity}
              className='p-2 bg-gray-200 cursor-pointer'
            >+
            </button>
          </div>

          {/* ADD TO CART */}
          <button 
            onClick={() => {
              addToCart(product, Number(quantity));
              setQuantity(1);
            }}
            className='w-full py-2 mt-8 text-center text-blue-500 duration-300 border border-blue-500 rounded-lg cursor-pointer hover:text-white hover:bg-blue-500'
          >
            Add to cart
          </button>
        </div>
      </div>
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
