import { createContext, useContext, useEffect, useState } from "react";
import { MdCategory, MdHome, MdLaptop, MdLocalGroceryStore, MdShoppingBag } from "react-icons/md";

import axios from "axios";
import { backendUrl } from "../data/constants";
import Loading from "../components/loading";
import Swal from "sweetalert2";
export const ResourceContext = createContext()
export const ResourceProvider = ({ children }) => {
    const [stores, setStores] = useState([]);
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(() => {
        initialize();
    }, [])
    function initialize() {
        checkCategories();
        checkProducts();
        checkStores();
    }
    const checkCategories = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${backendUrl}/categories/all`);
            const result = response.data;

            console.log("CATEGORIES RESULT", result);

            const categories = Array.isArray(result?.data)
                ? result.data
                : Array.isArray(result)
                    ? result
                    : [];

            const updatedCategories = categories.map((category) => {
                let image = category.image;

                if (image) {
                    // Already a full URL
                    try {
                        new URL(image);
                    } catch {
                        // Local/backend path
                        image = `${backendUrl}/${image.replace(/\\/g, "/")}`;
                    }
                }

                return {
                    ...category,
                    image
                };
            });

            setCategories(updatedCategories);

            console.log("UPDATED CATEGORIES", updatedCategories);

        } catch (error) {
            setError(true);
            console.log(
                "ERROR OCCURED WHILE FETCHING CATEGORIES",
                error
            );
        }
        finally {
            setLoading(false);
        }
    };
    const formatImageUrl = (url) => {
        if (!url) return url;
        if (url.startsWith("http://") || url.startsWith("https://")) return url; // Already full URL

        const cleanBase = backendUrl.replace(/\/$/, "");
        const cleanPath = url.replace(/^\//, "");
        return `${cleanBase}/${cleanPath}`;
    };

    const checkProducts = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${backendUrl}/products/all`);
            const result = response.data;

            // Ensure result.data is an array (or wrap a single object in an array)
            const rawData = Array.isArray(result.data)
                ? result.data
                : result.data
                    ? [result.data]
                    : [];

            // 1. Filter to include ONLY active products
            const activeProducts = rawData.filter(
                (product) => product.status === "active" || product.status === true
            );

            // 2. Format image URLs for the active products
            const updatedProducts = activeProducts.map((product) => ({
                ...product,
                image: product.image ? `${backendUrl}/${product.image}` : product.image,
                images: Array.isArray(product.images)
                    ? product.images.map((img) => `${backendUrl}/${img}`)
                    : product.images
            }));

            setProducts(updatedProducts);
        } catch (error) {
            setError(true);
            console.log("ERROR OCCURRED WHILE FETCHING PRODUCTS", error);
        }
        finally {
            setLoading(false)
        }
    };
    const getImageUrl = (image) => {
        if (image == undefined) return null;

        // // Convert Windows path separators to URL separators
        // const normalizedImage = image.replace(/\\/g, "/");

        // // Already a full URL
        // if (
        //     normalizedImage.startsWith("http://") ||
        //     normalizedImage.startsWith("https://")
        // ) {
        //     return normalizedImage;
        // }

        return `${backendUrl}/${image}`;
    };

    const checkStores = async () => {
        try {
            setLoading(true);
            setError(false);
            const response = await axios.post(`${backendUrl}/store/all`);

            const result = response.data;

            console.log("STORES RESULT", result);

            const rawStores = Array.isArray(result) ? result : [];

            const updatedStores = rawStores.map((store) => ({
                ...store,

                logo: getImageUrl(store.logo),

                banner: getImageUrl(store.banner),

                // images: Array.isArray(store.images)
                //     ? store.images.map(getImageUrl)
                //     : store.images
            }));

            console.log("UPDATED STORES", updatedStores);

            setStores(updatedStores);

        } catch (error) {
            setError(true);
            console.error(
                "ERROR OCCURRED WHILE FETCHING STORES:",
                error.response?.data || error
            );
        }
        finally {
            setLoading(false)
        }
    };
    const getProductsByCategory = (categorySlug) => {
        return products.filter(
            (product) => product.category === categorySlug
        )
    }
    const getStoreBySlug = (slug) =>
        stores.find((store) => store.slug === slug)

    const getCategoryBySlug = (slug) => {
        try {
            const result = categories.find(
                (category) => category.slug === slug
            );

            if (!result) {
                console.log("Category not found:", slug);
                return null;
            }

            console.log("CATEGORY DETAILS:", result);
            return result;

        } catch (error) {
            console.error("Error getting category:", error);
            return null;
        }
    };

// if(!loading && error){
// Swal.fire({
//     title: "Error",
//     text: "Failed to load products and stores",
//     icon: "error",
// })
// }
    return <ResourceContext.Provider value={{ products, stores, getProductsByCategory, getCategoryBySlug, getStoreBySlug, categories }}>
        {/* {loading && <Loading page={"homepage"} />}
        {!loading && children} */}
        {children}
    </ResourceContext.Provider>
}
export const useResource = () => {
    return useContext(ResourceContext);
}