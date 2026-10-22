import axios from 'axios';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { backendUrl } from '../data/constants';
import { useUser } from './userProvider';
import Swal from 'sweetalert2';

const OrderContext = createContext(null)

export function OrderProvider({ children }) {
    const [orders, setOrders] = useState([])
    const { user } = useUser()
    /**
     * 
     * Example order
     * {
      "user": "test-user-001",
      "store": "6ad71b428fb9202b11d2b587",
      "items": [
        {
          "product": "6ad71ba78fb9202b11d2b588",
          "name": "Test Product",
          "image": "",
          "quantity": 4,
          "unitPrice": 1000,
          "deliveryFee": 700
        }
      ],
      "customer": {
        "name": "Test Customer",
        "email": "test@example.com",
        "phone": "08000000000"
      },
      "shippingAddress": {
        "address": "Test Street",
        "city": "Ibadan",
        "state": "Oyo",
        "country": "Nigeria"
      },
      "deliveryMethod": "standard"
    }
     */
    const getOrders = useCallback(async () => {
        try {
            const response = await axios.post(`${backendUrl}/orders/all`, { user })
            const result = response.data;
            if (result) {
                setOrders(result);
            }
        } catch (error) {
            console.log(error);
        }
    }, []);
    useEffect(() => {
        getOrders();
    }, [getOrders])
    const createOrder = async (orderData) => {
        try {
            if (!backendUrl) {
                throw new Error(
                    'VITE_BACKEND_URL is not configured in your frontend .env file.'
                )
            }
            const response = await axios.post(`${backendUrl}/orders/create`, orderData)
            const result = await response.data;
            console.log("ORDER PROVIDER RESULT", result)
            if (result.status) {
                await Swal.fire({
                    title: "Order success",
                    text: "Order placed. Redirecting to paystack ...",
                    icon: "success",
                    timer: 3000,
                    timerProgressBar: true
                })
                const { orderId, total, email } = result.order;
                console.log("ORDER ID", orderId);
                try {
                    const payResponse = await axios.post(`${backendUrl}/payment/initialize`, {
                        amount: Number(total) * 100, //Kobo
                        email,
                        reference: orderId
                    });
                    const payResult = await payResponse.data;
                    if (payResult.status) {
                        const { authorization_url } = payResult;
                        setTimeout(() => {
                            window.location.assign(authorization_url);
                        }, 3000);
                    } else {
                        console.log("Failed to initialize paystack")
                    }
                } catch (error) {
                    Swal.fire({
                        title: "Error occured",
                        text: "Error occured while redirecting to paystack ...",
                        icon: "error",
                        timer: 3000,
                        timerProgressBar: true
                    })
                    console.log(error)
                }
            }
            return result
        } catch (error) {

        }
    }
    const initializePayment = async (data) => {
        try {
            const response = await axios.post(`${backendUrl}/payment/initialize`, {
                amount: Number(data.amount) * 100, //Kobo
                email: data.email,
                reference: data.reference
            });
            const result = await response.data;
            if (result.status) {
                const { authorization_url } = result;
                await Swal.fire({
                    title: "Success",
                    text:"Redirection in progress ...",
                    icon:"success"
                })
                setTimeout(() => {
                    window.location.assign(authorization_url);
                }, 3000);
            }
            return result;
        } catch (error) {
            await Swal.fire({
                title: "Error",
                text: "Quick payment error occured",
                icon: "error"
            })
            console.log(error);
        }
    }
    const getOrderById = (orderId) => {
        return orders.find(
            (order) => order.orderId === orderId
        )
    }

    const updateOrderStatus = (orderId, status) => {
        setOrders((currentOrders) =>
            currentOrders.map((order) =>
                order._id === orderId
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
                orderCount,
                initializePayment
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