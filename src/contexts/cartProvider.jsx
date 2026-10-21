
import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react';

import { useUser } from './userProvider';
import axios from 'axios';
import { backendUrl } from '../data/constants';

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);
    const [cartChange, setCartChange] = useState(0);

    const { data } = useUser();
    const userId = data?._id;

    // Fetch the latest cart from the backend
    const checkCart = useCallback(async () => {
        if (!userId) {
            setCartItems([]);
            return;
        }

        try {
            const response = await axios.post(
                `${backendUrl}/cart/get`,
                { user: userId }
            );

            const result = response.data;

            if (result.status) {
                // Keep all product fields returned by the backend,
                // including deliveryPricing.
                setCartItems(result.data.items || []);
            } else {
                setCartItems([]);
                console.log(
                    'CART FETCHING MESSAGE',
                    result.message
                );
            }
        } catch (error) {
            console.log(
                'Error occurred while fetching cart',
                error
            );
        }
    }, [userId]);

    useEffect(() => {
        checkCart();
    }, [checkCart, cartChange]);

    // Add a product to the cart
    const addToCart = async (product, quantity = 1) => {
        if (!userId) {
            return {
                status: false,
                message: 'Please log in before adding products to your cart.'
            };
        }

        try {
            const response = await axios.post(
                `${backendUrl}/cart/add`,
                {
                    user: userId,
                    item: {
                        ...product,
                        quantity,
                    },                    
                }
            );

            const result = response.data;

            if (result.status) {
                setCartChange(prev => prev + 1);
            }

            return result;
        } catch (error) {
            return {
                status: false,
                error
            };
        }
    };

    // Update a product quantity without mutating React state
    const updateQuantity = async (productId, quantity) => {
        if (!userId) {
            return { status: false, message: 'User not found.' };
        }

        if (quantity <= 0) {
            return removeFromCart(productId);
        }

        const updatedItems = cartItems.map(item =>
            String(item._id) === String(productId)
                ? { ...item, quantity }
                : item
        );

        try {
            const response = await axios.post(
                `${backendUrl}/cart/update-quantity`,
                {
                    user: userId,
                    items: updatedItems
                }
            );

            const result = response.data;

            if (result.status) {
                setCartItems(updatedItems);
                setCartChange(prev => prev + 1);
            }

            return result;
        } catch (error) {
            return {
                status: false,
                error
            };
        }
    };

    // Remove a product from the cart
    const removeFromCart = async (productId) => {
        if (!userId) {
            return { status: false, message: 'User not found.' };
        }

        try {
            const response = await axios.post(
                `${backendUrl}/cart/remove`,
                {
                    user: userId,
                    productId
                }
            );

            const result = response.data;

            if (result.status) {
                setCartItems(prev =>
                    prev.filter(
                        item =>
                            String(item._id) !== String(productId)
                    )
                );

                setCartChange(prev => prev + 1);
            }

            return result;
        } catch (error) {
            return {
                status: false,
                error
            };
        }
    };

    // Clear the cart
    const clearCart = async () => {
        if (!userId) {
            return { status: false, message: 'User not found.' };
        }

        try {
            const response = await axios.post(
                `${backendUrl}/cart/clear`,
                { user: userId }
            );

            const result = response.data;

            if (result.status) {
                setCartItems([]);
                setCartChange(prev => prev + 1);
            }

            return result;
        } catch (error) {
            return {
                status: false,
                error
            };
        }
    };

    // Total number of individual products
    const cartCount = useMemo(() => {
        return cartItems.reduce(
            (total, item) => total + Number(item.quantity || 0),
            0
        );
    }, [cartItems]);

    // Total product price before delivery and processing fees
    const cartTotal = useMemo(() => {
        return cartItems.reduce(
            (total, item) =>
                total +
                Number(item.price || 0) *
                Number(item.quantity || 0),
            0
        );
    }, [cartItems]);

    const value = {
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartTotal
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error(
            'useCart must be used inside CartProvider'
        );
    }

    return context;
}
