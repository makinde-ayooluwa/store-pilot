import React, { useMemo, useState } from 'react'
import {
    MdSearch,
    MdMoreVert,
    MdVisibility,
    MdEmail,
    MdPhone,
    MdShoppingBag,
    MdPeople,
    MdAttachMoney,
    MdCalendarToday
} from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useOrders } from '../../contexts/orderProvider'

export default function SellerCustomers() {
    const { orders = [] } = useOrders()

    const [search, setSearch] = useState('')
    const [openMenu, setOpenMenu] = useState(null)

    /*
     * Build a unique customer list from orders.
     *
     * We identify customers primarily by email.
     * If email doesn't exist, we fall back to customer name.
     */
    const customers = useMemo(() => {
        const customerMap = new Map()

        orders.forEach((order) => {
            const customerName =
                order.customer?.name ||
                order.customerName ||
                order.shippingAddress?.name ||
                'Guest Customer'

            const customerEmail =
                order.customer?.email ||
                order.customerEmail ||
                order.shippingAddress?.email ||
                ''

            const customerPhone =
                order.customer?.phone ||
                order.customerPhone ||
                order.shippingAddress?.phone ||
                ''

            const customerKey =
                customerEmail ||
                `${customerName}-${customerPhone}`

            if (!customerMap.has(customerKey)) {
                customerMap.set(customerKey, {
                    id: customerKey,
                    name: customerName,
                    email: customerEmail,
                    phone: customerPhone,
                    orders: [],
                    totalSpent: 0,
                    lastOrderDate: order.createdAt
                })
            }

            const customer = customerMap.get(customerKey)

            customer.orders.push(order)

            const orderTotal =
                typeof order.total === 'number'
                    ? order.total
                    : typeof order.totalAmount === 'number'
                        ? order.totalAmount
                        : Array.isArray(order.items)
                            ? order.items.reduce(
                                (total, item) =>
                                    total +
                                    Number(item.price ?? 0) *
                                    Number(item.quantity ?? 1),
                                0
                            )
                            : 0

            customer.totalSpent += orderTotal

            if (
                new Date(order.createdAt) >
                new Date(customer.lastOrderDate)
            ) {
                customer.lastOrderDate = order.createdAt
            }
        })

        return Array.from(customerMap.values())
    }, [orders])


    const filteredCustomers = useMemo(() => {
        const searchValue = search.toLowerCase().trim()

        if (!searchValue) {
            return customers
        }

        return customers.filter((customer) => {
            return (
                customer.name
                    .toLowerCase()
                    .includes(searchValue) ||
                customer.email
                    .toLowerCase()
                    .includes(searchValue) ||
                customer.phone
                    .toLowerCase()
                    .includes(searchValue)
            )
        })
    }, [customers, search])


    const totalRevenue = useMemo(() => {
        return customers.reduce(
            (total, customer) =>
                total + customer.totalSpent,
            0
        )
    }, [customers])


    const averageOrderValue = useMemo(() => {
        if (orders.length === 0) {
            return 0
        }

        return totalRevenue / orders.length
    }, [orders.length, totalRevenue])


    const formatDate = (date) => {
        if (!date) {
            return '—'
        }

        const parsedDate = new Date(date)

        if (Number.isNaN(parsedDate.getTime())) {
            return '—'
        }

        return parsedDate.toLocaleDateString(
            'en-NG',
            {
                day: 'numeric',
                month: 'short',
                year: 'numeric'
            }
        )
    }


    const getInitials = (name) => {
        if (!name) {
            return 'G'
        }

        const words = name
            .trim()
            .split(/\s+/)

        if (words.length === 1) {
            return words[0]
                .slice(0, 2)
                .toUpperCase()
        }

        return (
            words[0][0] +
            words[words.length - 1][0]
        ).toUpperCase()
    }


    return (
        <div className="min-h-screen bg-gray-50">

            {/* =========================
                HEADER
            ========================== */}
            <div className="bg-white border-b border-gray-200">

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

                    <div className="
                        flex
                        flex-col
                        sm:flex-row
                        sm:items-center
                        sm:justify-between
                        gap-4
                    ">

                        <div className="flex items-center gap-3">

                            <div className="
                                w-11
                                h-11
                                rounded-xl
                                bg-green-50
                                flex
                                items-center
                                justify-center
                            ">
                                <MdPeople
                                    size={24}
                                    className="text-green-600"
                                />
                            </div>

                            <div>

                                <h1 className="
                                    text-xl
                                    sm:text-2xl
                                    font-bold
                                    text-gray-900
                                ">
                                    Customers
                                </h1>

                                <p className="
                                    text-sm
                                    text-gray-500
                                    mt-0.5
                                ">
                                    View and manage your customers
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>


            {/* =========================
                MAIN
            ========================== */}
            <main className="
                max-w-7xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
                py-6
            ">

                {/* =========================
                    SUMMARY CARDS
                ========================== */}
                <div className="
                    grid
                    grid-cols-2
                    lg:grid-cols-4
                    gap-4
                    mb-6
                ">

                    {/* Customers */}
                    <div className="
                        bg-white
                        border
                        border-gray-200
                        rounded-2xl
                        p-4
                        sm:p-5
                    ">

                        <div className="flex items-center gap-3">

                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-green-50
                                flex
                                items-center
                                justify-center
                            ">
                                <MdPeople
                                    size={21}
                                    className="text-green-600"
                                />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Customers
                                </p>

                                <p className="
                                    text-xl
                                    font-bold
                                    text-gray-900
                                    mt-0.5
                                ">
                                    {customers.length}
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Orders */}
                    <div className="
                        bg-white
                        border
                        border-gray-200
                        rounded-2xl
                        p-4
                        sm:p-5
                    ">

                        <div className="flex items-center gap-3">

                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-blue-50
                                flex
                                items-center
                                justify-center
                            ">
                                <MdShoppingBag
                                    size={21}
                                    className="text-blue-600"
                                />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Total Orders
                                </p>

                                <p className="
                                    text-xl
                                    font-bold
                                    text-gray-900
                                    mt-0.5
                                ">
                                    {orders.length}
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Revenue */}
                    <div className="
                        bg-white
                        border
                        border-gray-200
                        rounded-2xl
                        p-4
                        sm:p-5
                    ">

                        <div className="flex items-center gap-3">

                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-purple-50
                                flex
                                items-center
                                justify-center
                            ">
                                <MdAttachMoney
                                    size={21}
                                    className="text-purple-600"
                                />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Customer Revenue
                                </p>

                                <p className="
                                    text-lg
                                    font-bold
                                    text-gray-900
                                    mt-0.5
                                ">
                                    ₦{totalRevenue.toLocaleString()}
                                </p>
                            </div>

                        </div>

                    </div>


                    {/* Average */}
                    <div className="
                        bg-white
                        border
                        border-gray-200
                        rounded-2xl
                        p-4
                        sm:p-5
                    ">

                        <div className="flex items-center gap-3">

                            <div className="
                                w-10
                                h-10
                                rounded-xl
                                bg-orange-50
                                flex
                                items-center
                                justify-center
                            ">
                                <MdShoppingBag
                                    size={21}
                                    className="text-orange-600"
                                />
                            </div>

                            <div>
                                <p className="text-xs text-gray-500">
                                    Avg. Order
                                </p>

                                <p className="
                                    text-lg
                                    font-bold
                                    text-gray-900
                                    mt-0.5
                                ">
                                    ₦{Math.round(
                                        averageOrderValue
                                    ).toLocaleString()}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>


                {/* =========================
                    SEARCH
                ========================== */}
                <div className="
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    p-4
                    mb-6
                ">

                    <div className="relative">

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
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="Search customers by name, email or phone..."
                            className="
                                w-full
                                pl-10
                                pr-4
                                py-3
                                rounded-xl
                                border
                                border-gray-200
                                bg-gray-50
                                text-sm
                                outline-none
                                focus:border-green-500
                                focus:ring-2
                                focus:ring-green-100
                                transition
                            "
                        />

                    </div>

                </div>


                {/* =========================
                    DESKTOP TABLE
                ========================== */}
                <div className="
                    hidden
                    md:block
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    overflow-visible
                ">

                    <div className="overflow-x-auto">

                        <table className="w-full">

                            <thead>

                                <tr className="
                                    border-b
                                    border-gray-200
                                    bg-gray-50
                                ">

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                    ">
                                        Customer
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                    ">
                                        Contact
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                    ">
                                        Orders
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                    ">
                                        Total Spent
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-left
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                    ">
                                        Last Order
                                    </th>

                                    <th className="
                                        px-5
                                        py-4
                                        text-right
                                        text-xs
                                        font-semibold
                                        text-gray-500
                                        uppercase
                                    ">
                                        Action
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {filteredCustomers.map(
                                    (customer) => (

                                        <tr
                                            key={customer.id}
                                            className="
                                                border-b
                                                border-gray-100
                                                last:border-0
                                                hover:bg-gray-50
                                                transition
                                            "
                                        >

                                            {/* Customer */}
                                            <td className="
                                                px-5
                                                py-4
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-3
                                                ">

                                                    <div className="
                                                        w-10
                                                        h-10
                                                        rounded-full
                                                        bg-green-50
                                                        text-green-700
                                                        flex
                                                        items-center
                                                        justify-center
                                                        text-sm
                                                        font-bold
                                                    ">
                                                        {getInitials(
                                                            customer.name
                                                        )}
                                                    </div>

                                                    <div>

                                                        <p className="
                                                            text-sm
                                                            font-semibold
                                                            text-gray-900
                                                        ">
                                                            {customer.name}
                                                        </p>

                                                        <p className="
                                                            text-xs
                                                            text-gray-400
                                                            mt-0.5
                                                        ">
                                                            Customer
                                                        </p>

                                                    </div>

                                                </div>

                                            </td>


                                            {/* Contact */}
                                            <td className="
                                                px-5
                                                py-4
                                            ">

                                                {customer.email && (
                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-1.5
                                                        text-sm
                                                        text-gray-600
                                                    ">
                                                        <MdEmail
                                                            size={16}
                                                            className="text-gray-400"
                                                        />

                                                        {customer.email}
                                                    </div>
                                                )}

                                                {customer.phone && (
                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-1.5
                                                        text-xs
                                                        text-gray-400
                                                        mt-1
                                                    ">
                                                        <MdPhone
                                                            size={15}
                                                        />

                                                        {customer.phone}
                                                    </div>
                                                )}

                                                {!customer.email &&
                                                    !customer.phone && (
                                                        <span className="
                                                            text-sm
                                                            text-gray-400
                                                        ">
                                                            No contact info
                                                        </span>
                                                    )}

                                            </td>


                                            {/* Orders */}
                                            <td className="
                                                px-5
                                                py-4
                                            ">

                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    justify-center
                                                    min-w-8
                                                    px-2
                                                    py-1
                                                    rounded-lg
                                                    bg-gray-100
                                                    text-sm
                                                    font-semibold
                                                    text-gray-700
                                                ">
                                                    {customer.orders.length}
                                                </span>

                                            </td>


                                            {/* Total */}
                                            <td className="
                                                px-5
                                                py-4
                                            ">

                                                <p className="
                                                    text-sm
                                                    font-bold
                                                    text-gray-900
                                                ">
                                                    ₦{customer.totalSpent.toLocaleString()}
                                                </p>

                                            </td>


                                            {/* Last order */}
                                            <td className="
                                                px-5
                                                py-4
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-1.5
                                                    text-sm
                                                    text-gray-600
                                                ">
                                                    <MdCalendarToday
                                                        size={15}
                                                        className="text-gray-400"
                                                    />

                                                    {formatDate(
                                                        customer.lastOrderDate
                                                    )}
                                                </div>

                                            </td>


                                            {/* Action */}
                                            <td className="
                                                px-5
                                                py-4
                                                text-right
                                            ">

                                                <div className="
                                                    relative
                                                    inline-block
                                                ">

                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            setOpenMenu(
                                                                openMenu === customer.id
                                                                    ? null
                                                                    : customer.id
                                                            )
                                                        }
                                                        className="
                                                            w-9
                                                            h-9
                                                            rounded-lg
                                                            flex
                                                            items-center
                                                            justify-center
                                                            text-gray-500
                                                            hover:bg-gray-100
                                                            transition
                                                        "
                                                    >
                                                        <MdMoreVert
                                                            size={21}
                                                        />
                                                    </button>


                                                    {openMenu ===
                                                        customer.id && (

                                                        <div className="
                                                            absolute
                                                            right-0
                                                            top-10
                                                            z-50
                                                            w-40
                                                            bg-white
                                                            border
                                                            border-gray-200
                                                            rounded-xl
                                                            shadow-lg
                                                            p-1
                                                        ">

                                                            <button
                                                                type="button"
                                                                onClick={() =>
                                                                    setOpenMenu(null)
                                                                }
                                                                className="
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                    w-full
                                                                    px-3
                                                                    py-2.5
                                                                    rounded-lg
                                                                    text-sm
                                                                    text-gray-700
                                                                    hover:bg-gray-50
                                                                    transition
                                                                "
                                                            >
                                                                <MdVisibility
                                                                    size={18}
                                                                />
                                                                View Customer
                                                            </button>

                                                        </div>

                                                    )}

                                                </div>

                                            </td>

                                        </tr>

                                    )
                                )}

                            </tbody>

                        </table>


                        {filteredCustomers.length === 0 && (

                            <div className="
                                py-16
                                px-5
                                text-center
                            ">

                                <div className="
                                    w-16
                                    h-16
                                    mx-auto
                                    rounded-full
                                    bg-gray-50
                                    flex
                                    items-center
                                    justify-center
                                ">
                                    <MdPeople
                                        size={30}
                                        className="text-gray-300"
                                    />
                                </div>

                                <h3 className="
                                    text-base
                                    font-semibold
                                    text-gray-900
                                    mt-4
                                ">
                                    No customers found
                                </h3>

                                <p className="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                ">
                                    Try a different search.
                                </p>

                            </div>

                        )}

                    </div>

                </div>


                {/* =========================
                    MOBILE
                ========================== */}
                <div className="
                    md:hidden
                    space-y-4
                ">

                    {filteredCustomers.map(
                        (customer) => (

                            <div
                                key={customer.id}
                                className="
                                    bg-white
                                    border
                                    border-gray-200
                                    rounded-2xl
                                    p-4
                                "
                            >

                                <div className="
                                    flex
                                    items-start
                                    justify-between
                                    gap-3
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        gap-3
                                    ">

                                        <div className="
                                            w-11
                                            h-11
                                            rounded-full
                                            bg-green-50
                                            text-green-700
                                            flex
                                            items-center
                                            justify-center
                                            text-sm
                                            font-bold
                                        ">
                                            {getInitials(
                                                customer.name
                                            )}
                                        </div>

                                        <div>

                                            <p className="
                                                text-sm
                                                font-bold
                                                text-gray-900
                                            ">
                                                {customer.name}
                                            </p>

                                            <p className="
                                                text-xs
                                                text-gray-400
                                                mt-1
                                            ">
                                                {customer.email ||
                                                    'Guest Customer'}
                                            </p>

                                        </div>

                                    </div>

                                </div>


                                <div className="
                                    grid
                                    grid-cols-2
                                    gap-3
                                    mt-5
                                ">

                                    <div className="
                                        bg-gray-50
                                        rounded-xl
                                        p-3
                                    ">

                                        <p className="
                                            text-[11px]
                                            text-gray-400
                                        ">
                                            Orders
                                        </p>

                                        <p className="
                                            text-base
                                            font-bold
                                            text-gray-900
                                            mt-1
                                        ">
                                            {customer.orders.length}
                                        </p>

                                    </div>


                                    <div className="
                                        bg-gray-50
                                        rounded-xl
                                        p-3
                                    ">

                                        <p className="
                                            text-[11px]
                                            text-gray-400
                                        ">
                                            Total Spent
                                        </p>

                                        <p className="
                                            text-base
                                            font-bold
                                            text-gray-900
                                            mt-1
                                        ">
                                            ₦{customer.totalSpent.toLocaleString()}
                                        </p>

                                    </div>

                                </div>


                                <div className="
                                    mt-4
                                    pt-4
                                    border-t
                                    border-gray-100
                                ">

                                    <div className="
                                        flex
                                        items-center
                                        justify-between
                                        text-xs
                                    ">

                                        <span className="text-gray-400">
                                            Last order
                                        </span>

                                        <span className="
                                            text-gray-600
                                            font-medium
                                        ">
                                            {formatDate(
                                                customer.lastOrderDate
                                            )}
                                        </span>

                                    </div>

                                </div>


                                <button
                                    type="button"
                                    className="
                                        mt-4
                                        w-full
                                        flex
                                        items-center
                                        justify-center
                                        gap-2
                                        px-4
                                        py-2.5
                                        rounded-xl
                                        bg-gray-50
                                        text-gray-700
                                        text-sm
                                        font-semibold
                                        hover:bg-gray-100
                                        transition
                                    "
                                >
                                    <MdVisibility size={18} />
                                    View Customer
                                </button>

                            </div>

                        )
                    )}


                    {filteredCustomers.length === 0 && (

                        <div className="
                            bg-white
                            border
                            border-gray-200
                            rounded-2xl
                            py-14
                            px-5
                            text-center
                        ">

                            <MdPeople
                                size={40}
                                className="mx-auto text-gray-300"
                            />

                            <h3 className="
                                text-base
                                font-semibold
                                text-gray-900
                                mt-4
                            ">
                                No customers found
                            </h3>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">
                                Try a different search.
                            </p>

                        </div>

                    )}

                </div>

            </main>

        </div>
    )
}