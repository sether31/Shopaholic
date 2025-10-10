import { useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom'
import CutWord from '../../components/CutWord';
import { GoSearch } from 'react-icons/go';

export default function Products() {
  const products = useLoaderData();
  const [searchTerm, setSearchTerm] = useState('');
  console.log(products)
  
  const filteredProducts = products.filter(product => (
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  ));



  return (
    <>
       <div className='relative flex gap-2 mt-8 item-center w-max'>
          <label htmlFor="search" className='absolute right-2 top-2'>
            <GoSearch size={20} />
          </label>
          <input
            type="text"
            name="search"
            id="search"
            className="py-1 pl-4 pr-8 border border-gray-200"
            placeholder="Search products..."
            onChange={e => setSearchTerm(e.target.value)}
            value={searchTerm}
          />
       </div>

      <div className='grid grid-cols-1 mt-6 sm:grid-cols-2 xl:grid-cols-3 gap-x-4 gap-y-12'>
        {filteredProducts.length === 0 ? (
          <p className='pt-12 pl-4 text-xl font-semibold'>No products found.</p>
        ) : (
          filteredProducts.map((product) => (
            <Link
              to={`${product.id}`}
              key={product.id}
              className='py-4 text-lg text-center text-black/90 group'
            >
              <div className='p-12 overflow-hidden border-gray-200 border-6 group-hover:border-blue-300'>
                <img 
                  src={product.image} 
                  alt={product.titleImage} 
                  className='h-[250px] mx-auto group-hover:scale-105 duration-300 drop-shadow-lg drop-shadow-black/80'
                />
              </div>
              <h2 className='px-4 font-bold'>
                <CutWord title={product.title} length={35} />
              </h2>
              <p className='font-bold'>&euro;{product.price}</p>
              <p className='text-gray-400 line-through'>
                &euro;{(product.price + (product.price * 0.50)).toFixed(2)}
              </p>
            </Link>
          ))
        )}
        
          
      </div>
    </>
  )
}


export const productsLoader = async () => {
  try {
    const res = await fetch('https://fakestoreapi.com/products');
    return await res.json();
  } catch (error) {
    throw new Response('', {
      status: 500,
      statusText: 'Failed to fetch the products.'
    })
  }
}