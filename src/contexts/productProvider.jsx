import { createContext, useContext } from "react";
import { MdCategory, MdHome, MdLaptop, MdLocalGroceryStore, MdShoppingBag } from "react-icons/md";

import categories, {
    getCategoryBySlug
} from '../data/categories'
import products, {
    getProductsByCategory
} from '../data/products'
import stores from "../data/stores";
export const ProductContext = createContext()
export const ProductProvider = ({ children }) => {
    // const categories = [
    //     {
    //         id: 1,
    //         image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
    //         name: 'Electronics',
    //         slug: 'electronics',
    //         description: 'Phones, laptops, accessories and more',
    //         icon: MdLaptop,
    //         count: 128
    //     },
    //     {
    //         id: 2,
    //         name: 'Fashion',
    //         image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
    //         slug: 'fashion',
    //         description: 'Clothing, shoes, bags and accessories',
    //         icon: MdShoppingBag,
    //         count: 246
    //     },
    //     {
    //         id: 3,
    //         name: 'Home & Living',
    //         slug: 'home-living',
    //         image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    //         description: 'Furniture, decor and home essentials',
    //         icon: MdHome,
    //         count: 184
    //     },
    //     {
    //         id: 4,
    //         name: 'Groceries',
    //         slug: 'groceries',
    //         description: 'Food, drinks and everyday essentials',
    //         icon: MdLocalGroceryStore,
    //         count: 312
    //     },
    //     {
    //         id: 5,
    //         name: 'Beauty',
    //         slug: 'beauty',
    //         image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    //         description: 'Beauty, skincare and personal care',
    //         icon: MdShoppingBag,
    //         count: 156
    //     },
    //     {
    //         id: 6,
    //         name: 'Sports',
    //         slug: 'sports',
    //         description: 'Fitness, sportswear and equipment',
    //         icon: MdShoppingBag,
    //         count: 97
    //     },
    //     {
    //         id: 7,
    //         name: 'Computers',
    //         slug: 'computers',
    //         image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    //         description: 'PCs, components and computer accessories',
    //         icon: MdLaptop,
    //         count: 143
    //     },
    //     {
    //         id: 8,
    //         name: 'Phones & Tablets',
    //         slug: 'phones-tablets',
    //         image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    //         description: 'Smartphones, tablets and accessories',
    //         icon: MdLaptop,
    //         count: 221
    //     },
    //     {
    //         id: 9,
    //         name: 'Automotive',
    //         slug: 'automotive',
    //         description: 'Car accessories, parts and tools',
    //         icon: MdShoppingBag,
    //         count: 86
    //     },
    //     {
    //         id: 10,
    //         name: 'Kids',
    //         slug: 'kids',
    //         description: 'Toys, clothing and kids essentials',
    //         icon: MdShoppingBag,
    //         count: 119
    //     },
    //     {
    //         id: 11,
    //         name: 'Books',
    //         slug: 'books',
    //         description: 'Books, educational materials and stationery',
    //         icon: MdShoppingBag,
    //         count: 74
    //     },
    //     {
    //         id: 12,
    //         name: 'Others',
    //         slug: 'others',
    //         description: 'Explore more products and services',
    //         icon: MdCategory,
    //         count: 205
    //     }
    // ]
    // // const categories = [
    // //     {
    // //         name: 'Electronics',
    // //         image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?auto=format&fit=crop&w=600&q=80',
    // //         count: 122
    // //     },
    // //     {
    // //         name: 'Fashion',
    // //         image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=600&q=80',
    // //         count: 122
    // //     },
    // //     {
    // //         name: 'Beauty',
    // //         image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=600&q=80',
    // //         count: 122
    // //     },
    // //     {
    // //         name: 'Home & Kitchen',
    // //         image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
    // //         count: 122
    // //     },
    // //     {
    // //         name: 'Accessories',
    // //         image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=600&q=80',
    // //         count: 122
    // //     },
    // //     {
    // //         name: 'Phones',
    // //         image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80',
    // //         count: 122
    // //     }
    // // ]
    // const products = [
    //     {
    //         id: 1,
    //         name: 'iPhone 15 Pro',
    //         store: 'TechHub Store',
    //         storeSlug: 'techhub-store',
    //         category: 'Phones',
    //         price: 1250000,
    //         oldPrice: 1350000,
    //         rating: 4.9,
    //         reviews: 124,
    //         stock: 12,
    //         badge: 'Popular',
    //         description:
    //             'Experience powerful performance, an advanced camera system and a premium titanium design with the iPhone 15 Pro.',
    //         images: [
    //             'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1695048133194-0f4e7b1b9b75?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: 'Nike Air Max 270',
    //         store: 'Urban Fits',
    //         storeSlug: 'urban-fits',
    //         category: 'Fashion',
    //         price: 85000,
    //         oldPrice: 100000,
    //         rating: 4.8,
    //         reviews: 89,
    //         stock: 24,
    //         badge: 'Sale',
    //         description:
    //             'A comfortable everyday sneaker with a bold design, lightweight construction and responsive cushioning.',
    //         images: [
    //             'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 3,
    //         name: 'Sony WH-1000XM5',
    //         store: 'TechHub Store',
    //         storeSlug: 'techhub-store',
    //         category: 'Electronics',
    //         price: 420000,
    //         oldPrice: 450000,
    //         rating: 4.9,
    //         reviews: 76,
    //         stock: 8,
    //         badge: 'Top Rated',
    //         description:
    //             'Premium wireless headphones with immersive sound, active noise cancellation and all-day comfort.',
    //         images: [
    //             'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 4,
    //         name: 'Leather Backpack',
    //         store: 'Urban Fits',
    //         storeSlug: 'urban-fits',
    //         category: 'Accessories',
    //         price: 45000,
    //         oldPrice: null,
    //         rating: 4.6,
    //         reviews: 52,
    //         stock: 31,
    //         badge: null,
    //         description:
    //             'A stylish and durable leather backpack designed for everyday work, school and travel.',
    //         images: [
    //             'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1581605405669-fcdf81165afa?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 5,
    //         name: 'Smart LED TV 55"',
    //         store: 'Home Space',
    //         storeSlug: 'home-space',
    //         category: 'Electronics',
    //         price: 680000,
    //         oldPrice: 750000,
    //         rating: 4.7,
    //         reviews: 63,
    //         stock: 6,
    //         badge: 'Sale',
    //         description:
    //             'Enjoy a vivid entertainment experience with a large 55-inch smart LED display and modern connectivity.',
    //         images: [
    //             'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1593784991095-a205069470b6?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1601944177325-f8867652837f?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 6,
    //         name: 'Air Fryer 5.5L',
    //         store: 'Home Space',
    //         storeSlug: 'home-space',
    //         category: 'Home & Kitchen',
    //         price: 95000,
    //         oldPrice: 110000,
    //         rating: 4.7,
    //         reviews: 48,
    //         stock: 15,
    //         badge: 'Deal',
    //         description:
    //             'Prepare crispy meals with less oil using this convenient 5.5L air fryer for everyday cooking.',
    //         images: [
    //             'https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1648135370836-0b2a6e9fba7e?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 7,
    //         name: 'Premium Face Serum',
    //         store: 'Glow Beauty',
    //         storeSlug: 'glow-beauty',
    //         category: 'Beauty',
    //         price: 32000,
    //         oldPrice: 38000,
    //         rating: 4.8,
    //         reviews: 71,
    //         stock: 18,
    //         badge: 'Popular',
    //         description:
    //             'A lightweight beauty serum designed to fit easily into your everyday skincare routine.',
    //         images: [
    //             'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 8,
    //         name: 'Classic Wrist Watch',
    //         store: 'Urban Fits',
    //         storeSlug: 'urban-fits',
    //         category: 'Accessories',
    //         price: 65000,
    //         oldPrice: 80000,
    //         rating: 4.6,
    //         reviews: 39,
    //         stock: 10,
    //         badge: 'Sale',
    //         description:
    //             'A clean and timeless wrist watch designed to complement both casual and formal outfits.',
    //         images: [
    //             'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1539874754764-5a96559165b0?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 9,
    //         name: 'Samsung Galaxy S24',
    //         store: 'TechHub Store',
    //         storeSlug: 'techhub-store',
    //         category: 'Phones',
    //         price: 980000,
    //         oldPrice: 1050000,
    //         rating: 4.8,
    //         reviews: 96,
    //         stock: 9,
    //         badge: 'New',
    //         description:
    //             'A modern smartphone with a bright display, powerful performance and versatile camera system.',
    //         images: [
    //             'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1706987310265-48a4d5e4b9d1?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 10,
    //         name: 'Minimalist Table Lamp',
    //         store: 'Home Space',
    //         storeSlug: 'home-space',
    //         category: 'Home & Kitchen',
    //         price: 28000,
    //         oldPrice: 35000,
    //         rating: 4.5,
    //         reviews: 28,
    //         stock: 22,
    //         badge: null,
    //         description:
    //             'A simple modern table lamp that adds practical lighting and a clean look to your space.',
    //         images: [
    //             'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1534281304220-7b1d4f5a7d65?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 11,
    //         name: 'Oversized Cotton T-Shirt',
    //         store: 'Urban Fits',
    //         storeSlug: 'urban-fits',
    //         category: 'Fashion',
    //         price: 18000,
    //         oldPrice: 25000,
    //         rating: 4.7,
    //         reviews: 64,
    //         stock: 42,
    //         badge: 'Sale',
    //         description:
    //             'A comfortable cotton t-shirt with a relaxed everyday fit and versatile minimalist style.',
    //         images: [
    //             'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     },
    //     {
    //         id: 12,
    //         name: 'Wireless Mechanical Keyboard',
    //         store: 'TechHub Store',
    //         storeSlug: 'techhub-store',
    //         category: 'Electronics',
    //         price: 78000,
    //         oldPrice: 90000,
    //         rating: 4.8,
    //         reviews: 44,
    //         stock: 14,
    //         badge: 'Popular',
    //         description:
    //             'A wireless mechanical keyboard designed for comfortable typing, productivity and everyday use.',
    //         images: [
    //             'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1000&q=80',
    //             'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1000&q=80'
    //         ]
    //     }
    // ]
    return <ProductContext.Provider value={{ products, stores, getCategoryBySlug, getProductsByCategory, categories }}>
        {children}
    </ProductContext.Provider>
}
export const useProduct = () => {
    return useContext(ProductContext);
}