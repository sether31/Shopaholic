import { Link, useRouteError } from 'react-router-dom';

export default function PageError() {
  const error = useRouteError();
  const status = error?.status || 404;
  const statusText = error?.statusText || "Page not found";
  
  return (
    <div className='flex flex-col items-center justify-center gap-12 h-dvh'>
      <h1 className='text-4xl font-medium'>{status} - {statusText}</h1>
    {
      (statusText === 'Failed to fetch the products.' || status === 500) ? 
        <Link className='text-lg underline' to="/">Go Home</Link> :
        <Link className='text-lg underline' to="/products">Continue shopping</Link>
    }
      
    </div>
  )
}
