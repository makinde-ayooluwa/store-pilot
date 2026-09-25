import React, { useState } from 'react'
import {
    MdSearch,
    MdInventory2,
    MdWarning,
    MdRemoveShoppingCart,
    MdTrendingUp,
    MdTrendingDown,
    MdMoreVert,
    MdAdd,
    MdFilterList,
    MdKeyboardArrowDown,
    MdArrowUpward,
    MdArrowDownward
} from 'react-icons/md'
import {useStore} from "../../contexts/storeProvider"
import StoreOnly from '../../components/storeOnly'
export default function SellerStockOverview() {
    const [search, setSearch] = useState('')
    const [stockFilter, setStockFilter] = useState('All')
    const [openMenu, setOpenMenu] = useState(null)

    const {products} = useStore() 

    const totalProducts = products.length

    const totalUnits = products.reduce(
        (total, product) => total + product.stock,
        0
    )

    const lowStock = products.filter(
        product => product.status === 'Low Stock'
    ).length

    const outOfStock = products.filter(
        product => product.status === 'Out of Stock'
    ).length

    const stockValue = products.reduce(
        (total, product) =>
            total + product.stock * product.price,
        0
    )

    const filteredProducts = products.filter(product => {
        const searchMatch =
            product.name.toLowerCase().includes(search.toLowerCase()) ||
            product.sku.toLowerCase().includes(search.toLowerCase()) ||
            product.category.toLowerCase().includes(search.toLowerCase())

        const filterMatch =
            stockFilter === 'All' ||
            product.status === stockFilter

        return searchMatch && filterMatch
    })

    const formatCurrency = value => {
        return `₦${value.toLocaleString('en-NG')}`
    }

    return (
        <StoreOnly>
        <div className="min-h-full bg-slate-50 p-4 sm:p-6 lg:p-7">

            {/* Header */}
            <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-800">
                        Stock Overview
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Monitor your inventory and keep track of stock levels
                    </p>
                </div>

                <button
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 lg:w-auto"
                >
                    <MdAdd size={20} />
                    Add Stock
                </button>

            </div>


            {/* Overview Cards */}
            <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* Products */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Total Products
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {totalProducts}
                            </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                            <MdInventory2 size={21} />
                        </div>

                    </div>

                    <div className="mt-4 flex items-center gap-1 text-xs">

                        <MdTrendingUp className="text-emerald-500" />

                        <span className="font-semibold text-emerald-600">
                            8.2%
                        </span>

                        <span className="text-slate-400">
                            from last month
                        </span>

                    </div>

                </div>


                {/* Units */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Total Units
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {totalUnits}
                            </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                            <MdInventory2 size={21} />
                        </div>

                    </div>

                    <div className="mt-4 flex items-center gap-1 text-xs">

                        <MdTrendingUp className="text-emerald-500" />

                        <span className="font-semibold text-emerald-600">
                            5.4%
                        </span>

                        <span className="text-slate-400">
                            from last month
                        </span>

                    </div>

                </div>


                {/* Low Stock */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Low Stock
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {lowStock}
                            </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-orange-500">
                            <MdWarning size={21} />
                        </div>

                    </div>

                    <div className="mt-4 flex items-center gap-1 text-xs text-orange-600">

                        <MdWarning />

                        <span className="font-medium">
                            Needs attention
                        </span>

                    </div>

                </div>


                {/* Out of Stock */}
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                    <div className="flex items-start justify-between">

                        <div>
                            <p className="text-xs font-medium text-slate-400">
                                Out of Stock
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-slate-800">
                                {outOfStock}
                            </h2>
                        </div>

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-red-500">
                            <MdRemoveShoppingCart size={21} />
                        </div>

                    </div>

                    <div className="mt-4 flex items-center gap-1 text-xs text-red-500">

                        <MdTrendingDown />

                        <span className="font-medium">
                            Requires restocking
                        </span>

                    </div>

                </div>

            </div>


            {/* Stock Value */}
            <div className="mb-5 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <p className="text-xs font-medium text-slate-400">
                            Current Inventory Value
                        </p>

                        <h2 className="mt-1 text-2xl font-bold text-slate-800">
                            {formatCurrency(stockValue)}
                        </h2>

                    </div>

                    <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-600">
                        <MdTrendingUp size={17} />
                        12.5% this month
                    </div>

                </div>

            </div>


            {/* Inventory Table */}
            <div className="overflow-visible rounded-xl border border-slate-200 bg-white shadow-sm">

                {/* Toolbar */}
                <div className="flex flex-col gap-3 border-b border-slate-100 p-4 lg:flex-row lg:items-center lg:justify-between">

                    <div>

                        <h2 className="text-sm font-bold text-slate-700">
                            Inventory
                        </h2>

                        <p className="mt-0.5 text-xs text-slate-400">
                            Current stock levels for all products
                        </p>

                    </div>


                    <div className="flex flex-col gap-2 sm:flex-row">

                        {/* Search */}
                        <div className="flex h-10 w-full items-center gap-2 rounded-lg border border-slate-200 px-3 text-slate-400 focus-within:border-slate-400 sm:w-64">

                            <MdSearch size={19} />

                            <input
                                type="text"
                                placeholder="Search products..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
                            />

                        </div>


                        {/* Filter */}
                        <div className="relative">

                            <MdFilterList
                                size={17}
                                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                            <select
                                value={stockFilter}
                                onChange={(e) =>
                                    setStockFilter(e.target.value)
                                }
                                className="h-10 w-full appearance-none rounded-lg border border-slate-200 bg-white pl-9 pr-8 text-xs text-slate-600 outline-none focus:border-slate-400 sm:w-36"
                            >
                                <option value="All">
                                    All Stock
                                </option>

                                <option value="In Stock">
                                    In Stock
                                </option>

                                <option value="Low Stock">
                                    Low Stock
                                </option>

                                <option value="Out of Stock">
                                    Out of Stock
                                </option>

                            </select>

                            <MdKeyboardArrowDown
                                size={18}
                                className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-slate-400"
                            />

                        </div>

                    </div>

                </div>


                {/* Table */}
                <div className="overflow-x-auto">

                    <table className="w-full min-w-[900px]">

                        <thead>

                            <tr className="border-b border-slate-100 bg-slate-50/70">

                                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Product
                                </th>

                                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Category
                                </th>

                                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Stock Level
                                </th>

                                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Price
                                </th>

                                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Movement
                                </th>

                                <th className="px-5 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                                    Status
                                </th>

                                <th></th>

                            </tr>

                        </thead>


                        <tbody>

                            {filteredProducts.map(product => (

                                <tr
                                    key={product.id}
                                    className="border-b border-slate-100 transition hover:bg-slate-50/60"
                                >

                                    {/* Product */}
                                    <td className="px-5 py-4">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-400">
                                                <MdInventory2 size={19} />
                                            </div>

                                            <div>

                                                <p className="text-sm font-semibold text-slate-700">
                                                    {product.name}
                                                </p>

                                                <p className="mt-0.5 text-[10px] text-slate-400">
                                                    SKU: {product.sku}
                                                </p>

                                            </div>

                                        </div>

                                    </td>


                                    {/* Category */}
                                    <td className="px-5 py-4">

                                        <span className="text-xs text-slate-500">
                                            {product.category}
                                        </span>

                                    </td>


                                    {/* Stock */}
                                    <td className="px-5 py-4">

                                        <div className="w-32">

                                            <div className="mb-1.5 flex items-center justify-between">

                                                <span className="text-xs font-semibold text-slate-700">
                                                    {product.stock}
                                                </span>

                                                <span className="text-[10px] text-slate-400">
                                                    min {product.minStock}
                                                </span>

                                            </div>

                                            <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                                                <div
                                                    className={`h-full rounded-full ${
                                                        product.status === 'Out of Stock'
                                                            ? 'w-0 bg-red-500'
                                                            : product.status === 'Low Stock'
                                                            ? 'bg-orange-400'
                                                            : 'bg-emerald-500'
                                                    }`}
                                                    style={{
                                                        width:
                                                            product.status === 'Out of Stock'
                                                                ? '0%'
                                                                : `${Math.min(
                                                                    (product.stock /
                                                                        (product.minStock * 4)) *
                                                                        100,
                                                                    100
                                                                )}%`
                                                    }}
                                                />

                                            </div>

                                        </div>

                                    </td>


                                    {/* Price */}
                                    <td className="px-5 py-4">

                                        <span className="text-xs font-semibold text-slate-600">
                                            {formatCurrency(product.price)}
                                        </span>

                                    </td>


                                    {/* Movement */}
                                    <td className="px-5 py-4">

                                        <div
                                            className={`inline-flex items-center gap-1 text-xs font-semibold ${
                                                product.movementType === 'up'
                                                    ? 'text-emerald-600'
                                                    : 'text-red-500'
                                            }`}
                                        >

                                            {product.movementType === 'up' ? (
                                                <MdArrowUpward size={15} />
                                            ) : (
                                                <MdArrowDownward size={15} />
                                            )}

                                            {product.movement}

                                        </div>

                                    </td>


                                    {/* Status */}
                                    <td className="px-5 py-4">

                                        <span
                                            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                                                product.status === 'In Stock'
                                                    ? 'bg-emerald-50 text-emerald-600'
                                                    : product.status === 'Low Stock'
                                                    ? 'bg-orange-50 text-orange-600'
                                                    : 'bg-red-50 text-red-500'
                                            }`}
                                        >

                                            <span
                                                className={`h-1.5 w-1.5 rounded-full ${
                                                    product.status === 'In Stock'
                                                        ? 'bg-emerald-500'
                                                        : product.status === 'Low Stock'
                                                        ? 'bg-orange-500'
                                                        : 'bg-red-500'
                                                }`}
                                            />

                                            {product.status}

                                        </span>

                                    </td>


                                    {/* Menu */}
                                    <td className="px-5 py-4">

                                        <div className="relative flex justify-end">

                                            <button
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu === product.id
                                                            ? null
                                                            : product.id
                                                    )
                                                }
                                                className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                                            >
                                                <MdMoreVert size={19} />
                                            </button>

                                            {openMenu === product.id && (

                                                <div className="absolute right-0 top-10 z-30 w-36 rounded-lg border border-slate-200 bg-white p-1.5 shadow-lg">

                                                    <button className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50">
                                                        Update Stock
                                                    </button>

                                                    <button className="w-full rounded-md px-3 py-2 text-left text-xs text-slate-600 hover:bg-slate-50">
                                                        View Product
                                                    </button>

                                                </div>

                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                {/* Footer */}
                <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3">

                    <p className="text-xs text-slate-400">
                        Showing{' '}
                        <span className="font-semibold text-slate-600">
                            {filteredProducts.length}
                        </span>{' '}
                        of{' '}
                        <span className="font-semibold text-slate-600">
                            {products.length}
                        </span>{' '}
                        products
                    </p>

                </div>

            </div>

        </div>
        </StoreOnly>
    )
}
