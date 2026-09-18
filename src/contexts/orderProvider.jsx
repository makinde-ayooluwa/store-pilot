import React, { createContext, useContext, useMemo, useState } from 'react'

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([])

    const createOrder = (orderData) => {
        const newOrder = {
            id: `ORD-${Date.now()}`,
            orderNumber: `SP-${Math.floor(100000 + Math.random() * 900000)}`,
            createdAt: new Date().toISOString(),
            status: 'Processing',
            paymentStatus:
                orderData.paymentMethod === 'cash'
                    ? 'Pending'
                    : 'Paid',
            ...orderData
        }

        setOrders((currentOrders) => [
            newOrder,
            ...currentOrders
        ])

        return newOrder
    }

    const getOrderById = (orderId) => {
        return orders.find(
            (order) => order.id === orderId
        )
    }

    const updateOrderStatus = (orderId, status) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order.id === orderId
                    ? {
                        ...order,
                        status
                    }
                    : order
            )
        )
    }

    const clearOrders = () => {
        setOrders([])
    }

    const orderCount = useMemo(
        () => orders.length,
        [orders]
    )

    return (
        <OrderContext.Provider
            value={{
                orders,
                createOrder,
                getOrderById,
                updateOrderStatus,
                clearOrders,
                orderCount
            }}
        >
            {children}
        </OrderContext.Provider>
    )
}

export function useOrders() {
    const context = useContext(OrderContext)

    if (!context) {
        throw new Error(
            'useOrders must be used inside OrderProvider'
        )
    }

    return context
}