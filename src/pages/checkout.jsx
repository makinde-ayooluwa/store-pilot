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
import { useUser } from '../contexts/userProvider'
import { UserOnly } from '../components/userOnly'
import { backendUrl } from '../data/constants'
import { useOrders } from '../contexts/orderProvider'
import Swal from 'sweetalert2'

const NIGERIAN_STATES = [
    'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa',
    'Benue', 'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo',
    'Ekiti', 'Enugu', 'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano',
    'Katsina', 'Kebbi', 'Kogi', 'Kwara', 'Lagos', 'Nasarawa',
    'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo', 'Plateau', 'Rivers',
    'Sokoto', 'Taraba', 'Yobe', 'Zamfara', 'Federal Capital Territory'
]

const formatPrice = (price) =>
    `₦${(price || 0).toLocaleString('en-NG')}`

export default function Checkout() {
    const navigate = useNavigate()
    const { data, userLoading } = useUser()
    const {
        cartItems,
        cartTotal,
        updateQuantity,
        removeFromCart
    } = useCart()
    const { createOrder } = useOrders()

    const [mobileMenu, setMobileMenu] = useState(false)
    const [placingOrder, setPlacingOrder] = useState(false)
    const [error, setError] = useState('')

    const [formData, setFormData] = useState({
        fullname: data?.fullname ?? '',
        phone: data?.phone ?? '',
        email: data?.email ?? '',
        address: data?.address ?? '',
        city: data?.city ?? '',
        state: data?.state ?? ''
    })

    // Calculate delivery separately for each product using its saved quantity rules.
    const deliveryItems = useMemo(() => {
        return cartItems.map((item) => {
            const pricing = item.deliveryPricing;
            const quantity = Number(item.quantity);

            if (!pricing || !Array.isArray(pricing.rules)) {
                return { item, fee: null, issue: 'not-configured' };
            }

            if (pricing.enabled === false) {
                return { item, fee: null, issue: 'pickup-only' };
            }

            if (!Number.isInteger(quantity) || quantity < 1) {
                return { item, fee: null, issue: 'invalid-quantity' };
            }

            const rule = pricing.rules.find((candidate) => {
                const min = Number(candidate.minQuantity);
                const rawMax = candidate.maxQuantity;

                // Infinity becomes null during JSON serialization. Also accept
                // common string values used to mean "no maximum".
                const unlimitedMax =
                    rawMax === null ||
                    rawMax === undefined ||
                    rawMax === '' ||
                    rawMax === Infinity ||
                    (typeof rawMax === 'string' &&
                        ['infinity', 'unlimited', '∞'].includes(
                            rawMax.trim().toLowerCase()
                        ));

                const max = unlimitedMax ? Infinity : Number(rawMax);

                if (!Number.isInteger(min) || min < 1) return false;
                if (!unlimitedMax && (!Number.isInteger(max) || max < min)) {
                    return false;
                }

                return quantity >= min && quantity <= max;
            });

            if (!rule) {
                return { item, fee: null, issue: 'no-rule' };
            }

            // Use the actual price saved in the matching rule.
            // Supports numeric values and strings like "1,500" or "₦1,500".
            const rawPrice = rule.price;
            const fee = typeof rawPrice === 'string'
                ? Number(rawPrice.replace(/[₦,\s]/g, ''))
                : Number(rawPrice);

            if (
                rawPrice === null ||
                rawPrice === undefined ||
                rawPrice === '' ||
                !Number.isFinite(fee) ||
                fee < 0
            ) {
                return { item, fee: null, issue: 'invalid-price' };
            }

            return { item, fee, issue: null };
        });
    }, [cartItems]);

    const deliveryIssue = deliveryItems.find(
        (entry) => entry.issue !== null
    );

    const deliveryFee = useMemo(() => {
        if (deliveryItems.some((entry) => entry.fee === null)) {
            return 0;
        }

        return deliveryItems.reduce((sum, entry) => sum + entry.fee, 0);
    }, [deliveryItems]);

    const processingPercent = 2
    const processingFee = Math.round(
        ((cartTotal || 0) + deliveryFee) * processingPercent / 100
    )
    const total = (cartTotal || 0) + deliveryFee + processingFee

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setFormData((current) => ({ ...current, [name]: value }))
    }

    /*
     * IMPORTANT:
     * Set VITE_BACKEND_URL in your frontend .env file, for example:
     * VITE_BACKEND_URL=http://localhost:8000
     *
     * The backend endpoint below must:
     * 1. Validate the authenticated customer and cart/product prices.
     * 2. Recalculate subtotal, delivery and processing fee on the server.
     * 3. Create a PENDING order (not a paid order).
     * 4. Initialize Paystack using the SECRET KEY on the server.
     * 5. Return { authorization_url, reference, orderId }.
     *
     * Never put your Paystack secret key in frontend code.
     */
    const handlePlaceOrder = async (event) => {

        event.preventDefault()
        setError('')

        if (!cartItems.length) {
            setError('Your cart is empty.')
            return
        }

        if (deliveryIssue) {
            const messages = {
                'pickup-only': `${deliveryIssue.item.name} is marked as pickup-only.`,
                'not-configured': `Delivery pricing is not configured for ${deliveryIssue.item.name}. Please contact the store owner.`,
                'no-rule': `No delivery rule matches the selected quantity for ${deliveryIssue.item.name}. Please contact the store owner.`,
                'invalid-price': `The saved delivery price for ${deliveryIssue.item.name} is invalid.`,
                'invalid-quantity': `The quantity selected for ${deliveryIssue.item.name} is invalid.`
            };

            setError(messages[deliveryIssue.issue] ||
                `Delivery pricing could not be calculated for ${deliveryIssue.item.name}.`);
            return;
        }

        const requiredFields = [
            'fullname', 'phone', 'email', 'address', 'city', 'state'
        ]
        const missingField = requiredFields.find(
            (field) => !String(formData[field] || '').trim()
        )

        if (missingField) {
            setError('Please complete all contact and delivery fields.')
            return
        }

        

        try {
            setPlacingOrder(true)
            const orderData = {
                user: data._id ?? "",
                items: cartItems.map((item) => {
                    return {
                        product: item._id,
                        name: item.name,
                        image: item.image,
                        quantity: item.quantity,
                        unitPrice: item.price,
                        store: item.store,
                        deliveryFee: Number(item.deliveryPricing.rules.find((x) => item.quantity >= x.minQuantity && item.quantity <= x.maxQuantity))
                    }
                }),
                customer: {
                    name: formData.fullname,
                    email: formData.email,
                    phone: formData.phone
                },
                shippingAddress: {
                    address: formData.address,
                    city: formData.city,
                    state: formData.state,
                    country: "Nigeria"
                },
                deliveryMethod: "standard"
            }
            const response = await createOrder(orderData);
            if(response.status){
                setPlacingOrder(false)
                
            }
            console.log(response.status)
            } catch (err) {
            setError(
                err.message ||
                'Something went wrong while starting your payment. Please try again.'
            )
            setPlacingOrder(false)
        }
    }

    if (cartItems.length === 0) {
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
                                <MdShoppingBag size={30} className="text-slate-500" />
                            </div>
                            <h1 className="text-xl font-bold text-slate-900">
                                Your cart is empty
                            </h1>
                            <p className="mt-2 text-sm leading-6 text-slate-500">
                                Add some products to your cart before proceeding to checkout.
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
                </UserOnly>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            <UserOnly loading={userLoading}>
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
                    <Link
                        to="/cart"
                        className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition hover:text-slate-900"
                    >
                        <MdArrowBack size={19} />
                        Back to Cart
                    </Link>

                    {/* Page heading */}
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
                                    Confirm your delivery details and pay securely.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Checkout progress */}
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
                                {/* Contact information */}
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-5 flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                            <MdPersonOutline size={21} className="text-slate-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-slate-900">
                                                Contact Information
                                            </h2>
                                            <p className="mt-1 text-xs text-slate-500">
                                                We'll use these details to contact you about your order.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="fullname" className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Full name
                                            </label>
                                            <input
                                                id="fullname"
                                                type="text"
                                                name="fullname"
                                                autoComplete="name"
                                                value={formData.fullname}
                                                onChange={handleInputChange}
                                                placeholder="Your full name"
                                                required
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Phone number
                                            </label>
                                            <div className="relative">
                                                <MdPhone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                                <input
                                                    id="phone"
                                                    type="tel"
                                                    name="phone"
                                                    autoComplete="tel"
                                                    value={formData.phone}
                                                    onChange={handleInputChange}
                                                    placeholder="0801 234 5678"
                                                    required
                                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                                />
                                            </div>
                                        </div>

                                        <div className="sm:col-span-2">
                                            <label htmlFor="email" className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Email address
                                            </label>
                                            <input
                                                id="email"
                                                type="email"
                                                name="email"
                                                autoComplete="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="you@example.com"
                                                required
                                                className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                            />
                                        </div>
                                    </div>
                                </section>

                                {/* Delivery address */}
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-5 flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                            <MdLocationOn size={21} className="text-slate-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-slate-900">
                                                Delivery Address
                                            </h2>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Where should we deliver your order?
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label htmlFor="address" className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                Street address
                                            </label>
                                            <textarea
                                                id="address"
                                                name="address"
                                                autoComplete="street-address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                placeholder="Enter your full delivery address"
                                                required
                                                rows={3}
                                                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                            />
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <label htmlFor="city" className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                    City
                                                </label>
                                                <input
                                                    id="city"
                                                    type="text"
                                                    name="city"
                                                    autoComplete="address-level2"
                                                    value={formData.city}
                                                    onChange={handleInputChange}
                                                    placeholder="Your city"
                                                    required
                                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                                />
                                            </div>

                                            <div>
                                                <label htmlFor="state" className="mb-1.5 block text-xs font-semibold text-slate-700">
                                                    State
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="state"
                                                        name="state"
                                                        autoComplete="address-level1"
                                                        value={formData.state}
                                                        onChange={handleInputChange}
                                                        required
                                                        className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-9 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                                                    >
                                                        <option value="">Select state</option>
                                                        {NIGERIAN_STATES.map((state) => (
                                                            <option key={state} value={state}>
                                                                {state}
                                                            </option>
                                                        ))}
                                                    </select>
                                                    <MdKeyboardArrowDown size={20} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                {/* Product-specific delivery pricing */}
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-5 flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                            <MdLocalShipping size={21} className="text-slate-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-slate-900">
                                                Delivery Charges
                                            </h2>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Each product uses its store owner's delivery price for the quantity ordered.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        {deliveryItems.map(({ item, fee, issue }) => (
                                            <div key={item._id} className="flex items-center justify-between gap-4 rounded-xl border border-slate-100 p-3">
                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-semibold text-slate-800">
                                                        {item.name}
                                                    </p>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        Quantity: {item.quantity}
                                                    </p>
                                                    {issue && (
                                                        <p className="mt-1 text-xs text-amber-700">
                                                            {issue === 'pickup-only'
                                                                ? 'Pickup only'
                                                                : issue === 'not-configured'
                                                                    ? 'Delivery price not configured'
                                                                    : issue === 'invalid-price'
                                                                        ? 'Invalid delivery price'
                                                                        : issue === 'invalid-quantity'
                                                                            ? 'Invalid quantity'
                                                                            : 'No matching quantity rule'}
                                                        </p>
                                                    )}
                                                </div>
                                                <span className="shrink-0 text-sm font-bold text-slate-900">
                                                    {fee === null ? 'Unavailable' : formatPrice(fee)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
                                        <span className="text-sm font-semibold text-slate-700">Combined delivery fee</span>
                                        <span className="text-sm font-bold text-slate-900">
                                            {deliveryIssue ? 'Check delivery settings' : formatPrice(deliveryFee)}
                                        </span>
                                    </div>
                                </section>

                                {/* Paystack only */}
                                <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                    <div className="mb-5 flex items-start gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50">
                                            <MdPayments size={21} className="text-emerald-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-base font-bold text-slate-900">
                                                Payment Method
                                            </h2>
                                            <p className="mt-1 text-xs text-slate-500">
                                                Pay securely online through Paystack.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="rounded-xl border border-emerald-500 bg-emerald-50/40 p-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white">
                                                <MdCreditCard size={23} className="text-emerald-600" />
                                            </div>
                                            <div className="min-w-0 flex-1">
                                                <p className="text-sm font-bold text-slate-900">Paystack</p>
                                                <p className="mt-1 text-xs leading-5 text-slate-500">
                                                    Pay with card, bank transfer, or USSD where available.
                                                </p>
                                            </div>
                                            <MdCheckCircle size={22} className="shrink-0 text-emerald-500" />
                                        </div>
                                        <div className="mt-4 flex items-center gap-2 border-t border-emerald-100 pt-3">
                                            <MdLock size={16} className="text-emerald-600" />
                                            <p className="text-[11px] text-slate-600">
                                                Your payment is processed securely by Paystack.
                                            </p>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            {/* RIGHT COLUMN */}
                            <aside className="lg:sticky lg:top-24 lg:h-fit">
                                <div className="space-y-5">
                                    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                                        <div className="mb-5 flex items-center justify-between">
                                            <h2 className="text-base font-bold text-slate-900">
                                                Order Summary
                                            </h2>
                                            <span className="text-xs font-medium text-slate-500">
                                                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                                            </span>
                                        </div>

                                        <div className="max-h-[390px] space-y-4 overflow-y-auto pr-1">
                                            {cartItems.map((item) => (
                                                <div key={item._id} className="flex gap-3">
                                                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                                                        <img
                                                            src={item.images?.[0] || item.image}
                                                            alt={item.name}
                                                            className="h-full w-full object-cover"
                                                        />
                                                        <span className="absolute right-1 top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-slate-900 px-1 text-[9px] font-bold text-white">
                                                            {item.quantity}
                                                        </span>
                                                    </div>

                                                    <div className="min-w-0 flex-1">
                                                        <p className="truncate text-xs font-semibold text-slate-900">
                                                            {item.name}
                                                        </p>
                                                        {item.store && (
                                                            <div className="mt-1 flex items-center gap-1">
                                                                <MdStorefront size={13} className="text-slate-400" />
                                                                <span className="truncate text-[10px] text-slate-400">
                                                                    {typeof item.store === 'object' ? item.store.name : item.store}
                                                                </span>
                                                            </div>
                                                        )}

                                                        <div className="mt-2 flex items-center justify-between gap-2">
                                                            <div className="flex items-center rounded-lg border border-slate-200">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                                    disabled={item.quantity <= 1}
                                                                    className="flex h-7 w-7 items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                                                                    aria-label={`Decrease ${item.name} quantity`}
                                                                >
                                                                    <MdRemove size={14} />
                                                                </button>
                                                                <span className="w-6 text-center text-[10px] font-semibold text-slate-700">
                                                                    {item.quantity}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                                    disabled={item.stock != null && item.quantity >= item.stock}
                                                                    className="flex h-7 w-7 items-center justify-center text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                                                                    aria-label={`Increase ${item.name} quantity`}
                                                                >
                                                                    <MdAdd size={14} />
                                                                </button>
                                                            </div>

                                                            <div className="flex items-center gap-2">
                                                                <span className="text-xs font-bold text-slate-900">
                                                                    {formatPrice(item.price * item.quantity)}
                                                                </span>
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeFromCart(item._id)}
                                                                    className="text-slate-300 transition hover:text-red-500"
                                                                    title="Remove item"
                                                                    aria-label={`Remove ${item.name}`}
                                                                >
                                                                    <MdDeleteOutline size={17} />
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="my-5 border-t border-slate-100" />

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Subtotal</span>
                                                <span className="font-medium text-slate-800">{formatPrice(cartTotal)}</span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Delivery</span>
                                                <span className="font-medium text-slate-800">{deliveryIssue ? 'Unavailable' : formatPrice(deliveryFee)}</span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-slate-500">Processing fee (2%)</span>
                                                <span className="font-medium text-slate-800">{formatPrice(processingFee)}</span>
                                            </div>

                                            <div className="border-t border-slate-100 pt-4">
                                                <div className="flex items-end justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm font-bold text-slate-900">Total to pay</p>
                                                        <p className="mt-0.5 text-[10px] text-slate-400">
                                                            Including delivery and processing
                                                        </p>
                                                    </div>
                                                    <span className="text-xl font-bold tracking-tight text-slate-900">
                                                        {formatPrice(total)}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {error && (
                                            <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-xs leading-5 text-red-700">
                                                {error}
                                            </div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={placingOrder || cartItems.length === 0 || Boolean(deliveryIssue)}
                                            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 text-sm font-bold text-white transition hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-70"
                                        >
                                            {placingOrder ? (
                                                <>
                                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                                                    Redirecting to Paystack...
                                                </>
                                            ) : (
                                                <>
                                                    Pay {formatPrice(total)}
                                                    <MdArrowForward size={19} />
                                                </>
                                            )}
                                        </button>

                                        <div className="mt-4 flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                                            <MdLock size={14} />
                                            Secure Paystack checkout
                                        </div>
                                    </section>

                                    <div className="rounded-2xl border border-slate-200 bg-white p-4">
                                        <div className="flex gap-3">
                                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                                                <MdCheckCircle size={19} className="text-emerald-500" />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-900">
                                                    Secure payment
                                                </p>
                                                <p className="mt-1 text-[10px] leading-5 text-slate-500">
                                                    Your payment is handled by Paystack. Your order should only be confirmed after the server verifies payment.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </form>
                </main>
            </UserOnly>

            <footer className="mt-12 border-t border-slate-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p className="text-xs text-slate-400">
                            © {new Date().getFullYear()} StorePilot. All rights reserved.
                        </p>
                        <div className="flex items-center gap-4 text-xs text-slate-400">
                            <span>Secure Checkout</span>
                            <span>•</span>
                            <span>Paystack Payments</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
