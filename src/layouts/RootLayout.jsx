import { Link, NavLink, Outlet } from 'react-router-dom'
import { FaShoppingBag } from "react-icons/fa";
import { TbNorthStar } from "react-icons/tb";


export default function RootLayout() {
  return (
    <>
      <header className='fixed w-full text-white bg-black/90 z-1'>
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
          <NavLink className="px-4 py-2 text-lg" to="/">Home</NavLink>
          <NavLink className="px-4 py-2 text-lg" to="shop">Shop</NavLink>
          <NavLink className="px-4 py-2" to="cart">
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
