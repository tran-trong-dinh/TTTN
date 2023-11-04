import { Route, Routes } from "react-router-dom";
import Users from "../../Pages/Users";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Products";
import Orders from "../../Pages/Orders";
import Products from "../../Pages/Products";
import Promotions from "../../Pages/Promotions";
import Category from "../../Pages/Category";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/users" element={<Users />}></Route>
      <Route path="/promotions" element={<Promotions />}></Route>
      <Route path="/category" element={<Category />}></Route>
    </Routes>
  );
}
export default AppRoutes;
