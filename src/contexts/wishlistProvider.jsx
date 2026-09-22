import React, { createContext, useContext, useMemo, useState } from 'react'

const WishlistContext = createContext(null)

export function WishlistProvider({ children }) {
    const [wishlistItems, setWishlistItems] = useState([])

    const isWishlisted = (productId) => {
        return wishlistItems.some((item) => item.id === productId)
    }

    const toggleWishlist = (product) => {
        setWishlistItems((currentItems) => {
            const exists = currentItems.some((item) => item.id === product.id)

            if (exists) {
                return currentItems.filter((item) => item.id !== product.id)
            }

            return [...currentItems, product]
        })
    }

    const removeFromWishlist = (productId) => {
        setWishlistItems((currentItems) =>
            currentItems.filter((item) => item.id !== productId)
        )
    }

    const clearWishlist = () => {
        setWishlistItems([])
    }

    const wishlistCount = useMemo(
        () => wishlistItems.length,
        [wishlistItems]
    )

    return (
        <WishlistContext.Provider
            value={{
                wishlistItems,
                isWishlisted,
                toggleWishlist,
                removeFromWishlist,
                clearWishlist,
                wishlistCount
            }}
        >
            {children}
        </WishlistContext.Provider>
    )
}

export function useWishlist() {
    const context = useContext(WishlistContext)

    if (!context) {
        throw new Error(
            'useWishlist must be used inside WishlistProvider'
        )
    }

    return context
}