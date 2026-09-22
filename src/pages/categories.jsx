import React, { useMemo, useState } from 'react'
import {
    MdArrowForward,
    MdCategory,
    MdChevronRight,
    MdHome,
    MdLaptop,
    MdLocalGroceryStore,
    MdSearch,
    MdShoppingBag,
    MdStorefront
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import Header from '../components/header'




export default function Categories({categories}) {
const popularCategories = categories.slice(0, 6)
    const [mobileMenu, setMobileMenu] = useState(false)
    const [search, setSearch] = useState('')

    const filteredCategories = useMemo(() => {
        const value = search.trim().toLowerCase()

        if (!value) return categories

        return categories.filter(
            (category) =>
                category.name.toLowerCase().includes(value) ||
                category.description.toLowerCase().includes(value)
        )
    }, [search])

    return (
        <div className="min-h-screen bg-slate-50">

            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            <main>

                {/* Hero */}
                <section className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">

                        <div className="mx-auto max-w-2xl text-center">

                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <MdCategory size={28} />
                            </div>

                            <p className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                                Explore StorePilot
                            </p>

                            <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                                Shop by Category
                            </h1>

                            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">
                                Discover products from different stores across
                                the marketplace. Find exactly what you need by
                                browsing a category.
                            </p>

                            {/* Search */}
                            <div className="mx-auto mt-7 flex h-12 max-w-xl items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-emerald-400 focus-within:bg-white">
                                <MdSearch
                                    size={21}
                                    className="shrink-0 text-slate-400"
                                />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) =>
                                        setSearch(e.target.value)
                                    }
                                    placeholder="Search categories..."
                                    className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                                />

                                {search && (
                                    <button
                                        onClick={() => setSearch('')}
                                        className="text-xs font-semibold text-slate-400 hover:text-slate-700"
                                    >
                                        Clear
                                    </button>
                                )}
                            </div>

                        </div>
                    </div>
                </section>

                {/* Popular Categories */}
                {!search && (
                    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">

                        <div className="mb-5 flex items-end justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                                    Popular
                                </p>

                                <h2 className="mt-1 text-xl font-bold text-slate-900">
                                    Popular Categories
                                </h2>
                            </div>

                            <span className="text-xs text-slate-400">
                                {categories.length} categories
                            </span>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
                            {popularCategories.map((category) => {
                                const Icon = category.icon

                                return (
                                    <Link
                                        key={category.id}
                                        to={`/categories/${category.slug}`}
                                        className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md"
                                    >
                                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                                            <Icon size={22} />
                                        </div>

                                        <h3 className="mt-4 text-sm font-bold text-slate-900">
                                            {category.name}
                                        </h3>

                                        <p className="mt-1 text-[11px] text-slate-400">
                                            {category.count && `${category.count} products`}
                                        </p>

                                        <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-600 opacity-0 transition group-hover:opacity-100">
                                            Explore
                                            <MdArrowForward size={14} />
                                        </div>
                                    </Link>
                                )
                            })}
                        </div>

                    </section>
                )}

                {/* All Categories */}
                <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">

                    <div className="mb-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                            Browse
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-slate-900">
                            {search
                                ? `Search results for "${search}"`
                                : 'All Categories'}
                        </h2>

                        <p className="mt-1 text-xs text-slate-400">
                            {filteredCategories.length}{' '}
                            {filteredCategories.length === 1
                                ? 'category'
                                : 'categories'}
                        </p>
                    </div>

                    {filteredCategories.length > 0 ? (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                            {filteredCategories.map((category) => {
                                const Icon = category.icon

                                return (
                                    <Link
                                        key={category.id}
                                        to={`/categories/${category.slug}`}
                                        className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                                    >

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-emerald-50 group-hover:text-emerald-600">
                                            <Icon size={23} />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h3 className="text-sm font-bold text-slate-900">
                                                {category.name}
                                            </h3>

                                            <p className="mt-1 line-clamp-1 text-xs text-slate-400">
                                                {category.description}
                                            </p>

                                            <p className="mt-2 text-[10px] font-semibold text-slate-400">
                                                {category.count && `${category.count} products`}
                                            </p>
                                        </div>

                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-300 transition group-hover:bg-slate-100 group-hover:text-slate-600">
                                            <MdChevronRight size={20} />
                                        </div>

                                    </Link>
                                )
                            })}

                        </div>
                    ) : (
                        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-14 text-center shadow-sm">

                            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <MdSearch size={27} />
                            </div>

                            <h3 className="mt-4 text-base font-bold text-slate-900">
                                No categories found
                            </h3>

                            <p className="mt-2 text-sm text-slate-500">
                                Try searching for another category.
                            </p>

                            <button
                                onClick={() => setSearch('')}
                                className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                            >
                                View All Categories
                            </button>

                        </div>
                    )}

                </section>

                {/* Seller CTA */}
                <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">

                    <div className="overflow-hidden rounded-2xl bg-slate-900 px-5 py-7 sm:px-8 sm:py-8">

                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-start gap-4">

                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
                                    <MdStorefront size={23} />
                                </div>

                                <div>
                                    <h2 className="text-base font-bold text-white">
                                        Have products to sell?
                                    </h2>

                                    <p className="mt-1 max-w-lg text-xs leading-5 text-slate-400">
                                        Create your store on StorePilot and
                                        reach customers looking for products
                                        like yours.
                                    </p>
                                </div>

                            </div>

                            <Link
                                to="/sell"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
                            >
                                Start Selling
                                <MdArrowForward size={17} />
                            </Link>

                        </div>
                    </div>

                </section>

            </main>

            {/* Footer */}
            <footer className="border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">

                    <Link
                        to="/"
                        className="flex items-center justify-center gap-2 sm:justify-start"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                            <MdStorefront size={17} />
                        </div>

                        <span className="text-sm font-bold text-slate-900">
                            StorePilot
                        </span>
                    </Link>

                    <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
                        <Link
                            to="/products"
                            className="hover:text-slate-700"
                        >
                            Products
                        </Link>

                        <Link
                            to="/stores"
                            className="hover:text-slate-700"
                        >
                            Stores
                        </Link>

                        <Link
                            to="/sell"
                            className="hover:text-slate-700"
                        >
                            Sell
                        </Link>
                    </div>

                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} StorePilot
                    </p>

                </div>
            </footer>

        </div>
    )
}