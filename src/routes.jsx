import RootLayout from "./layouts/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Cart from "./pages/cart";
import PageError from "./pages/pageError";
import ShopLayout from "./layouts/ShopLayout";
import Products, { productsLoader } from "./pages/shop/products";
import ProductDetails, { productDetailsLoader } from "./pages/shop/productDetails";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { 
        path: 'products', 
        element: <ShopLayout />, 
        errorElement: <PageError />,
        children: [
          { index: true, element: <Products />, loader: productsLoader},
          { path: ":id", element: <ProductDetails />, loader: productDetailsLoader}
        ]
      },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <PageError /> }
    ]
  }
]);
