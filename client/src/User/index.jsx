import React from 'react'
import UserNav from './components/UserNav'
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/Categories';
import Cart from './pages/Cart';
import { Navigate, Route, Routes } from "react-router-dom";
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage'
import TrackingPage from './pages/trackingPage';

function User() {
  return (
    <>
      <UserNav />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/categories" element={<Categories />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="category/:categoryName" element={<CategoryPage />}/>
        <Route path="product/:_id" element={<ProductPage />}/>
        <Route path="/track-order" element={<TrackingPage />}/>

        <Route path="*" element={<Navigate to='/' replace={true} />} />
      </Routes>
    </>
  )
}

export default User