import React from 'react'
import GuestNav from './components/GuestNav'
import Home from './pages/Home';
import Products from './pages/Products';
import Categories from './pages/categories';
import Login from './pages/Login';
import Signup from './pages/Signup'
import { Navigate, Route, Routes } from "react-router-dom";
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage'

function User() {
  return (
    <>
      <GuestNav />

      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/products" element={<Products />}/>
        <Route path="/categories" element={<Categories />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/signup" element={<Signup />}/>
        <Route path="category/:categoryName" element={<CategoryPage />}/>
        <Route path="product/:_id" element={<ProductPage />}/>


        <Route path="*" element={<Navigate to='/' replace={true} />} />
      </Routes>
    </>
  )
}

export default User