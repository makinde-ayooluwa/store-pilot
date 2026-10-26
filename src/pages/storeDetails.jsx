import React, { useMemo, useState } from 'react';
import {
    MdArrowBack,
    MdCheckCircle,
    MdFavorite,
    MdFavoriteBorder,
    MdLocationOn,
    MdSearch,
    MdShoppingCart,
    MdStar,
    MdStorefront,
} from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

import Header from '../components/header';
import { useCart } from '../contexts/cartProvider';
import { useResource } from '../contexts/resourceProvider';
import { useUser } from '../contexts/userProvider'

export default function StoreDetails() {
    const { slug } = useParams();
    const { products, getStoreBySlug } = useResource();
    const store = getStoreBySlug(slug);

    const { addToCart, cartCount } = useCart();
const {user} = useUser()
    const [mobileMenu, setMobileMenu] = useState(false);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('featured');
    const [favorites, setFavorites] = useState([]);
    const [addedProduct, setAddedProduct] = useState(null);
    const [adding, setAdding] = useState(null);

    /*
     * IMPORTANT:
     * All hooks must be called before any conditional return.
     * This prevents "Rendered more hooks than during the previous render".
     */
    const storeProducts = useMemo(() => {
        if (!store || !Array.isArray(products)) return [];

        return products.filter(
            (product) => product.storeSlug === store.slug
        );
    }, [products, store?.slug]);

    const filteredProducts = useMemo(() => {
        let result = [...storeProducts];
        const searchValue = search.trim().toLowerCase();

        if (searchValue) {
            result = result.filter((product) => {
                const name = (product.name || '').toLowerCase();
                const description = (product.description || '').toLowerCase();
                const category = (product.category || '').toLowerCase();

                return (
                    name.includes(searchValue) ||
                    description.includes(searchValue) ||
                    category.includes(searchValue)
                );
            });
        }

        if (sort === 'price-low') {
            result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
        }

        if (sort === 'price-high') {
            result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
        }

        if (sort === 'rating') {
            result.sort((a, b) => Number(b.rating || 0) - Number(a.rating || 0));
        }

        if (sort === 'featured') {
            result.sort(
                (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
            );
        }

        return result;
    }, [storeProducts, search, sort]);

    const toggleFavorite = (productId) => {
        setFavorites((current) =>
            current.includes(productId)
                ? current.filter((id) => id !== productId)
                : [...current, productId]
        );
    };

    const handleAddToCart = async (product) => {
        try {
            if(user == null){
            return Swal.fire({
                text: "Login to add product to cart",
                title: "Info",
                icon: "info"
            })
        }
            setAdding(product._id);
            const result = await addToCart(product);

            if (result?.status) {
                setAddedProduct(product._id);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: 'Added to cart',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                });

                setTimeout(() => {
                    setAddedProduct(null);
                }, 1500);
            } else {
                Swal.fire({
                    title: 'Unable to add product',
                    text: result?.message || 'Failed to add product to cart.',
                    icon: 'error',
                    confirmButtonColor: '#0f172a',
                });
            }
        } catch (error) {
            console.error('Failed to add product to cart:', error);
            Swal.fire({
                title: 'Error',
                text: 'Something went wrong while adding this product to your cart.',
                icon: 'error',
                confirmButtonColor: '#0f172a',
            });
        } finally {
            setAdding(null);
        }
    };

    // Conditional returns are safe only after all hooks have been called.
    if (!store) {
        return (
            <div className="min-h-screen bg-slate-50">
                <Header
                    mobileMenu={mobileMenu}
                    setMobileMenu={setMobileMenu}
                />

                <main className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4 py-16">
                    <div className="text-center">
                        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
                            <MdStorefront size={38} className="text-slate-400" />
                        </div>

                        <h1 className="text-2xl font-bold text-slate-900">
                            Store not found
                        </h1>

                        <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
                            The store you&apos;re looking for doesn&apos;t exist
                            or may no longer be available.
                        </p>

                        <Link
                            to="/stores"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                        >
                            <MdArrowBack />
                            Browse Stores
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Header
                mobileMenu={mobileMenu}
                setMobileMenu={setMobileMenu}
            />

            <main>
                {/* Breadcrumb */}
                <div className="border-b border-slate-200 bg-white">
                    <div className="mx-auto max-w-7xl px-4 py-4">
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                            <Link to="/" className="hover:text-slate-900">
                                Home
                            </Link>
                            <span>/</span>
                            <Link to="/stores" className="hover:text-slate-900">
                                Stores
                            </Link>
                            <span>/</span>
                            <span className="font-medium text-slate-900">
                                {store.name}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Store header */}
                <section className="bg-white">
                    <div className="mx-auto max-w-7xl px-4">
                        <div className="relative h-52 overflow-hidden rounded-b-3xl bg-slate-100 sm:h-64">
                            {store.banner ? (
                                <img
                                    src={store.banner}
                                    alt={`${store.name} banner`}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-gradient-to-r from-slate-200 to-slate-300">
                                    <MdStorefront size={64} className="text-slate-400" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                        </div>

                        {/* Store information */}
                        <div className="relative -mt-10 px-2 pb-8 sm:px-6">
                            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                                <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg">
                                        {store.logo ? (
                                            <img
                                                src={store.logo}
                                                alt={`${store.name} logo`}
                                                className="h-full w-full object-cover"
                                            />
                                        ) : (
                                            <MdStorefront size={42} className="text-slate-400" />
                                        )}
                                    </div>

                                    <div className="pb-1">
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h1 className="text-2xl font-bold text-white sm:text-3xl">
                                                {store.name}
                                            </h1>

                                            {store.verified && (
                                                <span className="flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600">
                                                    <MdCheckCircle size={15} />
                                                    Verified
                                                </span>
                                            )}
                                        </div>

                                        <p className="mt-1 text-sm font-medium text-slate-500">
                                            {store.category || 'General Store'}
                                        </p>

                                        <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <MdStar size={17} className="text-yellow-500" />
                                                <strong className="text-slate-800">
                                                    {store.rating ?? 'New'}
                                                </strong>
                                                <span>({store.reviews ?? 0} reviews)</span>
                                            </span>

                                            {store.location && (
                                                <span className="flex items-center gap-1">
                                                    <MdLocationOn size={17} />
                                                    {store.location}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 sm:flex">
                                    <div className="rounded-xl bg-slate-50 px-5 py-3 text-center">
                                        <p className="font-bold text-slate-900">
                                            {storeProducts.length}
                                        </p>
                                        <p className="text-xs text-slate-500">Products</p>
                                    </div>

                                    <div className="rounded-xl bg-slate-50 px-5 py-3 text-center">
                                        <p className="font-bold text-slate-900">
                                            {store.reviews ?? 0}
                                        </p>
                                        <p className="text-xs text-slate-500">Reviews</p>
                                    </div>
                                </div>
                            </div>

                            {store.description && (
                                <p className="mt-6 max-w-3xl text-sm leading-6 text-slate-500">
                                    {store.description}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Products */}
                <section className="mx-auto max-w-7xl px-4 py-10">
                    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                                Store Products
                            </p>
                            <h2 className="mt-1 text-2xl font-bold text-slate-900">
                                Products from {store.name}
                            </h2>
                        </div>

                        {store.categorySlug && (
                            <Link
                                to={`/categories/${store.categorySlug}`}
                                className="inline-flex items-center gap-1 text-sm font-semibold text-slate-700 hover:text-slate-900"
                            >
                                Browse {store.category || 'category'}
                                <MdArrowBack className="rotate-180" size={18} />
                            </Link>
                        )}
                    </div>

                    {/* Search and sort toolbar */}
                    <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="relative w-full sm:max-w-sm">
                            <MdSearch
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />
                            <input
                                type="text"
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search this store..."
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-slate-400 focus:bg-white"
                            />
                        </div>

                        <select
                            value={sort}
                            onChange={(event) => setSort(event.target.value)}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-700 outline-none focus:border-slate-400"
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="rating">Highest Rated</option>
                        </select>
                    </div>

                    {filteredProducts.length > 0 ? (
                        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                            {filteredProducts.map((product) => {
                                const isFavorite = favorites.includes(product._id);
                                const productPrice = Number(product.price || 0);
                                const oldPrice = Number(product.oldPrice || 0);

                                return (
                                    <div
                                        key={product._id}
                                        className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                                    >
                                        {/* Product image */}
                                        <div className="relative aspect-square overflow-hidden bg-slate-100">
                                            <Link to={`/products/${product._id}`}>
                                                {product.image ? (
                                                    <img
                                                        src={product.image}
                                                        alt={product.name || 'Product'}
                                                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                    />
                                                ) : (
                                                    <div className="flex h-full items-center justify-center">
                                                        <MdStorefront size={44} className="text-slate-300" />
                                                    </div>
                                                )}
                                            </Link>

                                            {product.featured && (
                                                <span className="absolute left-3 top-3 rounded-full bg-slate-900 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                                                    Featured
                                                </span>
                                            )}

                                            <button
                                                type="button"
                                                aria-label={
                                                    isFavorite
                                                        ? 'Remove from favorites'
                                                        : 'Add to favorites'
                                                }
                                                onClick={() => toggleFavorite(product._id)}
                                                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:scale-105"
                                            >
                                                {isFavorite ? (
                                                    <MdFavorite size={19} className="text-red-500" />
                                                ) : (
                                                    <MdFavoriteBorder size={19} className="text-slate-600" />
                                                )}
                                            </button>
                                        </div>

                                        {/* Product details */}
                                        <div className="p-4">
                                            <Link to={`/products/${product._id}`}>
                                                <h3 className="line-clamp-2 min-h-[40px] text-sm font-semibold text-slate-900 hover:text-slate-600">
                                                    {product.name}
                                                </h3>
                                            </Link>

                                            <div className="mt-2 flex items-center gap-1">
                                                <MdStar size={16} className="text-yellow-500" />
                                                <span className="text-xs font-semibold text-slate-700">
                                                    {product.rating ?? 'New'}
                                                </span>
                                                <span className="text-xs text-slate-400">
                                                    ({product.reviews ?? 0})
                                                </span>
                                            </div>

                                            <div className="mt-3 flex items-end justify-between gap-2">
                                                <div>
                                                    <p className="text-base font-bold text-slate-900">
                                                        ₦{productPrice.toLocaleString()}
                                                    </p>

                                                    {oldPrice > 0 && (
                                                        <p className="text-xs text-slate-400 line-through">
                                                            ₦{oldPrice.toLocaleString()}
                                                        </p>
                                                    )}
                                                </div>

                                                <button
                                                    type="button"
                                                    disabled={adding === product._id}
                                                    aria-label={`Add ${product.name} to cart`}
                                                    onClick={() => handleAddToCart(product)}
                                                    className={`flex h-10 w-10 items-center justify-center rounded-xl transition disabled:cursor-not-allowed disabled:opacity-60 ${
                                                        addedProduct === product._id
                                                            ? 'bg-green-600 text-white'
                                                            : 'bg-slate-900 text-white hover:bg-slate-700'
                                                    }`}
                                                >
                                                    <MdShoppingCart size={20} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="rounded-2xl border border-slate-200 bg-white px-6 py-20 text-center">
                            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                                <MdSearch size={30} className="text-slate-400" />
                            </div>
                            <h2 className="text-lg font-bold text-slate-900">
                                No products found
                            </h2>
                            <p className="mt-2 text-sm text-slate-500">
                                {search
                                    ? 'Try a different search term.'
                                    : 'This store has no products available yet.'}
                            </p>
                        </div>
                    )}
                </section>

                {/* Store CTA */}
                <section className="mx-auto max-w-7xl px-4 pb-16">
                    <div className="rounded-3xl bg-slate-900 px-6 py-10 text-white sm:px-10">
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-sm font-medium text-slate-400">
                                    Shopping on StorePilot
                                </p>
                                <h2 className="mt-1 text-2xl font-bold">
                                    Discover more stores
                                </h2>
                                <p className="mt-2 max-w-xl text-sm leading-6 text-slate-400">
                                    Find more stores and explore products across different categories.
                                </p>
                            </div>

                            <Link
                                to="/stores"
                                className="inline-flex w-fit items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                            >
                                Browse Stores
                                <MdArrowBack className="rotate-180" size={18} />
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            {/* Floating cart shortcut */}
            {cartCount > 0 && (
                <Link
                    to="/cart"
                    className="fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white shadow-xl transition hover:bg-slate-800"
                >
                    <MdShoppingCart size={20} />
                    <span>
                        {cartCount} item{cartCount !== 1 ? 's' : ''} in cart
                    </span>
                </Link>
            )}
        </div>
    );
}
