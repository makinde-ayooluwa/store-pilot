import React from 'react'
import {
    MdFavorite,
    MdDelete,
    MdShoppingCart,
    MdArrowBack,
    MdRemoveShoppingCart
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import Header from '../../components/header'
import { useWishlist } from '../../contexts/wishlistProvider'
import { useCart } from '../../contexts/cartProvider'
import { useUser } from '../../contexts/userProvider'
import { UserOnly } from '../../components/userOnly'

export default function Wishlist() {
    const {
        wishlistItems,
        removeFromWishlist,
        clearWishlist
    } = useWishlist()

    const { addToCart } = useCart()
    const { userLoading } = useUser();
    const handleAddToCart = (product) => {
        addToCart(product)
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <UserOnly loading={userLoading}>
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                        <Link
                            to="/"
                            className="hover:text-green-600"
                        >
                            Home
                        </Link>

                        <span>/</span>

                        <span className="text-gray-900">
                            Wishlist
                        </span>
                    </div>

                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center">
                                    <MdFavorite
                                        size={24}
                                        className="text-red-500"
                                    />
                                </div>

                                <div>
                                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                        My Wishlist
                                    </h1>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {wishlistItems.length}{' '}
                                        {wishlistItems.length === 1
                                            ? 'product'
                                            : 'products'}{' '}
                                        saved
                                    </p>
                                </div>
                            </div>
                        </div>

                        {wishlistItems.length > 0 && (
                            <button
                                onClick={clearWishlist}
                                className="flex items-center justify-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:bg-white hover:text-red-500 transition"
                            >
                                <MdDelete size={18} />
                                Clear Wishlist
                            </button>
                        )}
                    </div>

                    {/* Empty State */}
                    {wishlistItems.length === 0 ? (
                        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-16 text-center">
                            <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">
                                <MdRemoveShoppingCart
                                    size={38}
                                    className="text-gray-400"
                                />
                            </div>

                            <h2 className="text-xl font-bold text-gray-900 mb-2">
                                Your wishlist is empty
                            </h2>

                            <p className="text-gray-500 max-w-md mx-auto mb-6">
                                Save products you love to your wishlist and
                                come back to them whenever you're ready.
                            </p>

                            <Link
                                to="/products"
                                className="inline-flex items-center gap-2 px-5 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                            >
                                <MdShoppingCart size={19} />
                                Browse Products
                            </Link>
                        </div>
                    ) : (
                        <>
                            {/* Wishlist Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                                {wishlistItems.map((product) => (
                                    <div
                                        key={product.id}
                                        className="bg-white rounded-xl border border-gray-100 overflow-hidden group"
                                    >
                                        {/* Image */}
                                        <div className="relative aspect-square bg-gray-100 overflow-hidden">
                                            <Link
                                                to={`/products/${product.slug}`}
                                            >
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                                                />
                                            </Link>

                                            <button
                                                onClick={() =>
                                                    removeFromWishlist(
                                                        product.id
                                                    )
                                                }
                                                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center text-red-500 hover:bg-red-50 transition"
                                                aria-label="Remove from wishlist"
                                            >
                                                <MdFavorite size={20} />
                                            </button>

                                            {product.stock <= 0 && (
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                                    <span className="px-3 py-1.5 bg-white rounded-full text-sm font-semibold text-gray-800">
                                                        Out of Stock
                                                    </span>
                                                </div>
                                            )}
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4">
                                            <Link
                                                to={`/products/${product.slug}`}
                                                className="block"
                                            >
                                                <p className="text-xs text-green-600 font-medium mb-1">
                                                    {product.category}
                                                </p>

                                                <h2 className="font-semibold text-gray-900 line-clamp-2 hover:text-green-600 transition">
                                                    {product.name}
                                                </h2>
                                            </Link>

                                            {/* Rating */}
                                            <div className="flex items-center gap-1 mt-2">
                                                <span className="text-yellow-500 text-sm">
                                                    ★
                                                </span>

                                                <span className="text-sm font-medium text-gray-700">
                                                    {product.rating}
                                                </span>

                                                <span className="text-xs text-gray-400">
                                                    ({product.reviews})
                                                </span>
                                            </div>

                                            {/* Price */}
                                            <div className="flex items-center gap-2 mt-3">
                                                <span className="text-lg font-bold text-gray-900">
                                                    ₦{product.price.toLocaleString()}
                                                </span>

                                                {product.oldPrice && (
                                                    <span className="text-sm text-gray-400 line-through">
                                                        ₦
                                                        {product.oldPrice.toLocaleString()}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Store */}
                                            <Link
                                                to={`/stores/${product.storeSlug}`}
                                                className="block text-xs text-gray-500 mt-2 hover:text-green-600"
                                            >
                                                Sold by {product.store}
                                            </Link>

                                            {/* Actions */}
                                            <div className="flex gap-2 mt-4">
                                                <button
                                                    onClick={() =>
                                                        handleAddToCart(product)
                                                    }
                                                    disabled={product.stock <= 0}
                                                    className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-green-600 text-white text-sm font-medium hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                                                >
                                                    <MdShoppingCart size={18} />
                                                    Add to Cart
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        removeFromWishlist(
                                                            product.id
                                                        )
                                                    }
                                                    className="w-11 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:text-red-500 hover:border-red-200 transition"
                                                    aria-label="Remove product"
                                                >
                                                    <MdDelete size={19} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Continue Shopping */}
                            <div className="mt-8">
                                <Link
                                    to="/products"
                                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600"
                                >
                                    <MdArrowBack size={18} />
                                    Continue Shopping
                                </Link>
                            </div>
                        </>
                    )}
                </main>
            </UserOnly>
        </div>
    )
}