import { Link, useLoaderData } from 'react-router-dom'
import CutWord from '../../components/CutWord';

export default function Products() {
  const products = useLoaderData();
  console.log(products)

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 mt-6 gap-x-4 gap-y-12'>
      {products.map((product) => (
        <Link
          to={`${product.id}`}
          key={product.id}
          className='py-4 text-lg text-center text-black/90 group'
        >
          <div className='p-12 overflow-hidden border-gray-200 border-6 group-hover:border-blue-300'>
            <img 
              src={product.image} 
              alt={product.titleImage} 
              className='h-[250px] mx-auto group-hover:scale-105 duration-300'
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
      ))}
    </div>
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