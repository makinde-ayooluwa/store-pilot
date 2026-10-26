import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/storeProvider';

const StoreOnly = ({ children }) => {
    const navigate = useNavigate();
    const { store, storeData, loading } = useStore(); // Assuming your context has a 'loading' state

    useEffect(() => {
        // If there is no store ID/token, redirect to login
        if (!store) {
            navigate('/login', { replace: true });
        }
    }, [store, navigate]);

    // If your context provides a loading flag, use it for a cleaner check
    if (loading) {
        return <h1>Loading store...</h1>;
    }

    // If store exists but storeData hasn't arrived yet, show loading
    if (!storeData) {
        return <h1>Loading...</h1>;
    }

    // Render children once everything is ready
    return children;
};

export default StoreOnly;