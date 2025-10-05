import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { FaShoppingBag } from "react-icons/fa";


export default function RootLayout() {
  return (
    <>
      <header className='w-full text-white bg-black/90'>
        <nav className='flex items-center py-4 container-xl'>
          <h1 className='mr-auto text-3xl font-bold'>Shopaholic</h1>
            <NavLink className="px-4 py-2 text-lg" to="/">Home</NavLink>
            <NavLink className="px-4 py-2 text-lg" to="shop">Shop</NavLink>
            <NavLink className="px-4 py-2" to="cart">
              <FaShoppingBag size={25} />
            </NavLink>
        </nav>
      </header>

      <main className='mt-8 container-xl'>
        <Outlet />
      </main>
    </>
  )
}
