import React from 'react'
import {
    MdAccountBalanceWallet,
    MdArrowDownward,
    MdArrowUpward,
    MdAdd,
    MdAccountBalance,
    MdMoreHoriz
} from 'react-icons/md'

export default function SellerWallet() {

    const transactions = [
        {
            title: "Order #SP1024",
            description: "Payment received",
            amount: "+₦85,000",
            date: "Today, 10:42 AM",
            type: "credit"
        },
        {
            title: "Withdrawal",
            description: "Bank withdrawal",
            amount: "-₦50,000",
            date: "Yesterday, 3:20 PM",
            type: "debit"
        },
        {
            title: "Order #SP1020",
            description: "Payment received",
            amount: "+₦32,500",
            date: "Sep 16, 2:15 PM",
            type: "credit"
        },
        {
            title: "Order #SP1018",
            description: "Payment received",
            amount: "+₦74,000",
            date: "Sep 15, 11:30 AM",
            type: "credit"
        }
    ]

    return (
        <div className="min-h-[calc(100vh-70px)] bg-gray-50 p-4 sm:p-6">

            {/* HEADER */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">

                <div>
                    <div className="flex items-center gap-2">
                        <MdAccountBalanceWallet
                            size={25}
                            className="text-green-700"
                        />

                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                            Wallet
                        </h1>
                    </div>

                    <p className="text-sm text-gray-500 mt-1">
                        Manage your funds and wallet transactions.
                    </p>
                </div>

                <button className="
                    flex items-center justify-center gap-2
                    px-4 py-2.5
                    rounded-xl
                    bg-green-700
                    hover:bg-green-800
                    text-white
                    text-sm font-medium
                    transition
                ">
                    <MdAdd size={20} />
                    Add Money
                </button>

            </div>


            {/* BALANCE CARDS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">

                {/* AVAILABLE BALANCE */}
                <div className="
                    lg:col-span-2
                    rounded-2xl
                    bg-green-900
                    text-white
                    p-6
                    relative overflow-hidden
                ">

                    <div className="relative z-10">

                        <div className="flex items-center justify-between">

                            <div>
                                <p className="text-sm text-green-200">
                                    Available Balance
                                </p>

                                <h2 className="text-3xl sm:text-4xl font-bold mt-2">
                                    ₦1,245,000.00
                                </h2>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                                <MdAccountBalanceWallet size={27} />
                            </div>

                        </div>


                        <div className="flex flex-wrap gap-3 mt-6">

                            <button className="
                                flex items-center gap-2
                                px-4 py-2.5
                                rounded-xl
                                bg-white
                                text-green-900
                                text-sm font-semibold
                                hover:bg-green-50
                                transition
                            ">
                                <MdArrowUpward size={18} />
                                Withdraw
                            </button>

                            <button className="
                                flex items-center gap-2
                                px-4 py-2.5
                                rounded-xl
                                bg-white/10
                                hover:bg-white/20
                                text-white
                                text-sm font-medium
                                transition
                            ">
                                <MdAdd size={18} />
                                Add Money
                            </button>

                        </div>

                    </div>

                    {/* Decorative circles */}
                    <div className="absolute -right-12 -bottom-20 w-52 h-52 rounded-full bg-white/5" />
                    <div className="absolute right-16 -bottom-28 w-44 h-44 rounded-full bg-white/5" />

                </div>


                {/* PENDING */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">

                    <div className="flex items-center justify-between">

                        <div className="w-11 h-11 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center">
                            <MdAccountBalanceWallet size={23} />
                        </div>

                        <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600">
                            Pending
                        </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-5">
                        Pending Balance
                    </p>

                    <h3 className="text-2xl font-bold text-gray-900 mt-1">
                        ₦85,000.00
                    </h3>

                    <p className="text-xs text-gray-400 mt-2">
                        From orders that are still processing
                    </p>

                </div>

            </div>


            {/* SUMMARY */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                <div className="bg-white border border-gray-200 rounded-2xl p-5">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                            <MdArrowDownward size={21} />
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Total Earnings
                            </p>

                            <h3 className="text-xl font-bold text-gray-900">
                                ₦4,820,000
                            </h3>
                        </div>

                    </div>

                </div>


                <div className="bg-white border border-gray-200 rounded-2xl p-5">

                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                            <MdArrowUpward size={21} />
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Total Withdrawn
                            </p>

                            <h3 className="text-xl font-bold text-gray-900">
                                ₦3,575,000
                            </h3>
                        </div>

                    </div>

                </div>

            </div>


            {/* TRANSACTIONS */}
            <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden mb-6">

                <div className="p-5 border-b border-gray-100 flex items-center justify-between">

                    <div>
                        <h2 className="font-semibold text-gray-900">
                            Wallet Transactions
                        </h2>

                        <p className="text-xs text-gray-500 mt-1">
                            Your recent wallet activity
                        </p>
                    </div>

                    <button className="text-sm text-green-700 font-medium">
                        View All
                    </button>

                </div>


                <div>

                    {transactions.map((transaction, index) => (

                        <div
                            key={index}
                            className="
                                flex items-center gap-3
                                p-4 sm:px-5
                                border-b border-gray-100
                                last:border-0
                                hover:bg-gray-50
                                transition
                            "
                        >

                            {/* ICON */}
                            <div className={`
                                w-10 h-10 shrink-0
                                rounded-xl
                                flex items-center justify-center
                                ${
                                    transaction.type === "credit"
                                        ? "bg-green-50 text-green-600"
                                        : "bg-red-50 text-red-500"
                                }
                            `}>
                                {transaction.type === "credit"
                                    ? <MdArrowDownward size={20} />
                                    : <MdArrowUpward size={20} />
                                }
                            </div>


                            {/* INFO */}
                            <div className="flex-1 min-w-0">

                                <p className="text-sm font-medium text-gray-900 truncate">
                                    {transaction.title}
                                </p>

                                <p className="text-xs text-gray-500 mt-0.5">
                                    {transaction.description}
                                </p>

                            </div>


                            {/* AMOUNT */}
                            <div className="text-right">

                                <p className={`
                                    text-sm font-semibold
                                    ${
                                        transaction.type === "credit"
                                            ? "text-green-600"
                                            : "text-red-500"
                                    }
                                `}>
                                    {transaction.amount}
                                </p>

                                <p className="text-[11px] text-gray-400 mt-0.5">
                                    {transaction.date}
                                </p>

                            </div>


                            <button className="hidden sm:block p-1 text-gray-400 hover:text-gray-700">
                                <MdMoreHoriz size={20} />
                            </button>

                        </div>

                    ))}

                </div>

            </div>


            {/* BOTTOM */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* PAYOUT ACCOUNT */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">

                    <div className="flex items-center justify-between">

                        <div>
                            <h3 className="font-semibold text-gray-900">
                                Payout Account
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                                Where your withdrawals are sent
                            </p>
                        </div>

                        <MdAccountBalance
                            size={25}
                            className="text-green-700"
                        />

                    </div>


                    <div className="flex items-center gap-3 mt-5 p-4 rounded-xl bg-gray-50">

                        <div className="w-10 h-10 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                            <MdAccountBalance
                                size={21}
                                className="text-gray-600"
                            />
                        </div>

                        <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">
                                GTBank
                            </p>

                            <p className="text-xs text-gray-500">
                                •••• •••• 4821
                            </p>
                        </div>

                        <button className="text-xs text-green-700 font-medium">
                            Manage
                        </button>

                    </div>

                </div>


                {/* MONTHLY SUMMARY */}
                <div className="bg-white border border-gray-200 rounded-2xl p-5">

                    <h3 className="font-semibold text-gray-900">
                        This Month
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                        Wallet activity for September
                    </p>

                    <div className="grid grid-cols-2 gap-4 mt-5">

                        <div>
                            <p className="text-xs text-gray-500">
                                Money In
                            </p>

                            <p className="text-lg font-bold text-green-600 mt-1">
                                +₦540,000
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Money Out
                            </p>

                            <p className="text-lg font-bold text-red-500 mt-1">
                                -₦210,000
                            </p>
                        </div>

                    </div>

                    <div className="mt-5 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full w-[72%] bg-green-600 rounded-full" />
                    </div>

                    <p className="text-xs text-gray-400 mt-2">
                        24 wallet transactions this month
                    </p>

                </div>

            </div>

        </div>
    )
}