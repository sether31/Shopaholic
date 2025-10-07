import { Link, NavLink, Outlet } from 'react-router-dom'
import { FaShoppingBag } from "react-icons/fa";
import { TbNorthStar } from "react-icons/tb";
import { useCart } from '../context/CartContext';

export default function RootLayout() {
  const { allQuantity } = useCart();
  return (
    <>
      <header className='fixed w-full text-white bg-black z-1'>
        <nav className='flex items-center py-4 container-xl'>
          {/* logo */}
          <Link 
            to="/"
            className='flex items-center gap-2 mr-auto text-3xl font-bold'
          >
            <TbNorthStar/>
            <span>Shopaholic</span>
          </Link>
          {/* links */}
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
            {(allQuantity() > 0) && (
              <span className='absolute p-1 text-[10px] bg-blue-500 rounded-full top-0 right-2 w-max h-max'>{allQuantity()}</span>
            )}
            <FaShoppingBag size={25} />
          </NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
