import React, { useMemo, useState } from 'react'
import {
    MdArrowBack,
    MdArrowForward,
    MdCheckCircle,
    MdCreditCard,
    MdDeleteOutline,
    MdKeyboardArrowDown,
    MdLocationOn,
    MdLock,
    MdLocalShipping,
    MdPayments,
    MdPersonOutline,
    MdPhone,
    MdRemove,
    MdAdd,
    MdShoppingBag,
    MdStorefront
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import { useCart } from '../contexts/cartProvider'
import { useOrders } from '../contexts/orderProvider'

export default function Checkout() {
    const navigate = useNavigate()

    const {
        cartItems,
        cartTotal,
        updateQuantity,
        removeFromCart,
        clearCart
    } = useCart()

    const { createOrder } = useOrders()

    const [mobileMenu, setMobileMenu] = useState(false)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        state: '',
        landmark: ''
    })

    const [paymentMethod, setPaymentMethod] = useState('paystack')
    const [deliveryMethod, setDeliveryMethod] = useState('standard')
    const [placingOrder, setPlacingOrder] = useState(false)

    const deliveryFee = useMemo(() => {
        if (deliveryMethod === 'express') {
            return 5000
        }

        return 2500
    }, [deliveryMethod])

    const total = cartTotal + deliveryFee

    const handleInputChange = (e) => {
        const { name, value } = e.target

        setFormData((current) => ({
            ...current,
            [name]: value
        }))
    }

    const handlePlaceOrder = (e) => {
        e.preventDefault()

        if (!cartItems.length) return

        setPlacingOrder(true)

        const order = createOrder({
            customer: {
                firstName: formData.firstName,
                lastName: formData.lastName,
                phone: formData.phone,
                email: formData.email
            },

            shippingAddress: {
                address: formData.address,
                city: formData.city,
                state: formData.state,
                landmark: formData.landmark
            },

            items: cartItems.map((item) => ({
                id: item.id,
                name: item.name,
                image: item.image,
                price: item.price,
                quantity: item.quantity,
                store: item.store,
                category: item.category
            })),

            subtotal: cartTotal,

            delivery: {
                method: deliveryMethod,
                fee: deliveryFee
            },

            paymentMethod,

            total
        })

        clearCart()

        setTimeout(() => {
            setPlacingOrder(false)

            navigate(`/orders/${order.id}`)
        }, 800)
    }

    const formatPrice = (price) => {
        return `₦${Number(price).toLocaleString()}`
    }

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                />

                <main className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
                    <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
                        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                            <MdShoppingBag
                                size={30}
                                className="text-slate-500"
                            />
                        </div>

                        <h1 className="text-xl font-bold text-slate-900">
                            Your cart is empty
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Add some products to your cart before proceeding
                            to checkout.
                        </p>

                        <Link
                            to="/products"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            Continue Shopping
                            <MdArrowForward size={18} />
                        </Link>
                    </div>
                </main>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">

                {/* Back */}
                <Link
                    to="/cart"
                    className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                    <MdArrowBack size={19} />
                    Back to Cart
                </Link>

                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 text-white">
                            <MdLock size={21} />
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                                Checkout
                            </h1>

                            <p className="mt-1 text-sm text-slate-500">
                                Complete your order securely.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Checkout Progress */}
                <div className="mb-8 rounded-2xl border border-slate-200 bg-white px-4 py-5 sm:px-6">
                    <div className="mx-auto flex max-w-2xl items-center justify-between">

                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 text-white">
                                <MdCheckCircle size={18} />
                            </div>

                            <span className="hidden text-xs font-semibold text-slate-900 sm:block">
                                Cart
                            </span>
                        </div>

                        <div className="mx-3 h-px flex-1 bg-emerald-200 sm:mx-5" />

                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                                2
                            </div>

                            <span className="hidden text-xs font-semibold text-slate-900 sm:block">
                                Checkout
                            </span>
                        </div>

                        <div className="mx-3 h-px flex-1 bg-slate-200 sm:mx-5" />

                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-400">
                                3
                            </div>

                            <span className="hidden text-xs font-semibold text-slate-400 sm:block">
                                Confirmation
                            </span>
                        </div>

                    </div>
                </div>

                <form onSubmit={handlePlaceOrder}>
                    <div className="grid gap-6 lg:grid-cols-[1fr_380px]">

                        {/* LEFT COLUMN */}
                        <div className="space-y-6">

                            {/* Contact Information */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                        <MdPersonOutline
                                            size={21}
                                            className="text-slate-600"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-slate-900">
                                            Contact Information
                                        </h2>

                                        <p className="mt-1 text-xs text-slate-500">
                                            We'll use this information to
                                            contact you about your order.
                                        </p>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">

                                    {/* First Name */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                            First name
                                        </label>

                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            placeholder="John"
                                            required
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                        />
                                    </div>

                                    {/* Last Name */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                            Last name
                                        </label>

                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Doe"
                                            required
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                            Phone number
                                        </label>

                                        <div className="relative">
                                            <MdPhone
                                                size={18}
                                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                            />

                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="0801 234 5678"
                                                required
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                            Email address
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                            required
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                        />
                                    </div>

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
                                            Where should we deliver your
                                            order?
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-4">

                                    {/* Address */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                            Street address
                                        </label>

                                        <textarea
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="Enter your full delivery address"
                                            required
                                            rows="3"
                                            className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">

                                        {/* City */}
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                City
                                            </label>

                                            <input
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="Lagos"
                                                required
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                            />
                                        </div>

                                        {/* State */}
                                        <div>
                                            <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                State
                                            </label>

                                            <div className="relative">
                                                <select
                                                    name="state"
                                                    value={formData.state}
                                                    onChange={handleInputChange}
                                                    required
                                                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                                >
                                                    <option value="">
                                                        Select state
                                                    </option>

                                                    <option value="Abia">Abia</option>
                                                    <option value="Adamawa">Adamawa</option>
                                                    <option value="Akwa Ibom">Akwa Ibom</option>
                                                    <option value="Anambra">Anambra</option>
                                                    <option value="Bauchi">Bauchi</option>
                                                    <option value="Bayelsa">Bayelsa</option>
                                                    <option value="Benue">Benue</option>
                                                    <option value="Borno">Borno</option>
                                                    <option value="Cross River">Cross River</option>
                                                    <option value="Delta">Delta</option>
                                                    <option value="Ebonyi">Ebonyi</option>
                                                    <option value="Edo">Edo</option>
                                                    <option value="Ekiti">Ekiti</option>
                                                    <option value="Enugu">Enugu</option>
                                                    <option value="Gombe">Gombe</option>
                                                    <option value="Imo">Imo</option>
                                                    <option value="Jigawa">Jigawa</option>
                                                    <option value="Kaduna">Kaduna</option>
                                                    <option value="Kano">Kano</option>
                                                    <option value="Katsina">Katsina</option>
                                                    <option value="Kebbi">Kebbi</option>
                                                    <option value="Kogi">Kogi</option>
                                                    <option value="Kwara">Kwara</option>
                                                    <option value="Lagos">Lagos</option>
                                                    <option value="Nasarawa">Nasarawa</option>
                                                    <option value="Niger">Niger</option>
                                                    <option value="Ogun">Ogun</option>
                                                    <option value="Ondo">Ondo</option>
                                                    <option value="Osun">Osun</option>
                                                    <option value="Oyo">Oyo</option>
                                                    <option value="Plateau">Plateau</option>
                                                    <option value="Rivers">Rivers</option>
                                                    <option value="Sokoto">Sokoto</option>
                                                    <option value="Taraba">Taraba</option>
                                                    <option value="Yobe">Yobe</option>
                                                    <option value="Zamfara">Zamfara</option>
                                                    <option value="FCT">
                                                        Federal Capital Territory
                                                    </option>
                                                </select>

                                                <MdKeyboardArrowDown
                                                    size={20}
                                                    className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400"
                                                />
                                            </div>
                                        </div>

                                    </div>

                                    {/* Landmark */}
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                                            Landmark
                                            <span className="ml-1 font-normal text-slate-400">
                                                (optional)
                                            </span>
                                        </label>

                                        <input
                                            type="text"
                                            name="landmark"
                                            value={formData.landmark}
                                            onChange={handleInputChange}
                                            placeholder="Nearby landmark"
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                        />
                                    </div>

                                </div>
                            </section>

                            {/* Delivery Method */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                        <MdLocalShipping
                                            size={21}
                                            className="text-slate-600"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-slate-900">
                                            Delivery Method
                                        </h2>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Select how you'd like to receive
                                            your order.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">

                                    {/* Standard */}
                                    <label
                                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                                            deliveryMethod === 'standard'
                                                ? 'border-slate-900 bg-slate-50'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">

                                            <input
                                                type="radio"
                                                name="deliveryMethod"
                                                value="standard"
                                                checked={
                                                    deliveryMethod === 'standard'
                                                }
                                                onChange={(e) =>
                                                    setDeliveryMethod(
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 h-4 w-4 accent-slate-900"
                                            />

                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    Standard Delivery
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Estimated delivery in
                                                    2–5 business days
                                                </p>
                                            </div>

                                        </div>

                                        <span className="text-sm font-bold text-slate-900">
                                            ₦2,500
                                        </span>
                                    </label>

                                    {/* Express */}
                                    <label
                                        className={`flex cursor-pointer items-center justify-between rounded-xl border p-4 transition ${
                                            deliveryMethod === 'express'
                                                ? 'border-slate-900 bg-slate-50'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <div className="flex items-start gap-3">

                                            <input
                                                type="radio"
                                                name="deliveryMethod"
                                                value="express"
                                                checked={
                                                    deliveryMethod === 'express'
                                                }
                                                onChange={(e) =>
                                                    setDeliveryMethod(
                                                        e.target.value
                                                    )
                                                }
                                                className="mt-1 h-4 w-4 accent-slate-900"
                                            />

                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    Express Delivery
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Estimated delivery in
                                                    1–2 business days
                                                </p>
                                            </div>

                                        </div>

                                        <span className="text-sm font-bold text-slate-900">
                                            ₦5,000
                                        </span>
                                    </label>

                                </div>
                            </section>

                            {/* Payment */}
                            <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <div className="mb-5 flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                        <MdPayments
                                            size={21}
                                            className="text-slate-600"
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-bold text-slate-900">
                                            Payment Method
                                        </h2>

                                        <p className="mt-1 text-xs text-slate-500">
                                            Choose how you want to pay for
                                            your order.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">

                                    {/* Paystack */}
                                    <label
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                                            paymentMethod === 'paystack'
                                                ? 'border-emerald-500 bg-emerald-50/40'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="paystack"
                                            checked={
                                                paymentMethod === 'paystack'
                                            }
                                            onChange={(e) =>
                                                setPaymentMethod(
                                                    e.target.value
                                                )
                                            }
                                            className="h-4 w-4 accent-emerald-500"
                                        />

                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white">
                                            <MdCreditCard size={19} />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-900">
                                                Pay online
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Card, bank transfer or USSD
                                            </p>
                                        </div>

                                        <MdCheckCircle
                                            size={20}
                                            className={
                                                paymentMethod === 'paystack'
                                                    ? 'text-emerald-500'
                                                    : 'hidden'
                                            }
                                        />
                                    </label>

                                    {/* Cash */}
                                    <label
                                        className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                                            paymentMethod === 'cash'
                                                ? 'border-emerald-500 bg-emerald-50/40'
                                                : 'border-slate-200 hover:border-slate-300'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value="cash"
                                            checked={
                                                paymentMethod === 'cash'
                                            }
                                            onChange={(e) =>
                                                setPaymentMethod(
                                                    e.target.value
                                                )
                                            }
                                            className="h-4 w-4 accent-emerald-500"
                                        />

                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100">
                                            <MdPayments
                                                size={19}
                                                className="text-slate-600"
                                            />
                                        </div>

                                        <div className="flex-1">
                                            <p className="text-sm font-semibold text-slate-900">
                                                Cash on Delivery
                                            </p>

                                            <p className="mt-1 text-xs text-slate-500">
                                                Pay when your order arrives
                                            </p>
                                        </div>

                                        <MdCheckCircle
                                            size={20}
                                            className={
                                                paymentMethod === 'cash'
                                                    ? 'text-emerald-500'
                                                    : 'hidden'
                                            }
                                        />
                                    </label>

                                </div>
                            </section>

                        </div>

                        {/* RIGHT COLUMN */}
                        <aside className="lg:sticky lg:top-24 lg:h-fit">
                            <div className="space-y-5">

                                {/* Order Summary */}
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                    <div className="mb-5 flex items-center justify-between">
                                        <h2 className="text-base font-bold text-slate-900">
                                            Order Summary
                                        </h2>

                                        <span className="text-xs font-medium text-slate-500">
                                            {cartItems.length}{' '}
                                            {cartItems.length === 1
                                                ? 'item'
                                                : 'items'}
                                        </span>
                                    </div>

                                    {/* Items */}
                                    <div className="max-h-[390px] space-y-4 overflow-y-auto pr-1">

                                        {cartItems.map((item) => (
                                            <div
                                                key={item.id}
                                                className="flex gap-3"
                                            >

                                                {/* Image */}
                                                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="h-full w-full object-cover"
                                                    />

                                                    <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[9px] font-bold text-white">
                                                        {item.quantity}
                                                    </span>
                                                </div>

                                                {/* Info */}
                                                <div className="min-w-0 flex-1">

                                                    <p className="truncate text-xs font-semibold text-slate-900">
                                                        {item.name}
                                                    </p>

                                                    {item.store && (
                                                        <div className="mt-1 flex items-center gap-1">
                                                            <MdStorefront
                                                                size={13}
                                                                className="text-slate-400"
                                                            />

                                                            <span className="truncate text-[10px] text-slate-400">
                                                                {item.store}
                                                            </span>
                                                        </div>
                                                    )}

                                                    <div className="mt-2 flex items-center justify-between">

                                                        <div className="flex items-center rounded-lg border border-slate-200">

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.id,
                                                                        item.quantity - 1
                                                                    )
                                                                }
                                                                className="flex h-7 w-7 items-center justify-center text-slate-500 hover:bg-slate-50"
                                                            >
                                                                <MdRemove size={14} />
                                                            </button>

                                                            <span className="w-6 text-center text-[10px] font-semibold text-slate-700">
                                                                {item.quantity}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    updateQuantity(
                                                                        item.id,
                                                                        item.quantity + 1
                                                                    )
                                                                }
                                                                className="flex h-7 w-7 items-center justify-center text-slate-500 hover:bg-slate-50"
                                                            >
                                                                <MdAdd size={14} />
                                                            </button>

                                                        </div>

                                                        <div className="flex items-center gap-2">

                                                            <span className="text-xs font-bold text-slate-900">
                                                                {formatPrice(
                                                                    item.price *
                                                                    item.quantity
                                                                )}
                                                            </span>

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    removeFromCart(
                                                                        item.id
                                                                    )
                                                                }
                                                                className="text-slate-300 transition hover:text-red-500"
                                                                title="Remove item"
                                                            >
                                                                <MdDeleteOutline
                                                                    size={17}
                                                                />
                                                            </button>

                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        ))}

                                    </div>

                                    {/* Divider */}
                                    <div className="my-5 border-t border-slate-100" />

                                    {/* Price Details */}
                                    <div className="space-y-3">

                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-slate-500">
                                                Subtotal
                                            </span>

                                            <span className="font-medium text-slate-800">
                                                {formatPrice(cartTotal)}
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
                                                    {formatPrice(total)}
                                                </span>

                                            </div>
                                        </div>

                                    </div>

                                    {/* Place Order */}
                                    <button
                                        type="submit"
                                        disabled={placingOrder}
                                        className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                                    >
                                        {placingOrder ? (
                                            <>
                                                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                Place Order
                                                <MdArrowForward size={19} />
                                            </>
                                        )}
                                    </button>

                                    <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                                        <MdLock size={14} />
                                        Secure checkout
                                    </div>

                                </section>

                                {/* Protection */}
                                <div className="rounded-2xl border border-slate-200 bg-white p-4">

                                    <div className="flex gap-3">

                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                                            <MdCheckCircle
                                                size={19}
                                                className="text-emerald-500"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs font-bold text-slate-900">
                                                Buyer Protection
                                            </p>

                                            <p className="mt-1 text-[10px] leading-5 text-slate-500">
                                                Your payment and personal
                                                information are protected
                                                throughout checkout.
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </aside>

                    </div>
                </form>
            </main>

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