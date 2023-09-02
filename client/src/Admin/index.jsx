import React from 'react'
import AdminNav from './components/AdminNav'
import Home from './pages/Home'
import Products from './pages/Products'
import Categories from './pages/Categories'
import Orders from './pages/Orders'
import { Route, Routes, Navigate } from 'react-router-dom'

function Admin() {
  return (
    <>
        <div>
                <AdminNav />
            <div>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/categories" element={<Categories />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/orders/:status" element={<Orders />} />

                    <Route path="*" element={<Navigate to='/' replace={true} />} />
                </Routes>
            </div>
        </div>
    </>
    )
}

export default Admin