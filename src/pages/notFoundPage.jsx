import React from 'react'
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='flex flex-col gap-12 items-center justify-center h-[calc(100vh-132px)]'>
      <h1 className='text-4xl font-medium'>404 - Page Not Found</h1>
      <Link className='text-lg underline' to="/">Continue shopping</Link>
    </div>
  )
}
