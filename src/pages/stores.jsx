import React, { useMemo, useState } from 'react'
import {
    MdCheckCircle,
    MdChevronRight,
    MdFilterList,
    MdLocationOn,
    MdSearch,
    MdStar,
    MdStorefront
} from 'react-icons/md'
import { Link } from 'react-router-dom'

import Header from '../components/header'
import stores from '../data/stores'
import categories from '../data/categories'

export default function Stores() {
    const [mobileMenu, setMobileMenu] = useState(false)
    const [search, setSearch] = useState('')
    const [category, setCategory] = useState('all')
    const [sort, setSort] = useState('featured')

    const filteredStores = useMemo(() => {
        let result = [...stores]

        const searchValue = search.trim().toLowerCase()

        if (searchValue) {
            result = result.filter(
                (store) =>
                    store.name
                        .toLowerCase()
                        .includes(searchValue) ||
                    store.description
                        .toLowerCase()
                        .includes(searchValue) ||
                    store.category
                        .toLowerCase()
                        .includes(searchValue) ||
                    store.location
                        .toLowerCase()
                        .includes(searchValue)
            )
        }

        if (category !== 'all') {
            result = result.filter(
                (store) =>
                    store.categorySlug === category
            )
        }

        if (sort === 'rating') {
            result.sort(
                (a, b) => b.rating - a.rating
            )
        }

        if (sort === 'reviews') {
            result.sort(
                (a, b) => b.reviews - a.reviews
            )
        }

        if (sort === 'products') {
            result.sort(
                (a, b) =>
                    b.productsCount -
                    a.productsCount
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
    }, [search, category, sort])

    const featuredStores = stores.filter(
        (store) => store.featured
    )

    return (
        <div className="min-h-screen bg-slate-50">
            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            <main>
                {/* Hero */}
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-12">
                        <div className="mx-auto max-w-3xl text-center">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                                <MdStorefront
                                    size={30}
                                    className="text-slate-800"
                                />
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Discover Stores
                            </h1>

                            <p className="mx-auto mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                                Explore trusted stores on
                                StorePilot and discover
                                products from sellers across
                                different categories.
                            </p>

                            <div className="relative mx-auto mt-7 max-w-xl">
                                <MdSearch
                                    size={22}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(
                                            e.target.value
                                        )
                                    }
                                    placeholder="Search stores..."
                                    className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-12 pr-4 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Stores */}
                {!search && category === 'all' && (
                    <section className="mx-auto max-w-7xl px-4 py-10">
                        <div className="mb-6 flex items-end justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                    Explore
                                </p>

                                <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                    Featured Stores
                                </h2>
                            </div>

                            <span className="hidden text-sm text-slate-500 sm:block">
                                Popular stores on StorePilot
                            </span>
                        </div>

                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {featuredStores
                                .slice(0, 4)
                                .map((store) => (
                                    <Link
                                        key={store.id}
                                        to={`/stores/${store.slug}`}
                                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        <div className="relative h-32 overflow-hidden bg-slate-100">
                                            <img
                                                src={
                                                    store.cover
                                                }
                                                alt={
                                                    store.name
                                                }
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />

                                            <div className="absolute inset-0 bg-black/20" />

                                            <div className="absolute bottom-3 left-4 flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white shadow">
                                                <img
                                                    src={
                                                        store.logo
                                                    }
                                                    alt=""
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        </div>

                                        <div className="p-4 pt-7">
                                            <div className="flex items-center gap-1">
                                                <h3 className="font-semibold text-slate-900">
                                                    {
                                                        store.name
                                                    }
                                                </h3>

                                                {store.verified && (
                                                    <MdCheckCircle
                                                        size={
                                                            16
                                                        }
                                                        className="text-blue-500"
                                                    />
                                                )}
                                            </div>

                                            <p className="mt-1 text-xs text-slate-500">
                                                {
                                                    store.category
                                                }
                                            </p>

                                            <div className="mt-3 flex items-center gap-1">
                                                <MdStar
                                                    size={16}
                                                    className="text-yellow-500"
                                                />

                                                <span className="text-xs font-semibold text-slate-700">
                                                    {
                                                        store.rating
                                                    }
                                                </span>

                                                <span className="text-xs text-slate-400">
                                                    (
                                                    {
                                                        store
                                                            .reviews
                                                    }{' '}
                                                    reviews)
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </section>
                )}

                {/* All Stores */}
                <section className="mx-auto max-w-7xl px-4 pb-16">
                    <div className="flex flex-col gap-6 lg:flex-row">
                        {/* Filters */}
                        <aside className="w-full shrink-0 lg:w-64">
                            <div className="rounded-2xl border border-slate-200 bg-white p-5">
                                <div className="mb-5 flex items-center gap-2">
                                    <MdFilterList
                                        size={20}
                                        className="text-slate-700"
                                    />

                                    <h2 className="font-semibold text-slate-900">
                                        Categories
                                    </h2>
                                </div>

                                <div className="flex gap-2 overflow-x-auto pb-1 lg:block lg:space-y-1">
                                    <button
                                        onClick={() =>
                                            setCategory(
                                                'all'
                                            )
                                        }
                                        className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition lg:block lg:w-full ${
                                            category ===
                                            'all'
                                                ? 'bg-slate-900 text-white'
                                                : 'text-slate-600 hover:bg-slate-50'
                                        }`}
                                    >
                                        All Stores
                                    </button>

                                    {categories.map(
                                        (item) => (
                                            <button
                                                key={
                                                    item.id
                                                }
                                                onClick={() =>
                                                    setCategory(
                                                        item.slug
                                                    )
                                                }
                                                className={`whitespace-nowrap rounded-lg px-3 py-2 text-left text-sm font-medium transition lg:block lg:w-full ${
                                                    category ===
                                                    item.slug
                                                        ? 'bg-slate-900 text-white'
                                                        : 'text-slate-600 hover:bg-slate-50'
                                                }`}
                                            >
                                                {
                                                    item.name
                                                }
                                            </button>
                                        )
                                    )}
                                </div>
                            </div>
                        </aside>

                        {/* Store results */}
                        <div className="min-w-0 flex-1">
                            <div className="mb-5 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                                <p className="text-sm text-slate-500">
                                    Showing{' '}
                                    <span className="font-semibold text-slate-900">
                                        {
                                            filteredStores.length
                                        }
                                    </span>{' '}
                                    stores
                                </p>

                                <select
                                    value={sort}
                                    onChange={(e) =>
                                        setSort(
                                            e.target.value
                                        )
                                    }
                                    className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-slate-400"
                                >
                                    <option value="featured">
                                        Featured
                                    </option>

                                    <option value="rating">
                                        Highest Rated
                                    </option>

                                    <option value="reviews">
                                        Most Reviewed
                                    </option>

                                    <option value="products">
                                        Most Products
                                    </option>
                                </select>
                            </div>

                            {filteredStores.length > 0 ? (
                                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                                    {filteredStores.map(
                                        (store) => (
                                            <Link
                                                key={
                                                    store.id
                                                }
                                                to={`/stores/${store.slug}`}
                                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                            >
                                                <div className="relative h-40 overflow-hidden bg-slate-100">
                                                    <img
                                                        src={
                                                            store.cover
                                                        }
                                                        alt={
                                                            store.name
                                                        }
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    />

                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

                                                    {store.featured && (
                                                        <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-slate-800">
                                                            Featured
                                                        </span>
                                                    )}

                                                    <div className="absolute bottom-0 left-4 translate-y-1/2 flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl border-2 border-white bg-white shadow-md">
                                                        <img
                                                            src={
                                                                store.logo
                                                            }
                                                            alt={
                                                                store.name
                                                            }
                                                            className="h-full w-full object-cover"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="p-5 pt-10">
                                                    <div className="flex items-center gap-1">
                                                        <h3 className="font-bold text-slate-900">
                                                            {
                                                                store.name
                                                            }
                                                        </h3>

                                                        {store.verified && (
                                                            <MdCheckCircle
                                                                size={
                                                                    17
                                                                }
                                                                className="text-blue-500"
                                                            />
                                                        )}
                                                    </div>

                                                    <p className="mt-1 text-xs font-medium text-slate-500">
                                                        {
                                                            store.category
                                                        }
                                                    </p>

                                                    <p className="mt-3 line-clamp-2 text-sm leading-5 text-slate-500">
                                                        {
                                                            store.description
                                                        }
                                                    </p>

                                                    <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
                                                        <span className="flex items-center gap-1">
                                                            <MdStar
                                                                size={
                                                                    16
                                                                }
                                                                className="text-yellow-500"
                                                            />

                                                            <strong className="text-slate-700">
                                                                {
                                                                    store.rating
                                                                }
                                                            </strong>
                                                        </span>

                                                        <span>
                                                            {
                                                                store
                                                                    .reviews
                                                            }{' '}
                                                            reviews
                                                        </span>

                                                        <span>
                                                            {
                                                                store
                                                                    .productsCount
                                                            }{' '}
                                                            products
                                                        </span>
                                                    </div>

                                                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                                        <span className="flex items-center gap-1 text-xs text-slate-500">
                                                            <MdLocationOn
                                                                size={
                                                                    15
                                                                }
                                                            />

                                                            {
                                                                store.location
                                                            }
                                                        </span>

                                                        <span className="flex items-center gap-1 text-xs font-semibold text-slate-900">
                                                            Visit
                                                            Store
                                                            <MdChevronRight
                                                                size={
                                                                    17
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    )}
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center">
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                        <MdStorefront
                                            size={30}
                                            className="text-slate-400"
                                        />
                                    </div>

                                    <h2 className="text-lg font-bold text-slate-900">
                                        No stores found
                                    </h2>

                                    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                        Try searching for a
                                        different store or
                                        selecting another
                                        category.
                                    </p>

                                    <button
                                        onClick={() => {
                                            setSearch('')
                                            setCategory(
                                                'all'
                                            )
                                        }}
                                        className="mt-5 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                                    >
                                        View All Stores
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}