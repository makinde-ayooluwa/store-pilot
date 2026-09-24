import React, { useState } from 'react'
import {
    MdAccountCircle,
    MdArrowForward,
    MdCheckCircle,
    MdEdit,
    MdEmail,
    MdHome,
    MdLocalShipping,
    MdLogout,
    MdLocationOn,
    MdLock,
    MdPerson,
    MdPhone,
    MdReceiptLong,
    MdSave,
    MdShoppingBag,
    MdStorefront
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/header'
import { useOrders } from '../../contexts/orderProvider'
import { useUser } from '../../contexts/userProvider'
import { UserOnly } from '../../components/userOnly'

export default function Account() {
    const navigate = useNavigate()
    const { orders } = useOrders()
    const { data, logout, userLoading } = useUser()
    const [mobileMenu, setMobileMenu] = useState(false)
    const [editing, setEditing] = useState(false)

    const [address, setAddress] = useState({
        address: '',
        city: '',
        state: '',
        landmark: ''
    })


    const handleAddressChange = (e) => {
        const { name, value } = e.target

        setAddress((current) => ({
            ...current,
            [name]: value
        }))
    }

    const handleSave = () => {
        setEditing(false)
    }

    const handleLogout = () => {
        logout();
        navigate('/login')
    }

    const totalSpent = orders.reduce(
        (total, order) => total + Number(order.total || 0),
        0
    )

    const deliveredOrders = orders.filter(
        (order) => order.status === 'Delivered'
    ).length

    const activeOrders = orders.filter(
        (order) =>
            order.status !== 'Delivered' &&
            order.status !== 'Cancelled'
    ).length

    const formatPrice = (price) => {
        return `₦${Number(price || 0).toLocaleString()}`
    }

    return (
        <div className="min-h-screen bg-slate-50">

            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />
            <UserOnly loading={userLoading} currentPage={"profile"}>
                <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Page Header */}
                    <div className="mb-7">
                        <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                            My Account
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Account Settings
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage your profile, delivery information and orders.
                        </p>
                    </div>

                    {/* Profile Hero */}
                    <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                        <div className="h-24 bg-slate-900 sm:h-28" />

                        <div className="px-5 pb-5 sm:px-7">
                            <div className="-mt-10 flex flex-col gap-4 sm:-mt-12 sm:flex-row sm:items-end sm:justify-between">

                                <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-end">
                                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-4 border-white bg-emerald-500 text-white shadow-sm sm:h-24 sm:w-24">
                                        <span className="text-2xl font-bold sm:text-3xl">
                                            {data?.fullname.charAt(0)}
                                        </span>
                                    </div>

                                    <div className="sm:mb-1">
                                        <h2 className="text-lg font-bold text-slate-900">
                                            {data?.fullname}
                                        </h2>

                                        <p className="text-xs text-slate-500">
                                            {data?.email}
                                        </p>
                                    </div>
                                </div>
                                <Link
                                    to="/account/settings"
                                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Account Settings
                                </Link>
                                <Link
                                    to="/account/addresses"
                                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    Manage Addresses
                                </Link>
                                <button
                                    onClick={() => setEditing(!editing)}
                                    className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                                >
                                    <MdEdit size={17} />
                                    {editing ? 'Cancel Editing' : 'Edit Profile'}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* Statistics */}
                    <section className="mb-6 grid grid-cols-2 gap-3 lg:grid-cols-4">

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                    <MdReceiptLong size={21} />
                                </div>

                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Orders
                                </span>
                            </div>

                            <p className="mt-4 text-2xl font-bold text-slate-900">
                                {orders.length}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Total orders
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                                    <MdLocalShipping size={21} />
                                </div>

                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Active
                                </span>
                            </div>

                            <p className="mt-4 text-2xl font-bold text-slate-900">
                                {activeOrders}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Active orders
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                    <MdCheckCircle size={21} />
                                </div>

                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Delivered
                                </span>
                            </div>

                            <p className="mt-4 text-2xl font-bold text-slate-900">
                                {deliveredOrders}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Completed orders
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <div className="flex items-center justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                    <MdShoppingBag size={21} />
                                </div>

                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Spent
                                </span>
                            </div>

                            <p className="mt-4 truncate text-xl font-bold text-slate-900">
                                {formatPrice(totalSpent)}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                                Total purchase value
                            </p>
                        </div>
                    </section>

                    <div className="grid gap-6 lg:grid-cols-3">

                        {/* Left */}
                        <div className="space-y-6 lg:col-span-2">

                            {/* Personal Information */}
                            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                                    <div>
                                        <h2 className="text-sm font-bold text-slate-900">
                                            Personal Information
                                        </h2>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Your basic account information
                                        </p>
                                    </div>

                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                        <MdPerson size={19} />
                                    </div>
                                </div>

                                <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Full Name
                                        </label>

                                        <div className="relative">
                                            <MdPerson className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                                            <input
                                                name="fullname"
                                                value={data?.fullname}
                                                disabled={!editing}
                                                className={`h-11 w-full rounded-xl border pl-10 pr-3 text-sm outline-none transition ${editing
                                                    ? 'border-slate-300 bg-white focus:border-emerald-500'
                                                    : 'border-slate-200 bg-slate-50 text-slate-600'
                                                    }`}
                                            />
                                        </div>
                                    </div>


                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Email Address
                                        </label>

                                        <div className="relative">
                                            <MdEmail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                                            <input
                                                name="email"
                                                type="email"
                                                value={data?.email}
                                                disabled={!editing}
                                                className={`h-11 w-full rounded-xl border pl-10 pr-3 text-sm outline-none transition ${editing
                                                    ? 'border-slate-300 bg-white focus:border-emerald-500'
                                                    : 'border-slate-200 bg-slate-50 text-slate-600'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Phone Number
                                        </label>

                                        <div className="relative">
                                            <MdPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                                            <input
                                                name="phone"
                                                value={data?.phone}
                                                disabled={!editing}
                                                className={`h-11 w-full rounded-xl border pl-10 pr-3 text-sm outline-none transition ${editing
                                                    ? 'border-slate-300 bg-white focus:border-emerald-500'
                                                    : 'border-slate-200 bg-slate-50 text-slate-600'
                                                    }`}
                                            />
                                        </div>
                                    </div>

                                    {editing && (
                                        <div className="sm:col-span-2">
                                            <button
                                                onClick={handleSave}
                                                className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-semibold text-white transition hover:bg-slate-800"
                                            >
                                                <MdSave size={18} />
                                                Save Changes
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </section>

                            {/* Delivery Address */}
                            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

                                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
                                    <div>
                                        <h2 className="text-sm font-bold text-slate-900">
                                            Saved Delivery Address
                                        </h2>

                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Use this address during checkout
                                        </p>
                                    </div>

                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
                                        <MdLocationOn size={19} />
                                    </div>
                                </div>

                                <div className="grid gap-5 p-5 sm:grid-cols-2 sm:p-6">

                                    <div className="sm:col-span-2">
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Street Address
                                        </label>

                                        <div className="relative">
                                            <MdHome className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                                            <input
                                                name="address"
                                                value={address.address}
                                                onChange={handleAddressChange}
                                                placeholder="Enter your delivery address"
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            City
                                        </label>

                                        <input
                                            name="city"
                                            value={address.city}
                                            onChange={handleAddressChange}
                                            placeholder="e.g. Lagos"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            State
                                        </label>

                                        <input
                                            name="state"
                                            value={address.state}
                                            onChange={handleAddressChange}
                                            placeholder="e.g. Lagos State"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-600">
                                            Landmark
                                        </label>

                                        <input
                                            name="landmark"
                                            value={address.landmark}
                                            onChange={handleAddressChange}
                                            placeholder="Nearby landmark (optional)"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none transition focus:border-emerald-500 focus:bg-white"
                                        />
                                    </div>

                                    <div className="sm:col-span-2">
                                        <button
                                            onClick={handleSave}
                                            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                                        >
                                            <MdSave size={18} />
                                            Save Address
                                        </button>
                                    </div>
                                </div>
                            </section>

                        </div>

                        {/* Right */}
                        <aside className="space-y-6">

                            {/* Quick Actions */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                                <div className="mb-4 flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                        <MdAccountCircle size={20} />
                                    </div>

                                    <div>
                                        <h2 className="text-sm font-bold text-slate-900">
                                            Quick Actions
                                        </h2>

                                        <p className="text-[11px] text-slate-400">
                                            Manage your account
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-2">

                                    <Link
                                        to="/orders"
                                        className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <MdReceiptLong
                                                size={19}
                                                className="text-slate-500"
                                            />

                                            <div>
                                                <p className="text-xs font-semibold text-slate-800">
                                                    My Orders
                                                </p>

                                                <p className="text-[10px] text-slate-400">
                                                    View your order history
                                                </p>
                                            </div>
                                        </div>

                                        <MdArrowForward
                                            size={17}
                                            className="text-slate-400"
                                        />
                                    </Link>

                                    <Link
                                        to="/cart"
                                        className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <MdShoppingBag
                                                size={19}
                                                className="text-slate-500"
                                            />

                                            <div>
                                                <p className="text-xs font-semibold text-slate-800">
                                                    Shopping Cart
                                                </p>

                                                <p className="text-[10px] text-slate-400">
                                                    Review items in your cart
                                                </p>
                                            </div>
                                        </div>

                                        <MdArrowForward
                                            size={17}
                                            className="text-slate-400"
                                        />
                                    </Link>

                                    <Link
                                        to="/products"
                                        className="flex items-center justify-between rounded-xl border border-slate-200 p-3 transition hover:border-slate-300 hover:bg-slate-50"
                                    >
                                        <div className="flex items-center gap-3">
                                            <MdStorefront
                                                size={19}
                                                className="text-slate-500"
                                            />

                                            <div>
                                                <p className="text-xs font-semibold text-slate-800">
                                                    Browse Products
                                                </p>

                                                <p className="text-[10px] text-slate-400">
                                                    Continue shopping
                                                </p>
                                            </div>
                                        </div>

                                        <MdArrowForward
                                            size={17}
                                            className="text-slate-400"
                                        />
                                    </Link>

                                </div>
                            </section>

                            {/* Security */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                        <MdLock size={20} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">
                                            Account Security
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Keep your account information secure.
                                            You will be able to change your password
                                            once authentication is connected.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    disabled
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-semibold text-slate-400"
                                >
                                    <MdLock size={17} />
                                    Change Password
                                </button>
                            </section>

                            {/* Logout */}
                            <section className="rounded-2xl border border-red-100 bg-red-50/60 p-5">

                                <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-red-500">
                                        <MdLogout size={20} />
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-bold text-slate-900">
                                            Sign Out
                                        </h3>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Sign out of your StorePilot account on
                                            this device.
                                        </p>
                                    </div>
                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                                >
                                    <MdLogout size={17} />
                                    Logout
                                </button>
                            </section>

                        </aside>
                    </div>

                    {/* Buyer Protection */}
                    <section className="mt-6 rounded-2xl bg-slate-900 px-5 py-6 sm:px-7">
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-start gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
                                    <MdCheckCircle size={21} />
                                </div>

                                <div>
                                    <h3 className="text-sm font-bold text-white">
                                        Shop with confidence
                                    </h3>

                                    <p className="mt-1 max-w-xl text-xs leading-5 text-slate-400">
                                        StorePilot is designed to make discovering
                                        stores, ordering products and tracking
                                        purchases simple and secure.
                                    </p>
                                </div>
                            </div>

                            <Link
                                to="/products"
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
                            >
                                Continue Shopping
                                <MdArrowForward size={17} />
                            </Link>
                        </div>
                    </section>

                </main>
            </UserOnly>

            {/* Footer */}
            <footer className="mt-12 border-t border-slate-200 bg-white">
                <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-7 text-center sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:text-left lg:px-8">

                    <div className="flex items-center justify-center gap-2 sm:justify-start">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-white">
                            <MdStorefront size={17} />
                        </div>

                        <span className="text-sm font-bold text-slate-900">
                            StorePilot
                        </span>
                    </div>

                    <p className="text-xs text-slate-400">
                        © {new Date().getFullYear()} StorePilot. All rights reserved.
                    </p>
                </div>
            </footer>

        </div>
    )
}