import React from 'react'
import {
    MdAdd,
    MdArrowBack,
    MdArrowForward,
    MdDeleteOutline,
    MdRemove,
    MdStorefront,
    MdShoppingBag
} from 'react-icons/md'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/header'
import { useCart } from '../contexts/cartProvider'
import { useUser } from "../contexts/userProvider"
import { useResource } from "../contexts/resourceProvider"
import { UserOnly } from "../components/userOnly"
import { backendUrl } from '../data/constants'

export default function Cart() {
    const navigate = useNavigate()
    const [mobileMenu, setMobileMenu] = React.useState(false)

    const {
        cartItems,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartTotal
    } = useCart()

    const { userLoading } = useUser()
    const { stores } = useResource()

    // Calculate delivery separately for each product using its saved quantity rules.
    // The fee for each product is added once, based on that product's cart quantity.
    const deliveryItems = React.useMemo(() => {
        return cartItems.map((item) => {
            const pricing = item.deliveryPricing
            const quantity = Number(item.quantity)

            if (!pricing || !Array.isArray(pricing.rules)) {
                return { item, fee: null, issue: 'not-configured' }
            }

            if (pricing.enabled === false) {
                return { item, fee: null, issue: 'pickup-only' }
            }

            if (!Number.isInteger(quantity) || quantity < 1) {
                return { item, fee: null, issue: 'invalid-quantity' }
            }

            const rule = pricing.rules.find((candidate) => {
                const min = Number(candidate.minQuantity)
                const rawMax = candidate.maxQuantity

                // null, empty, 0, Infinity, "unlimited", or "∞" means no upper limit.
                const unlimitedMax =
                    rawMax == null ||
                    rawMax === '' ||
                    rawMax === 0 ||
                    rawMax === Infinity ||
                    (typeof rawMax === 'string' &&
                        (
                            ['infinity', 'unlimited', '∞'].includes(rawMax.trim().toLowerCase()) ||
                            rawMax.trim() === '0'
                        ))

                const max = unlimitedMax ? Infinity : Number(rawMax)

                return (
                    Number.isInteger(min) &&
                    min >= 1 &&
                    (unlimitedMax ||
                        (Number.isInteger(max) && Number.isFinite(max) && max >= min)) &&
                    quantity >= min &&
                    quantity <= max
                )
            })

            if (!rule) {
                return { item, fee: null, issue: 'no-rule' }
            }

            const rawPrice = rule.price
            const fee = typeof rawPrice === 'string'
                ? Number(rawPrice.replace(/[₦,\\s]/g, ''))
                : Number(rawPrice)

            if (
                rawPrice === null ||
                rawPrice === undefined ||
                rawPrice === '' ||
                !Number.isFinite(fee) ||
                fee < 0
            ) {
                return { item, fee: null, issue: 'invalid-price' }
            }

            return { item, fee, issue: null }
        })
    }, [cartItems])

    const deliveryIssue = deliveryItems.find((entry) => entry.issue !== null)

    const deliveryFee = React.useMemo(() => {
        if (deliveryItems.some((entry) => entry.fee === null)) return 0
        return deliveryItems.reduce((sum, entry) => sum + entry.fee, 0)
    }, [deliveryItems])

    const estimatedTotal = Number(cartTotal || 0) + deliveryFee

    const formatPrice = (price) => {
        return `₦${Number(price || 0).toLocaleString('en-NG')}`
    }

    const handleCheckout = () => {
        if (cartItems.length === 0) return
        navigate('/checkout')
    }

    const getStoreName = (storeId) => {
        const store = stores?.find(
            (store) => String(store._id) === String(storeId?._id || storeId)
        )
        return store?.name || 'Store'
    }

    const getDeliveryIssueMessage = (issue) => {
        switch (issue) {
            case 'not-configured':
                return 'Delivery pricing is not configured for one or more products.'
            case 'pickup-only':
                return 'One or more products are pickup-only and cannot be included in delivery.'
            case 'invalid-quantity':
                return 'A product has an invalid quantity. Update the quantity to continue.'
            case 'invalid-price':
                return 'A delivery rule has an invalid price. Please contact the store.'
            case 'no-rule':
                return 'No delivery price matches the quantity of one or more products.'
            default:
                return 'Delivery pricing needs to be checked at checkout.'
        }
    }
    return (
        <div className="min-h-screen bg-slate-50">
            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            <UserOnly loading={userLoading}>
                <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <div className="mb-6 flex items-center gap-2 text-xs text-slate-400">
                        <Link to="/" className="hover:text-slate-700">Home</Link>
                        <span>/</span>
                        <span className="font-medium text-slate-700">Shopping Cart</span>
                    </div>

                    {/* Page heading */}
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                            Shopping Cart
                        </h1>
                        <p className="mt-1 text-sm text-slate-500">
                            Manage your items before moving to checkout.
                        </p>
                    </div>

                    {/* Empty cart */}
                    {cartItems.length === 0 ? (
                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <MdShoppingBag size={30} className="text-slate-400" />
                            </div>
                            <h2 className="mt-5 text-lg font-bold text-slate-900">
                                Your cart is empty
                            </h2>
                            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                                You haven't added anything to your cart yet.
                                Browse our products and find something you like.
                            </p>
                            <Link
                                to="/products"
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                            >
                                Start Shopping
                                <MdArrowForward size={18} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
                            {/* LEFT: Cart items */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-4 sm:px-5">
                                    <div>
                                        <p className="text-sm font-bold text-slate-900">
                                            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                                        </p>
                                        <p className="mt-0.5 text-xs text-slate-400">
                                            Review and manage your products
                                        </p>
                                    </div>
                                    <button
                                        onClick={clearCart}
                                        className="text-xs font-semibold text-red-500 transition hover:text-red-600"
                                    >
                                        Clear cart
                                    </button>
                                </div>

                                {/* Product cards */}
                                {cartItems.map((item) => (
                                    <div
                                        key={item._id}
                                        className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5"
                                    >
                                        <div className="flex gap-4">
                                            <Link
                                                to={`/products/${item._id}`}
                                                className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-28"
                                            >
                                                <img
                                                    src={`${backendUrl}/${item.images?.[0]}` || `${backendUrl}/${item.image}`}
                                                    alt={item.name}
                                                    className="h-full w-full object-cover transition hover:scale-105"
                                                />
                                            </Link>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between gap-3">
                                                    <div className="min-w-0">
                                                        <p className="mb-1 flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                                                            <MdStorefront size={13} />
                                                            {getStoreName(item.store)}
                                                        </p>
                                                        <Link
                                                            to={`/products/${item._id}`}
                                                            className="line-clamp-2 text-sm font-bold text-slate-900 hover:text-emerald-600 sm:text-base"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                        <p className="mt-1 text-xs text-slate-400">
                                                            {item.category}
                                                        </p>
                                                        {item.stock != null && (
                                                            <p className="mt-1 text-xs text-slate-500">
                                                                {item.stock <= 0
                                                                    ? 'Out of stock'
                                                                    : item.stock <= 5
                                                                        ? `Only ${item.stock} left`
                                                                        : 'In stock'}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <button
                                                        onClick={() => removeFromCart(item._id)}
                                                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                                                        title="Remove item"
                                                        aria-label={`Remove ${item.name} from cart`}
                                                    >
                                                        <MdDeleteOutline size={20} />
                                                    </button>
                                                </div>

                                                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                                                    <div>
                                                        <p className="text-base font-bold text-slate-900">
                                                            {formatPrice(item.price)}
                                                        </p>
                                                        {item.oldPrice > item.price && (
                                                            <p className="text-[11px] text-slate-400 line-through">
                                                                {formatPrice(item.oldPrice)}
                                                            </p>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center rounded-lg border border-slate-200">
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="flex h-8 w-8 items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                                                            aria-label="Decrease quantity"
                                                        >
                                                            <MdRemove size={16} />
                                                        </button>
                                                        <span className="flex h-8 min-w-9 items-center justify-center border-x border-slate-200 px-2 text-xs font-bold text-slate-800">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                            disabled={item.stock != null && item.quantity >= item.stock}
                                                            className="flex h-8 w-8 items-center justify-center text-slate-500 transition hover:bg-slate-50 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-40"
                                                            aria-label="Increase quantity"
                                                        >
                                                            <MdAdd size={16} />
                                                        </button>
                                                    </div>
                                                </div>

                                                <div className="mt-3 flex justify-between border-t border-slate-100 pt-3">
                                                    <span className="text-xs text-slate-400">Item total</span>
                                                    <span className="text-sm font-bold text-slate-900">
                                                        {formatPrice(Number(item.price) * Number(item.quantity))}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 pt-2 text-xs font-semibold text-slate-600 transition hover:text-slate-900"
                                >
                                    <MdArrowBack size={17} />
                                    Continue shopping
                                </Link>
                            </div>

                            {/* RIGHT: Cart summary */}
                            <aside className="lg:sticky lg:top-24 lg:h-fit">
                                <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
                                    <h2 className="text-base font-bold text-slate-900">Cart Summary</h2>
                                    <p className="mt-1 text-xs text-slate-400">
                                        A quick overview of your cart
                                    </p>

                                    <div className="mt-5 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm text-slate-500">Items subtotal</span>
                                            <span className="text-sm font-semibold text-slate-900">
                                                {formatPrice(cartTotal)}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between gap-3">
                                            <span className="text-sm text-slate-500">Estimated delivery</span>
                                            <span className="text-sm font-semibold text-slate-900">
                                                {deliveryIssue
                                                    ? 'Needs review'
                                                    : formatPrice(deliveryFee)}
                                            </span>
                                        </div>

                                        {deliveryIssue && (
                                            <p className="rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                                                {getDeliveryIssueMessage(deliveryIssue.issue)}
                                            </p>
                                        )}

                                        {!deliveryIssue && deliveryItems.length > 0 && (
                                            <div className="space-y-2 rounded-lg bg-slate-50 p-3">
                                                <p className="text-xs font-semibold text-slate-700">
                                                    Delivery breakdown
                                                </p>
                                                {deliveryItems.map(({ item, fee }) => (
                                                    <div
                                                        key={item._id}
                                                        className="flex justify-between gap-3 text-xs text-slate-500"
                                                    >
                                                        <span className="min-w-0 truncate">
                                                            {item.name} × {item.quantity}
                                                        </span>
                                                        <span className="shrink-0">
                                                            {formatPrice(fee)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        <div className="border-t border-slate-100 pt-4">
                                            <div className="flex items-center justify-between gap-3">
                                                <span className="text-base font-bold text-slate-900">
                                                    Estimated total
                                                </span>
                                                <span className="text-xl font-bold text-slate-900">
                                                    {deliveryIssue ? '—' : formatPrice(estimatedTotal)}
                                                </span>
                                            </div>
                                            <p className="mt-2 text-xs leading-5 text-slate-400">
                                                Your final total, including applicable processing fees, will be shown at checkout.
                                            </p>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCheckout}
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-600"
                                    >
                                        Proceed to Checkout
                                        <MdArrowForward size={19} />
                                    </button>

                                    <Link
                                        to="/products"
                                        className="mt-3 flex w-full items-center justify-center rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                                    >
                                        Continue Shopping
                                    </Link>

                                    <div className="mt-5 space-y-3 border-t border-slate-100 pt-5">
                                        <div className="flex gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                                                <MdShoppingBag size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-800">
                                                    Your cart, your choice
                                                </p>
                                                <p className="mt-0.5 text-[11px] text-slate-400">
                                                    Update quantities or remove items anytime.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex gap-3">
                                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                                                <MdArrowForward size={18} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-semibold text-slate-800">
                                                    Review before you pay
                                                </p>
                                                <p className="mt-0.5 text-[11px] text-slate-400">
                                                    Add delivery details and review payment costs on the checkout page.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    )}
                </main>
            </UserOnly>
        </div>
    )
}
