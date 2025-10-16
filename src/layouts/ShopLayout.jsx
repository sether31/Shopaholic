import { Outlet } from "react-router-dom";
import BreadCrumbs from '../components/BreadCrumbs';

function ShopLayout() {
  return (
    <div className='pt-28 container-xl'>
      <h1 className='text-4xl'>Shop</h1>
      <BreadCrumbs />
      <Outlet />
    </div>
  )
}

export default ShopLayout;