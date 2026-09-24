import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import SellerLayout from '../layouts/sellerLayout'
import SellerDashboard from '../pages/sellers/dashboard'
import SellerWallet from '../pages/sellers/wallet'
import SellerAllProducts from '../pages/sellers/products'
import SellerAddProduct from '../pages/sellers/addProduct'
import SellerCategories from '../pages/sellers/categories'
import SellerStockOverview from '../pages/sellers/stockOverview'
import Homepage from '../pages/homepage'
import Sell from '../pages/sell'
import Products from '../pages/products'
import ProductDetails from '../pages/productDetails'
import Cart from '../pages/cart'
import Checkout from '../pages/checkout'
import OrderDetails from '../pages/customer/orderDetails'
import Orders from '../pages/customer/orders'
import Account from '../pages/customer/account'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Categories from '../pages/categories'
import { useResource } from '../contexts/resourceProvider'
import CategoryDetails from '../pages/categoryDetails'
import Stores from '../pages/stores'
import StoreDetails from '../pages/storeDetails'
import Wishlist from '../pages/customer/wishlist'
import Search from '../pages/search'
import Notifications from '../pages/customer/notifications'
import Addresses from '../pages/customer/addresses'
import Settings from '../pages/customer/settings'
import Terms from '../pages/terms'
import Privacy from '../pages/privacy'
import NotFound from '../pages/notFound'
import SellerRegister from '../pages/sellers/register'
import EditProduct from '../pages/sellers/editProduct'
import SellerProductDetails from '../pages/sellers/productDetails'
import SellerOrders from '../pages/sellers/orders'
import SellerCustomers from '../pages/sellers/customers'
import SellerOrderDetails from '../pages/sellers/orderDetails'
import ForgotPassword from '../pages/auth/forgotPassword'
import ResetPassword from '../pages/auth/resetPassword'
export default function AppRouter() {
    const { products, categories, getProductsByCategory, getCategoryBySlug, stores } = useResource();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homepage products={products} stores={stores} categories={categories} />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route
    path="/reset-password/:token"
    element={<ResetPassword />}
/>
                <Route path='/search' element={<Search />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/privacy" element={<Privacy />} />

                <Route path="*" element={<NotFound />} />
                <Route path="/products" element={<Outlet />}>
                    <Route index element={<Products products={products} categories={categories} />} />
                    <Route path=':id' element={<ProductDetails products={products} />} />
                </Route>
                <Route path='/notifications' element={<Notifications />} />
                <Route path='/stores' element={<Stores />} />
                <Route path='/stores/:slug' element={<StoreDetails />} />
                <Route path='/wishlist' element={<Wishlist />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/categories" element={<Categories categories={categories} />} />
                <Route path="/categories/:slug" element={<CategoryDetails products={products} categories={categories} getCategoryBySlug={getCategoryBySlug} getProductsByCategory={getProductsByCategory} />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/orders" element={<Outlet />}>
                    <Route index element={<Orders />} />
                    <Route path=':id' element={<OrderDetails />} />
                </Route>
                <Route path='/account' element={<Outlet />}>
                    <Route index element={<Account />} />
                    <Route
                        path="addresses"
                        element={<Addresses />}
                    />
                    <Route
                        path="settings"
                        element={<Settings />}
                    />
                </Route>
                {/* SELLER */}
                <Route
                    path="/seller/register"
                    element={<SellerRegister />}
                />
                <Route path='/seller' element={
                    <SellerLayout />
                }
                >
                    <Route
                        index
                        element={
                            <SellerDashboard />
                        }
                    />
                    <Route
                        path='dashboard'
                        element={
                            <SellerDashboard />
                        }
                    />
                    <Route path='products' element={<Outlet />}>
                        <Route index element={<SellerAllProducts />} />
                        <Route path='add' element={<SellerAddProduct />} />
                        <Route path='categories' element={<SellerCategories />} />
                        <Route
                            path=":id/edit"
                            element={<EditProduct />}
                        />
                        <Route
                            path=":id"
                            element={<SellerProductDetails />}
                        />
                    </Route>
                    <Route
                        path="orders"
                        element={<Outlet />}
                    >
                        <Route index element={<SellerOrders />} />
                        <Route path=':id' element={<SellerOrderDetails />} />
                    </Route>

                    <Route path='inventory' element={<Outlet />}>
                        <Route index element={<SellerStockOverview />} />
                    </Route>

                    <Route
                        path="customers"
                        element={<SellerCustomers />}
                    />
                    <Route path='wallet' element={<SellerWallet />} />
                    <Route path='*' element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
