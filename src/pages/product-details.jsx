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


const products = [
    {
        id: 1,
        name: 'iPhone 15 Pro',
        store: 'TechHub Store',
        storeSlug: 'techhub-store',
        category: 'Phones',
        price: 1250000,
        oldPrice: 1350000,
        rating: 4.9,
        reviews: 124,
        stock: 12,
        badge: 'Popular',
        description:
            'Experience powerful performance, an advanced camera system and a premium titanium design with the iPhone 15 Pro.',
        images: [
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1695048133194-0f4e7b1b9b75?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 2,
        name: 'Nike Air Max 270',
        store: 'Urban Fits',
        storeSlug: 'urban-fits',
        category: 'Fashion',
        price: 85000,
        oldPrice: 100000,
        rating: 4.8,
        reviews: 89,
        stock: 24,
        badge: 'Sale',
        description:
            'A comfortable everyday sneaker with a bold design, lightweight construction and responsive cushioning.',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 3,
        name: 'Sony WH-1000XM5',
        store: 'TechHub Store',
        storeSlug: 'techhub-store',
        category: 'Electronics',
        price: 420000,
        oldPrice: 450000,
        rating: 4.9,
        reviews: 76,
        stock: 8,
        badge: 'Top Rated',
        description:
            'Premium wireless headphones with immersive sound, active noise cancellation and all-day comfort.',
        images: [
            'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 4,
        name: 'Leather Backpack',
        store: 'Urban Fits',
        storeSlug: 'urban-fits',
        category: 'Accessories',
        price: 45000,
        oldPrice: null,
        rating: 4.6,
        reviews: 52,
        stock: 31,
        badge: null,
        description:
            'A stylish and durable leather backpack designed for everyday work, school and travel.',
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 5,
        name: 'Smart LED TV 55"',
        store: 'Home Space',
        storeSlug: 'home-space',
        category: 'Electronics',
        price: 680000,
        oldPrice: 750000,
        rating: 4.7,
        reviews: 63,
        stock: 6,
        badge: 'Sale',
        description:
            'Enjoy a vivid entertainment experience with a large 55-inch smart LED display and modern connectivity.',
        images: [
            'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1601944177325-f8867652837f?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 6,
        name: 'Air Fryer 5.5L',
        store: 'Home Space',
        storeSlug: 'home-space',
        category: 'Home & Kitchen',
        price: 95000,
        oldPrice: 110000,
        rating: 4.7,
        reviews: 48,
        stock: 15,
        badge: 'Deal',
        description:
            'Prepare crispy meals with less oil using this convenient 5.5L air fryer for everyday cooking.',
        images: [
            'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1648135370836-0b2a6e9fba7e?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 7,
        name: 'Premium Face Serum',
        store: 'Glow Beauty',
        storeSlug: 'glow-beauty',
        category: 'Beauty',
        price: 32000,
        oldPrice: 38000,
        rating: 4.8,
        reviews: 71,
        stock: 18,
        badge: 'Popular',
        description:
            'A lightweight beauty serum designed to fit easily into your everyday skincare routine.',
        images: [
            'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 8,
        name: 'Classic Wrist Watch',
        store: 'Urban Fits',
        storeSlug: 'urban-fits',
        category: 'Accessories',
        price: 65000,
        oldPrice: 80000,
        rating: 4.6,
        reviews: 39,
        stock: 10,
        badge: 'Sale',
        description:
            'A clean and timeless wrist watch designed to complement both casual and formal outfits.',
        images: [
            'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 9,
        name: 'Samsung Galaxy S24',
        store: 'TechHub Store',
        storeSlug: 'techhub-store',
        category: 'Phones',
        price: 980000,
        oldPrice: 1050000,
        rating: 4.8,
        reviews: 96,
        stock: 9,
        badge: 'New',
        description:
            'A modern smartphone with a bright display, powerful performance and versatile camera system.',
        images: [
            'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1706987310265-48a4d5e4b9d1?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 10,
        name: 'Minimalist Table Lamp',
        store: 'Home Space',
        storeSlug: 'home-space',
        category: 'Home & Kitchen',
        price: 28000,
        oldPrice: 35000,
        rating: 4.5,
        reviews: 28,
        stock: 22,
        badge: null,
        description:
            'A simple modern table lamp that adds practical lighting and a clean look to your space.',
        images: [
            'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1534281304220-7b1d4f5a7d65?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 11,
        name: 'Oversized Cotton T-Shirt',
        store: 'Urban Fits',
        storeSlug: 'urban-fits',
        category: 'Fashion',
        price: 18000,
        oldPrice: 25000,
        rating: 4.7,
        reviews: 64,
        stock: 42,
        badge: 'Sale',
        description:
            'A comfortable cotton t-shirt with a relaxed everyday fit and versatile minimalist style.',
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=80'
        ]
    },
    {
        id: 12,
        name: 'Wireless Mechanical Keyboard',
        store: 'TechHub Store',
        storeSlug: 'techhub-store',
        category: 'Electronics',
        price: 78000,
        oldPrice: 90000,
        rating: 4.8,
        reviews: 44,
        stock: 14,
        badge: 'Popular',
        description:
            'A wireless mechanical keyboard designed for comfortable typing, productivity and everyday use.',
        images: [
            'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80',
            'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80'
        ]
    }
]


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


const storeData = {
    'TechHub Store': {
        slug: 'techhub-store',
        products: 128,
        rating: 4.9,
        location: 'Lagos, Nigeria'
    },
    'Urban Fits': {
        slug: 'urban-fits',
        products: 94,
        rating: 4.8,
        location: 'Lagos, Nigeria'
    },
    'Home Space': {
        slug: 'home-space',
        products: 76,
        rating: 4.7,
        location: 'Abuja, Nigeria'
    },
    'Glow Beauty': {
        slug: 'glow-beauty',
        products: 61,
        rating: 4.8,
        location: 'Lagos, Nigeria'
    }
}


export default function ProductDetails() {

    const { id } = useParams()
    const navigate = useNavigate()

    const [mobileMenu, setMobileMenu] = useState(false)
    const [quantity, setQuantity] = useState(1)
    const [selectedImage, setSelectedImage] = useState(0)
    const [favorite, setFavorite] = useState(false)
    const [addedToCart, setAddedToCart] = useState(false)

    const { addToCart } = useCart()


    const product = products.find(
        item => item.id === Number(id)
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


    const store = storeData[product.store]


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
                                        setFavorite(!favorite)
                                    }
                                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
                                    aria-label="Add to wishlist"
                                >

                                    {favorite ? (
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