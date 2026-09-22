import React, { useMemo, useState } from 'react'
import {
    MdSearch,
    MdMoreVert,
    MdVisibility,
    MdShoppingBag,
    MdPending,
    MdLocalShipping,
    MdCheckCircle,
    MdClose,
    MdRefresh
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useOrders } from '../../contexts/orderProvider'

export default function SellerOrders() {
    const { orders = [] } = useOrders()

    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')
    const [openMenu, setOpenMenu] = useState(null)

    /*
     * Keep the filtering derived directly from orders.
     * Whenever createOrder() updates OrderProvider,
     * this component automatically re-renders.
     */
    const filteredOrders = useMemo(() => {
        return orders.filter((order) => {
            const customer = order.customer || {}

            const customerName = [
                customer.firstName,
                customer.lastName
            ]
                .filter(Boolean)
                .join(' ')

            const orderNumber =
                order.orderNumber ||
                order.id ||
                ''

            const matchesSearch =
                customerName
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                String(customer.email || '')
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                String(orderNumber)
                    .toLowerCase()
                    .includes(search.toLowerCase())

            const matchesStatus =
                statusFilter === 'All' ||
                order.status === statusFilter

            return matchesSearch && matchesStatus
        })
    }, [orders, search, statusFilter])

    const getOrderTotal = (order) => {
        if (order.total !== undefined) {
            return Number(order.total)
        }

        if (order.totalAmount !== undefined) {
            return Number(order.totalAmount)
        }

        return (order.items || []).reduce(
            (total, item) =>
                total +
                Number(item.price || 0) *
                Number(item.quantity || 0),
            0
        )
    }

    const formatPrice = (amount) => {
        return `₦${Number(amount || 0).toLocaleString()}`
    }

    const getCustomerName = (order) => {
        const customer = order.customer || {}

        const fullName = [
            customer.firstName,
            customer.lastName
        ]
            .filter(Boolean)
            .join(' ')

        return fullName || 'Guest Customer'
    }

    const getCustomerEmail = (order) => {
        return order.customer?.email || 'No email'
    }

    const getStatusClass = (status) => {
        switch (status) {
            case 'Processing':
                return 'bg-amber-50 text-amber-700'

            case 'Shipped':
                return 'bg-blue-50 text-blue-700'

            case 'Delivered':
                return 'bg-emerald-50 text-emerald-700'

            case 'Cancelled':
                return 'bg-red-50 text-red-700'

            default:
                return 'bg-slate-100 text-slate-600'
        }
    }

    const totalOrders = orders.length

    const processingOrders = orders.filter(
        (order) => order.status === 'Processing'
    ).length

    const shippedOrders = orders.filter(
        (order) => order.status === 'Shipped'
    ).length

    const deliveredOrders = orders.filter(
        (order) => order.status === 'Delivered'
    ).length

    return (
        <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8">

            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                        Orders
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage and track your store orders.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => {
                        setSearch('')
                        setStatusFilter('All')
                    }}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                    <MdRefresh size={18} />
                    Reset
                </button>

            </div>

            {/* Summary */}
            <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">

                <SummaryCard
                    icon={<MdShoppingBag size={21} />}
                    label="Total Orders"
                    value={totalOrders}
                />

                <SummaryCard
                    icon={<MdPending size={21} />}
                    label="Processing"
                    value={processingOrders}
                />

                <SummaryCard
                    icon={<MdLocalShipping size={21} />}
                    label="Shipped"
                    value={shippedOrders}
                />

                <SummaryCard
                    icon={<MdCheckCircle size={21} />}
                    label="Delivered"
                    value={deliveredOrders}
                />

            </div>

            {/* Filters */}
            <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-4">

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                    {/* Search */}
                    <div className="relative w-full lg:max-w-md">

                        <MdSearch
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search orders, customers..."
                            className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
                        />

                    </div>

                    {/* Status */}
                    <div className="flex flex-wrap gap-2">

                        {[
                            'All',
                            'Processing',
                            'Shipped',
                            'Delivered',
                            'Cancelled'
                        ].map((status) => (
                            <button
                                key={status}
                                type="button"
                                onClick={() =>
                                    setStatusFilter(status)
                                }
                                className={`rounded-lg px-3 py-2 text-xs font-semibold transition ${
                                    statusFilter === status
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                }`}
                            >
                                {status}
                            </button>
                        ))}

                    </div>

                </div>

            </div>

            {/* Desktop table */}
            <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:block">

                <div className="overflow-x-auto">

                    <table className="w-full text-left">

                        <thead className="border-b border-slate-200 bg-slate-50">

                            <tr>

                                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Order
                                </th>

                                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Customer
                                </th>

                                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Items
                                </th>

                                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Total
                                </th>

                                <th className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Status
                                </th>

                                <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                                    Action
                                </th>

                            </tr>

                        </thead>

                        <tbody className="divide-y divide-slate-100">

                            {filteredOrders.map((order) => (

                                <tr
                                    key={order.id}
                                    className="transition hover:bg-slate-50"
                                >

                                    <td className="px-5 py-4">

                                        <p className="text-sm font-bold text-slate-900">
                                            {order.orderNumber || order.id}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {new Date(
                                                order.createdAt
                                            ).toLocaleDateString()}
                                        </p>

                                    </td>

                                    <td className="px-5 py-4">

                                        <p className="text-sm font-semibold text-slate-800">
                                            {getCustomerName(order)}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            {getCustomerEmail(order)}
                                        </p>

                                    </td>

                                    <td className="px-5 py-4">

                                        <span className="text-sm text-slate-600">
                                            {(order.items || []).reduce(
                                                (total, item) =>
                                                    total +
                                                    Number(
                                                        item.quantity || 0
                                                    ),
                                                0
                                            )}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        <span className="text-sm font-bold text-slate-900">
                                            {formatPrice(
                                                getOrderTotal(order)
                                            )}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4">

                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                                                order.status
                                            )}`}
                                        >
                                            {order.status}
                                        </span>

                                    </td>

                                    <td className="px-5 py-4 text-right">

                                        <div className="relative inline-block">

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setOpenMenu(
                                                        openMenu === order.id
                                                            ? null
                                                            : order.id
                                                    )
                                                }
                                                className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                                            >
                                                <MdMoreVert size={21} />
                                            </button>

                                            {openMenu === order.id && (
                                                <div className="absolute right-0 top-11 z-50 w-40 rounded-xl border border-slate-200 bg-white p-1 text-left shadow-lg">

                                                    <Link
                                                        to={`/seller/orders/${order.id}`}
                                                        onClick={() =>
                                                            setOpenMenu(null)
                                                        }
                                                        className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                                                    >
                                                        <MdVisibility size={18} />
                                                        View Order
                                                    </Link>

                                                </div>
                                            )}

                                        </div>

                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

                {/* Empty state */}
                {filteredOrders.length === 0 && (
                    <div className="px-6 py-16 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <MdShoppingBag
                                size={27}
                                className="text-slate-400"
                            />
                        </div>

                        <h3 className="text-sm font-bold text-slate-900">
                            No orders found
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            {orders.length === 0
                                ? 'Orders placed by customers will appear here.'
                                : 'Try changing your search or filter.'}
                        </p>

                    </div>
                )}

            </div>

            {/* Mobile */}
            <div className="space-y-3 lg:hidden">

                {filteredOrders.map((order) => (

                    <div
                        key={order.id}
                        className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                    >

                        <div className="flex items-start justify-between gap-3">

                            <div>

                                <p className="text-sm font-bold text-slate-900">
                                    {order.orderNumber || order.id}
                                </p>

                                <p className="mt-1 text-xs text-slate-400">
                                    {new Date(
                                        order.createdAt
                                    ).toLocaleDateString()}
                                </p>

                            </div>

                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusClass(
                                    order.status
                                )}`}
                            >
                                {order.status}
                            </span>

                        </div>

                        <div className="my-4 border-t border-slate-100" />

                        <div className="grid grid-cols-2 gap-4">

                            <div>
                                <p className="text-[10px] font-semibold uppercase text-slate-400">
                                    Customer
                                </p>

                                <p className="mt-1 text-sm font-semibold text-slate-800">
                                    {getCustomerName(order)}
                                </p>
                            </div>

                            <div>
                                <p className="text-[10px] font-semibold uppercase text-slate-400">
                                    Total
                                </p>

                                <p className="mt-1 text-sm font-bold text-slate-900">
                                    {formatPrice(
                                        getOrderTotal(order)
                                    )}
                                </p>
                            </div>

                        </div>

                        <Link
                            to={`/seller/orders/${order.id}`}
                            className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-slate-900 text-xs font-bold text-white transition hover:bg-slate-800"
                        >
                            <MdVisibility size={17} />
                            View Order
                        </Link>

                    </div>

                ))}

                {filteredOrders.length === 0 && (
                    <div className="rounded-2xl border border-slate-200 bg-white px-6 py-16 text-center">

                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                            <MdShoppingBag
                                size={27}
                                className="text-slate-400"
                            />
                        </div>

                        <h3 className="text-sm font-bold text-slate-900">
                            No orders found
                        </h3>

                        <p className="mt-1 text-xs text-slate-500">
                            {orders.length === 0
                                ? 'Orders placed by customers will appear here.'
                                : 'Try changing your search or filter.'}
                        </p>

                    </div>
                )}

            </div>

        </div>
    )
}

function SummaryCard({ icon, label, value }) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <div className="flex items-center justify-between">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    {icon}
                </div>

                <span className="text-2xl font-bold text-slate-900">
                    {value}
                </span>

            </div>

            <p className="mt-3 text-xs font-semibold text-slate-500">
                {label}
            </p>

        </div>
    )
}