import React, { useState } from "react"
import {
    MdAdd,
    MdSearch,
    MdFilterList,
    MdMoreVert,
    MdEdit,
    MdDelete,
    MdVisibility,
    MdInventory
} from "react-icons/md"
import { Link } from "react-router-dom"

const products = [
    {
        id: "SP-001",
        name: "Nike Air Max",
        category: "Shoes",
        price: 85000,
        stock: 24,
        status: "Active"
    },
    {
        id: "SP-002",
        name: "Smart Watch Pro",
        category: "Electronics",
        price: 45000,
        stock: 8,
        status: "Active"
    },
    {
        id: "SP-003",
        name: "AirPods Pro",
        category: "Electronics",
        price: 120000,
        stock: 0,
        status: "Out of stock"
    },
    {
        id: "SP-004",
        name: "Classic Hoodie",
        category: "Fashion",
        price: 28000,
        stock: 15,
        status: "Active"
    },
    {
        id: "SP-005",
        name: "Leather Backpack",
        category: "Bags",
        price: 35000,
        stock: 4,
        status: "Low stock"
    }
]

export default function SellerAllProducts() {

    const [search, setSearch] = useState("")
    const [filter, setFilter] = useState("All")

    const filteredProducts = products.filter((product) => {

        const matchesSearch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.id.toLowerCase().includes(search.toLowerCase())

        const matchesFilter =
            filter === "All" ||
            product.status === filter

        return matchesSearch && matchesFilter
    })

    return (
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
                    to="/seller/products/add"
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
                        126
                    </h2>
                </div>


                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                        Active
                    </p>

                    <h2 className="text-2xl font-semibold text-green-700 mt-2">
                        118
                    </h2>
                </div>


                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                        Low Stock
                    </p>

                    <h2 className="text-2xl font-semibold text-orange-500 mt-2">
                        5
                    </h2>
                </div>


                <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <p className="text-sm text-gray-500">
                        Out of Stock
                    </p>

                    <h2 className="text-2xl font-semibold text-red-500 mt-2">
                        3
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
                        <div className="flex items-center gap-2">

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
                                <option value="All">All Products</option>
                                <option value="Active">Active</option>
                                <option value="Low stock">Low Stock</option>
                                <option value="Out of stock">Out of Stock</option>
                            </select>

                        </div>

                    </div>

                </div>


                {/* DESKTOP TABLE */}
                <div className="hidden md:block overflow-x-auto">

                    <table className="w-full">

                        <thead className="bg-gray-50 border-b border-gray-200">

                            <tr>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                                    Product
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                                    Category
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                                    Price
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                                    Stock
                                </th>

                                <th className="text-left px-5 py-3 text-xs font-semibold text-gray-500 uppercase">
                                    Status
                                </th>

                                <th className="px-5 py-3"></th>

                            </tr>

                        </thead>


                        <tbody className="divide-y divide-gray-100">

                            {filteredProducts.map((product) => (

                                <tr
                                    key={product.id}
                                    className="hover:bg-gray-50 transition"
                                >

                                    {/* PRODUCT */}
                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="
                                                w-11 h-11
                                                rounded-xl
                                                bg-gray-100
                                                flex items-center justify-center
                                            ">
                                                <MdInventory
                                                    size={22}
                                                    className="text-gray-400"
                                                />
                                            </div>

                                            <div>
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {product.name}
                                                </p>

                                                <p className="text-xs text-gray-400">
                                                    {product.id}
                                                </p>
                                            </div>

                                        </div>

                                    </td>


                                    {/* CATEGORY */}
                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {product.category}
                                    </td>


                                    {/* PRICE */}
                                    <td className="px-5 py-4 text-sm font-medium text-gray-900">
                                        ₦{product.price.toLocaleString()}
                                    </td>


                                    {/* STOCK */}
                                    <td className="px-5 py-4 text-sm text-gray-600">
                                        {product.stock}
                                    </td>


                                    {/* STATUS */}
                                    <td className="px-5 py-4">

                                        <span
                                            className={`
                                                inline-flex
                                                px-2.5
                                                py-1
                                                rounded-full
                                                text-xs
                                                font-medium
                                                ${
                                                    product.status === "Active"
                                                        ? "bg-green-50 text-green-700"
                                                        : product.status === "Low stock"
                                                        ? "bg-orange-50 text-orange-600"
                                                        : "bg-red-50 text-red-600"
                                                }
                                            `}
                                        >
                                            {product.status}
                                        </span>

                                    </td>


                                    {/* ACTIONS */}
                                    <td className="px-5 py-4">

                                        <button className="
                                            p-2
                                            rounded-lg
                                            hover:bg-gray-100
                                            text-gray-500
                                        ">
                                            <MdMoreVert size={21} />
                                        </button>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {/* MOBILE PRODUCTS */}
                <div className="md:hidden divide-y divide-gray-100">

                    {filteredProducts.map((product) => (

                        <div
                            key={product.id}
                            className="p-4"
                        >

                            <div className="flex items-start justify-between gap-3">

                                <div className="flex items-center gap-3">

                                    <div className="
                                        w-11 h-11
                                        rounded-xl
                                        bg-gray-100
                                        flex items-center justify-center
                                    ">
                                        <MdInventory
                                            size={22}
                                            className="text-gray-400"
                                        />
                                    </div>

                                    <div>

                                        <p className="text-sm font-semibold text-gray-900">
                                            {product.name}
                                        </p>

                                        <p className="text-xs text-gray-400">
                                            {product.id}
                                        </p>

                                    </div>

                                </div>

                                <button className="p-2 text-gray-500">
                                    <MdMoreVert size={21} />
                                </button>

                            </div>


                            <div className="grid grid-cols-3 gap-3 mt-4">

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Category
                                    </p>

                                    <p className="text-sm mt-1">
                                        {product.category}
                                    </p>
                                </div>


                                <div>
                                    <p className="text-xs text-gray-400">
                                        Price
                                    </p>

                                    <p className="text-sm font-medium mt-1">
                                        ₦{product.price.toLocaleString()}
                                    </p>
                                </div>


                                <div>
                                    <p className="text-xs text-gray-400">
                                        Stock
                                    </p>

                                    <p className="text-sm mt-1">
                                        {product.stock}
                                    </p>
                                </div>

                            </div>


                            <div className="mt-3">

                                <span
                                    className={`
                                        inline-flex
                                        px-2.5
                                        py-1
                                        rounded-full
                                        text-xs
                                        font-medium
                                        ${
                                            product.status === "Active"
                                                ? "bg-green-50 text-green-700"
                                                : product.status === "Low stock"
                                                ? "bg-orange-50 text-orange-600"
                                                : "bg-red-50 text-red-600"
                                        }
                                    `}
                                >
                                    {product.status}
                                </span>

                            </div>

                        </div>

                    ))}

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
    )
}