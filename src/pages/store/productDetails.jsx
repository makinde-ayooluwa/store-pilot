import React from 'react'
import {
    MdArrowBack,
    MdEdit,
    MdInventory,
    MdStore,
    MdCategory,
    MdAttachMoney,
    MdShoppingBag,
    MdCheckCircle,
    MdWarning,
    MdClose,
    MdImage
} from 'react-icons/md'
import { Link, useParams } from 'react-router-dom'
import { useStore } from '../../contexts/storeProvider'

export default function SellerProductDetails() {
    const { id } = useParams()
    const { products } = useStore()

    const product = products.find(
        (item) => item.id === id
    )

    // -----------------------------
    // Product not found
    // -----------------------------
    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
                <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-sm">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-red-50 flex items-center justify-center">
                        <MdClose
                            size={32}
                            className="text-red-500"
                        />
                    </div>

                    <h1 className="text-xl font-bold text-gray-900">
                        Product not found
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        The product you're looking for doesn't exist
                        or is no longer available.
                    </p>

                    <Link
                        to="/store/products"
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
                        Back to Products
                    </Link>
                </div>
            </div>
        )
    }

    // -----------------------------
    // Safe product values
    // -----------------------------
    const images = Array.isArray(product.images)
        ? product.images
        : product.image
            ? [product.image]
            : []

    const stock = Number(product.stock ?? 0)
    const price = Number(product.price ?? 0)
    const oldPrice = Number(product.oldPrice ?? 0)

    const status =
        product.status ??
        (stock === 0
            ? 'Out of stock'
            : stock <= 5
                ? 'Low stock'
                : 'Active')

    const getStatusStyle = () => {
        if (status === 'Out of stock') {
            return 'bg-red-50 text-red-700 border-red-100'
        }

        if (status === 'Low stock') {
            return 'bg-yellow-50 text-yellow-700 border-yellow-100'
        }

        return 'bg-green-50 text-green-700 border-green-100'
    }

    const getStockStyle = () => {
        if (stock === 0) {
            return 'text-red-600'
        }

        if (stock <= 5) {
            return 'text-yellow-600'
        }

        return 'text-green-600'
    }

    return (
        <div className="min-h-screen bg-gray-50">

            {/* =========================
                HEADER
            ========================== */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div className="flex items-center gap-3">
                            <Link
                                to="/store/products"
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
                                <p className="text-xs text-gray-500 mb-1">
                                    Seller / Products
                                </p>

                                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
                                    Product Details
                                </h1>
                            </div>
                        </div>

                        <Link
                            to={`/store/products/${product.id}/edit`}
                            className="
                                inline-flex
                                items-center
                                justify-center
                                gap-2
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
                            <MdEdit size={19} />
                            Edit Product
                        </Link>

                    </div>
                </div>
            </div>


            {/* =========================
                CONTENT
            ========================== */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* =========================
                        LEFT
                    ========================== */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Product Overview */}
                        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">

                            <div className="p-5 sm:p-6 border-b border-gray-200">
                                <div className="flex items-start justify-between gap-4">

                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Product Overview
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            View your product information
                                        </p>
                                    </div>

                                    <span
                                        className={`
                                            inline-flex
                                            items-center
                                            gap-1.5
                                            px-3
                                            py-1.5
                                            rounded-full
                                            border
                                            text-xs
                                            font-semibold
                                            ${getStatusStyle()}
                                        `}
                                    >
                                        {status === 'Active' && (
                                            <MdCheckCircle size={15} />
                                        )}

                                        {status === 'Low stock' && (
                                            <MdWarning size={15} />
                                        )}

                                        {status === 'Out of stock' && (
                                            <MdClose size={15} />
                                        )}

                                        {status}
                                    </span>

                                </div>
                            </div>


                            <div className="p-5 sm:p-6">

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                                    {/* Image */}
                                    <div>

                                        <div className="
                                            aspect-square
                                            rounded-2xl
                                            bg-gray-100
                                            border
                                            border-gray-200
                                            overflow-hidden
                                            flex
                                            items-center
                                            justify-center
                                        ">
                                            {images.length > 0 ? (
                                                <img
                                                    src={images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="text-center">
                                                    <MdImage
                                                        size={55}
                                                        className="mx-auto text-gray-300"
                                                    />

                                                    <p className="text-sm text-gray-400 mt-2">
                                                        No product image
                                                    </p>
                                                </div>
                                            )}
                                        </div>


                                        {/* Image thumbnails */}
                                        {images.length > 1 && (
                                            <div className="flex gap-3 mt-3 overflow-x-auto pb-1">

                                                {images.map((image, index) => (
                                                    <div
                                                        key={index}
                                                        className="
                                                            w-16
                                                            h-16
                                                            shrink-0
                                                            rounded-lg
                                                            overflow-hidden
                                                            border
                                                            border-gray-200
                                                        "
                                                    >
                                                        <img
                                                            src={image}
                                                            alt={`${product.name} ${index + 1}`}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    </div>
                                                ))}

                                            </div>
                                        )}

                                    </div>


                                    {/* Product information */}
                                    <div>

                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {product.name}
                                        </h3>

                                        {product.description && (
                                            <p className="text-sm text-gray-500 mt-3 leading-6">
                                                {product.description}
                                            </p>
                                        )}


                                        {/* Price */}
                                        <div className="mt-6">

                                            <p className="text-xs text-gray-500 mb-1">
                                                Selling Price
                                            </p>

                                            <div className="flex items-center gap-3">

                                                <span className="text-2xl font-bold text-green-600">
                                                    ₦{price.toLocaleString()}
                                                </span>

                                                {oldPrice > price && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        ₦{oldPrice.toLocaleString()}
                                                    </span>
                                                )}

                                            </div>

                                        </div>


                                        {/* Basic details */}
                                        <div className="mt-6 space-y-4">

                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                                                    <MdCategory
                                                        size={19}
                                                        className="text-gray-500"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Category
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-800">
                                                        {product.category || 'Uncategorized'}
                                                    </p>
                                                </div>
                                            </div>


                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                                                    <MdInventory
                                                        size={19}
                                                        className="text-gray-500"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        SKU
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-800">
                                                        {product.sku || 'Not set'}
                                                    </p>
                                                </div>
                                            </div>


                                            <div className="flex items-center gap-3">
                                                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center">
                                                    <MdStore
                                                        size={19}
                                                        className="text-gray-500"
                                                    />
                                                </div>

                                                <div>
                                                    <p className="text-xs text-gray-400">
                                                        Product ID
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-800">
                                                        {product.id}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>


                        {/* Product Statistics */}
                        <div className="bg-white rounded-2xl border border-gray-200">

                            <div className="p-5 sm:p-6 border-b border-gray-200">
                                <h2 className="text-lg font-bold text-gray-900">
                                    Product Statistics
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    Current inventory information
                                </p>
                            </div>


                            <div className="grid grid-cols-1 sm:grid-cols-3">

                                {/* Stock */}
                                <div className="p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-gray-200">
                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                                            <MdInventory
                                                size={21}
                                                className="text-green-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Current Stock
                                            </p>

                                            <p className={`text-xl font-bold ${getStockStyle()}`}>
                                                {stock}
                                            </p>
                                        </div>

                                    </div>
                                </div>


                                {/* Price */}
                                <div className="p-5 sm:p-6 border-b sm:border-b-0 sm:border-r border-gray-200">
                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                                            <MdAttachMoney
                                                size={21}
                                                className="text-blue-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Unit Price
                                            </p>

                                            <p className="text-xl font-bold text-gray-900">
                                                ₦{price.toLocaleString()}
                                            </p>
                                        </div>

                                    </div>
                                </div>


                                {/* Sales */}
                                <div className="p-5 sm:p-6">
                                    <div className="flex items-center gap-3">

                                        <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                                            <MdShoppingBag
                                                size={21}
                                                className="text-purple-600"
                                            />
                                        </div>

                                        <div>
                                            <p className="text-xs text-gray-500">
                                                Total Sales
                                            </p>

                                            <p className="text-xl font-bold text-gray-900">
                                                {product.sales ?? 0}
                                            </p>
                                        </div>

                                    </div>
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* =========================
                        RIGHT SIDEBAR
                    ========================== */}
                    <div className="space-y-6">

                        {/* Quick Actions */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-5">

                            <h2 className="text-base font-bold text-gray-900">
                                Quick Actions
                            </h2>

                            <div className="mt-4 space-y-2">

                                <Link
                                    to={`/store/products/${product.id}/edit`}
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        rounded-xl
                                        bg-green-50
                                        text-green-700
                                        text-sm
                                        font-semibold
                                        hover:bg-green-100
                                        transition
                                    "
                                >
                                    <MdEdit size={19} />
                                    Edit Product
                                </Link>


                                <Link
                                    to="/store/products"
                                    className="
                                        w-full
                                        flex
                                        items-center
                                        gap-3
                                        px-4
                                        py-3
                                        rounded-xl
                                        bg-gray-50
                                        text-gray-700
                                        text-sm
                                        font-semibold
                                        hover:bg-gray-100
                                        transition
                                    "
                                >
                                    <MdArrowBack size={19} />
                                    Back to Products
                                </Link>

                            </div>

                        </div>


                        {/* Stock Status */}
                        <div className="bg-white rounded-2xl border border-gray-200 p-5">

                            <h2 className="text-base font-bold text-gray-900">
                                Stock Status
                            </h2>

                            <div className="mt-4">

                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-500">
                                        Inventory
                                    </span>

                                    <span className={`font-semibold ${getStockStyle()}`}>
                                        {stock} units
                                    </span>
                                </div>

                                <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">

                                    <div
                                        className={`
                                            h-full
                                            rounded-full
                                            ${
                                                stock === 0
                                                    ? 'bg-red-500'
                                                    : stock <= 5
                                                        ? 'bg-yellow-500'
                                                        : 'bg-green-500'
                                            }
                                        `}
                                        style={{
                                            width: `${Math.min(stock, 100)}%`
                                        }}
                                    />

                                </div>

                                <p className="text-xs text-gray-400 mt-3">
                                    {stock === 0
                                        ? 'This product is currently out of stock.'
                                        : stock <= 5
                                            ? 'Stock is running low. Consider restocking soon.'
                                            : 'Stock level is currently healthy.'}
                                </p>

                            </div>

                        </div>


                        {/* Product ID */}
                        <div className="bg-gray-900 rounded-2xl p-5 text-white">

                            <p className="text-xs text-gray-400">
                                Product ID
                            </p>

                            <p className="text-sm font-semibold mt-2 break-all">
                                {product.id}
                            </p>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    )
}