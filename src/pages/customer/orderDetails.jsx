import React, { useState } from 'react'
import {
    MdArrowBack,
    MdArrowForward,
    MdCheckCircle,
    MdCreditCard,
    MdHome,
    MdLocationOn,
    MdLocalShipping,
    MdLock,
    MdPayments,
    MdShoppingBag,
    MdStorefront,
    MdPhone,
    MdEmail,
    MdAccessTime,
    MdReceiptLong
} from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../../components/header'
import { useOrders } from '../../contexts/orderProvider'
import { useUser } from '../../contexts/userProvider'
import { UserOnly } from '../../components/userOnly'

export default function OrderDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

    const { getOrderById } = useOrders()

    const [mobileMenu, setMobileMenu] = useState(false)

    const order = getOrderById(id)

    const formatPrice = (price) => {
        return `₦${Number(price || 0).toLocaleString()}`
    }

    const formatDate = (date) => {
        if (!date) return ''

        return new Date(date).toLocaleDateString('en-NG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        })
    }
const {userLoading} = useUser();
    const formatDateTime = (date) => {
        if (!date) return ''

        return new Date(date).toLocaleString('en-NG', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit'
        })
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Delivered':
                return {
                    wrapper: 'bg-emerald-50 border-emerald-200',
                    icon: 'bg-emerald-500 text-white',
                    text: 'text-emerald-700',
                    description: 'Your order has been delivered.'
                }

            case 'Shipped':
                return {
                    wrapper: 'bg-blue-50 border-blue-200',
                    icon: 'bg-blue-500 text-white',
                    text: 'text-blue-700',
                    description: 'Your order is on the way.'
                }

            case 'Cancelled':
                return {
                    wrapper: 'bg-red-50 border-red-200',
                    icon: 'bg-red-500 text-white',
                    text: 'text-red-700',
                    description: 'This order has been cancelled.'
                }

            default:
                return {
                    wrapper: 'bg-amber-50 border-amber-200',
                    icon: 'bg-amber-500 text-white',
                    text: 'text-amber-700',
                    description: 'Your order is being processed.'
                }
        }
    }

    const getStatusStep = (status) => {
        switch (status) {
            case 'Delivered':
                return 4

            case 'Shipped':
                return 3

            case 'Cancelled':
                return 0

            default:
                return 2
        }
    }

    const getPaymentLabel = (method) => {
        if (method === 'paystack') {
            return 'Pay online'
        }

        if (method === 'cash') {
            return 'Cash on Delivery'
        }

        return method || 'Not specified'
    }

    if (!order) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                />
                <UserOnly loading={userLoading}>
                <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">

                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <MdReceiptLong
                                size={30}
                                className="text-slate-500"
                            />
                        </div>

                        <h1 className="text-xl font-bold text-slate-900">
                            Order not found
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            We couldn't find the order you're looking for.
                            It may no longer be available.
                        </p>

                        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">

                            <button
                                onClick={() => navigate(-1)}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                            >
                                <MdArrowBack size={18} />
                                Go Back
                            </button>

                            <Link
                                to="/products"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Continue Shopping
                                <MdArrowForward size={18} />
                            </Link>

                        </div>

                    </div>
                </main>
                </UserOnly>
            </div>
        )
    }

    const statusStyle = getStatusStyle(order.status)
    const currentStep = getStatusStep(order.status)

    const deliveryFee = order.delivery?.fee || 0

    return (
        <div className="min-h-screen bg-slate-50">

            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />
            <UserOnly loading={userLoading}>
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

                    {/* Back */}
                    <Link
                        to="/orders"
                        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <MdArrowBack size={19} />
                        My Orders
                    </Link>

                    {/* Header */}
                    <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

                        <div>
                            <div className="flex items-center gap-3">

                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500 text-white">
                                    <MdCheckCircle size={22} />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                        Order Confirmed
                                    </h1>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Thank you for shopping with StorePilot.
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="rounded-xl border border-slate-200 bg-white px-4 py-3">
                            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                                Order Number
                            </p>

                            <p className="mt-1 text-sm font-bold text-slate-900">
                                {order.orderNumber}
                            </p>
                        </div>

                    </div>

                    {/* Status */}
                    <section
                        className={`mb-6 rounded-2xl border p-5 sm:p-6 ${statusStyle.wrapper}`}
                    >
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                            <div className="flex items-start gap-3">

                                <div
                                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${statusStyle.icon}`}
                                >
                                    <MdLocalShipping size={22} />
                                </div>

                                <div>
                                    <p className={`text-sm font-bold ${statusStyle.text}`}>
                                        {order.status}
                                    </p>

                                    <p className="mt-1 text-xs text-slate-600">
                                        {statusStyle.description}
                                    </p>

                                    <p className="mt-2 flex items-center gap-1.5 text-[10px] text-slate-500">
                                        <MdAccessTime size={13} />
                                        Placed {formatDateTime(order.createdAt)}
                                    </p>
                                </div>

                            </div>

                            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                                <MdReceiptLong size={17} />
                                {order.items.length}{' '}
                                {order.items.length === 1 ? 'item' : 'items'}
                            </div>

                        </div>
                    </section>

                    {/* Order Progress */}
                    {order.status !== 'Cancelled' && (
                        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                            <h2 className="mb-6 text-base font-bold text-slate-900">
                                Order Progress
                            </h2>

                            <div className="relative">

                                <div className="absolute left-4 right-4 top-4 hidden h-px bg-slate-200 sm:block" />

                                <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">

                                    {[
                                        {
                                            label: 'Order Placed',
                                            step: 1
                                        },
                                        {
                                            label: 'Processing',
                                            step: 2
                                        },
                                        {
                                            label: 'Shipped',
                                            step: 3
                                        },
                                        {
                                            label: 'Delivered',
                                            step: 4
                                        }
                                    ].map((item) => {
                                        const completed =
                                            currentStep >= item.step

                                        return (
                                            <div
                                                key={item.step}
                                                className="relative flex flex-col items-center text-center"
                                            >

                                                <div
                                                    className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white text-[10px] font-bold ${completed
                                                            ? 'bg-emerald-500 text-white'
                                                            : 'bg-slate-100 text-slate-400'
                                                        }`}
                                                >
                                                    {completed ? (
                                                        <MdCheckCircle size={17} />
                                                    ) : (
                                                        item.step
                                                    )}
                                                </div>

                                                <p
                                                    className={`mt-2 text-[10px] font-semibold ${completed
                                                            ? 'text-slate-900'
                                                            : 'text-slate-400'
                                                        }`}
                                                >
                                                    {item.label}
                                                </p>

                                            </div>
                                        )
                                    })}

                                </div>

                            </div>

                        </section>
                    )}

                    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

                        {/* LEFT */}
                        <div className="space-y-6">

                            {/* Ordered Products */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-5 flex items-center justify-between">
                                    <div>
                                        <h2 className="text-base font-bold text-slate-900">
                                            Ordered Products
                                        </h2>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Products included in this order.
                                        </p>
                                    </div>

                                    <MdShoppingBag
                                        size={22}
                                        className="text-slate-400"
                                    />
                                </div>

                                <div className="divide-y divide-slate-100">

                                    {order.items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex gap-4 py-4 first:pt-0 last:pb-0"
                                        >

                                            <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>

                                            <div className="min-w-0 flex-1">

                                                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                                                    <div>

                                                        <h3 className="text-sm font-semibold text-slate-900">
                                                            {item.name}
                                                        </h3>

                                                        {item.store && (
                                                            <div className="mt-1 flex items-center gap-1">
                                                                <MdStorefront
                                                                    size={14}
                                                                    className="text-slate-400"
                                                                />

                                                                <span className="text-xs text-slate-400">
                                                                    {item.store}
                                                                </span>
                                                            </div>
                                                        )}

                                                    </div>

                                                    <p className="text-sm font-bold text-slate-900">
                                                        {formatPrice(
                                                            item.price *
                                                            item.quantity
                                                        )}
                                                    </p>

                                                </div>

                                                <div className="mt-3 flex items-center gap-4">

                                                    <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
                                                        Qty: {item.quantity}
                                                    </span>

                                                    <span className="text-xs text-slate-400">
                                                        {formatPrice(item.price)} each
                                                    </span>

                                                </div>

                                            </div>

                                        </div>
                                    ))}

                                </div>

                            </section>

                            {/* Delivery Address */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-5 flex items-start gap-3">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                        <MdLocationOn
                                            size={21}
                                            className="text-slate-600"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-slate-900">
                                            Delivery Address
                                        </h2>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Your order will be delivered here.
                                        </p>
                                    </div>

                                </div>

                                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">

                                    <div className="flex gap-3">

                                        <MdHome
                                            size={18}
                                            className="mt-0.5 shrink-0 text-slate-400"
                                        />

                                        <div>
                                            <p className="text-sm font-semibold text-slate-800">
                                                {order.customer?.firstName}{' '}
                                                {order.customer?.lastName}
                                            </p>

                                            <p className="mt-1 text-xs leading-5 text-slate-500">
                                                {order.shippingAddress?.address}
                                                <br />
                                                {order.shippingAddress?.city},{' '}
                                                {order.shippingAddress?.state}
                                            </p>

                                            {order.shippingAddress?.landmark && (
                                                <p className="mt-2 text-[10px] text-slate-400">
                                                    Landmark:{' '}
                                                    {order.shippingAddress.landmark}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                </div>

                                <div className="mt-4 grid gap-3 sm:grid-cols-2">

                                    <div className="flex items-center gap-2 rounded-xl border border-slate-100 p-3">
                                        <MdPhone
                                            size={17}
                                            className="text-slate-400"
                                        />

                                        <span className="truncate text-xs text-slate-600">
                                            {order.customer?.phone}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 rounded-xl border border-slate-100 p-3">
                                        <MdEmail
                                            size={17}
                                            className="text-slate-400"
                                        />

                                        <span className="truncate text-xs text-slate-600">
                                            {order.customer?.email}
                                        </span>
                                    </div>

                                </div>

                            </section>

                        </div>

                        {/* RIGHT */}
                        <aside className="lg:sticky lg:top-24 lg:h-fit">
                            <div className="space-y-5">

                                {/* Summary */}
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                    <h2 className="mb-5 text-base font-bold text-slate-900">
                                        Order Summary
                                    </h2>

                                    <div className="space-y-3">

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">
                                                Subtotal
                                            </span>

                                            <span className="font-medium text-slate-800">
                                                {formatPrice(order.subtotal)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">
                                                Delivery
                                            </span>

                                            <span className="font-medium text-slate-800">
                                                {formatPrice(deliveryFee)}
                                            </span>
                                        </div>

                                        <div className="border-t border-slate-100 pt-4">

                                            <div className="flex items-end justify-between">

                                                <div>
                                                    <p className="text-sm font-bold text-slate-900">
                                                        Total
                                                    </p>

                                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                                        Including delivery
                                                    </p>
                                                </div>

                                                <span className="text-xl font-bold tracking-tight text-slate-900">
                                                    {formatPrice(order.total)}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </section>

                                {/* Payment & Delivery */}
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                    <h2 className="mb-5 text-base font-bold text-slate-900">
                                        Payment & Delivery
                                    </h2>

                                    <div className="space-y-4">

                                        <div className="flex items-start gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                                {order.paymentMethod === 'cash' ? (
                                                    <MdPayments
                                                        size={18}
                                                        className="text-slate-600"
                                                    />
                                                ) : (
                                                    <MdCreditCard
                                                        size={18}
                                                        className="text-slate-600"
                                                    />
                                                )}
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold text-slate-900">
                                                    Payment
                                                </p>

                                                <p className="mt-1 text-[11px] text-slate-500">
                                                    {getPaymentLabel(
                                                        order.paymentMethod
                                                    )}
                                                </p>

                                                <span
                                                    className={`mt-2 inline-flex rounded-full px-2 py-1 text-[9px] font-bold ${order.paymentStatus === 'Paid'
                                                            ? 'bg-emerald-50 text-emerald-600'
                                                            : 'bg-amber-50 text-amber-600'
                                                        }`}
                                                >
                                                    {order.paymentStatus}
                                                </span>
                                            </div>

                                        </div>

                                        <div className="border-t border-slate-100" />

                                        <div className="flex items-start gap-3">

                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                                <MdLocalShipping
                                                    size={18}
                                                    className="text-slate-600"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-xs font-semibold text-slate-900">
                                                    Delivery
                                                </p>

                                                <p className="mt-1 text-[11px] text-slate-500">
                                                    {order.delivery?.method ===
                                                        'express'
                                                        ? 'Express Delivery'
                                                        : 'Standard Delivery'}
                                                </p>

                                                <p className="mt-1 text-[10px] text-slate-400">
                                                    {order.delivery?.method ===
                                                        'express'
                                                        ? '1–2 business days'
                                                        : '2–5 business days'}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </section>

                                {/* Protection */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">

                                    <div className="flex gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                                            <MdLock
                                                size={18}
                                                className="text-emerald-500"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-slate-900">
                                                Buyer Protection
                                            </p>

                                            <p className="mt-1 text-[10px] leading-5 text-slate-500">
                                                Your order information is securely
                                                stored and protected.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </aside>

                    </div>

                    {/* Actions */}
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">

                        <Link
                            to="/orders"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                        >
                            <MdArrowBack size={18} />
                            View My Orders
                        </Link>

                        <Link
                            to="/products"
                            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Continue Shopping
                            <MdArrowForward size={18} />
                        </Link>

                    </div>

                </main>
            </UserOnly>
            {/* Footer */}
            <footer className="mt-12 border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">

                        <p className="text-xs text-slate-400">
                            © {new Date().getFullYear()} StorePilot. All
                            rights reserved.
                        </p>

                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>Secure Checkout</span>
                            <span>•</span>
                            <span>Buyer Protection</span>
                        </div>

                    </div>

                </div>
            </footer>

        </div>
    )
}