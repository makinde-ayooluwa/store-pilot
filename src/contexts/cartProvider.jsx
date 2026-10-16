import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useUser } from './userProvider'
import axios from 'axios';
import { backendUrl } from '../data/constants';

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const { user, data } = useUser();
    const [cartChange, setCartChange] = useState(0)
    const checkCart = useCallback(async () => {
        try {
            const response = await axios.post(`${backendUrl}/cart/get`, { user: data._id })
            const result = response.data;
            if (result.status) {
                setCartItems(result.data.items)
            } else {
                setCartItems([]);
                console.log("CART FETCHING MESSAGE", result.message)
            }
        } catch (error) {
            console.log("Error occured while fetching cart", error)
        }
    }, [user, cartItems])
    useEffect(() => {
        checkCart();
    }, [cartChange, checkCart])
    const addToCart = async (product, quantity = 1) => {
        try {
            console.log(product)
            const response = await axios.post(`${backendUrl}/cart/add`, {
                user: data._id,
                item: {
                    ...product,
                    quantity
                }
            });
            const result = response.data;
            return result;
        } catch (error) {
            return {
                status: false,
                error
            }
        }
    }

    const updateQuantity = async(productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }
        const updated = cartItems.find((x)=>x._id == productId);
        if(updated){
            updated.quantity = quantity;
        }
        const response = await axios.post(`${backendUrl}/cart/update-quantity`, {user: data._id, items: cartItems})
        const result = response.data;
        console.log(result)
        return result;
    }

    const removeFromCart = async(productId) => {
        const response = await axios.post(`${backendUrl}/cart/remove`,{user: data._id, productId})
        const result = response.data;
        return result;
    }

    const clearCart = async() => {
        const response = await axios.post(`${backendUrl}/cart/clear`,{user: data._id})
        const result = response.data;
        return result;
    }

    const cartCount = useMemo(() => {
        return cartItems.length > 0 && cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        )
    }, [cartItems])

    const cartTotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )
    }, [cartItems])

    const value = {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)

    if (!context) {
        throw new Error(
            'useCart must be used inside CartProvider'
        )
    }

    return context
}