import { BrowserRouter, Routes, Route } from "react-router-dom";

/* Lazy Function */
import Lazy from '@utils/lazies/Lazy';

/* Components */
import Home from '@pages/homes/Home';

/* Route Setup */
import RouteProduct from "./RouteProduct";
import RouteUser from "./RouteUser";
import RouteAdmin from "./RouteAdmin";
import HomeLayout from "@/pages/homes/components/HomeLayouts/HomeLayout";

export default function RouteSetup() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Home - Navbar + Footer */}
        <Route path="/" element={<Home></Home>}>
          <Route index element={<HomeLayout />}></Route>
          <Route path="about" element={Lazy(() => import("@components/Test"))()}></Route>
          <Route path="infor" element={<>Thông Tin</>}></Route>
          {/* {RouteProduct} */}
          {RouteProduct}
          {/* {Route User} */}
          {RouteUser}
        </Route>
        <Route path="/checkout" element={Lazy(() => import("@pages/checkouts/Checkout"))()}></Route>
        <Route path="/thanks" element={Lazy(() => import("@pages/checkouts/Thanks"))()}></Route>
        {/* {Route Admin} */}
        {RouteAdmin}
      </Routes>
    </BrowserRouter>
  )
}
