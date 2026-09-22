import React, { useMemo, useState } from 'react'
import {
    MdNotifications,
    MdShoppingBag,
    MdLocalShipping,
    MdLocalOffer,
    MdPayment,
    MdPerson,
    MdDoneAll,
    MdDelete,
    MdArrowBack
} from 'react-icons/md'
import { Link } from 'react-router-dom'

import Header from '../../components/header'
import initialNotifications from '../../data/notifications'

const notificationIcons = {
    order: MdShoppingBag,
    delivery: MdLocalShipping,
    promotion: MdLocalOffer,
    payment: MdPayment,
    account: MdPerson
}

export default function Notifications() {
    const [notifications, setNotifications] =
        useState(initialNotifications)

    const [filter, setFilter] = useState('all')

    const unreadCount = useMemo(
        () =>
            notifications.filter(
                (notification) => !notification.read
            ).length,
        [notifications]
    )

    const filteredNotifications = useMemo(() => {
        if (filter === 'unread') {
            return notifications.filter(
                (notification) => !notification.read
            )
        }

        return notifications
    }, [notifications, filter])

    const markAsRead = (id) => {
        setNotifications((currentNotifications) =>
            currentNotifications.map((notification) =>
                notification.id === id
                    ? { ...notification, read: true }
                    : notification
            )
        )
    }

    const markAllAsRead = () => {
        setNotifications((currentNotifications) =>
            currentNotifications.map((notification) => ({
                ...notification,
                read: true
            }))
        )
    }

    const removeNotification = (id) => {
        setNotifications((currentNotifications) =>
            currentNotifications.filter(
                (notification) => notification.id !== id
            )
        )
    }

    const clearNotifications = () => {
        setNotifications([])
    }

    const getIcon = (type) => {
        const Icon = notificationIcons[type] || MdNotifications
        return Icon
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                {/* Breadcrumb */}
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                    <Link
                        to="/"
                        className="hover:text-green-600"
                    >
                        Home
                    </Link>

                    <span>/</span>

                    <span className="text-gray-900">
                        Notifications
                    </span>
                </div>

                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-full bg-green-50 flex items-center justify-center">
                            <MdNotifications
                                size={24}
                                className="text-green-600"
                            />
                        </div>

                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Notifications
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                {unreadCount > 0
                                    ? `${unreadCount} unread notification${
                                          unreadCount === 1
                                              ? ''
                                              : 's'
                                      }`
                                    : 'You are all caught up'}
                            </p>
                        </div>
                    </div>

                    {notifications.length > 0 && (
                        <div className="flex gap-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-green-300 hover:text-green-600 transition"
                                >
                                    <MdDoneAll size={18} />
                                    Mark all as read
                                </button>
                            )}

                            <button
                                onClick={clearNotifications}
                                className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:border-red-300 hover:text-red-500 transition"
                            >
                                <MdDelete size={18} />
                                Clear
                            </button>
                        </div>
                    )}
                </div>

                {/* Filters */}
                <div className="bg-white border border-gray-100 rounded-xl p-2 flex gap-2 mb-5">
                    <button
                        onClick={() => setFilter('all')}
                        className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                            filter === 'all'
                                ? 'bg-green-600 text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        All
                    </button>

                    <button
                        onClick={() => setFilter('unread')}
                        className={`flex-1 sm:flex-none px-5 py-2.5 rounded-lg text-sm font-medium transition ${
                            filter === 'unread'
                                ? 'bg-green-600 text-white'
                                : 'text-gray-600 hover:bg-gray-50'
                        }`}
                    >
                        Unread
                        {unreadCount > 0 && (
                            <span className="ml-2">
                                ({unreadCount})
                            </span>
                        )}
                    </button>
                </div>

                {/* Notifications */}
                {filteredNotifications.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-gray-100 px-6 py-16 text-center">
                        <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-5">
                            <MdNotifications
                                size={38}
                                className="text-gray-400"
                            />
                        </div>

                        <h2 className="text-xl font-bold text-gray-900">
                            {filter === 'unread'
                                ? 'No unread notifications'
                                : 'No notifications'}
                        </h2>

                        <p className="text-gray-500 mt-2 max-w-md mx-auto">
                            {filter === 'unread'
                                ? 'You have read all your notifications.'
                                : 'New order updates and account activity will appear here.'}
                        </p>

                        <Link
                            to="/products"
                            className="inline-flex items-center gap-2 mt-6 px-5 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition"
                        >
                            <MdArrowBack size={18} />
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                        {filteredNotifications.map(
                            (notification, index) => {
                                const Icon = getIcon(
                                    notification.type
                                )

                                return (
                                    <div
                                        key={notification.id}
                                        onClick={() =>
                                            markAsRead(
                                                notification.id
                                            )
                                        }
                                        className={`relative p-5 sm:p-6 cursor-pointer transition hover:bg-gray-50 ${
                                            index !==
                                            filteredNotifications.length -
                                                1
                                                ? 'border-b border-gray-100'
                                                : ''
                                        } ${
                                            !notification.read
                                                ? 'bg-green-50/40'
                                                : ''
                                        }`}
                                    >
                                        <div className="flex gap-4">
                                            {/* Icon */}
                                            <div
                                                className={`flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center ${
                                                    notification.type ===
                                                    'promotion'
                                                        ? 'bg-orange-50 text-orange-500'
                                                        : notification.type ===
                                                          'delivery'
                                                        ? 'bg-blue-50 text-blue-500'
                                                        : notification.type ===
                                                          'payment'
                                                        ? 'bg-purple-50 text-purple-500'
                                                        : 'bg-green-50 text-green-600'
                                                }`}
                                            >
                                                <Icon size={21} />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <h3 className="font-semibold text-gray-900">
                                                            {
                                                                notification.title
                                                            }
                                                        </h3>

                                                        {!notification.read && (
                                                            <span className="w-2 h-2 rounded-full bg-green-500 flex-shrink-0" />
                                                        )}
                                                    </div>

                                                    <span className="text-xs text-gray-400">
                                                        {
                                                            notification.time
                                                        }
                                                    </span>
                                                </div>

                                                <p className="text-sm text-gray-600 mt-1 leading-6">
                                                    {
                                                        notification.message
                                                    }
                                                </p>
                                            </div>

                                            {/* Delete */}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    removeNotification(
                                                        notification.id
                                                    )
                                                }}
                                                className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                                                aria-label="Delete notification"
                                            >
                                                <MdDelete
                                                    size={19}
                                                />
                                            </button>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                )}

                {/* Bottom Link */}
                {notifications.length > 0 && (
                    <div className="mt-6">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-green-600"
                        >
                            <MdArrowBack size={18} />
                            Back to Home
                        </Link>
                    </div>
                )}
            </main>
        </div>
    )
}