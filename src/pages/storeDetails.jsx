import React, { useMemo, useState } from 'react'
import {
    MdArrowBack,
    MdCheckCircle,
    MdFavorite,
    MdFavoriteBorder,
    MdLocationOn,
    MdSearch,
    MdShoppingCart,
    MdStar,
    MdStorefront
} from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'

import Header from '../components/header'
import { useCart } from '../contexts/cartProvider'
import { getStoreBySlug } from '../data/stores'
import { getProductsByCategory } from '../data/products'
import products from '../data/products'

export default function StoreDetails() {
    const { slug } = useParams()

    const store = getStoreBySlug(slug)

    const {
        addToCart,
        cartCount
    } = useCart()

    const [mobileMenu, setMobileMenu] = useState(false)
    const [search, setSearch] = useState('')
    const [sort, setSort] = useState('featured')
    const [favorites, setFavorites] = useState([])
    const [addedProduct, setAddedProduct] = useState(null)

    if (!store) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                />

                <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16">
                    <div className="text-center">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                            <MdStorefront
                                size={38}
                                className="text-slate-400"
                            />
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Store not found
                        </h1>

                        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                            The store you're looking for
                            doesn't exist or may no longer be
                            available.
                        </p>

                        <Link
                            to="/stores"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            <MdArrowBack />
                            Browse Stores
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    /*
        Products belonging to this store.

        Our current demo products are connected to stores
        using storeSlug.
    */
    const storeProducts = useMemo(() => {
        return products.filter(
            (product) =>
                product.storeSlug === store.slug
        )
    }, [store.slug])

    const filteredProducts = useMemo(() => {
        let result = [...storeProducts]

        const searchValue = search
            .trim()
            .toLowerCase()

        if (searchValue) {
            result = result.filter(
                (product) =>
                    product.name
                        .toLowerCase()
                        .includes(searchValue) ||
                    product.description
                        .toLowerCase()
                        .includes(searchValue) ||
                    product.category
                        .toLowerCase()
                        .includes(searchValue)
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
    }, [storeProducts, search, sort])

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
                                className="hover:text-slate-900"
                            >
                                Home
                            </Link>

                            <span>/</span>

                            <Link
                                to="/stores"
                                className="hover:text-slate-900"
                            >
                                Stores
                            </Link>

                            <span>/</span>

                            <span className="font-medium text-slate-900">
                                {store.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Store Header */}
                <section className="bg-white">
                    <div className="mx-auto max-w-7xl px-4">
                        {/* Cover */}
                        <div className="relative h-52 overflow-hidden rounded-b-3xl bg-slate-100 sm:h-64">
                            <img
                                src={store.cover}
                                alt={store.name}
                                className="h-full w-full object-cover"
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        </div>

                        {/* Store Info */}
                        <div className="relative -mt-10 px-2 pb-8 sm:px-6">
                            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg">
                                        <img
                                            src={store.logo}
                                            alt={store.name}
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="pb-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                                                {store.name}
                                            </h1>

                                            {store.verified && (
                                                <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                                                    <MdCheckCircle
                                                        size={
                                                            15
                                                        }
                                                    />
                                                    Verified
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1 text-sm font-medium text-slate-500">
                                            {store.category}
                                        </p>

                                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <MdStar
                                                    size={
                                                        17
                                                    }
                                                    className="text-yellow-500"
                                                />

                                                <strong className="text-slate-800">
                                                    {
                                                        store.rating
                                                    }
                                                </strong>

                                                (
                                                {
                                                    store.reviews
                                                }{' '}
                                                reviews)
                                            </span>

                                            <span className="flex items-center gap-1">
                                                <MdLocationOn
                                                    size={
                                                        17
                                                    }
                                                />

                                                {
                                                    store.location
                                                }
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:flex">
                                    <div className="rounded-xl bg-slate-50 px-5 py-3 text-center">
                                        <p className="font-bold text-slate-900">
                                            {
                                                store.productsCount
                                            }
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Products
                                        </p>
                                    </div>

                                    <div className="rounded-xl bg-slate-50 px-5 py-3 text-center">
                                        <p className="font-bold text-slate-900">
                                            {
                                                store.reviews
                                            }
                                        </p>

                                        <p className="text-xs text-slate-500">
                                            Reviews
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-500">
                                {store.description}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section className="mx-auto max-w-7xl px-4 py-10">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Store Products
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                Products from {store.name}
                            </h2>
                        </div>

                        <Link
                            to={`/categories/${store.categorySlug}`}
                            className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-900"
                        >
                            Browse {store.category}
                            <MdArrowBack
                                className="rotate-180"
                                size={18}
                            />
                        </Link>
                    </div>

                    {/* Toolbar */}
                    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:max-w-sm">
                            <MdSearch
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                placeholder="Search this store..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                            />
                        </div>

                        <select
                            value={sort}
                            onChange={(e) =>
                                setSort(e.target.value)
                            }
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-slate-400"
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

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {filteredProducts.map(
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
                                            {/* Product image */}
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
                                                    <span className="absolute left-3 top-3 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
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

                                            {/* Product information */}
                                            <div className="p-4">
                                                <Link
                                                    to={`/products/${product.slug}`}
                                                >
                                                    <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold text-slate-900 hover:text-slate-600">
                                                        {
                                                            product.name
                                                        }
                                                    </h3>
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
                                                        className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                                                            addedProduct ===
                                                            product.id
                                                                ? 'bg-green-600 text-white'
                                                                : 'bg-slate-900 text-white hover:bg-slate-700'
                                                        }`}
                                                    >
                                                        <MdShoppingCart
                                                            size={
                                                                20
                                                            }
                                                        />
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

                            <p className="mt-2 text-sm text-slate-500">
                                Try a different search term.
                            </p>
                        </div>
                    )}
                </section>

                {/* Store CTA */}
                <section className="mx-auto max-w-7xl px-4 pb-16">
                    <div className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-400">
                                    Shopping on StorePilot
                                </p>

                                <h2 className="mt-1 text-2xl font-bold">
                                    Discover more stores
                                </h2>

                                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                                    Find more sellers and explore
                                    products across different
                                    categories.
                                </p>
                            </div>

                            <Link
                                to="/stores"
                                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                            >
                                Browse Stores
                                <MdArrowBack
                                    size={18}
                                    className="rotate-180"
                                />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating cart */}
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
        </div>
    )
}