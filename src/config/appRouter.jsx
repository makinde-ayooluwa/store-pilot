import React from 'react'
import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom'
import StoreLayout from '../layouts/storeLayout'
import StoreDashboard from '../pages/store/dashboard'
import StoreWallet from '../pages/store/wallet'
import StoreAllProducts from '../pages/store/products'
import StoreAddProduct from '../pages/store/addProduct'
import StoreCategories from '../pages/store/categories'
import StoreStockOverview from '../pages/store/stockOverview'
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
import StoreRegister from '../pages/store/register'
import EditProduct from '../pages/store/editProduct'
import StoreProductDetails from '../pages/store/productDetails'
import StoreOrders from '../pages/store/orders'
import StoreCustomers from '../pages/store/customers'
import StoreOrderDetails from '../pages/store/orderDetails'
import ForgotPassword from '../pages/auth/forgotPassword'
import ResetPassword from '../pages/auth/resetPassword'
import StoreProfile from '../pages/store/profile'
import StoreStockSettings from '../pages/store/stockSettings'
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
                {/* Store */}
                <Route
                    path="/store/register"
                    element={<StoreRegister />}
                />
                <Route path='/store' element={
                    <StoreLayout />
                }
                >
                    <Route
                        index
                        element={
                            <StoreDashboard />
                        }
                    />
                    <Route
                        path='dashboard'
                        element={
                            <StoreDashboard />
                        }
                    />
                    <Route path='products' element={<Outlet />}>
                        <Route index element={<StoreAllProducts />} />
                        <Route path='add' element={<StoreAddProduct />} />
                        <Route path='categories' element={<StoreCategories />} />
                        <Route
                            path=":slug/edit"
                            element={<EditProduct />}
                        />
                        <Route
                            path=":slug"
                            element={<StoreProductDetails />}
                        />
                    </Route>
                    <Route
                        path="orders"
                        element={<Outlet />}
                    >
                        <Route index element={<StoreOrders />} />
                        <Route path=':id' element={<StoreOrderDetails />} />
                    </Route>

                    <Route path='inventory' element={<Outlet />}>
                        <Route index element={<StoreStockOverview />} />
                        <Route path="edit" element={<StoreStockSettings />} />
                    </Route>

                    <Route
                        path="customers"
                        element={<StoreCustomers />}
                    />
                    <Route path='wallet' element={<StoreWallet />} />
                    <Route path="profile" element={<>
                        <StoreProfile categories={categories} />
                        </>} />
                    <Route path='*' element={<h1>Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}
