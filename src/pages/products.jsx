import React, { useMemo, useState } from 'react'
import {
    MdTune,
    MdKeyboardArrowDown,
    MdFavoriteBorder,
    MdFavorite,
    MdShoppingCart,
    MdStar,
    MdClose,
    MdChevronLeft,
    MdChevronRight,
    MdStorefront,
    MdLocalShipping,
    MdVerified,
    MdSearch
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import Header from '../components/header'
import { useCart } from '../contexts/cartProvider'

const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        store: 'TechHub Store',
        category: 'Phones',
        price: 1250000,
        oldPrice: 1350000,
        rating: 4.9,
        reviews: 124,
        stock: 12,
        image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=700&q=80',
        badge: 'Popular'
    },
    {
        id: 2,
        name: 'Nike Air Max 270',
        store: 'Urban Fits',
        category: 'Fashion',
        price: 85000,
        oldPrice: 100000,
        rating: 4.8,
        reviews: 89,
        stock: 24,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
        badge: 'Sale'
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5',
        store: 'TechHub Store',
        category: 'Electronics',
        price: 420000,
        oldPrice: 450000,
        rating: 4.9,
        reviews: 76,
        stock: 8,
        image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=700&q=80',
        badge: 'Top Rated'
    },
    {
        id: 4,
        name: 'Leather Backpack',
        store: 'Urban Fits',
        category: 'Accessories',
        price: 45000,
        oldPrice: null,
        rating: 4.6,
        reviews: 52,
        stock: 31,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=700&q=80',
        badge: null
    },
    {
        id: 5,
        name: 'Smart LED TV 55"',
        store: 'Home Space',
        category: 'Electronics',
        price: 680000,
        oldPrice: 750000,
        rating: 4.7,
        reviews: 63,
        stock: 6,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=700&q=80',
        badge: 'Sale'
    },
    {
        id: 6,
        name: 'Air Fryer 5.5L',
        store: 'Home Space',
        category: 'Home & Kitchen',
        price: 95000,
        oldPrice: 110000,
        rating: 4.7,
        reviews: 48,
        stock: 15,
        image: 'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=700&q=80',
        badge: 'Deal'
    },
    {
        id: 7,
        name: 'Premium Face Serum',
        store: 'Glow Beauty',
        category: 'Beauty',
        price: 32000,
        oldPrice: 38000,
        rating: 4.8,
        reviews: 71,
        stock: 18,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=700&q=80',
        badge: 'Popular'
    },
    {
        id: 8,
        name: 'Classic Wrist Watch',
        store: 'Urban Fits',
        category: 'Accessories',
        price: 65000,
        oldPrice: 80000,
        rating: 4.6,
        reviews: 39,
        stock: 10,
        image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=80',
        badge: 'Sale'
    },
    {
        id: 9,
        name: 'Samsung Galaxy S24',
        store: 'TechHub Store',
        category: 'Phones',
        price: 980000,
        oldPrice: 1050000,
        rating: 4.8,
        reviews: 96,
        stock: 9,
        image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=700&q=80',
        badge: 'New'
    },
    {
        id: 10,
        name: 'Minimalist Table Lamp',
        store: 'Home Space',
        category: 'Home & Kitchen',
        price: 28000,
        oldPrice: 35000,
        rating: 4.5,
        reviews: 28,
        stock: 22,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=700&q=80',
        badge: null
    },
    {
        id: 11,
        name: 'Oversized Cotton T-Shirt',
        store: 'Urban Fits',
        category: 'Fashion',
        price: 18000,
        oldPrice: 25000,
        rating: 4.7,
        reviews: 64,
        stock: 42,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80',
        badge: 'Sale'
    },
    {
        id: 12,
        name: 'Wireless Mechanical Keyboard',
        store: 'TechHub Store',
        category: 'Electronics',
        price: 78000,
        oldPrice: 90000,
        rating: 4.8,
        reviews: 44,
        stock: 14,
        image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=700&q=80',
        badge: 'Popular'
    }
]

const categories = [
    'All Categories',
    'Electronics',
    'Phones',
    'Fashion',
    'Beauty',
    'Home & Kitchen',
    'Accessories'
]

