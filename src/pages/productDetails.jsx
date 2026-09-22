import React, { useMemo, useState } from 'react'
import {
    MdAdd,
    MdRemove,
    MdShoppingCart,
    MdFlashOn,
    MdFavorite,
    MdFavoriteBorder,
    MdStar,
    MdStarBorder,
    MdVerified,
    MdStorefront,
    MdLocalShipping,
    MdLocationOn,
    MdSecurity,
    MdKeyboardArrowRight,
    MdCheckCircle,
    MdArrowBack,
    MdSearch
} from 'react-icons/md'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Header from '../components/header'
import { useCart } from '../contexts/cartProvider'
import { useWishlist } from '../contexts/wishlistProvider'
import { useProduct } from '../contexts/productProvider'

const reviews = [
    {
        id: 1,
        name: 'Daniel O.',
        rating: 5,
        date: '2 weeks ago',
        comment:
            'Great product and exactly as described. Delivery was also smooth.'
    },
    {
        id: 2,
        name: 'Sarah K.',
        rating: 5,
        date: '1 month ago',
        comment:
            'The quality is really good. The store was responsive and delivery was fast.'
    },
    {
        id: 3,
        name: 'Michael A.',
        rating: 4,
        date: '2 months ago',
        comment:
            'Good experience overall. Product arrived safely and works as expected.'
    }
]




