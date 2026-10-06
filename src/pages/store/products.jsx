import React, { useState } from "react"
import {
    MdAdd,
    MdSearch,
    MdFilterList,
    MdEdit,
    MdInventory,
    MdVisibility,
    MdMoreVert,
    MdDelete
} from "react-icons/md"
import { Link } from "react-router-dom"
import { useStore } from "../../contexts/storeProvider"
import StoreOnly from "../../components/storeOnly"
import Swal from "sweetalert2"


export default function StoreAllProducts() {
    const { products, deleteProduct } = useStore()
    const [openMenu, setOpenMenu] = useState(null)
    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("all")

    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product._id.toLowerCase().includes(search.toLowerCase())

        const matchesFilter =
            filter == "all" ? products :
            product.status === filter

        return matchesSearch && matchesFilter
    })

    const handleDelete = async (productId, name) => {

        Swal.fire({
            title: `Are you sure you want to delete ${name.bold()}?`,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            denyButtonText: `No`
        }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                const result = await deleteProduct(productId);
                if (result.status == false) {
                    Swal.fire({
                        title: "Error",
                        text: result.message,
                        icon: "error"
                    })
                    return;
                }
                Swal.fire({
                    title: "Success",
                    text: result.message,
                    icon: "success"
                })
            }
            else if (result.isDenied) Swal.fire("Product deletion cancelled", "", "info");
        });
    }

    return (
        <StoreOnly>
            <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-[calc(100vh-70px)]">

                {/* HEADER */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900">
                            All Products
                        </h1>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage all the products in your store.
                        </p>
                    </div>

                    <Link
                        to="/store/products/add"
                        className="
                        inline-flex items-center justify-center gap-2
                        px-4 py-2.5
                        rounded-xl
                        bg-green-700
                        hover:bg-green-800
                        text-white
                        text-sm font-medium
                        transition
                    "
                    >
                        <MdAdd size={20} />
                        Add Product
                    </Link>

                </div>


                {/* SUMMARY CARDS */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                        <p className="text-sm text-gray-500">
                            Total Products
                        </p>

                        <h2 className="text-2xl font-semibold mt-2">
                            {products.length}
                        </h2>
                    </div>


                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                        <p className="text-sm text-gray-500">
                            Active
                        </p>

                        <h2 className="text-2xl font-semibold text-green-700 mt-2">
                            {products.filter((prod) => prod.status == "active").length}
                        </h2>
                    </div>


                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                        <p className="text-sm text-gray-500">
                            Low Stock
                        </p>

                        <h2 className="text-2xl font-semibold text-orange-500 mt-2">
                            {products.filter((prod) => prod.stock <= prod.lowStockThreshold).length}
                        </h2>
                    </div>


                    <div className="bg-white border border-gray-200 rounded-2xl p-4">
                        <p className="text-sm text-gray-500">
                            Out of Stock
                        </p>

                        <h2 className="text-2xl font-semibold text-red-500 mt-2">
                            {products.filter((prod) => prod.stock < 1).length}
                        </h2>
                    </div>

                </div>


                {/* PRODUCTS CONTAINER */}
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

                    {/* TOOLBAR */}
                    <div className="p-4 border-b border-gray-200">

                        <div className="flex flex-col lg:flex-row gap-3 lg:items-center lg:justify-between">

                            {/* SEARCH */}
                            <div className="relative w-full lg:max-w-md">

                                <MdSearch
                                    size={21}
                                    className="
                                    absolute
                                    left-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                                />

                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    className="
                                    w-full
                                    pl-10
                                    pr-4
                                    py-2.5
                                    rounded-xl
                                    border border-gray-200
                                    text-sm
                                    outline-none
                                    focus:border-green-600
                                "
                                />

                            </div>


                            {/* FILTER */}
                            {/* <div className="flex items-center gap-2">

                                <MdFilterList
                                    size={20}
                                    className="text-gray-500"
                                />

                                <select
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="
                                    border border-gray-200
                                    rounded-xl
                                    px-3
                                    py-2.5
                                    text-sm
                                    outline-none
                                    bg-white
                                "
                                >
                                    <option value="all">
                                        All Products
                                    </option>

                                    <option value="active">
                                        Active
                                    </option>

                                    <option value="Low stock">
                                        Low Stock
                                    </option> 
                                    <option value="draft">
                                        Draft
                                    </option>
                                    <option value="Out of stock">
                                        Out of Stock
                                    </option> 
                                </select>

                            </div> */}

                        </div>

                    </div>


                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-gray-50/80 border-b border-gray-200">
                                <tr>
                                    <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Product
                                    </th>
                                    <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Stock
                                    </th>
                                    <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th scope="col" className="px-6 py-3.5 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100 bg-white">
                                {filteredProducts.map((product) => {
                                    const productId = product.id || product._id;
                                    const status = product.status?.toLowerCase();
                                    const imageUrl = product.image || product.images?.[0];

                                    return (
                                        <tr
                                            key={productId}
                                            className="hover:bg-gray-50/80 transition-colors duration-150 ease-in-out"
                                        >
                                            {/* PRODUCT */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-3.5">
                                                    <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200/60 overflow-hidden">
                                                        {imageUrl ? (
                                                            <img
                                                                src={imageUrl}
                                                                alt={product.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <MdInventory size={20} className="text-gray-500" />
                                                        )}
                                                    </div>
                                                    <div className="flex flex-col min-w-0">
                                                        <p className="text-sm font-semibold text-gray-900 truncate">
                                                            {product.name}
                                                        </p>
                                                        <p className="text-xs text-gray-500 font-mono truncate">
                                                            {productId || product.slug}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* PRICE */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                                                ₦{product.price?.toLocaleString()}
                                            </td>

                                            {/* STOCK */}
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {product.stock}
                                            </td>

                                            {/* STATUS */}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`
                                    inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border
                                    ${status === "active"
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                                                            : status === "low stock" || status === "draft"
                                                                ? "bg-amber-50 text-amber-700 border-amber-200/60"
                                                                : "bg-rose-50 text-rose-700 border-rose-200/60"
                                                        }
                                `}
                                                >
                                                    {product.status}
                                                </span>
                                            </td>

                                            {/* ACTIONS DROPDOWN */}
                                            <td className="px-6 py-4 whitespace-nowrap text-right">
                                                <div className="relative inline-block text-left">
                                                    <button
                                                        type="button"
                                                        onClick={() => setOpenMenu(openMenu === productId ? null : productId)}
                                                        className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                                        aria-label="Options"
                                                    >
                                                        <MdMoreVert size={20} />
                                                    </button>

                                                    {openMenu === productId && (
                                                        <div className="absolute right-0 top-10 z-50 w-40 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
                                                            {/* View Option */}
                                                            <Link
                                                                to={`/store/products/${product.slug}`}
                                                                onClick={() => setOpenMenu(null)}
                                                                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                                            >
                                                                <MdVisibility size={18} className="text-gray-400" />
                                                                View
                                                            </Link>

                                                            {/* Edit Option */}
                                                            <Link
                                                                to={`/store/products/${product.slug}/edit`}
                                                                onClick={() => setOpenMenu(null)}
                                                                className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
                                                            >
                                                                <MdEdit size={18} className="text-emerald-600" />
                                                                Edit
                                                            </Link>

                                                            {/* Delete Option */}
                                                            <Link
                                                                to={null}
                                                                onClick={() => {
                                                                    setOpenMenu(null);
                                                                    handleDelete(productId, product.name);
                                                                }}
                                                                className="flex items-center text-red-500 gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                                            >
                                                                <MdDelete size={18} className="text-red-400" />
                                                                Delete
                                                            </Link>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    {/* MOBILE PRODUCTS */}
                    <div className="md:hidden divide-y divide-gray-100 border border-gray-200 rounded-xl bg-white shadow-sm overflow-hidden">
                        {filteredProducts.map((product) => {
                            const productId = product.id || product._id;
                            const status = product.status?.toLowerCase();
                            const imageUrl = product.image || product.images?.[0];

                            return (
                                <div
                                    key={productId}
                                    className="p-4 space-y-3 hover:bg-gray-50/50 transition-colors"
                                >
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 border border-gray-200/60 overflow-hidden">
                                                {imageUrl ? (
                                                    <img
                                                        src={imageUrl}
                                                        alt={product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <MdInventory size={20} className="text-gray-500" />
                                                )}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-sm font-semibold text-gray-900 truncate">
                                                    {product.name}
                                                </p>
                                                <p className="text-xs text-gray-500 font-mono truncate">
                                                    {product.slug}
                                                </p>
                                            </div>
                                        </div>

                                        {/* MOBILE ACTIONS DROPDOWN */}
                                        <div className="relative inline-block text-left shrink-0">
                                            <button
                                                type="button"
                                                onClick={() => setOpenMenu(openMenu === productId ? null : productId)}
                                                className="w-8 h-8 inline-flex items-center justify-center rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                                                aria-label="Options"
                                            >
                                                <MdMoreVert size={20} />
                                            </button>

                                            {openMenu === productId && (
                                                <div className="absolute right-0 top-10 z-50 w-40 bg-white border border-gray-200 rounded-xl shadow-lg p-1.5 focus:outline-none animate-in fade-in zoom-in-95 duration-100">
                                                    {/* View Option */}
                                                    <Link
                                                        to={`/store/products/${product.slug}`}
                                                        onClick={() => setOpenMenu(null)}
                                                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                                    >
                                                        <MdVisibility size={18} className="text-gray-400" />
                                                        View
                                                    </Link>

                                                    {/* Edit Option */}
                                                    <Link
                                                        to={`/store/products/${product.slug}/edit`}
                                                        onClick={() => setOpenMenu(null)}
                                                        className="flex items-center gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium text-emerald-700 hover:bg-emerald-50 transition-colors"
                                                    >
                                                        <MdEdit size={18} className="text-emerald-600" />
                                                        Edit
                                                    </Link>

                                                    {/* Delete Option */}
                                                    <Link
                                                        to={null}
                                                        onClick={() => {
                                                            setOpenMenu(null);
                                                            handleDelete(productId, product.name);
                                                        }}
                                                        className="flex items-center text-red-500 gap-2.5 w-full px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                                    >
                                                        <MdDelete size={18} className="text-red-400" />
                                                        Delete
                                                    </Link>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2 pt-1 border-t border-gray-50">
                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                                                Price
                                            </p>
                                            <p className="text-sm font-semibold text-gray-900 mt-0.5">
                                                ₦{product.price?.toLocaleString()}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[11px] font-medium uppercase tracking-wider text-gray-400">
                                                Stock
                                            </p>
                                            <p className="text-sm font-medium text-gray-700 mt-0.5">
                                                {product.stock}
                                            </p>
                                        </div>
                                    </div>

                                    <div>
                                        <span
                                            className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize border
                            ${status === "active"
                                                    ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                                                    : status === "low stock" || status === "draft"
                                                        ? "bg-amber-50 text-amber-700 border-amber-200/60"
                                                        : "bg-rose-50 text-rose-700 border-rose-200/60"
                                                }
                        `}
                                        >
                                            {product.status}
                                        </span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>


                    {/* EMPTY STATE */}
                    {filteredProducts.length === 0 && (

                        <div className="py-16 text-center">

                            <MdInventory
                                size={40}
                                className="mx-auto text-gray-300"
                            />

                            <h3 className="mt-3 font-semibold text-gray-800">
                                No products found
                            </h3>

                            <p className="text-sm text-gray-500 mt-1">
                                Try changing your search or filter.
                            </p>

                        </div>

                    )}

                </div>

            </div>
        </StoreOnly>
    )
}