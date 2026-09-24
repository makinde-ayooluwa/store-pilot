import React, { useMemo, useState } from 'react'
import {
    MdAccessTime,
    MdArrowBack,
    MdArrowForward,
    MdCancel,
    MdCheckCircle,
    MdFilterList,
    MdLocalShipping,
    MdReceiptLong,
    MdShoppingBag,
    MdStorefront
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import Header from '../../components/header'
import { useOrders } from '../../contexts/orderProvider'
import { useUser } from '../../contexts/userProvider'
import { UserOnly } from '../../components/userOnly'

export default function Orders() {
    const { orders } = useOrders()
const {userLoading} = useUser();
    const [mobileMenu, setMobileMenu] = useState(false)
    const [activeFilter, setActiveFilter] = useState('All')

    const filters = [
        'All',
        'Processing',
        'Shipped',
        'Delivered',
        'Cancelled'
    ]

    const filteredOrders = useMemo(() => {
        if (activeFilter === 'All') {
            return orders
        }

        return orders.filter(
            (order) => order.status === activeFilter
        )
    }, [orders, activeFilter])

    const formatPrice = (price) => {
        return `₦${Number(price || 0).toLocaleString()}`
    }

    const formatDate = (date) => {
        if (!date) return ''

        return new Date(date).toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        })
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Delivered':
                return {
                    className: 'bg-emerald-50 text-emerald-700 border-emerald-100',
                    icon: <MdCheckCircle size={16} />
                }

            case 'Shipped':
                return {
                    className: 'bg-blue-50 text-blue-700 border-blue-100',
                    icon: <MdLocalShipping size={16} />
                }

            case 'Cancelled':
                return {
                    className: 'bg-red-50 text-red-700 border-red-100',
                    icon: <MdCancel size={16} />
                }

            default:
                return {
                    className: 'bg-amber-50 text-amber-700 border-amber-100',
                    icon: <MdAccessTime size={16} />
                }
        }
    }

    return (
        <div className="min-h-screen bg-slate-50">

            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />
            <UserOnly loading={userLoading}>
                <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">

                    {/* Back */}
                    <Link
                        to="/"
                        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <MdArrowBack size={18} />
                        Continue Shopping
                    </Link>

                    {/* Page Header */}
                    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-emerald-600">
                                StorePilot
                            </p>

                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                My Orders
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Track and manage your StorePilot orders.
                            </p>
                        </div>

                        {orders.length > 0 && (
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <MdReceiptLong size={19} />
                                {orders.length} {orders.length === 1 ? 'order' : 'orders'}
                            </div>
                        )}
                    </div>

                    {/* Filters */}
                    {orders.length > 0 && (
                        <div className="mb-6 overflow-x-auto">
                            <div className="flex min-w-max items-center gap-2 rounded-xl border border-slate-200 bg-white p-1.5 shadow-sm">
                                <div className="mr-1 flex h-9 w-9 items-center justify-center rounded-lg text-slate-400">
                                    <MdFilterList size={20} />
                                </div>

                                {filters.map((filter) => {
                                    const count =
                                        filter === 'All'
                                            ? orders.length
                                            : orders.filter(
                                                (order) => order.status === filter
                                            ).length

                                    return (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(filter)}
                                            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition ${activeFilter === filter
                                                    ? 'bg-slate-900 text-white'
                                                    : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                                }`}
                                        >
                                            {filter}

                                            <span
                                                className={`rounded-full px-1.5 py-0.5 text-[10px] ${activeFilter === filter
                                                        ? 'bg-white/15 text-white'
                                                        : 'bg-slate-100 text-slate-500'
                                                    }`}
                                            >
                                                {count}
                                            </span>
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {/* Empty State */}
                    {orders.length === 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center shadow-sm">
                            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <MdShoppingBag size={32} />
                            </div>

                            <h2 className="text-lg font-bold text-slate-900">
                                No orders yet
                            </h2>

                            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                                You haven't placed any orders yet. Browse products
                                and find something you love.
                            </p>

                            <Link
                                to="/products"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Start Shopping
                                <MdArrowForward size={18} />
                            </Link>
                        </div>
                    )}

                    {/* No Filter Results */}
                    {orders.length > 0 && filteredOrders.length === 0 && (
                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-14 text-center shadow-sm">
                            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                                <MdFilterList size={28} />
                            </div>

                            <h2 className="text-lg font-bold text-slate-900">
                                No {activeFilter.toLowerCase()} orders
                            </h2>

                            <p className="mt-2 text-sm text-slate-500">
                                There are no orders matching this filter.
                            </p>

                            <button
                                onClick={() => setActiveFilter('All')}
                                className="mt-5 rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                View All Orders
                            </button>
                        </div>
                    )}

                    {/* Orders */}
                    {filteredOrders.length > 0 && (
                        <div className="space-y-4">
                            {filteredOrders.map((order) => {
                                const status = getStatusStyle(order.status)
                                const visibleItems = order.items?.slice(0, 2) || []
                                const remainingItems =
                                    Math.max((order.items?.length || 0) - 2, 0)

                                return (
                                    <div
                                        key={order.id}
                                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md"
                                    >

                                        {/* Order Header */}
                                        <div className="border-b border-slate-100 px-4 py-4 sm:px-5">
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

                                                <div>
                                                    <div className="flex flex-wrap items-center gap-2">
                                                        <span className="text-sm font-bold text-slate-900">
                                                            {order.orderNumber}
                                                        </span>

                                                        <span className="text-slate-300">
                                                            •
                                                        </span>

                                                        <span className="text-xs text-slate-500">
                                                            {formatDate(order.createdAt)}
                                                        </span>
                                                    </div>

                                                    <div className="mt-1 flex items-center gap-1.5 text-xs text-slate-400">
                                                        <MdStorefront size={15} />
                                                        StorePilot Marketplace
                                                    </div>
                                                </div>

                                                <span
                                                    className={`inline-flex w-fit items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${status.className}`}
                                                >
                                                    {status.icon}
                                                    {order.status}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Order Body */}
                                        <div className="px-4 py-5 sm:px-5">

                                            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                                                {/* Products */}
                                                <div className="min-w-0 flex-1">
                                                    <div className="space-y-3">
                                                        {visibleItems.map((item) => (
                                                            <div
                                                                key={item.id}
                                                                className="flex items-center gap-3"
                                                            >
                                                                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                                                    <img
                                                                        src={item.image}
                                                                        alt={item.name}
                                                                        className="h-full w-full object-cover"
                                                                    />
                                                                </div>

                                                                <div className="min-w-0 flex-1">
                                                                    <p className="truncate text-sm font-semibold text-slate-800">
                                                                        {item.name}
                                                                    </p>

                                                                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-400">
                                                                        <span>
                                                                            Qty: {item.quantity}
                                                                        </span>

                                                                        {item.store && (
                                                                            <>
                                                                                <span>•</span>
                                                                                <span>
                                                                                    {item.store}
                                                                                </span>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                </div>

                                                                <p className="shrink-0 text-sm font-bold text-slate-900">
                                                                    {formatPrice(
                                                                        item.price *
                                                                        item.quantity
                                                                    )}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    {remainingItems > 0 && (
                                                        <p className="mt-3 text-xs font-medium text-slate-400">
                                                            + {remainingItems} more{' '}
                                                            {remainingItems === 1
                                                                ? 'item'
                                                                : 'items'}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Summary */}
                                                <div className="border-t border-slate-100 pt-4 lg:w-56 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                                                    <p className="text-xs text-slate-400">
                                                        Total
                                                    </p>

                                                    <p className="mt-1 text-lg font-bold text-slate-900">
                                                        {formatPrice(order.total)}
                                                    </p>

                                                    <p className="mt-1 text-xs text-slate-400">
                                                        {order.items?.length || 0}{' '}
                                                        {order.items?.length === 1
                                                            ? 'item'
                                                            : 'items'}
                                                    </p>

                                                    <Link
                                                        to={`/orders/${order.id}`}
                                                        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
                                                    >
                                                        View Order
                                                        <MdArrowForward size={16} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Order Footer */}
                                        <div className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/70 px-4 py-3 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                                            <div className="flex items-center gap-2">
                                                <MdLocalShipping size={17} />

                                                <span>
                                                    {order.delivery?.method === 'express'
                                                        ? 'Express delivery'
                                                        : 'Standard delivery'}
                                                </span>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <span>
                                                    Payment:{' '}
                                                    <span className="font-semibold text-slate-700">
                                                        {order.paymentMethod === 'cash'
                                                            ? 'Cash on Delivery'
                                                            : 'Pay online'}
                                                    </span>
                                                </span>

                                                <span className="hidden text-slate-300 sm:inline">
                                                    •
                                                </span>

                                                <span
                                                    className={
                                                        order.paymentStatus === 'Paid'
                                                            ? 'font-semibold text-emerald-600'
                                                            : 'font-semibold text-amber-600'
                                                    }
                                                >
                                                    {order.paymentStatus}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}

                    {/* Bottom CTA */}
                    {orders.length > 0 && (
                        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-slate-900 px-5 py-6 text-center sm:flex-row sm:text-left sm:px-7">
                            <div>
                                <h3 className="text-sm font-bold text-white">
                                    Looking for something else?
                                </h3>

                                <p className="mt-1 text-xs text-slate-400">
                                    Explore more products from stores on StorePilot.
                                </p>
                            </div>

                            <Link
                                to="/products"
                                className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-bold text-slate-900 transition hover:bg-slate-100"
                            >
                                Browse Products
                                <MdArrowForward size={17} />
                            </Link>
                        </div>
                    )}
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