export default function ProductDetails({products}) {

const {stores} = useProduct();
    const { id } = useParams()
    const navigate = useNavigate()

    const [mobileMenu, setMobileMenu] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const {isWishlisted, toggleWishlist} = useWishlist();
    const [addedToCart, setAddedToCart] = useState(false)

    const { addToCart } = useCart()


    const product = products.find(
        item => item.id === id
    )


    const relatedProducts = useMemo(() => {

        if (!product) return []

        return products
            .filter(
                item =>
                    item.id !== product.id &&
                    (
                        item.category === product.category ||
                        item.store === product.store
                    )
            )
            .slice(0, 4)

    }, [product])


    const formatPrice = price => {
        return `₦${price.toLocaleString('en-NG')}`
    }


    const discount = product?.oldPrice
        ? Math.round(
            (
                (product.oldPrice - product.price) /
                product.oldPrice
            ) * 100
        )
        : 0


    const handleAddToCart = () => {

        if (!product) return

        addToCart(product, quantity)

        setAddedToCart(true)

        setTimeout(() => {
            setAddedToCart(false)
        }, 2000)
    }


    const handleBuyNow = () => {

        if (!product) return

        addToCart(product, quantity)

        navigate('/checkout')
    }


    if (!product) {

        return (
            <div className="min-h-screen bg-slate-50">

                <Header
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                />

                <div className="mx-auto flex min-h-[70vh] max-w-7xl flex-col items-center justify-center px-4 text-center">

                    <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                        <MdSearch
                            size={30}
                            className="text-slate-400"
                        />
                    </div>

                    <h1 className="text-2xl font-bold text-slate-900">
                        Product not found
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        The product you're looking for doesn't exist.
                    </p>

                    <Link
                        to="/products"
                        className="mt-6 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                    >
                        Browse products
                    </Link>

                </div>

            </div>
        )
    }


    const store = stores[product.store]


    return (
        <div className="min-h-screen bg-slate-50 text-slate-900">

            {/* HEADER */}

            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />


            <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

                {/* BREADCRUMB */}

                <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-slate-500">

                    <Link
                        to="/"
                        className="hover:text-emerald-600"
                    >
                        Home
                    </Link>

                    <MdKeyboardArrowRight size={18} />

                    <Link
                        to="/products"
                        className="hover:text-emerald-600"
                    >
                        Products
                    </Link>

                    <MdKeyboardArrowRight size={18} />

                    <span className="text-slate-800">
                        {product.name}
                    </span>

                </div>


                {/* PRODUCT SECTION */}

                <section className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8">

                    <div className="grid gap-8 lg:grid-cols-2">


                        {/* IMAGE GALLERY */}

                        <div>

                            <div className="relative overflow-hidden rounded-2xl bg-slate-100">

                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="aspect-square w-full object-cover"
                                />

                                {product.badge && (
                                    <span className="absolute left-4 top-4 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white">
                                        {product.badge}
                                    </span>
                                )}


                                <button
                                    onClick={() =>
                                        toggleWishlist(product)
                                    }
                                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
                                    aria-label="Add to wishlist"
                                >

                                    {isWishlisted(product.id) ? (
                                        <MdFavorite
                                            size={21}
                                            className="text-rose-500"
                                        />
                                    ) : (
                                        <MdFavoriteBorder
                                            size={21}
                                            className="text-slate-600"
                                        />
                                    )}

                                </button>

                            </div>


                            {/* THUMBNAILS */}

                            <div className="mt-4 grid grid-cols-3 gap-3">

                                {product.images.map(
                                    (image, index) => (

                                        <button
                                            key={index}
                                            onClick={() =>
                                                setSelectedImage(index)
                                            }
                                            className={`overflow-hidden rounded-xl border-2 transition ${
                                                selectedImage === index
                                                    ? 'border-emerald-600'
                                                    : 'border-transparent'
                                            }`}
                                        >

                                            <img
                                                src={image}
                                                alt={`${product.name} ${index + 1}`}
                                                className="aspect-square w-full object-cover"
                                            />

                                        </button>

                                    )
                                )}

                            </div>

                        </div>


                        {/* PRODUCT INFORMATION */}

                        <div className="flex flex-col">


                            {/* CATEGORY */}

                            <Link
                                to={`/categories/${product.category
                                    .toLowerCase()
                                    .replaceAll(' ', '-')
                                    .replaceAll('&', 'and')}`}
                                className="text-xs font-semibold uppercase tracking-wider text-emerald-600"
                            >
                                {product.category}
                            </Link>


                            {/* TITLE */}

                            <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                                {product.name}
                            </h1>


                            {/* RATING */}

                            <div className="mt-3 flex flex-wrap items-center gap-3">

                                <div className="flex items-center gap-1">

                                    <MdStar
                                        size={20}
                                        className="text-amber-400"
                                    />

                                    <span className="font-semibold">
                                        {product.rating}
                                    </span>

                                    <span className="text-sm text-slate-500">
                                        ({product.reviews} reviews)
                                    </span>

                                </div>

                                <span className="h-4 w-px bg-slate-200" />

                                <span className="text-sm text-slate-500">
                                    {product.stock} available
                                </span>

                            </div>


                            {/* PRICE */}

                            <div className="mt-6 border-y border-slate-100 py-5">

                                <div className="flex flex-wrap items-center gap-3">

                                    <span className="text-2xl font-bold sm:text-3xl">
                                        {formatPrice(product.price)}
                                    </span>

                                    {product.oldPrice && (
                                        <>
                                            <span className="text-sm text-slate-400 line-through">
                                                {formatPrice(product.oldPrice)}
                                            </span>

                                            <span className="rounded-lg bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                                                {discount}% OFF
                                            </span>
                                        </>
                                    )}

                                </div>

                            </div>


                            {/* DESCRIPTION */}

                            <div className="py-5">

                                <h2 className="text-sm font-bold">
                                    About this product
                                </h2>

                                <p className="mt-2 text-sm leading-6 text-slate-600">
                                    {product.description}
                                </p>

                            </div>


                            {/* STORE */}

                            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">

                                <div className="flex items-center justify-between gap-4">

                                    <div className="flex min-w-0 items-center gap-3">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
                                            <MdStorefront size={23} />
                                        </div>

                                        <div className="min-w-0">

                                            <div className="flex items-center gap-1">

                                                <p className="truncate text-sm font-bold">
                                                    {product.store}
                                                </p>

                                                <MdVerified
                                                    size={15}
                                                    className="shrink-0 text-emerald-600"
                                                />

                                            </div>

                                            <p className="mt-0.5 text-xs text-slate-500">
                                                {store?.products || 0} products
                                                {' · '}
                                                {store?.rating || product.rating} rating
                                            </p>

                                        </div>

                                    </div>


                                    <Link
                                        to={`/stores/${product.storeSlug}`}
                                        className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-emerald-500 hover:text-emerald-600"
                                    >
                                        Visit store
                                    </Link>

                                </div>

                            </div>


                            {/* QUANTITY */}

                            <div className="mt-6">

                                <p className="mb-2 text-sm font-semibold">
                                    Quantity
                                </p>

                                <div className="flex w-fit items-center rounded-xl border border-slate-200 bg-white">

                                    <button
                                        disabled={quantity <= 1}
                                        onClick={() =>
                                            setQuantity(prev =>
                                                Math.max(
                                                    1,
                                                    prev - 1
                                                )
                                            )
                                        }
                                        className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <MdRemove size={19} />
                                    </button>


                                    <span className="flex h-11 min-w-12 items-center justify-center border-x border-slate-200 text-sm font-bold">
                                        {quantity}
                                    </span>


                                    <button
                                        disabled={
                                            quantity >= product.stock
                                        }
                                        onClick={() =>
                                            setQuantity(prev =>
                                                Math.min(
                                                    product.stock,
                                                    prev + 1
                                                )
                                            )
                                        }
                                        className="flex h-11 w-11 items-center justify-center text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <MdAdd size={19} />
                                    </button>

                                </div>

                                <p className="mt-2 text-xs text-slate-400">
                                    Maximum {product.stock} items available
                                </p>

                            </div>


                            {/* ACTIONS */}

                            <div className="mt-6 grid gap-3 sm:grid-cols-2">

                                <button
                                    onClick={handleAddToCart}
                                    className={`flex h-12 items-center justify-center gap-2 rounded-xl border text-sm font-bold transition ${
                                        addedToCart
                                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                                            : 'border-emerald-600 text-emerald-700 hover:bg-emerald-50'
                                    }`}
                                >

                                    {addedToCart ? (
                                        <>
                                            <MdCheckCircle size={20} />
                                            Added to Cart
                                        </>
                                    ) : (
                                        <>
                                            <MdShoppingCart size={20} />
                                            Add to Cart
                                        </>
                                    )}

                                </button>


                                <button
                                    onClick={handleBuyNow}
                                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-emerald-600 text-sm font-bold text-white transition hover:bg-emerald-700"
                                >
                                    <MdFlashOn size={20} />
                                    Buy Now
                                </button>

                            </div>


                            {/* DELIVERY INFO */}

                            <div className="mt-6 grid gap-3 border-t border-slate-100 pt-6 sm:grid-cols-2">

                                <div className="flex gap-3">

                                    <MdLocalShipping
                                        size={22}
                                        className="shrink-0 text-emerald-600"
                                    />

                                    <div>

                                        <p className="text-xs font-bold">
                                            Delivery
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Delivery options are available at checkout.
                                        </p>

                                    </div>

                                </div>


                                <div className="flex gap-3">

                                    <MdSecurity
                                        size={22}
                                        className="shrink-0 text-emerald-600"
                                    />

                                    <div>

                                        <p className="text-xs font-bold">
                                            Secure shopping
                                        </p>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Shop securely through StorePilot.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* DELIVERY / STORE / PROTECTION */}

                <section className="mt-6 grid gap-6 lg:grid-cols-3">


                    {/* DELIVERY */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <MdLocalShipping size={22} />
                        </div>

                        <h2 className="mt-4 text-sm font-bold">
                            Delivery information
                        </h2>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                            Delivery fees and estimated delivery time
                            depend on your location and will be shown
                            during checkout.
                        </p>

                    </div>


                    {/* STORE */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
                            <MdStorefront size={22} />
                        </div>

                        <h2 className="mt-4 text-sm font-bold">
                            Store information
                        </h2>

                        <div className="mt-3 space-y-2">

                            <div className="flex items-center gap-2 text-xs text-slate-500">

                                <MdLocationOn size={17} />

                                {store?.location || 'Nigeria'}

                            </div>


                            <div className="flex items-center gap-2 text-xs text-slate-500">

                                <MdVerified
                                    size={17}
                                    className="text-emerald-600"
                                />

                                Verified Store

                            </div>

                        </div>

                    </div>


                    {/* PROTECTION */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-5">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <MdSecurity size={22} />
                        </div>

                        <h2 className="mt-4 text-sm font-bold">
                            StorePilot protection
                        </h2>

                        <p className="mt-2 text-xs leading-5 text-slate-500">
                            Keep your purchases and order communication
                            within StorePilot for a safer shopping
                            experience.
                        </p>

                    </div>

                </section>


                {/* REVIEWS */}

                <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 sm:p-7">

                    <div className="flex flex-col gap-5 border-b border-slate-100 pb-6 sm:flex-row sm:items-center sm:justify-between">

                        <div>

                            <h2 className="text-lg font-bold">
                                Customer reviews
                            </h2>

                            <p className="mt-1 text-sm text-slate-500">
                                What customers are saying about this product.
                            </p>

                        </div>


                        <div className="flex items-center gap-3">

                            <div className="text-3xl font-bold">
                                {product.rating}
                            </div>

                            <div>

                                <div className="flex">

                                    {[1, 2, 3, 4, 5].map(star => (

                                        <MdStar
                                            key={star}
                                            size={18}
                                            className={
                                                star <= Math.round(product.rating)
                                                    ? 'text-amber-400'
                                                    : 'text-slate-200'
                                            }
                                        />

                                    ))}

                                </div>

                                <p className="mt-1 text-xs text-slate-500">
                                    {product.reviews} reviews
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="divide-y divide-slate-100">

                        {reviews.map(review => (

                            <div
                                key={review.id}
                                className="py-5"
                            >

                                <div className="flex items-center justify-between gap-3">

                                    <div>

                                        <p className="text-sm font-semibold">
                                            {review.name}
                                        </p>

                                        <div className="mt-1 flex items-center gap-2">

                                            <div className="flex">

                                                {[1, 2, 3, 4, 5].map(star => (

                                                    star <= review.rating ? (

                                                        <MdStar
                                                            key={star}
                                                            size={15}
                                                            className="text-amber-400"
                                                        />

                                                    ) : (

                                                        <MdStarBorder
                                                            key={star}
                                                            size={15}
                                                            className="text-slate-300"
                                                        />

                                                    )

                                                ))}

                                            </div>

                                            <span className="text-[11px] text-slate-400">
                                                {review.date}
                                            </span>

                                        </div>

                                    </div>


                                    <MdCheckCircle
                                        size={18}
                                        className="text-emerald-500"
                                        title="Verified purchase"
                                    />

                                </div>


                                <p className="mt-3 text-sm leading-6 text-slate-600">
                                    {review.comment}
                                </p>

                            </div>

                        ))}

                    </div>


                    <button
                        type="button"
                        className="mt-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                        View all reviews
                    </button>

                </section>


                {/* RELATED PRODUCTS */}

                {relatedProducts.length > 0 && (

                    <section className="mt-10">

                        <div className="mb-5 flex items-end justify-between">

                            <div>

                                <p className="text-xs font-semibold uppercase tracking-wider text-emerald-600">
                                    You may also like
                                </p>

                                <h2 className="mt-1 text-xl font-bold">
                                    Related Products
                                </h2>

                            </div>


                            <Link
                                to="/products"
                                className="hidden text-xs font-semibold text-emerald-600 hover:text-emerald-700 sm:block"
                            >
                                View all
                            </Link>

                        </div>


                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 lg:grid-cols-4">

                            {relatedProducts.map(item => (

                                <Link
                                    key={item.id}
                                    to={`/products/${item.id}`}
                                    className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                >

                                    <div className="relative aspect-square overflow-hidden bg-slate-100">

                                        <img
                                            src={item.images[0]}
                                            alt={item.name}
                                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                        />

                                        {item.badge && (
                                            <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-2.5 py-1 text-[10px] font-bold text-white">
                                                {item.badge}
                                            </span>
                                        )}

                                    </div>


                                    <div className="p-3.5">

                                        <h3 className="line-clamp-1 text-sm font-semibold group-hover:text-emerald-600">
                                            {item.name}
                                        </h3>


                                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">

                                            <MdStorefront size={14} />

                                            <span className="truncate">
                                                {item.store}
                                            </span>

                                        </div>


                                        <div className="mt-2 flex items-center gap-1">

                                            <MdStar
                                                size={16}
                                                className="text-amber-400"
                                            />

                                            <span className="text-xs font-semibold">
                                                {item.rating}
                                            </span>

                                            <span className="text-[11px] text-slate-400">
                                                ({item.reviews})
                                            </span>

                                        </div>


                                        <div className="mt-3 flex items-center gap-2">

                                            <span className="text-sm font-bold">
                                                {formatPrice(item.price)}
                                            </span>

                                            {item.oldPrice && (
                                                <span className="text-[11px] text-slate-400 line-through">
                                                    {formatPrice(item.oldPrice)}
                                                </span>
                                            )}

                                        </div>

                                    </div>

                                </Link>

                            ))}

                        </div>

                    </section>

                )}

            </main>


            {/* MOBILE BACK BUTTON */}

            <button
                onClick={() => navigate('/products')}
                className="fixed bottom-5 left-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition hover:bg-slate-800 lg:hidden"
                aria-label="Back to products"
            >
                <MdArrowBack size={21} />
            </button>

        </div>
    )
}