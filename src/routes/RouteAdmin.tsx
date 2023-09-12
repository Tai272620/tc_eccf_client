import Lazy from "@/utils/lazies/Lazy";
import { Route } from "react-router-dom";

export default
    <Route path="/admin" element={Lazy(() => import("@/pages/admins/Admin"))()}>
        <Route path="product" element={Lazy(() => import("@/pages/admins/components/Products/Products"))()}></Route>
        <Route path="product/actions/new" element={Lazy(() => import("@/pages/admins/components/AddProduct/AddProduct"))()}></Route>
        <Route path="category" element={Lazy(() => import("@/pages/admins/components/Categories/Categories"))()}></Route>
        <Route path="category/actions/new" element={Lazy(() => import("@/pages/admins/components/AddCategory/AddCategory"))()}></Route>
        <Route path="order" element={Lazy(() => import("@/pages/admins/components/Orders/Order"))()}></Route>
        <Route path="order/:orderId" element={Lazy(() => import("@/pages/admins/components/OrderDetail/OrderDetail"))()}></Route>
    </Route>
