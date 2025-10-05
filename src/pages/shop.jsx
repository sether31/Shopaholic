import { useLoaderData } from 'react-router-dom'

export default function Shop() {
  const products = useLoaderData();
  console.log(products)
  return (
    <div className='pt-28 container-xl'>
      <h1 className='text-4xl'>Shop</h1>
    </div>
  )
}



export const shopLoader = async () => {
  const res = await fetch('https://fakestoreapi.com/products');
  if(!res.ok) throw Error('Fetch Failed');

  return res.json();
}