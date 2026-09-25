import React, { useState } from 'react'
import {
    MdSearch,
    MdShoppingCart,
    MdPersonOutline,
    MdStorefront,
    MdMenu,
    MdClose,
    MdFavoriteBorder,
    MdNotificationsNone
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'

import { useCart } from '../contexts/cartProvider'
import { useUser } from '../contexts/userProvider'
import { useWishlist } from '../contexts/wishlistProvider'

export default function Header({
    mobileMenu,
    setMobileMenu,
}) {
    const { user, ownStore } = useUser()
    const navigate = useNavigate()

    const { cartCount } = useCart()
    const { wishlistCount } = useWishlist()

    const [search, setSearch] = useState('')

    const handleSearch = (e) => {
        e.preventDefault()

        if (!search.trim()) return

        navigate(
            `/search?q=${encodeURIComponent(
                search.trim()
            )}`
        )

        setMobileMenu(false)
    }

    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">

            <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">

                {/* Logo */}

                <Link
                    to="/"
                    className="flex shrink-0 items-center gap-2.5"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white">
                        <MdStorefront size={21} />
                    </div>

                    <span className="text-lg font-bold tracking-tight">
                        StorePilot
                    </span>
                </Link>


                {/* Desktop Search */}

                <form
                    onSubmit={handleSearch}
                    className="hidden flex-1 md:block"
                >
                    <div className="mx-auto flex h-10 max-w-xl items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 transition focus-within:border-slate-300 focus-within:bg-white">

                        <MdSearch
                            size={20}
                            className="text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search products, stores and categories..."
                            className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                        />

                    </div>
                </form>


                {/* Desktop Navigation */}

                <div className="hidden items-center gap-1 sm:flex">

                    {/* Sell */}
                    {ownStore ?
                        <Link className='mr-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900' to={"/store"}>
                            <MdStorefront size={18} />
                            Go to store
                        </Link>
                        : (
                            <Link
                                to="/sell"
                                className="mr-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                                <MdStorefront size={18} />
                                Sell on StorePilot
                            </Link>
                        )
                    }



                    {user == null ? (
                        /* Login */

                        <Link
                            to="/login"
                            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            <MdPersonOutline size={19} />
                            Login
                        </Link>
                    ) : (
                        <>
                            {/* Profile */}

                            <Link
                                to="/account"
                                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-700 flex items-center justify-center shrink-0 hover:opacity-90 transition"
                                title="Profile"
                            >
                                <span className="text-white text-sm font-semibold">
                                    A
                                </span>
                            </Link>


                            {/* Wishlist */}

                            <Link
                                to="/wishlist"
                                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50"
                                title="Wishlist"
                            >
                                <MdFavoriteBorder size={21} />

                                {wishlistCount > 0 && (
                                    <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                                        {wishlistCount > 99
                                            ? '99+'
                                            : wishlistCount}
                                    </span>
                                )}
                            </Link>


                            {/* Notifications */}

                            <Link
                                to="/notifications"
                                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50"
                                title="Notifications"
                            >
                                <MdNotificationsNone size={22} />

                                {/* Notification indicator */}
                                <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
                            </Link>


                            {/* Cart */}

                            <Link
                                to="/cart"
                                className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50"
                                title="Cart"
                            >
                                <MdShoppingCart size={21} />

                                {cartCount > 0 && (
                                    <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-emerald-500 px-1 text-[9px] font-bold text-white">
                                        {cartCount > 99
                                            ? '99+'
                                            : cartCount}
                                    </span>
                                )}
                            </Link>
                        </>
                    )}

                </div>


                {/* Mobile Menu Button */}

                <button
                    onClick={() =>
                        setMobileMenu(!mobileMenu)
                    }
                    className="ml-auto flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-50 sm:hidden"
                >
                    {mobileMenu ? (
                        <MdClose size={22} />
                    ) : (
                        <MdMenu size={22} />
                    )}
                </button>

            </div>


            {/* Mobile Menu */}

            {mobileMenu && (
                <div className="border-t border-slate-100 bg-white px-4 py-4 sm:hidden">

                    {/* Mobile Search */}

                    <form
                        onSubmit={handleSearch}
                        className="mb-3 flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3"
                    >

                        <MdSearch
                            size={19}
                            className="text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search products..."
                            className="w-full bg-transparent text-xs outline-none"
                        />

                    </form>


                    <div className="space-y-1">

                        {/* Sell */}

                        {ownStore ?
                        <Link className='mr-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900' to={"/store"}>
                            <MdStorefront size={18} />
                            Go to store
                        </Link>
                        : (
                            <Link
                                to="/sell"
                                className="mr-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                            >
                                <MdStorefront size={18} />
                                Sell on StorePilot
                            </Link>
                        )
                    }


                        {/* Profile / Login */}

                        <Link
                            to={
                                user == null
                                    ? "/login"
                                    : "/account"
                            }
                            onClick={() =>
                                setMobileMenu(false)
                            }
                            className="flex items-center gap-2 rounded-lg px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                        >
                            <MdPersonOutline size={19} />

                            {user == null
                                ? "Login"
                                : "Profile"}
                        </Link>


                        {/* Logged-in Navigation */}

                        {user != null && (
                            <>
                                {/* Wishlist */}

                                <Link
                                    to="/wishlist"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    <span className="flex items-center gap-2">
                                        <MdFavoriteBorder size={19} />
                                        Wishlist
                                    </span>

                                    {wishlistCount > 0 && (
                                        <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                            {wishlistCount > 99
                                                ? '99+'
                                                : wishlistCount}
                                        </span>
                                    )}
                                </Link>


                                {/* Notifications */}

                                <Link
                                    to="/notifications"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    <span className="flex items-center gap-2">
                                        <MdNotificationsNone size={19} />
                                        Notifications
                                    </span>

                                    {/* Unread indicator */}
                                    <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                                </Link>


                                {/* Cart */}

                                <Link
                                    to="/cart"
                                    onClick={() =>
                                        setMobileMenu(false)
                                    }
                                    className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                                >
                                    <span className="flex items-center gap-2">
                                        <MdShoppingCart size={19} />
                                        Cart
                                    </span>

                                    {cartCount > 0 && (
                                        <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">
                                            {cartCount > 99
                                                ? '99+'
                                                : cartCount}
                                        </span>
                                    )}
                                </Link>
                            </>
                        )}

                    </div>

                </div>
            )}

        </header>
    )
}