const sortOptions = [
    'Featured',
    'Newest',
    'Price: Low to High',
    'Price: High to Low',
    'Top Rated'
]

const ITEMS_PER_PAGE = 8

export default function Products() {

    const [mobileMenu, setMobileMenu] = useState(false)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('All Categories')
    const [sort, setSort] = useState('Featured')
    const [favorites, setFavorites] = useState([])
    const [showFilters, setShowFilters] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [maxPrice, setMaxPrice] = useState(1500000)

    /*
        Shared cart state.

        This replaces the old local:
        const [cart, setCart] = useState([])
    */
    const {
        cartItems,
        addToCart,
        cartCount
    } = useCart()

    const filteredProducts = useMemo(() => {

        let result = [...products]

        // Search
        if (search.trim()) {

            const query = search.toLowerCase()

            result = result.filter(product =>
                product.name.toLowerCase().includes(query) ||
                product.store.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query)
            )
        }

        // Category
        if (category !== 'All Categories') {

            result = result.filter(
                product => product.category === category
            )
        }

        // Price
        result = result.filter(
            product => product.price <= maxPrice
        )

        // Sorting
        if (sort === 'Price: Low to High') {

            result.sort(
                (a, b) => a.price - b.price
            )
        }

        if (sort === 'Price: High to Low') {

            result.sort(
                (a, b) => b.price - a.price
            )
        }

        if (sort === 'Top Rated') {

            result.sort(
                (a, b) => b.rating - a.rating
            )
        }

        if (sort === 'Newest') {

            result.sort(
                (a, b) => b.id - a.id
            )
        }

        return result

    }, [
        search,
        category,
        sort,
        maxPrice
    ])

    const totalPages = Math.ceil(
        filteredProducts.length / ITEMS_PER_PAGE
    )

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const toggleFavorite = id => {

        setFavorites(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        )
    }

    /*
        Add the actual product object to CartProvider.
    */
    const handleAddToCart = product => {
        addToCart(product, 1)
    }

    /*
        Check whether a product is already inside
        the shared cart.
    */
    const isProductInCart = productId => {
        return cartItems.some(
            item => item.id === productId
        )
    }

    const clearFilters = () => {

        setSearch('')
        setCategory('All Categories')
        setSort('Featured')
        setMaxPrice(1500000)
        setCurrentPage(1)
    }

    const handleCategoryChange = value => {

        setCategory(value)
        setCurrentPage(1)
    }

    const handleSearch = value => {

        setSearch(value)
        setCurrentPage(1)
    }

    const formatPrice = price => {

        return `₦${price.toLocaleString('en-NG')}`
    }

    return (

        <div className="min-h-screen bg-slate-50 text-slate-900">

            {/* HEADER */}

            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            {/* MAIN */}

            <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {/* BREADCRUMB */}

                <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">

                    <Link
                        to="/"
                        className="transition hover:text-emerald-600"
                    >
                        Home
                    </Link>

                    <span>/</span>

                    <span className="font-medium text-slate-800">
                        Products
                    </span>

                </div>

                {/* PAGE TITLE */}

                <div className="mb-8">

                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                        All Products
                    </h1>

                    <p className="mt-2 text-sm text-slate-500 sm:text-base">
                        Discover products from stores on StorePilot.
                    </p>

                </div>

                {/* MOBILE FILTER BUTTON */}

                <button
                    onClick={() => setShowFilters(true)}
                    className="mb-5 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold transition hover:bg-slate-50 md:hidden"
                >
                    <MdTune size={20} />
                    Filters & Sort
                </button>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-[230px_1fr]">

                    {/* DESKTOP FILTER SIDEBAR */}

                    <aside className="hidden md:block">

                        <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">

                            {/* FILTER HEADER */}

                            <div className="mb-5 flex items-center justify-between">

                                <h2 className="font-bold">
                                    Filters
                                </h2>

                                <button
                                    onClick={clearFilters}
                                    className="text-xs font-semibold text-emerald-600 hover:text-emerald-700"
                                >
                                    Clear all
                                </button>

                            </div>

                            {/* CATEGORY */}

                            <div className="border-b border-slate-100 pb-6">

                                <h3 className="mb-3 text-sm font-semibold">
                                    Category
                                </h3>

                                <div className="space-y-1">

                                    {categories.map(item => (

                                        <button
                                            key={item}
                                            onClick={() =>
                                                handleCategoryChange(item)
                                            }
                                            className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
                                                category === item
                                                    ? 'bg-emerald-50 font-semibold text-emerald-700'
                                                    : 'text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >

                                            <span>
                                                {item}
                                            </span>

                                            {category === item && (
                                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
                                            )}

                                        </button>

                                    ))}

                                </div>

                            </div>

                            {/* PRICE */}

                            <div className="pt-6">

                                <h3 className="mb-3 text-sm font-semibold">
                                    Maximum Price
                                </h3>

                                <div className="mb-3 flex items-center justify-between text-xs text-slate-500">

                                    <span>
                                        ₦0
                                    </span>

                                    <span>
                                        {formatPrice(maxPrice)}
                                    </span>

                                </div>

                                <input
                                    type="range"
                                    min="0"
                                    max="1500000"
                                    step="10000"
                                    value={maxPrice}
                                    onChange={e => {
                                        setMaxPrice(
                                            Number(e.target.value)
                                        )
                                        setCurrentPage(1)
                                    }}
                                    className="w-full accent-emerald-600"
                                />

                            </div>

                            {/* DELIVERY INFO */}

                            <div className="mt-6 border-t border-slate-100 pt-6">

                                <div className="flex items-start gap-3">

                                    <MdLocalShipping
                                        size={21}
                                        className="mt-0.5 text-emerald-600"
                                    />

                                    <div>

                                        <p className="text-sm font-semibold">
                                            Reliable delivery
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Shop from verified stores and track your orders.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </aside>

                    {/* PRODUCTS */}

                    <section>

                        {/* TOOLBAR */}

                        <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <p className="text-sm text-slate-500">

                                Showing{' '}

                                <span className="font-semibold text-slate-800">
                                    {filteredProducts.length}
                                </span>{' '}

                                products

                            </p>

                            <div className="relative w-full sm:w-52">

                                <select
                                    value={sort}
                                    onChange={e => {

                                        setSort(e.target.value)
                                        setCurrentPage(1)

                                    }}
                                    className="h-10 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm font-medium text-slate-700 outline-none focus:border-emerald-500"
                                >

                                    {sortOptions.map(option => (

                                        <option
                                            key={option}
                                            value={option}
                                        >
                                            {option}
                                        </option>

                                    ))}

                                </select>

                                <MdKeyboardArrowDown
                                    size={20}
                                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                            </div>

                        </div>

                        {/* ACTIVE FILTERS */}

                        {(search ||
                            category !== 'All Categories' ||
                            maxPrice < 1500000) && (

                            <div className="mb-5 flex flex-wrap items-center gap-2">

                                {search && (

                                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">

                                        Search: "{search}"

                                        <button
                                            onClick={() =>
                                                handleSearch('')
                                            }
                                        >
                                            <MdClose size={15} />
                                        </button>

                                    </div>

                                )}

                                {category !== 'All Categories' && (

                                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">

                                        {category}

                                        <button
                                            onClick={() =>
                                                handleCategoryChange(
                                                    'All Categories'
                                                )
                                            }
                                        >
                                            <MdClose size={15} />
                                        </button>

                                    </div>

                                )}

                                {maxPrice < 1500000 && (

                                    <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">

                                        Under {formatPrice(maxPrice)}

                                        <button
                                            onClick={() => {

                                                setMaxPrice(
                                                    1500000
                                                )

                                                setCurrentPage(1)

                                            }}
                                        >
                                            <MdClose size={15} />
                                        </button>

                                    </div>

                                )}

                            </div>

                        )}

                        {/* PRODUCT GRID */}

                        {paginatedProducts.length > 0 ? (

                            <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                                {paginatedProducts.map(product => {

                                    const isFavorite =
                                        favorites.includes(
                                            product.id
                                        )

                                    const inCart =
                                        isProductInCart(
                                            product.id
                                        )

                                    return (

                                        <article
                                            key={product.id}
                                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg"
                                        >

                                            {/* IMAGE */}

                                            <div className="relative aspect-square overflow-hidden bg-slate-100">

                                                <Link
                                                    to={`/products/${product.id}`}
                                                >

                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    />

                                                </Link>

                                                {/* BADGE */}

                                                {product.badge && (

                                                    <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white">
                                                        {product.badge}
                                                    </span>

                                                )}

                                                {/* WISHLIST */}

                                                <button
                                                    onClick={() =>
                                                        toggleFavorite(
                                                            product.id
                                                        )
                                                    }
                                                    className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-slate-600 shadow-sm backdrop-blur transition hover:text-rose-500"
                                                >

                                                    {isFavorite ? (

                                                        <MdFavorite
                                                            size={19}
                                                            className="text-rose-500"
                                                        />

                                                    ) : (

                                                        <MdFavoriteBorder
                                                            size={19}
                                                        />

                                                    )}

                                                </button>

                                                {/* CART */}

                                                <button
                                                    onClick={() =>
                                                        handleAddToCart(
                                                            product
                                                        )
                                                    }
                                                    className={`absolute bottom-3 left-3 right-3 flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-bold shadow-sm transition ${
                                                        inCart
                                                            ? 'bg-slate-900 text-white'
                                                            : 'bg-white text-slate-900 hover:bg-emerald-600 hover:text-white'
                                                    }`}
                                                >

                                                    <MdShoppingCart
                                                        size={17}
                                                    />

                                                    {inCart
                                                        ? 'Added to cart'
                                                        : 'Add to cart'}

                                                </button>

                                            </div>

                                            {/* PRODUCT INFO */}

                                            <div className="p-3.5">

                                                <Link
                                                    to={`/products/${product.id}`}
                                                    className="block"
                                                >

                                                    <h3 className="line-clamp-1 text-sm font-semibold text-slate-900 transition hover:text-emerald-600">
                                                        {product.name}
                                                    </h3>

                                                </Link>

                                                {/* STORE */}

                                                <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">

                                                    <MdStorefront size={14} />

                                                    <span className="line-clamp-1">
                                                        {product.store}
                                                    </span>

                                                    <MdVerified
                                                        size={13}
                                                        className="shrink-0 text-emerald-600"
                                                    />

                                                </div>

                                                {/* RATING */}

                                                <div className="mt-2 flex items-center gap-1">

                                                    <MdStar
                                                        size={16}
                                                        className="text-amber-400"
                                                    />

                                                    <span className="text-xs font-semibold">
                                                        {product.rating}
                                                    </span>

                                                    <span className="text-[11px] text-slate-400">
                                                        ({product.reviews})
                                                    </span>

                                                </div>

                                                {/* PRICE */}

                                                <div className="mt-3 flex flex-wrap items-center gap-2">

                                                    <span className="text-base font-bold text-slate-900">
                                                        {formatPrice(
                                                            product.price
                                                        )}
                                                    </span>

                                                    {product.oldPrice && (

                                                        <span className="text-xs text-slate-400 line-through">
                                                            {formatPrice(
                                                                product.oldPrice
                                                            )}
                                                        </span>

                                                    )}

                                                </div>

                                                {/* STOCK */}

                                                <p
                                                    className={`mt-2 text-[11px] font-medium ${
                                                        product.stock <= 8
                                                            ? 'text-orange-600'
                                                            : 'text-slate-400'
                                                    }`}
                                                >

                                                    {product.stock <= 8
                                                        ? `Only ${product.stock} left`
                                                        : 'In stock'}

                                                </p>

                                            </div>

                                        </article>

                                    )

                                })}

                            </div>

                        ) : (

                            /* EMPTY STATE */

                            <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 text-center">

                                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">

                                    <MdSearch
                                        size={30}
                                        className="text-slate-400"
                                    />

                                </div>

                                <h2 className="text-lg font-bold">
                                    No products found
                                </h2>

                                <p className="mt-2 max-w-sm text-sm text-slate-500">
                                    We couldn't find products matching your current
                                    search or filters.
                                </p>

                                <button
                                    onClick={clearFilters}
                                    className="mt-5 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
                                >
                                    Clear filters
                                </button>

                            </div>

                        )}

                        {/* PAGINATION */}

                        {totalPages > 1 && (

                            <div className="mt-8 flex items-center justify-center gap-2">

                                <button
                                    disabled={currentPage === 1}
                                    onClick={() =>
                                        setCurrentPage(
                                            prev => prev - 1
                                        )
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <MdChevronLeft size={21} />
                                </button>

                                {Array.from(
                                    {
                                        length: totalPages
                                    },
                                    (_, index) => index + 1
                                ).map(page => (

                                    <button
                                        key={page}
                                        onClick={() =>
                                            setCurrentPage(
                                                page
                                            )
                                        }
                                        className={`h-10 min-w-10 rounded-xl px-3 text-sm font-semibold transition ${
                                            currentPage === page
                                                ? 'bg-emerald-600 text-white'
                                                : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        {page}
                                    </button>

                                ))}

                                <button
                                    disabled={
                                        currentPage === totalPages
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            prev => prev + 1
                                        )
                                    }
                                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    <MdChevronRight size={21} />
                                </button>

                            </div>

                        )}

                    </section>

                </div>

            </main>

            {/* MOBILE FILTER DRAWER */}

            {showFilters && (

                <div className="fixed inset-0 z-[60] md:hidden">

                    {/* OVERLAY */}

                    <div
                        onClick={() =>
                            setShowFilters(false)
                        }
                        className="absolute inset-0 bg-slate-950/40"
                    />

                    {/* DRAWER */}

                    <div className="absolute bottom-0 left-0 right-0 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-5">

                        {/* HEADER */}

                        <div className="mb-6 flex items-center justify-between">

                            <h2 className="text-lg font-bold">
                                Filters & Sort
                            </h2>

                            <button
                                onClick={() =>
                                    setShowFilters(false)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100"
                            >
                                <MdClose size={20} />
                            </button>

                        </div>

                        {/* SORT */}

                        <div className="mb-6">

                            <h3 className="mb-3 text-sm font-semibold">
                                Sort by
                            </h3>

                            <div className="grid grid-cols-2 gap-2">

                                {sortOptions.map(option => (

                                    <button
                                        key={option}
                                        onClick={() => {

                                            setSort(option)
                                            setCurrentPage(1)

                                        }}
                                        className={`rounded-xl border px-3 py-2.5 text-left text-xs font-medium ${
                                            sort === option
                                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                                : 'border-slate-200 text-slate-600'
                                        }`}
                                    >
                                        {option}
                                    </button>

                                ))}

                            </div>

                        </div>

                        {/* CATEGORY */}

                        <div className="mb-6">

                            <h3 className="mb-3 text-sm font-semibold">
                                Category
                            </h3>

                            <div className="grid grid-cols-2 gap-2">

                                {categories.map(item => (

                                    <button
                                        key={item}
                                        onClick={() =>
                                            handleCategoryChange(
                                                item
                                            )
                                        }
                                        className={`rounded-xl border px-3 py-2.5 text-left text-xs font-medium ${
                                            category === item
                                                ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                                : 'border-slate-200 text-slate-600'
                                        }`}
                                    >
                                        {item}
                                    </button>

                                ))}

                            </div>

                        </div>

                        {/* PRICE */}

                        <div>

                            <div className="mb-3 flex items-center justify-between">

                                <h3 className="text-sm font-semibold">
                                    Maximum price
                                </h3>

                                <span className="text-xs font-semibold text-emerald-600">
                                    {formatPrice(maxPrice)}
                                </span>

                            </div>

                            <input
                                type="range"
                                min="0"
                                max="1500000"
                                step="10000"
                                value={maxPrice}
                                onChange={e => {

                                    setMaxPrice(
                                        Number(e.target.value)
                                    )

                                    setCurrentPage(1)

                                }}
                                className="w-full accent-emerald-600"
                            />

                        </div>

                        {/* ACTIONS */}

                        <div className="mt-7 flex gap-3">

                            <button
                                onClick={clearFilters}
                                className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-semibold text-slate-700"
                            >
                                Clear
                            </button>

                            <button
                                onClick={() =>
                                    setShowFilters(false)
                                }
                                className="flex-1 rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white"
                            >
                                Apply Filters
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    )
}