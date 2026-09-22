import React, { useMemo, useState } from 'react'
import {
    MdArrowBack,
    MdArrowForward,
    MdCheckCircle,
    MdFavorite,
    MdFavoriteBorder,
    MdFilterList,
    MdHome,
    MdKeyboardArrowDown,
    MdSearch,
    MdShoppingCart,
    MdStar,
    MdStorefront
} from 'react-icons/md'
import {
    Link,
    useParams
} from 'react-router-dom'

import Header from '../components/header'
import { useCart } from '../contexts/cartProvider'

export default function CategoryDetails({products, categories, getCategoryBySlug, getProductsByCategory}) {
    const { slug } = useParams()

    const category = getCategoryBySlug(slug)

    const {
        addToCart,
        cartCount
    } = useCart()

    const [mobileMenu, setMobileMenu] = useState(false)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('featured')
    const [maxPrice, setMaxPrice] = useState('')
    const [minRating, setMinRating] = useState('')
    const [favorites, setFavorites] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [addedProduct, setAddedProduct] = useState(null)

    const ITEMS_PER_PAGE = 8

    const categoryProducts = useMemo(() => {
        if (!category) return []

        return getProductsByCategory(category.slug)
    }, [category])

    const filteredProducts = useMemo(() => {
        let result = [...categoryProducts]

        const searchValue = search.trim().toLowerCase()

        if (searchValue) {
            result = result.filter((product) =>
                product.name.toLowerCase().includes(searchValue) ||
                product.description.toLowerCase().includes(searchValue) ||
                product.store.toLowerCase().includes(searchValue)
            )
        }

        if (maxPrice) {
            result = result.filter(
                (product) =>
                    product.price <= Number(maxPrice)
            )
        }

        if (minRating) {
            result = result.filter(
                (product) =>
                    product.rating >= Number(minRating)
            )
        }

        if (sort === 'price-low') {
            result.sort(
                (a, b) => a.price - b.price
            )
        }

        if (sort === 'price-high') {
            result.sort(
                (a, b) => b.price - a.price
            )
        }

        if (sort === 'rating') {
            result.sort(
                (a, b) => b.rating - a.rating
            )
        }

        if (sort === 'featured') {
            result.sort(
                (a, b) =>
                    Number(b.featured) -
                    Number(a.featured)
            )
        }

        return result
    }, [
        categoryProducts,
        search,
        maxPrice,
        minRating,
        sort
    ])

    const totalPages = Math.ceil(
        filteredProducts.length / ITEMS_PER_PAGE
    )

    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    )

    const toggleFavorite = (productId) => {
        setFavorites((current) =>
            current.includes(productId)
                ? current.filter(
                      (id) => id !== productId
                  )
                : [...current, productId]
        )
    }

    const handleAddToCart = (product) => {
        addToCart(product)

        setAddedProduct(product.id)

        setTimeout(() => {
            setAddedProduct(null)
        }, 1500)
    }

    const handleSearch = (event) => {
        setSearch(event.target.value)
        setCurrentPage(1)
    }

    const clearFilters = () => {
        setSearch('')
        setMaxPrice('')
        setMinRating('')
        setSort('featured')
        setCurrentPage(1)
    }

    if (!category) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                />

                <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16">
                    <div className="text-center">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                            <MdSearch
                                size={38}
                                className="text-slate-400"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Category not found
                        </h1>

                        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                            The category you're looking for
                            doesn't exist or may have been
                            removed.
                        </p>

                        <Link
                            to="/categories"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            <MdArrowBack />
                            Browse Categories
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    const CategoryIcon = category.icon

    return (
        <div className="min-h-screen bg-slate-50">
            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            <main>
                {/* Breadcrumb */}
                <div className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Link
                                to="/"
                                className="transition hover:text-slate-900"
                            >
                                Home
                            </Link>

                            <span>/</span>

                            <Link
                                to="/categories"
                                className="transition hover:text-slate-900"
                            >
                                Categories
                            </Link>

                            <span>/</span>

                            <span className="font-medium text-slate-900">
                                {category.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Category Hero */}
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-10">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-5">
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100">
                                    <CategoryIcon
                                        size={34}
                                        className="text-slate-800"
                                    />
                                </div>

                                <div>
                                    <p className="mb-1 text-sm font-medium text-slate-500">
                                        Category
                                    </p>

                                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                                        {category.name}
                                    </h1>

                                    <p className="mt-2 max-w-2xl text-sm text-slate-500">
                                        {category.description}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="rounded-xl bg-slate-100 px-4 py-3 text-center">
                                    <p className="text-lg font-bold text-slate-900">
                                        {categoryProducts.length}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Products
                                    </p>
                                </div>

                                <div className="rounded-xl bg-slate-100 px-4 py-3 text-center">
                                    <p className="text-lg font-bold text-slate-900">
                                        {new Set(
                                            categoryProducts.map(
                                                (product) =>
                                                    product.store
                                            )
                                        ).size}
                                    </p>

                                    <p className="text-xs text-slate-500">
                                        Stores
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content */}
                <section className="mx-auto max-w-7xl px-4 py-8">
                    <div className="flex flex-col gap-8 lg:flex-row">
                        {/* Sidebar */}
                        <aside className="hidden w-64 shrink-0 lg:block">
                            <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="mb-5 flex items-center justify-between">
                                    <h2 className="font-semibold text-slate-900">
                                        Filters
                                    </h2>

                                    <button
                                        onClick={
                                            clearFilters
                                        }
                                        className="text-xs font-medium text-slate-500 hover:text-slate-900"
                                    >
                                        Clear
                                    </button>
                                </div>

                                {/* Search */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Search
                                    </label>

                                    <div className="relative">
                                        <MdSearch
                                            size={19}
                                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                        />

                                        <input
                                            type="text"
                                            value={search}
                                            onChange={
                                                handleSearch
                                            }
                                            placeholder="Search products..."
                                            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                                        />
                                    </div>
                                </div>

                                {/* Price */}
                                <div className="mb-6">
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Maximum Price
                                    </label>

                                    <input
                                        type="number"
                                        value={maxPrice}
                                        onChange={(e) => {
                                            setMaxPrice(
                                                e.target.value
                                            )
                                            setCurrentPage(1)
                                        }}
                                        placeholder="e.g. 500000"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                                    />
                                </div>

                                {/* Rating */}
                                <div>
                                    <label className="mb-3 block text-sm font-medium text-slate-700">
                                        Minimum Rating
                                    </label>

                                    <div className="space-y-2">
                                        {[4, 3, 2].map(
                                            (rating) => (
                                                <button
                                                    key={
                                                        rating
                                                    }
                                                    onClick={() => {
                                                        setMinRating(
                                                            String(
                                                                rating
                                                            )
                                                        )
                                                        setCurrentPage(
                                                            1
                                                        )
                                                    }}
                                                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                                                        minRating ===
                                                        String(
                                                            rating
                                                        )
                                                            ? 'bg-slate-100 text-slate-900'
                                                            : 'text-slate-500 hover:bg-slate-50'
                                                    }`}
                                                >
                                                    <span className="flex items-center gap-1">
                                                        {rating}
                                                        <MdStar
                                                            size={
                                                                16
                                                            }
                                                            className="text-yellow-500"
                                                        />
                                                        <span>
                                                            & above
                                                        </span>
                                                    </span>

                                                    {minRating ===
                                                        String(
                                                            rating
                                                        ) && (
                                                        <MdCheckCircle />
                                                    )}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Products */}
                        <div className="min-w-0 flex-1">
                            {/* Toolbar */}
                            <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                                <div className="flex items-center gap-3">
                                    <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 lg:hidden">
                                        <MdFilterList />
                                        Filters
                                    </button>

                                    <p className="text-sm text-slate-500">
                                        Showing{' '}
                                        <span className="font-semibold text-slate-900">
                                            {
                                                filteredProducts.length
                                            }
                                        </span>{' '}
                                        products
                                    </p>
                                </div>

                                <div className="relative">
                                    <MdKeyboardArrowDown
                                        size={20}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                                    />

                                    <select
                                        value={sort}
                                        onChange={(e) => {
                                            setSort(
                                                e.target.value
                                            )
                                            setCurrentPage(
                                                1
                                            )
                                        }}
                                        className="appearance-none rounded-xl border border-slate-200 bg-white py-2.5 pl-3 pr-10 text-sm font-medium text-slate-700 outline-none focus:border-slate-400"
                                    >
                                        <option value="featured">
                                            Featured
                                        </option>

                                        <option value="price-low">
                                            Price: Low to High
                                        </option>

                                        <option value="price-high">
                                            Price: High to Low
                                        </option>

                                        <option value="rating">
                                            Highest Rated
                                        </option>
                                    </select>
                                </div>
                            </div>

                            {/* Product Grid */}
                            {paginatedProducts.length > 0 ? (
                                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                                    {paginatedProducts.map(
                                        (product) => {
                                            const isFavorite =
                                                favorites.includes(
                                                    product.id
                                                )

                                            return (
                                                <div
                                                    key={
                                                        product.id
                                                    }
                                                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                                >
                                                    {/* Image */}
                                                    <div className="relative aspect-square overflow-hidden bg-slate-100">
                                                        <Link
                                                            to={`/products/${product.slug}`}
                                                        >
                                                            <img
                                                                src={
                                                                    product.image
                                                                }
                                                                alt={
                                                                    product.name
                                                                }
                                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                            />
                                                        </Link>

                                                        {product.featured && (
                                                            <span className="absolute left-3 top-3 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                                                                Featured
                                                            </span>
                                                        )}

                                                        <button
                                                            onClick={() =>
                                                                toggleFavorite(
                                                                    product.id
                                                                )
                                                            }
                                                            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105"
                                                        >
                                                            {isFavorite ? (
                                                                <MdFavorite
                                                                    size={
                                                                        19
                                                                    }
                                                                    className="text-red-500"
                                                                />
                                                            ) : (
                                                                <MdFavoriteBorder
                                                                    size={
                                                                        19
                                                                    }
                                                                    className="text-slate-600"
                                                                />
                                                            )}
                                                        </button>
                                                    </div>

                                                    {/* Info */}
                                                    <div className="p-4">
                                                        <Link
                                                            to={`/products/${product.slug}`}
                                                        >
                                                            <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold text-slate-900 transition hover:text-slate-600">
                                                                {
                                                                    product.name
                                                                }
                                                            </h3>
                                                        </Link>

                                                        <Link
                                                            to={`/stores/${product.storeSlug}`}
                                                            className="mt-2 flex items-center gap-1 text-xs text-slate-500 hover:text-slate-900"
                                                        >
                                                            <MdStorefront
                                                                size={
                                                                    14
                                                                }
                                                            />

                                                            {
                                                                product.store
                                                            }
                                                        </Link>

                                                        <div className="mt-2 flex items-center gap-1">
                                                            <MdStar
                                                                size={
                                                                    16
                                                                }
                                                                className="text-yellow-500"
                                                            />

                                                            <span className="text-xs font-semibold text-slate-700">
                                                                {
                                                                    product.rating
                                                                }
                                                            </span>

                                                            <span className="text-xs text-slate-400">
                                                                (
                                                                {
                                                                    product.reviews
                                                                }
                                                                )
                                                            </span>
                                                        </div>

                                                        <div className="mt-3 flex items-end justify-between gap-2">
                                                            <div>
                                                                <p className="text-base font-bold text-slate-900">
                                                                    ₦
                                                                    {product.price.toLocaleString()}
                                                                </p>

                                                                {product.oldPrice && (
                                                                    <p className="text-xs text-slate-400 line-through">
                                                                        ₦
                                                                        {product.oldPrice.toLocaleString()}
                                                                    </p>
                                                                )}
                                                            </div>

                                                            <button
                                                                onClick={() =>
                                                                    handleAddToCart(
                                                                        product
                                                                    )
                                                                }
                                                                disabled={
                                                                    product.stock <=
                                                                    0
                                                                }
                                                                className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                                                                    addedProduct ===
                                                                    product.id
                                                                        ? 'bg-green-600 text-white'
                                                                        : 'bg-slate-900 text-white hover:bg-slate-700'
                                                                } disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400`}
                                                            >
                                                                {addedProduct ===
                                                                product.id ? (
                                                                    <MdCheckCircle
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <MdShoppingCart
                                                                        size={
                                                                            20
                                                                        }
                                                                    />
                                                                )}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                        <MdSearch
                                            size={30}
                                            className="text-slate-400"
                                        />
                                    </div>

                                    <h2 className="text-lg font-bold text-slate-900">
                                        No products found
                                    </h2>

                                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                        Try changing your
                                        search or filters to
                                        find what you're looking
                                        for.
                                    </p>

                                    <button
                                        onClick={
                                            clearFilters
                                        }
                                        className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="mt-8 flex items-center justify-center gap-2">
                                    <button
                                        onClick={() =>
                                            setCurrentPage(
                                                (page) =>
                                                    Math.max(
                                                        1,
                                                        page - 1
                                                    )
                                            )
                                        }
                                        disabled={
                                            currentPage === 1
                                        }
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <MdArrowBack />
                                    </button>

                                    {Array.from(
                                        {
                                            length: totalPages
                                        },
                                        (_, index) =>
                                            index + 1
                                    ).map((page) => (
                                        <button
                                            key={page}
                                            onClick={() =>
                                                setCurrentPage(
                                                    page
                                                )
                                            }
                                            className={`h-10 w-10 rounded-xl text-sm font-semibold transition ${
                                                currentPage ===
                                                page
                                                    ? 'bg-slate-900 text-white'
                                                    : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                            }`}
                                        >
                                            {page}
                                        </button>
                                    ))}

                                    <button
                                        onClick={() =>
                                            setCurrentPage(
                                                (page) =>
                                                    Math.min(
                                                        totalPages,
                                                        page + 1
                                                    )
                                            )
                                        }
                                        disabled={
                                            currentPage ===
                                            totalPages
                                        }
                                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <MdArrowForward />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Cart indicator */}
                {cartCount > 0 && (
                    <Link
                        to="/cart"
                        className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-slate-800"
                    >
                        <MdShoppingCart size={20} />

                        <span>
                            {cartCount} item
                            {cartCount !== 1 ? 's' : ''} in cart
                        </span>
                    </Link>
                )}
            </main>
        </div>
    )
}