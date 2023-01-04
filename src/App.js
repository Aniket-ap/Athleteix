import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Component
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Menu from "./components/nav/Menu";
import Dashboard from "./pages/user/Dashboard";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminCategory from "./pages/admin/Category";
import AdminProduct from "./pages/admin/Product";
import PrivateRoute from "./components/routes/PrivateRoute";
import AdminRoute from "./components/routes/AdminRoute";
import AdminProducts from "./pages/admin/Products";
import ProductUpdate from "./pages/admin/ProductUpdate";
import Shop from "./pages/Shop";
import Search from "./pages/Search";
import ProductView from "./pages/ProductView";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/admin/Orders";


const PageNotFound = () => {
  return(
    <>
      <h1>404 | Page not found</h1>
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Menu />
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/search" element={<Search />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:slug" element={<ProductView />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/orders" element={<Orders />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/category" element={<AdminCategory />} />
          <Route path="admin/product" element={<AdminProduct />} />
          <Route path="admin/products" element={<AdminProducts />} />
          <Route path="admin/product/update/:slug" element={<ProductUpdate />} />
          <Route path="admin/orders" element={<AdminOrders />} />
        </Route>
        <Route path="*" element={<PageNotFound/>} replace />
      </Routes>
    </BrowserRouter>
  );
};

export default App;