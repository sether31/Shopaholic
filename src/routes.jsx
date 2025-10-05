import RootLayout from "./layouts/RootLayout";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home";
import Shop from "./pages/shop";
import Cart from "./pages/cart";
import NotFoundPage from "./pages/NotFoundPage";



export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'shop', element: <Shop /> },
      { path: 'cart', element: <Cart /> },
      { path: '*', element: <NotFoundPage /> }
    ]
  }
]);
