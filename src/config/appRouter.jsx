import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import SellerLayout from '../layouts/sellerLayout'
import SellerDashboard from '../pages/sellers/dashboard'
import SellerWallet from '../pages/sellers/wallet'
import SellerAllProducts from '../pages/sellers/products'
import SellerAddProduct from '../pages/sellers/add-product'
import SellerCategories from '../pages/sellers/categories'
import SellerStockOverview from '../pages/sellers/stockOverview'
import Homepage from '../pages/homepage'
import Sell from '../pages/sell'
import Products from '../pages/products'
import ProductDetails from '../pages/product-details'
import Cart from '../pages/cart'
import Checkout from '../pages/checkout'
import OrderDetails from '../pages/customer/orderDetails'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/products" element={<Outlet />}>
          <Route index element={<Products />} />
          <Route path=':id' element={<ProductDetails />} />
        </Route>
        <Route path="/sell" element={<Sell />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/orders/:id" element={<OrderDetails />} />
        <Route path='/seller' element={
          <SellerLayout />
        }
        >
          <Route index element={
            <SellerDashboard />
          } />
          <Route path='products' element={<Outlet />}>
            <Route index element={<SellerAllProducts />} />
            <Route path='add' element={<SellerAddProduct />} />
            <Route path='categories' element={<SellerCategories />} />
          </Route>
          <Route path='inventory' element={<Outlet />}>
            <Route index element={<SellerStockOverview />} />
          </Route>
          <Route path='wallet' element={<SellerWallet />} />
          <Route path='*' element={<h1>Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
