import React from 'react'
import {
    MdTrendingUp,
    MdShoppingCart,
    MdInventory,
    MdPeople,
    MdArrowUpward,
    MdArrowDownward,
    MdAdd,
    MdWarning,
    MdArrowForward
} from 'react-icons/md'

export default function SellerDashboard() {

    const stats = [
        {
            title: "Total Sales",
            value: "₦1,245,000",
            change: "+12.5%",
            positive: true,
            icon: <MdTrendingUp size={22} />
        },
        {
            title: "Total Orders",
            value: "248",
            change: "+8.2%",
            positive: true,
            icon: <MdShoppingCart size={22} />
        },
        {
            title: "Products",
            value: "126",
            change: "+6 this month",
            positive: true,
            icon: <MdInventory size={22} />
        },
        {
            title: "Customers",
            value: "384",
            change: "+15.4%",
            positive: true,
            icon: <MdPeople size={22} />
        }
    ]

    const recentOrders = [
        {
            id: "#SP1024",
            customer: "John Doe",
            amount: "₦85,000",
            status: "Completed",
            date: "Today"
        },
        {
            id: "#SP1023",
            customer: "Sarah James",
            amount: "₦32,500",
            status: "Processing",
            date: "Today"
        },
        {
            id: "#SP1022",
            customer: "Mike Smith",
            amount: "₦12,000",
            status: "Pending",
            date: "Yesterday"
        },
        {
            id: "#SP1021",
            customer: "David Cole",
            amount: "₦54,000",
            status: "Shipped",
            date: "Yesterday"
        }
    ]

    const topProducts = [
        {
            name: "Nike Air Max",
            sold: 48,
            revenue: "₦720,000"
        },
        {
            name: "Smart Watch",
            sold: 35,
            revenue: "₦525,000"
        },
        {
            name: "AirPods",
            sold: 29,
            revenue: "₦435,000"
        }
    ]

    return (
        <div className="p-4 sm:p-6 bg-gray-50 min-h-[calc(100vh-70px)]">

            {/* Dashboard intro */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div>
                    <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                        Seller Dashboard
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Here's what's happening with your store today.
                    </p>
                </div>

                <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-green-700 hover:bg-green-800 text-white rounded-xl text-sm font-medium transition">
                    <MdAdd size={20} />
                    Add Product
                </button>

            </div>


            {/* STAT CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">

                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-white border border-gray-200 rounded-2xl p-5"
                    >

                        <div className="flex items-center justify-between">

                            <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                                {stat.icon}
                            </div>

                            <span className="text-xs text-gray-400">
                                This month
                            </span>

                        </div>

                        <p className="text-sm text-gray-500 mt-4">
                            {stat.title}
                        </p>

                        <h3 className="text-2xl font-bold text-gray-900 mt-1">
                            {stat.value}
                        </h3>

                        <div className="flex items-center gap-1 mt-2 text-xs text-green-600">
                            <MdArrowUpward size={14} />
                            {stat.change}
                        </div>

                    </div>
                ))}

            </div>


            {/* SALES + INVENTORY */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">

                {/* SALES OVERVIEW */}
                <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-5">

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Sales Overview
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                                Track your store's sales performance
                            </p>
                        </div>

                        <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                            <option>Last 3 months</option>
                            <option>This year</option>
                        </select>

                    </div>


                    {/* Temporary chart area */}
                    <div className="h-[280px] mt-6 flex items-center justify-center border border-dashed border-gray-200 rounded-xl">

                        <div className="text-center">
                            <MdTrendingUp
                                size={40}
                                className="mx-auto text-green-600"
                            />

                            <p className="text-sm font-medium text-gray-700 mt-2">
                                Sales Chart
                            </p>

                            <p className="text-xs text-gray-400">
                                Chart will be connected to your sales data
                            </p>
                        </div>

                    </div>

                </div>


                {/* INVENTORY ALERTS */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Inventory Alerts
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                                Products needing attention
                            </p>
                        </div>

                        <MdWarning
                            size={22}
                            className="text-orange-500"
                        />

                    </div>


                    <div className="space-y-3">

                        <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
                            <p className="text-sm font-medium text-gray-800">
                                Nike Air Max
                            </p>

                            <p className="text-xs text-orange-600 mt-1">
                                Only 3 left in stock
                            </p>
                        </div>

                        <div className="p-3 rounded-xl bg-orange-50 border border-orange-100">
                            <p className="text-sm font-medium text-gray-800">
                                Smart Watch
                            </p>

                            <p className="text-xs text-orange-600 mt-1">
                                Only 2 left in stock
                            </p>
                        </div>

                        <div className="p-3 rounded-xl bg-red-50 border border-red-100">
                            <p className="text-sm font-medium text-gray-800">
                                AirPods Pro
                            </p>

                            <p className="text-xs text-red-600 mt-1">
                                Out of stock
                            </p>
                        </div>

                    </div>


                    <button className="flex items-center gap-1 text-sm text-green-700 font-medium mt-5">
                        Manage Inventory
                        <MdArrowForward size={18} />
                    </button>

                </div>

            </div>


            {/* RECENT ORDERS + TOP PRODUCTS */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                {/* RECENT ORDERS */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Recent Orders
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                                Your latest customer orders
                            </p>
                        </div>

                        <button className="text-sm text-green-700 font-medium">
                            View All
                        </button>

                    </div>


                    <div className="space-y-2">

                        {recentOrders.map((order) => (

                            <div
                                key={order.id}
                                className="flex items-center justify-between gap-3 p-3 rounded-xl hover:bg-gray-50 transition"
                            >

                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-900">
                                        {order.id}
                                    </p>

                                    <p className="text-xs text-gray-500 truncate">
                                        {order.customer} · {order.date}
                                    </p>
                                </div>

                                <div className="text-right shrink-0">
                                    <p className="text-sm font-medium text-gray-900">
                                        {order.amount}
                                    </p>

                                    <span className="text-xs text-green-600">
                                        {order.status}
                                    </span>
                                </div>

                            </div>

                        ))}

                    </div>

                </div>


                {/* TOP PRODUCTS */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">

                    <div className="flex items-center justify-between mb-5">

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Top Products
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                                Your best selling products
                            </p>
                        </div>

                        <button className="text-sm text-green-700 font-medium">
                            View All
                        </button>

                    </div>


                    <div className="space-y-3">

                        {topProducts.map((product, index) => (

                            <div
                                key={product.name}
                                className="flex items-center gap-3"
                            >

                                <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-500">
                                    {index + 1}
                                </div>

                                <div className="flex-1 min-w-0">

                                    <p className="text-sm font-medium text-gray-900 truncate">
                                        {product.name}
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        {product.sold} sold
                                    </p>

                                </div>

                                <p className="text-sm font-medium text-gray-900">
                                    {product.revenue}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            </div>

        </div>
    )
}