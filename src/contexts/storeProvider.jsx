import { createContext, useCallback, useContext, useEffect, useState } from "react";
import storeProducts from '../data/storeProducts';
import storeCategories from "../data/storeCategories";
import axios from "axios";
import { backendUrl } from "../data/constants";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [store, setStore] = useState(null);
    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkStore = useCallback(async () => {
        const local = localStorage.getItem("store");
        const session = sessionStorage.getItem("store");
        const storedId = local || session;

        if (storedId) {
            setStore(storedId);
            try {
                // Pass storedId directly instead of the stale 'store' state
                const response = await axios.post(`${backendUrl}/store/getStore`, { id: storedId });
                const result = response.data;

                if (result.status) {
                    setStoreData(result.data[0]);
                } else {
                    setStoreData(null);
                }
            } catch (error) {
                console.error("CHECK STORE ERROR:", error);
                setStoreData(null);
            }
        } else {
            setStore(null);
            setStoreData(null);
        }

        setLoading(false);
    }, []);

    // Run checkStore ONCE on mount
    useEffect(() => {
        checkStore();
    }, [checkStore]);

    const register = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post(`${backendUrl}/store/register`, data);
            const result = response.data;

            if (result.status) {
                localStorage.setItem("store", result.storeId);
                sessionStorage.setItem("store", result.storeId);

                // Update state and refresh store details immediately
                setStore(result.storeId);
                await checkStore();

                return {
                    status: true,
                    message: result.message
                };
            }

            setStore(null);
            setStoreData(null);
            return {
                status: false,
                message: result.message || "Registration failed"
            };
        } catch (error) {
            console.error("REGISTER ERROR:", error);
            return {
                status: false,
                message: error.response?.data?.message || "Server error during registration"
            };
        } finally {
            setLoading(false);
        }
    };
    const addProduct = async (data) => {
        try {
            console.log("ADDING PRODUCT")
            const response = await axios.post(
                `${backendUrl}/products/add`,
                data
            );
// const response = {
//     data:{
//         status: true,
//         message: "Testing"
//     }
// }
            const result = response.data;
            console.log(result)
            return result;
        } catch (error) {
            console.log("FROM STORE PROVIDER",error);
        }
    }
    return (
        <StoreContext.Provider value={{
            products: storeProducts,
            categories: storeCategories,
            register,
            storeData,
            store,
            loading,
            checkStore,
            addProduct
        }}>
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    return useContext(StoreContext);
};