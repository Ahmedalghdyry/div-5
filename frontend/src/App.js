import NotFound from "Pages/NotFound";
import Home from "./Pages/home/Home";
import Root from "./Pages/Root";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Cart from "Pages/Cart/Cart";
import ProductDetails from "Pages/detaild/Product-details";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<Home />} />
      <Route path="Cart" element={<Cart />} />
      {/* dynamic links لينك بيتغير معيا علي حسب المنتج */}
      <Route path="product-details/:id" element={<ProductDetails />} />

      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
