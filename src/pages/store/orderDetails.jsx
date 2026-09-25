import React, { useState } from 'react'
import {
    MdArrowBack,
    MdCheckCircle,
    MdAccessTime,
    MdLocalShipping,
    MdCancel,
    MdPayment,
    MdPerson,
    MdEmail,
    MdPhone,
    MdLocationOn,
    MdShoppingBag,
    MdInventory,
    MdEdit
} from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useOrders } from '../../contexts/orderProvider'

export default function SellerOrderDetails() {
    const { id } = useParams()
    const navigate = useNavigate()

    const {
        getOrderById,
        updateOrderStatus
    } = useOrders()

    const order = getOrderById(id)

    const [status, setStatus] = useState(
        order?.status || 'Processing'
    )

    const [saving, setSaving] = useState(false)


    // -----------------------------
    // Order not found
    // -----------------------------
    if (!order) {
        return (
            <div className="
                min-h-screen
                bg-gray-50
                flex
                items-center
                justify-center
                px-4
            ">
                <div className="
                    w-full
                    max-w-md
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
                    p-8
                    text-center
                    shadow-sm
                ">

                    <div className="
                        w-16
                        h-16
                        mx-auto
                        rounded-full
                        bg-red-50
                        flex
                        items-center
                        justify-center
                    ">
                        <MdCancel
                            size={32}
                            className="text-red-500"
                        />
                    </div>

                    <h1 className="
                        text-xl
                        font-bold
                        text-gray-900
                        mt-5
                    ">
                        Order not found
                    </h1>

                    <p className="
                        text-sm
                        text-gray-500
                        mt-2
                    ">
                        This order doesn't exist or is no longer
                        available.
                    </p>

                    <Link
                        to="/store/orders"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            mt-6
                            px-5
                            py-3
                            rounded-xl
                            bg-green-600
                            text-white
                            text-sm
                            font-semibold
                            hover:bg-green-700
                            transition
                        "
                    >
                        <MdArrowBack size={19} />
                        Back to Orders
                    </Link>

                </div>
            </div>
        )
    }


    // -----------------------------
    // Helpers
    // -----------------------------
    const customerName =
        order.customer?.name ||
        order.customerName ||
        order.shippingAddress?.name ||
        'Guest Customer'

    const customerEmail =
        order.customer?.email ||
        order.customerEmail ||
        order.shippingAddress?.email ||
        ''

    const customerPhone =
        order.customer?.phone ||
        order.customerPhone ||
        order.shippingAddress?.phone ||
        ''

    const shippingAddress =
        order.shippingAddress || {}


    const items = Array.isArray(order.items)
        ? order.items
        : []


    const subtotal =
        typeof order.subtotal === 'number'
            ? order.subtotal
            : items.reduce(
                (total, item) =>
                    total +
                    Number(item.price ?? 0) *
                    Number(item.quantity ?? 1),
                0
            )


    const shippingFee =
        Number(
            order.shippingFee ??
            order.deliveryFee ??
            0
        )


    const discount =
        Number(order.discount ?? 0)


    const total =
        typeof order.total === 'number'
            ? order.total
            : typeof order.totalAmount === 'number'
                ? order.totalAmount
                : subtotal + shippingFee - discount


    const formatDate = (date) => {
        if (!date) return '—'

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) {
            return '—'
        }

        return parsedDate.toLocaleDateString(
            'en-NG',
            {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            }
        )
    }


    const formatTime = (date) => {
        if (!date) return '—'

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) {
            return '—'
        }

        return parsedDate.toLocaleTimeString(
            'en-NG',
            {
                hour: 'numeric',
                minute: '2-digit'
            }
        )
    }


    const getStatusStyle = (currentStatus) => {
        switch (currentStatus) {
            case 'Processing':
                return 'bg-yellow-50 text-yellow-700 border-yellow-100'

            case 'Shipped':
                return 'bg-blue-50 text-blue-700 border-blue-100'

            case 'Delivered':
                return 'bg-green-50 text-green-700 border-green-100'

            case 'Cancelled':
                return 'bg-red-50 text-red-700 border-red-100'

            default:
                return 'bg-gray-50 text-gray-600 border-gray-100'
        }
    }


    const getStatusIcon = (currentStatus) => {
        switch (currentStatus) {
            case 'Processing':
                return <MdAccessTime size={18} />

            case 'Shipped':
                return <MdLocalShipping size={18} />

            case 'Delivered':
                return <MdCheckCircle size={18} />

            case 'Cancelled':
                return <MdCancel size={18} />

            default:
                return <MdAccessTime size={18} />
        }
    }


    const getItemImage = (item) => {
        if (Array.isArray(item.images) && item.images.length > 0) {
            return item.images[0]
        }

        return item.image || null
    }


    const handleStatusUpdate = () => {
        if (status === order.status) {
            return
        }

        setSaving(true)

        updateOrderStatus(order.id, status)

        setTimeout(() => {
            setSaving(false)
        }, 500)
    }


    return (
        <div className="min-h-screen bg-gray-50">

            {/* =========================
                HEADER
            ========================== */}
            <div className="bg-white border-b border-gray-200">

                <div className="
                    max-w-7xl
                    mx-auto
                    px-4
                    sm:px-6
                    lg:px-8
                    py-5
                ">

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-4
                    ">

                        <div className="flex items-center gap-3">

                            <Link
                                to="/store/orders"
                                className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    border
                                    border-gray-200
                                    flex
                                    items-center
                                    justify-center
                                    text-gray-600
                                    hover:bg-gray-50
                                    transition
                                "
                            >
                                <MdArrowBack size={21} />
                            </Link>

                            <div>

                                <p className="
                                    text-xs
                                    text-gray-500
                                    mb-1
                                ">
                                    Seller / Orders
                                </p>

                                <h1 className="
                                    text-xl
                                    sm:text-2xl
                                    font-bold
                                    text-gray-900
                                ">
                                    Order Details
                                </h1>

                            </div>

                        </div>


                        <span className={`
                            inline-flex
                            self-start
                            sm:self-auto
                            items-center
                            gap-2
                            px-3
                            py-2
                            rounded-full
                            border
                            text-sm
                            font-semibold
                            ${getStatusStyle(order.status)}
                        `}>
                            {getStatusIcon(order.status)}
                            {order.status}
                        </span>

                    </div>

                </div>

            </div>


            {/* =========================
                MAIN
            ========================== */}
            <main className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                py-6
            ">

                <div className="
                    grid
                    grid-cols-1
                    lg:grid-cols-3
                    gap-6
                ">

                    {/* =========================
                        LEFT CONTENT
                    ========================== */}
                    <div className="
                        lg:col-span-2
                        space-y-6
                    ">

                        {/* Order summary */}
                        <div className="
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                            overflow-hidden
                        ">

                            <div className="
                                p-5
                                sm:p-6
                                border-b
                                border-gray-200
                            ">

                                <div className="
                                    flex
                                    flex-col
                                    sm:flex-row
                                    sm:items-center
                                    sm:justify-between
                                    gap-2
                                ">

                                    <div>

                                        <h2 className="
                                            text-lg
                                            font-bold
                                            text-gray-900
                                        ">
                                            {order.orderNumber || order.id}
                                        </h2>

                                        <p className="
                                            text-sm
                                            text-gray-500
                                            mt-1
                                        ">
                                            Placed on {formatDate(order.createdAt)}
                                            {' '}at {formatTime(order.createdAt)}
                                        </p>

                                    </div>

                                    <p className="
                                        text-lg
                                        font-bold
                                        text-green-600
                                    ">
                                        ₦{total.toLocaleString()}
                                    </p>

                                </div>

                            </div>


                            {/* Items */}
                            <div className="p-5 sm:p-6">

                                <h3 className="
                                    text-base
                                    font-bold
                                    text-gray-900
                                    mb-4
                                ">
                                    Order Items
                                </h3>


                                <div className="space-y-4">

                                    {items.length > 0 ? (

                                        items.map((item, index) => {

                                            const itemImage =
                                                getItemImage(item)

                                            const itemPrice =
                                                Number(
                                                    item.price ?? 0
                                                )

                                            const quantity =
                                                Number(
                                                    item.quantity ?? 1
                                                )

                                            return (
                                                <div
                                                    key={
                                                        item.id ||
                                                        item.productId ||
                                                        index
                                                    }
                                                    className="
                                                        flex
                                                        items-center
                                                        gap-4
                                                        py-3
                                                        border-b
                                                        border-gray-100
                                                        last:border-0
                                                    "
                                                >

                                                    <div className="
                                                        w-16
                                                        h-16
                                                        sm:w-20
                                                        sm:h-20
                                                        shrink-0
                                                        rounded-xl
                                                        bg-gray-100
                                                        border
                                                        border-gray-200
                                                        overflow-hidden
                                                        flex
                                                        items-center
                                                        justify-center
                                                    ">

                                                        {itemImage ? (
                                                            <img
                                                                src={itemImage}
                                                                alt={
                                                                    item.name ||
                                                                    'Product'
                                                                }
                                                                className="
                                                                    w-full
                                                                    h-full
                                                                    object-cover
                                                                "
                                                            />
                                                        ) : (
                                                            <MdInventory
                                                                size={27}
                                                                className="text-gray-300"
                                                            />
                                                        )}

                                                    </div>


                                                    <div className="flex-1 min-w-0">

                                                        <h4 className="
                                                            text-sm
                                                            font-semibold
                                                            text-gray-900
                                                            truncate
                                                        ">
                                                            {item.name ||
                                                                'Product'}
                                                        </h4>

                                                        <p className="
                                                            text-xs
                                                            text-gray-500
                                                            mt-1
                                                        ">
                                                            ₦{itemPrice.toLocaleString()}
                                                            {' '}× {quantity}
                                                        </p>

                                                    </div>


                                                    <p className="
                                                        text-sm
                                                        font-bold
                                                        text-gray-900
                                                    ">
                                                        ₦{(
                                                            itemPrice *
                                                            quantity
                                                        ).toLocaleString()}
                                                    </p>

                                                </div>
                                            )
                                        })

                                    ) : (

                                        <div className="
                                            py-8
                                            text-center
                                            text-sm
                                            text-gray-400
                                        ">
                                            No items found for this order.
                                        </div>

                                    )}

                                </div>

                            </div>


                            {/* Totals */}
                            <div className="
                                bg-gray-50
                                border-t
                                border-gray-200
                                p-5
                                sm:p-6
                            ">

                                <div className="
                                    max-w-sm
                                    ml-auto
                                    space-y-3
                                ">

                                    <div className="
                                        flex
                                        justify-between
                                        text-sm
                                    ">
                                        <span className="text-gray-500">
                                            Subtotal
                                        </span>

                                        <span className="text-gray-800">
                                            ₦{subtotal.toLocaleString()}
                                        </span>
                                    </div>


                                    <div className="
                                        flex
                                        justify-between
                                        text-sm
                                    ">
                                        <span className="text-gray-500">
                                            Delivery
                                        </span>

                                        <span className="text-gray-800">
                                            ₦{shippingFee.toLocaleString()}
                                        </span>
                                    </div>


                                    {discount > 0 && (
                                        <div className="
                                            flex
                                            justify-between
                                            text-sm
                                        ">
                                            <span className="text-gray-500">
                                                Discount
                                            </span>

                                            <span className="text-green-600">
                                                -₦{discount.toLocaleString()}
                                            </span>
                                        </div>
                                    )}


                                    <div className="
                                        pt-3
                                        border-t
                                        border-gray-200
                                        flex
                                        justify-between
                                    ">
                                        <span className="
                                            text-base
                                            font-bold
                                            text-gray-900
                                        ">
                                            Total
                                        </span>

                                        <span className="
                                            text-lg
                                            font-bold
                                            text-green-600
                                        ">
                                            ₦{total.toLocaleString()}
                                        </span>
                                    </div>

                                </div>

                            </div>

                        </div>


                        {/* Customer */}
                        <div className="
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                        ">

                            <div className="
                                p-5
                                sm:p-6
                                border-b
                                border-gray-200
                            ">

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-gray-900
                                ">
                                    Customer Information
                                </h2>

                            </div>


                            <div className="
                                p-5
                                sm:p-6
                                grid
                                grid-cols-1
                                sm:grid-cols-2
                                gap-5
                            ">

                                <div className="flex items-center gap-3">

                                    <div className="
                                        w-10
                                        h-10
                                        rounded-xl
                                        bg-green-50
                                        flex
                                        items-center
                                        justify-center
                                    ">
                                        <MdPerson
                                            size={20}
                                            className="text-green-600"
                                        />
                                    </div>

                                    <div>

                                        <p className="
                                            text-xs
                                            text-gray-400
                                        ">
                                            Customer
                                        </p>

                                        <p className="
                                            text-sm
                                            font-semibold
                                            text-gray-900
                                        ">
                                            {customerName}
                                        </p>

                                    </div>

                                </div>


                                {customerEmail && (
                                    <div className="flex items-center gap-3">

                                        <div className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-blue-50
                                            flex
                                            items-center
                                            justify-center
                                        ">
                                            <MdEmail
                                                size={20}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div className="min-w-0">

                                            <p className="
                                                text-xs
                                                text-gray-400
                                            ">
                                                Email
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-gray-800
                                                truncate
                                            ">
                                                {customerEmail}
                                            </p>

                                        </div>

                                    </div>
                                )}


                                {customerPhone && (
                                    <div className="flex items-center gap-3">

                                        <div className="
                                            w-10
                                            h-10
                                            rounded-xl
                                            bg-purple-50
                                            flex
                                            items-center
                                            justify-center
                                        ">
                                            <MdPhone
                                                size={20}
                                                className="text-purple-600"
                                            />
                                        </div>

                                        <div>

                                            <p className="
                                                text-xs
                                                text-gray-400
                                            ">
                                                Phone
                                            </p>

                                            <p className="
                                                text-sm
                                                font-medium
                                                text-gray-800
                                            ">
                                                {customerPhone}
                                            </p>

                                        </div>

                                    </div>
                                )}

                            </div>

                        </div>


                        {/* Shipping */}
                        <div className="
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                        ">

                            <div className="
                                p-5
                                sm:p-6
                                border-b
                                border-gray-200
                            ">

                                <h2 className="
                                    text-lg
                                    font-bold
                                    text-gray-900
                                ">
                                    Shipping Information
                                </h2>

                            </div>


                            <div className="p-5 sm:p-6">

                                <div className="flex items-start gap-3">

                                    <div className="
                                        w-10
                                        h-10
                                        shrink-0
                                        rounded-xl
                                        bg-orange-50
                                        flex
                                        items-center
                                        justify-center
                                    ">
                                        <MdLocationOn
                                            size={21}
                                            className="text-orange-600"
                                        />
                                    </div>


                                    <div className="
                                        text-sm
                                        text-gray-600
                                        leading-6
                                    ">

                                        {shippingAddress.name && (
                                            <p className="
                                                font-semibold
                                                text-gray-900
                                            ">
                                                {shippingAddress.name}
                                            </p>
                                        )}

                                        <p>
                                            {shippingAddress.address ||
                                                shippingAddress.street ||
                                                'Address not provided'}
                                        </p>

                                        {(shippingAddress.city ||
                                            shippingAddress.state) && (
                                            <p>
                                                {shippingAddress.city}
                                                {shippingAddress.city &&
                                                    shippingAddress.state
                                                    ? ', '
                                                    : ''}
                                                {shippingAddress.state}
                                            </p>
                                        )}

                                        {shippingAddress.phone && (
                                            <p className="mt-1">
                                                {shippingAddress.phone}
                                            </p>
                                        )}

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        RIGHT SIDEBAR
                    ========================== */}
                    <div className="space-y-6">

                        {/* Update Status */}
                        <div className="
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                            p-5
                        ">

                            <div className="
                                flex
                                items-center
                                gap-2
                                mb-4
                            ">
                                <MdEdit
                                    size={20}
                                    className="text-green-600"
                                />

                                <h2 className="
                                    text-base
                                    font-bold
                                    text-gray-900
                                ">
                                    Update Order
                                </h2>
                            </div>


                            <label className="
                                block
                                text-xs
                                font-medium
                                text-gray-500
                                mb-2
                            ">
                                Order Status
                            </label>

                            <select
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    border
                                    border-gray-200
                                    bg-white
                                    text-sm
                                    text-gray-700
                                    outline-none
                                    focus:border-green-500
                                    focus:ring-2
                                    focus:ring-green-100
                                "
                            >
                                <option value="Processing">
                                    Processing
                                </option>

                                <option value="Shipped">
                                    Shipped
                                </option>

                                <option value="Delivered">
                                    Delivered
                                </option>

                                <option value="Cancelled">
                                    Cancelled
                                </option>
                            </select>


                            <button
                                type="button"
                                disabled={
                                    saving ||
                                    status === order.status
                                }
                                onClick={handleStatusUpdate}
                                className="
                                    mt-3
                                    w-full
                                    px-4
                                    py-3
                                    rounded-xl
                                    bg-green-600
                                    text-white
                                    text-sm
                                    font-semibold
                                    hover:bg-green-700
                                    disabled:opacity-50
                                    disabled:cursor-not-allowed
                                    transition
                                "
                            >
                                {saving
                                    ? 'Updating...'
                                    : 'Update Status'}
                            </button>

                        </div>


                        {/* Payment */}
                        <div className="
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                            p-5
                        ">

                            <div className="
                                flex
                                items-center
                                gap-3
                                mb-4
                            ">

                                <div className="
                                    w-10
                                    h-10
                                    rounded-xl
                                    bg-green-50
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <MdPayment
                                        size={21}
                                        className="text-green-600"
                                    />
                                </div>

                                <div>

                                    <p className="
                                        text-xs
                                        text-gray-400
                                    ">
                                        Payment Status
                                    </p>

                                    <p className="
                                        text-sm
                                        font-bold
                                        text-gray-900
                                        mt-0.5
                                    ">
                                        {order.paymentStatus || 'Pending'}
                                    </p>

                                </div>

                            </div>


                            <div className="
                                pt-4
                                border-t
                                border-gray-100
                            ">

                                <p className="
                                    text-xs
                                    text-gray-400
                                ">
                                    Payment Method
                                </p>

                                <p className="
                                    text-sm
                                    font-medium
                                    text-gray-800
                                    mt-1
                                ">
                                    {order.paymentMethod || 'Not specified'}
                                </p>

                            </div>

                        </div>


                        {/* Order information */}
                        <div className="
                            bg-gray-900
                            rounded-2xl
                            p-5
                            text-white
                        ">

                            <div className="
                                flex
                                items-center
                                gap-2
                                mb-4
                            ">
                                <MdShoppingBag size={19} />

                                <h2 className="
                                    text-sm
                                    font-bold
                                ">
                                    Order Information
                                </h2>
                            </div>


                            <div className="space-y-3">

                                <div className="
                                    flex
                                    justify-between
                                    gap-4
                                ">
                                    <span className="
                                        text-xs
                                        text-gray-400
                                    ">
                                        Order ID
                                    </span>

                                    <span className="
                                        text-xs
                                        font-medium
                                        text-right
                                        break-all
                                    ">
                                        {order.id}
                                    </span>
                                </div>


                                <div className="
                                    flex
                                    justify-between
                                    gap-4
                                ">
                                    <span className="
                                        text-xs
                                        text-gray-400
                                    ">
                                        Items
                                    </span>

                                    <span className="
                                        text-xs
                                        font-medium
                                    ">
                                        {items.length}
                                    </span>
                                </div>


                                <div className="
                                    flex
                                    justify-between
                                    gap-4
                                ">
                                    <span className="
                                        text-xs
                                        text-gray-400
                                    ">
                                        Created
                                    </span>

                                    <span className="
                                        text-xs
                                        font-medium
                                    ">
                                        {formatDate(order.createdAt)}
                                    </span>
                                </div>

                            </div>

                        </div>


                        {/* Back */}
                        <button
                            type="button"
                            onClick={() =>
                                navigate('/store/orders')
                            }
                            className="
                                w-full
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-4
                                py-3
                                rounded-xl
                                bg-white
                                border
                                border-gray-200
                                text-sm
                                font-semibold
                                text-gray-700
                                hover:bg-gray-50
                                transition
                            "
                        >
                            <MdArrowBack size={19} />
                            Back to Orders
                        </button>

                    </div>

                </div>

            </main>

        </div>
    )
}