import React, { useState } from 'react'
import {
    MdSearch,
    MdShoppingCart,
    MdPersonOutline,
    MdStorefront,
    MdArrowForward,
    MdKeyboardArrowRight,
    MdFavoriteBorder,
    MdMenu,
    MdClose
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import Header from '../components/header'

export default function Homepage() {
    const [mobileMenu, setMobileMenu] = useState(false)

    const categories = [
        {
            name: 'Electronics',
            image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Fashion',
            image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Beauty',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Home & Kitchen',
            image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Accessories',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80'
        },
        {
            name: 'Phones',
            image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'
        }
    ]

    const products = [
        {
            id: 1,
            name: 'iPhone 15 Pro',
            store: 'TechHub Store',
            price: 1250000,
            oldPrice: 1350000,
            image: 'https://images.unsplash.com/photo-1696446702183-cbd13d8e8f34?auto=format&fit=crop&w=700&q=80'
        },
        {
            id: 2,
            name: 'Nike Air Max',
            store: 'Urban Fits',
            price: 185000,
            oldPrice: 210000,
            image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80'
        },
        {
            id: 3,
            name: 'Leather Backpack',
            store: 'Carry Co.',
            price: 75000,
            oldPrice: 90000,
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80'
        },
        {
            id: 4,
            name: 'Sony WH-1000XM5',
            store: 'Audio World',
            price: 450000,
            oldPrice: 490000,
            image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=700&q=80'
        }
    ]

    const newProducts = [
        {
            id: 5,
            name: 'Samsung Galaxy S24',
            store: 'Mobile Planet',
            price: 980000,
            image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80'
        },
        {
            id: 6,
            name: 'Minimal Desk Lamp',
            store: 'Home Space',
            price: 45000,
            image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80'
        },
        {
            id: 7,
            name: 'Classic Wrist Watch',
            store: 'Time House',
            price: 120000,
            image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80'
        },
        {
            id: 8,
            name: 'Wireless Keyboard',
            store: 'TechHub Store',
            price: 65000,
            image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80'
        }
    ]

    const stores = [
        {
            name: 'TechHub Store',
            category: 'Electronics',
            products: '124 products',
            image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=700&q=80'
        },
        {
            name: 'Urban Fits',
            category: 'Fashion',
            products: '86 products',
            image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=700&q=80'
        },
        {
            name: 'Home Space',
            category: 'Home & Living',
            products: '64 products',
            image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=700&q=80'
        }
    ]

    const formatPrice = price =>
        `₦${price.toLocaleString('en-NG')}`

    return (
        <div className="min-h-screen w-full overflow-hidden bg-white text-slate-900">

            {/* Navbar */}
            <Header mobileMenu={mobileMenu} setMobileMenu={setMobileMenu} />


            {/* Hero */}
            <section className="bg-slate-50">

                <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-2 lg:px-8 lg:py-20">

                    {/* Content */}
                    <div className="max-w-xl">

                        <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-600">
                            Shop smarter
                        </span>

                        <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                            Discover products
                            <span className="block text-emerald-600">
                                you’ll love.
                            </span>
                        </h1>

                        <p className="mt-5 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
                            Shop products from stores on StorePilot.
                            Discover great products, compare your options
                            and get what you need from one convenient place.
                        </p>


                        {/* Search */}
                        <div className="mt-7 flex h-12 max-w-lg items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 shadow-sm">

                            <MdSearch
                                size={21}
                                className="text-slate-400"
                            />

                            <input
                                type="text"
                                placeholder="What are you looking for?"
                                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                            />

                            <button className="hidden rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 sm:block">
                                Search
                            </button>

                        </div>


                        <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-400">
                            <span>Electronics</span>
                            <span>•</span>
                            <span>Fashion</span>
                            <span>•</span>
                            <span>Accessories</span>
                            <span>•</span>
                            <span>Home</span>
                        </div>

                    </div>


                    {/* Hero Image */}
                    <div className="relative">

                        <div className="absolute -right-10 -top-10 h-52 w-52 rounded-full bg-emerald-100 blur-3xl" />

                        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl">

                            <img
                                src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1200&q=85"
                                alt="Shopping"
                                className="h-[300px] w-full rounded-xl object-cover sm:h-[380px]"
                            />

                            <div className="absolute bottom-7 left-7 right-7 rounded-xl border border-white/50 bg-white/90 p-4 shadow-lg backdrop-blur">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-[10px] text-slate-400">
                                            Featured store
                                        </p>

                                        <p className="mt-1 text-sm font-bold text-slate-800">
                                            TechHub Store
                                        </p>
                                    </div>

                                    <MdArrowForward
                                        size={19}
                                        className="text-slate-500"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Categories */}
            <section className="border-b border-slate-100 bg-white">

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                    <div className="flex items-end justify-between">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                                Browse
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                Shop by category
                            </h2>
                        </div>

                        <Link
                            to="/categories"
                            className="hidden items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900 sm:flex"
                        >
                            View all
                            <MdArrowForward size={15} />
                        </Link>

                    </div>


                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">

                        {categories.map(category => (
                            <Link
                                key={category.name}
                                to={`/categories/${category.name.toLowerCase().replaceAll(' ', '-')}`}
                                className="group relative overflow-hidden rounded-xl"
                            >

                                <img
                                    src={category.image}
                                    alt={category.name}
                                    className="h-32 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-36"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/10 to-transparent" />

                                <p className="absolute bottom-3 left-3 text-xs font-bold text-white">
                                    {category.name}
                                </p>

                            </Link>
                        ))}

                    </div>

                </div>

            </section>


            {/* Featured Products */}
            <section className="bg-slate-50">

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                    <div className="flex items-end justify-between">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                                For you
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                Featured products
                            </h2>
                        </div>

                        <Link
                            to="/products"
                            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
                        >
                            View all
                            <MdArrowForward size={15} />
                        </Link>

                    </div>


                    <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                        {products.map(product => (
                            <Link
                                key={product.id}
                                to={`/products/${product.id}`}
                                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
                            >

                                <div className="relative overflow-hidden bg-slate-100">

                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        className="h-48 w-full object-cover transition duration-500 group-hover:scale-105 sm:h-56"
                                    />

                                    <button
                                        onClick={e => e.preventDefault()}
                                        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-slate-500 shadow-sm backdrop-blur hover:text-red-500"
                                    >
                                        <MdFavoriteBorder size={17} />
                                    </button>

                                </div>


                                <div className="p-4">

                                    <p className="text-[10px] text-slate-400">
                                        {product.store}
                                    </p>

                                    <h3 className="mt-1 truncate text-sm font-semibold text-slate-700">
                                        {product.name}
                                    </h3>

                                    <div className="mt-3 flex items-end justify-between">

                                        <div>
                                            <p className="text-sm font-bold text-slate-900">
                                                {formatPrice(product.price)}
                                            </p>

                                            <p className="mt-0.5 text-[10px] text-slate-400 line-through">
                                                {formatPrice(product.oldPrice)}
                                            </p>
                                        </div>

                                        <button
                                            onClick={e => e.preventDefault()}
                                            className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white transition hover:bg-emerald-600"
                                        >
                                            <MdShoppingCart size={17} />
                                        </button>

                                    </div>

                                </div>

                            </Link>
                        ))}

                    </div>

                </div>

            </section>


            {/* Sell CTA */}
            <section className="bg-slate-900">

                <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:px-8">

                    <div>

                        <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            <MdStorefront size={15} />
                            For businesses
                        </span>

                        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                            Have products to sell?
                        </h2>

                        <p className="mt-4 max-w-lg text-sm leading-6 text-slate-400">
                            Create your store on StorePilot, list your products
                            and manage your business from one simple dashboard.
                        </p>

                        <Link
                            to="/sell"
                            className="mt-7 inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-100"
                        >
                            Start selling
                            <MdArrowForward size={18} />
                        </Link>

                    </div>


                    <div className="grid grid-cols-2 gap-3">

                        {[
                            ['Products', 'Manage your catalog'],
                            ['Inventory', 'Track your stock'],
                            ['Orders', 'Manage customer orders'],
                            ['Analytics', 'Understand your sales']
                        ].map(([title, text]) => (
                            <div
                                key={title}
                                className="rounded-xl border border-white/10 bg-white/5 p-4"
                            >
                                <p className="text-sm font-bold text-white">
                                    {title}
                                </p>

                                <p className="mt-1 text-[10px] leading-4 text-slate-400">
                                    {text}
                                </p>
                            </div>
                        ))}

                    </div>

                </div>

            </section>


            {/* Popular Stores */}
            <section className="bg-white">

                <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

                    <div className="flex items-end justify-between">

                        <div>
                            <p className="text-xs font-bold uppercase tracking-widest text-emerald-600">
                                Discover
                            </p>

                            <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                                Popular stores
                            </h2>
                        </div>

                        <Link
                            to="/stores"
                            className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-900"
                        >
                            View stores
                            <MdArrowForward size={15} />
                        </Link>

                    </div>


                    <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                        {stores.map(store => (
                            <Link
                                key={store.name}
                                to={`/stores/${store.name.toLowerCase().replaceAll(' ', '-')}`}
                                className="group overflow-hidden rounded-xl border border-slate-200 bg-white transition hover:border-slate-300 hover:shadow-md"
                            >

                                <div className="flex">

                                    <img
                                        src={store.image}
                                        alt={store.name}
                                        className="h-28 w-28 shrink-0 object-cover transition group-hover:scale-105"
                                    />

                                    <div className="flex flex-1 flex-col justify-center p-4">

                                        <p className="text-sm font-bold text-slate-800">
                                            {store.name}
                                        </p>

                                        <p className="mt-1 text-[10px] text-slate-400">
                                            {store.category}
                                        </p>

                                        <p className="mt-2 text-[10px] font-medium text-slate-500">
                                            {store.products}
                                        </p>

                                        <div className="mt-2 flex items-center gap-1 text-[10px] font-semibold text-emerald-600">
                                            Visit store
                                            <MdKeyboardArrowRight size={14} />
                                        </div>

                                    </div>

                                </div>

                            </Link>
                        ))}

                    </div>

                </div>

            </section>


            {/* Footer */}
            <footer className="border-t border-slate-100 bg-slate-50">

                <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

                        <div className="sm:col-span-2">

                            <div className="flex items-center gap-2">

                                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                                    <MdStorefront size={20} />
                                </div>

                                <span className="text-lg font-bold text-slate-900">
                                    StorePilot
                                </span>

                            </div>

                            <p className="mt-3 max-w-sm text-xs leading-5 text-slate-400">
                                A simple place to discover products and
                                connect with stores.
                            </p>

                        </div>


                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                Shop
                            </h3>

                            <div className="mt-4 space-y-3">

                                <Link
                                    to="/products"
                                    className="block text-xs text-slate-400 hover:text-slate-700"
                                >
                                    Products
                                </Link>

                                <Link
                                    to="/categories"
                                    className="block text-xs text-slate-400 hover:text-slate-700"
                                >
                                    Categories
                                </Link>

                                <Link
                                    to="/stores"
                                    className="block text-xs text-slate-400 hover:text-slate-700"
                                >
                                    Stores
                                </Link>

                            </div>
                        </div>


                        <div>
                            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                                Business
                            </h3>

                            <div className="mt-4 space-y-3">

                                <Link
                                    to="/sell"
                                    className="block text-xs text-slate-400 hover:text-slate-700"
                                >
                                    Sell on StorePilot
                                </Link>

                                <Link
                                    to="/login"
                                    className="block text-xs text-slate-400 hover:text-slate-700"
                                >
                                    Seller Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="block text-xs text-slate-400 hover:text-slate-700"
                                >
                                    Create account
                                </Link>

                            </div>
                        </div>

                    </div>


                    <div className="mt-10 border-t border-slate-200 pt-6">

                        <p className="text-[10px] text-slate-400">
                            © {new Date().getFullYear()} StorePilot. All rights reserved.
                        </p>

                    </div>

                </div>

            </footer>

        </div>
    )
}