import React, { useMemo, useState } from 'react'
import {
    MdSearch,
    MdClose,
    MdFavorite,
    MdFavoriteBorder,
    MdShoppingCart,
    MdStore,
    MdStar
} from 'react-icons/md'
import { Link, useSearchParams } from 'react-router-dom'

import Header from '../components/header'
import products from '../data/products'
import stores from '../data/stores'
import categories from '../data/categories'

import { useCart } from '../contexts/cartProvider'
import { useWishlist } from '../contexts/wishlistProvider'

export default function Search() {
    const [searchParams, setSearchParams] = useSearchParams()

    const initialQuery = searchParams.get('q') || ''

    const [search, setSearch] = useState(initialQuery)
    const [category, setCategory] = useState('all')
    const [sort, setSort] = useState('relevance')

    const { addToCart } = useCart()
    const { isWishlisted, toggleWishlist } = useWishlist()

    const query = search.trim().toLowerCase()

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            const matchesSearch =
                !query ||
                product.name.toLowerCase().includes(query) ||
                product.description?.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.store.toLowerCase().includes(query)

            const matchesCategory =
                category === 'all' ||
                product.categorySlug === category

            return matchesSearch && matchesCategory
        })

        if (sort === 'price-low') {
            result.sort((a, b) => a.price - b.price)
        }

        if (sort === 'price-high') {
            result.sort((a, b) => b.price - a.price)
        }

        if (sort === 'rating') {
            result.sort((a, b) => b.rating - a.rating)
        }

        if (sort === 'newest') {
            result.reverse()
        }

        return result
    }, [query, category, sort])

    const filteredStores = useMemo(() => {
        return stores.filter((store) => {
            const matchesSearch =
                !query ||
                store.name.toLowerCase().includes(query) ||
                store.description?.toLowerCase().includes(query) ||
                store.category.toLowerCase().includes(query) ||
                store.location.toLowerCase().includes(query)

            const matchesCategory =
                category === 'all' ||
                store.categorySlug === category

            return matchesSearch && matchesCategory
        })
    }, [query, category])

    const handleSearch = (e) => {
        e.preventDefault()

        const value = search.trim()

        if (value) {
            setSearchParams({ q: value })
        } else {
            setSearchParams({})
        }
    }

    const clearSearch = () => {
        setSearch('')
        setSearchParams({})
    }

    const hasResults =
        filteredProducts.length > 0 || filteredStores.length > 0

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Search Header */}
                <div className="mb-8">
                    <p className="text-sm text-green-600 font-medium mb-2">
                        StorePilot Search
                    </p>

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                        Search StorePilot
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Find products and stores across the marketplace.
                    </p>
                </div>

                {/* Search Bar */}
                <form
                    onSubmit={handleSearch}
                    className="relative mb-6"
                >
                    <MdSearch
                        size={23}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                        type="text"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search for products, stores, categories..."
                        className="w-full h-14 pl-12 pr-28 bg-white border border-gray-200 rounded-xl outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
                    />

                    {search && (
                        <button
                            type="button"
                            onClick={clearSearch}
                            className="absolute right-24 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
                        >
                            <MdClose size={21} />
                        </button>
                    )}

                    <button
                        type="submit"
                        className="absolute right-2 top-2 bottom-2 px-5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                    >
                        Search
                    </button>
                </form>

                {/* Filters */}
                <div className="bg-white border border-gray-100 rounded-xl p-4 mb-8">
                    <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

                        <div className="flex-1">
                            <label className="block text-xs font-medium text-gray-500 mb-2">
                                Category
                            </label>

                            <select
                                value={category}
                                onChange={(e) =>
                                    setCategory(e.target.value)
                                }
                                className="w-full sm:w-72 px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-green-500"
                            >
                                <option value="all">
                                    All Categories
                                </option>

                                {categories.map((item) => (
                                    <option
                                        key={item.id}
                                        value={item.slug}
                                    >
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-500 mb-2">
                                Sort Products
                            </label>

                            <select
                                value={sort}
                                onChange={(e) =>
                                    setSort(e.target.value)
                                }
                                className="w-full sm:w-56 px-3 py-2.5 border border-gray-200 rounded-lg outline-none focus:border-green-500"
                            >
                                <option value="relevance">
                                    Relevance
                                </option>

                                <option value="newest">
                                    Newest
                                </option>

                                <option value="rating">
                                    Highest Rated
                                </option>

                                <option value="price-low">
                                    Price: Low to High
                                </option>

                                <option value="price-high">
                                    Price: High to Low
                                </option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Search Summary */}
                <div className="flex items-center justify-between mb-5">
                    <div>
                        <h2 className="text-lg font-bold text-gray-900">
                            {query
                                ? `Results for "${search}"`
                                : 'All Results'}
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            {filteredProducts.length} products ·{' '}
                            {filteredStores.length} stores
                        </p>
                    </div>
                </div>

                {!hasResults ? (
                    <div className="bg-white rounded-2xl border border-gray-100 text-center px-6 py-16">
                        <div className="w-16 h-16 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                            <MdSearch
                                size={32}
                                className="text-gray-400"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">
                            No results found
                        </h2>

                        <p className="text-gray-500 mt-2 max-w-md mx-auto">
                            Try a different product name, store name,
                            category, or search term.
                        </p>

                        <button
                            onClick={() => {
                                clearSearch()
                                setCategory('all')
                            }}
                            className="mt-5 px-5 py-2.5 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
                        >
                            Clear Search
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Stores */}
                        {filteredStores.length > 0 && (
                            <section className="mb-10">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Stores
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Stores matching your search
                                        </p>
                                    </div>

                                    <Link
                                        to="/stores"
                                        className="text-sm font-medium text-green-600 hover:text-green-700"
                                    >
                                        View all
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {filteredStores.slice(0, 6).map(
                                        (store) => (
                                            <Link
                                                key={store.id}
                                                to={`/stores/${store.slug}`}
                                                className="bg-white border border-gray-100 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition"
                                            >
                                                <img
                                                    src={store.logo}
                                                    alt={store.name}
                                                    className="w-14 h-14 rounded-xl object-cover"
                                                />

                                                <div className="min-w-0 flex-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-gray-900 truncate">
                                                            {store.name}
                                                        </h3>

                                                        {store.verified && (
                                                            <span className="text-xs text-green-600">
                                                                ✓
                                                            </span>
                                                        )}
                                                    </div>

                                                    <p className="text-xs text-gray-500 mt-1">
                                                        {store.category}
                                                    </p>

                                                    <div className="flex items-center gap-1 mt-2 text-xs text-gray-500">
                                                        <MdStar
                                                            size={14}
                                                            className="text-yellow-500"
                                                        />
                                                        {store.rating}
                                                        <span>
                                                            ·
                                                        </span>
                                                        {store.productsCount}{' '}
                                                        products
                                                    </div>
                                                </div>

                                                <MdStore
                                                    size={20}
                                                    className="text-gray-300"
                                                />
                                            </Link>
                                        )
                                    )}
                                </div>
                            </section>
                        )}

                        {/* Products */}
                        {filteredProducts.length > 0 && (
                            <section>
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Products
                                        </h2>

                                        <p className="text-sm text-gray-500">
                                            Products matching your search
                                        </p>
                                    </div>

                                    <Link
                                        to="/products"
                                        className="text-sm font-medium text-green-600 hover:text-green-700"
                                    >
                                        View all
                                    </Link>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                    {filteredProducts.map(
                                        (product) => (
                                            <div
                                                key={product.id}
                                                className="bg-white rounded-xl border border-gray-100 overflow-hidden group"
                                            >
                                                {/* Image */}
                                                <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                                    <Link
                                                        to={`/products/${product.slug}`}
                                                    >
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                        />
                                                    </Link>

                                                    <button
                                                        onClick={() =>
                                                            toggleWishlist(
                                                                product
                                                            )
                                                        }
                                                        className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center transition"
                                                        aria-label="Toggle wishlist"
                                                    >
                                                        {isWishlisted(
                                                            product.id
                                                        ) ? (
                                                            <MdFavorite
                                                                size={20}
                                                                className="text-red-500"
                                                            />
                                                        ) : (
                                                            <MdFavoriteBorder
                                                                size={20}
                                                                className="text-gray-500"
                                                            />
                                                        )}
                                                    </button>
                                                </div>

                                                {/* Info */}
                                                <div className="p-4">
                                                    <Link
                                                        to={`/products/${product.slug}`}
                                                    >
                                                        <p className="text-xs text-green-600 font-medium">
                                                            {
                                                                product.category
                                                            }
                                                        </p>

                                                        <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2 hover:text-green-600">
                                                            {
                                                                product.name
                                                            }
                                                        </h3>
                                                    </Link>

                                                    <div className="flex items-center gap-1 mt-2 text-sm">
                                                        <MdStar
                                                            size={16}
                                                            className="text-yellow-500"
                                                        />

                                                        <span className="font-medium">
                                                            {
                                                                product.rating
                                                            }
                                                        </span>

                                                        <span className="text-gray-400">
                                                            (
                                                            {
                                                                product.reviews
                                                            }
                                                            )
                                                        </span>
                                                    </div>

                                                    <div className="flex items-center justify-between gap-3 mt-3">
                                                        <div>
                                                            <p className="font-bold text-gray-900">
                                                                ₦
                                                                {product.price.toLocaleString()}
                                                            </p>

                                                            {product.oldPrice && (
                                                                <p className="text-xs text-gray-400 line-through">
                                                                    ₦
                                                                    {product.oldPrice.toLocaleString()}
                                                                </p>
                                                            )}
                                                        </div>

                                                        <button
                                                            onClick={() =>
                                                                addToCart(
                                                                    product
                                                                )
                                                            }
                                                            disabled={
                                                                product.stock <=
                                                                0
                                                            }
                                                            className="w-10 h-10 rounded-lg bg-green-600 text-white flex items-center justify-center hover:bg-green-700 disabled:bg-gray-300 transition"
                                                            aria-label="Add to cart"
                                                        >
                                                            <MdShoppingCart
                                                                size={19}
                                                            />
                                                        </button>
                                                    </div>

                                                    <Link
                                                        to={`/stores/${product.storeSlug}`}
                                                        className="block text-xs text-gray-500 mt-3 hover:text-green-600"
                                                    >
                                                        {product.store}
                                                    </Link>
                                                </div>
                                            </div>
                                        )
                                    )}
                                </div>
                            </section>
                        )}
                    </>
                )}
            </main>
        </div>
    )
}