import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useUser } from './userProvider'
import axios from 'axios';
import { backendUrl } from '../data/constants';

const CartContext = createContext()

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([])
    const { user, data } = useUser();
    const checkCart = useCallback(async () => {
        try {
            const response = await axios.post(`${backendUrl}/cart/get`, { user: data._id })
            const result = response.data;
            if (result.status) {
                setCartItems(result.data.items)
                console.log("CART FETCHING MESSAGE", result.message)
                console.log("CART", result.data.items)
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
    }, [checkCart])
    const addToCart = (product, quantity = 1) => {
        setCartItems((currentItems) => {
            const existingItem = currentItems.find(
                (item) => item.id === product.id
            )

            if (existingItem) {
                return currentItems.map((item) =>
                    item.id === product.id
                        ? {
                            ...item,
                            quantity: item.quantity + quantity
                        }
                        : item
                )
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantity
                }
            ]
        })
    }

    const updateQuantity = (productId, quantity) => {
        if (quantity <= 0) {
            removeFromCart(productId)
            return
        }

        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId
                    ? {
                        ...item,
                        quantity
                    }
                    : item
            )
        )
    }

    const removeFromCart = (productId) => {
        setCartItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId)
        )
    }

    const clearCart = () => {
        setCartItems([])
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