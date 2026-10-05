import { createContext, useCallback, useContext, useEffect, useState } from "react";
import storeCategories from "../data/storeCategories";
import axios from "axios";
import { backendUrl } from "../data/constants";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
    const [storeProducts, setStoreProducts] = useState([]);
    const [store, setStore] = useState(null);
    const [storeData, setStoreData] = useState(null);
    const [loading, setLoading] = useState(true);

    // 1. Fetch store metadata from stored ID
    const checkStore = useCallback(async () => {
        const local = localStorage.getItem("store");
        const session = sessionStorage.getItem("store");
        const storedId = local || session;

        if (storedId) {
            setStore(storedId);
            try {
                console.log("CHECKING STORE")
                const response = await axios.post(`${backendUrl}/store/getStore`, { id: storedId });
                const result = response.data;

                if (result.status && result.data?.length > 0) {
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

    // 2. Fetch products whenever storeData changes and contains an _id
    const checkProducts = useCallback(async () => {
        if (!storeData?._id) return;

        try {
            const response = await axios.post(`${backendUrl}/store/getProducts`, { id: storeData._id });
            console.log("RAW BACKEND RESPONSE:", response.data);

            // 1. Safely extract the data payload regardless of key naming
            const payload = response.data?.data || response.data?.products || response.data;

            // 2. Ensure we are strictly working with an Array
            const rawProducts = Array.isArray(payload) ? payload : [];

            // 3. Format image URLs safely
            const updatedProducts = rawProducts.map((prod) => ({
                ...prod,
                image: prod.image ? `${backendUrl}/${prod.image}` : prod.image,
                images: Array.isArray(prod.images)
                    ? prod.images.map((img) => `${backendUrl}/${img}`)
                    : prod.images
            }));

            setStoreProducts(updatedProducts);
            console.log("INSIDE DATA OBJECT:", response.data.data);
            console.log("UPDATED STORE PRODUCTS", updatedProducts)
        } catch (error) {
            console.error("CHECK PRODUCTS ERROR:", error);
        }
    }, [storeData]);

    // Initial store verification on mount
    useEffect(() => {
        checkStore();
    }, [checkStore]);

    // Fetch products once storeData is successfully populated
    useEffect(() => {
        if (storeData?._id) {
            checkProducts();
        }
    }, [storeData, checkProducts]);

    const register = async (data) => {
        try {
            setLoading(true);
            console.log("REGISTERING STORE")
            const response = await axios.post(`${backendUrl}/store/register`, data);
            const result = response.data;

            if (result.status) {
                localStorage.setItem("store", result.storeId);
                sessionStorage.setItem("store", result.storeId);

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
            const response = await axios.post(`${backendUrl}/products/add`, data);
            console.log("PRODUCT RESPONSE:", response.data);

            // Refresh product list after adding a new item
            await checkProducts();

            return response.data;
        } catch (error) {
            console.error("ADD PRODUCT ERROR:", error.response?.data || error);

            return {
                status: false,
                message: error.response?.data?.message || "Failed to add product"
            };
        }
    };
    const editProduct = async (data) => {
        try {
            const response = await axios.post(`${backendUrl}/products/edit`, data);
            console.log("PRODUCT EDIT RESPONSE:", response.data);

            // Refresh product list after editing a new item
            await checkProducts();

            return response.data;
        } catch (error) {
            console.error("EDIT PRODUCT ERROR:", error.response?.data || error);

            return {
                status: false,
                message: error.response?.data?.message || "Failed to edit product"
            };
        }
    }

    const deleteProduct = async(id)=>{
        try {
            const response = await axios.post(`${backendUrl}/products/delete`, {id})
            const result = response.data;
            // Refresh product list after editing a new item
            await checkProducts();

            return result;
        } catch (error) {
            
        }
    }
    return (
        <StoreContext.Provider
            value={{
                products: storeProducts,
                categories: storeCategories,
                register,
                storeData,
                store,
                loading,
                checkStore,
                checkProducts,
                addProduct,
                editProduct,
                 deleteProduct
            }}
        >
            {children}
        </StoreContext.Provider>
    );
};

export const useStore = () => {
    return useContext(StoreContext);
};