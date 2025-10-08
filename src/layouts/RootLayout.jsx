import { Link, NavLink, Outlet } from 'react-router-dom'
import { FaShoppingBag, FaTimes, FaAlignCenter } from "react-icons/fa";
import { TbNorthStar } from "react-icons/tb";
import { useCart } from '../context/CartContext';
import { useState } from 'react';

export default function RootLayout() {
  const [isOpen, setIsOpen] = useState(false)
  const { allItems } = useCart();

  return (
    <>
      <header className='fixed w-full text-white bg-black z-1'>
        <nav className='relative flex items-center py-4 container-xl'>
          {/* logo */}
          <Link 
            to="/"
            className='flex items-center gap-2 mr-auto text-3xl font-bold'
          >
            <TbNorthStar/>
            <span>Shopaholic</span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className='flex sm:hidden'
          >
            {isOpen ? <FaTimes size={24} /> : <FaAlignCenter size={24} />}
          </button>


          {/* desktop nav links */}
          <div className='items-center hidden sm:flex'>
            <NavLink 
              to="/"
              className={({isActive}) => isActive ? "px-4 py-2 text-lg font-bold" : "px-4 py-2 text-lg" } 
            >
              Home
            </NavLink>
            <NavLink 
              to="products"
              className={({isActive}) => isActive ? "px-4 py-2 text-lg font-bold" : "px-4 py-2 text-lg" }
            >
              Shop
            </NavLink>
            <NavLink className="relative px-4 py-2" to="cart">
              {(allItems() > 0) && (
                <span className='absolute p-1 text-[10px] bg-blue-500 rounded-full top-0 right-2 flex items-center justify-center min-w-4 h-4'>
                  {allItems()}
                </span>
              )}
              <FaShoppingBag size={25} />
            </NavLink>
          </div>
        </nav>


        <div className={`
          absolute top-full left-0 text-white bg-black w-full flex flex-col items-start sm:hidden z-10 transition-all duration-500 ease-in-out
          ${isOpen ? 'max-h-[500px] opacity-100 py-4' : 'opacity-0 max-h-0 overflow-hidden py-0'}
        `}>
          <NavLink 
            to="/"
            className={({isActive}) => isActive ? "px-4 py-2 text-lg font-bold" : "px-4 py-2 text-lg" } 
          >
            Home
          </NavLink>
          <NavLink 
            to="products"
            className={({isActive}) => isActive ? "px-4 py-2 text-lg font-bold" : "px-4 py-2 text-lg" }
          >
            Shop
          </NavLink>
          <NavLink className="relative px-4 py-2" to="cart">
            {(allItems() > 0) && (
              <span className='absolute p-1 text-[10px] bg-blue-500 rounded-full top-0 right-2 flex items-center justify-center min-w-4 h-4'>
                {allItems()}
              </span>
            )}
            <FaShoppingBag size={25} />
          </NavLink>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
