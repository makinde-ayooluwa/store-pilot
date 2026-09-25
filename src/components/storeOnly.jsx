import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../contexts/storeProvider';

const StoreOnly = ({ children }) => {
    const navigate = useNavigate();
    const { store, storeData } = useStore();
    console.log("FROM STORE ONLY", storeData)
    useEffect(() => {
        if (!store) {
            navigate('/login', { replace: true });
        }
    }, [store, navigate]);
    if (!storeData) {
        return <h1>Loading...</h1>
    }
    return children;
};

export default StoreOnly;