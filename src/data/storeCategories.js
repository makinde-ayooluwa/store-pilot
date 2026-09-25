import {
    MdLaptop,
    MdShoppingBag,
    MdHome,
    MdLocalGroceryStore,
    MdCategory,
    MdDirectionsCar,
    MdMenuBook,
    MdChildCare,
    MdSportsSoccer,
    MdFace
} from 'react-icons/md'

const sellerCategories = [
    {
        id: 'cat-001',
        name: 'Electronics',
        slug: 'electronics',
        description: 'Phones, laptops, accessories and electronic devices',
        icon: MdLaptop,
        image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800',
    },
    {
        id: 'cat-002',
        name: 'Fashion',
        slug: 'fashion',
        description: 'Clothing, shoes, bags and fashion accessories',
        icon: MdShoppingBag,
        image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800',
    },
    {
        id: 'cat-003',
        name: 'Home & Living',
        slug: 'home-living',
        description: 'Furniture, decor and home essentials',
        icon: MdHome,
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800',
    },
    {
        id: 'cat-004',
        name: 'Groceries',
        slug: 'groceries',
        description: 'Food, drinks and everyday essentials',
        icon: MdLocalGroceryStore,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    },
    {
        id: 'cat-005',
        name: 'Beauty',
        slug: 'beauty',
        description: 'Beauty, skincare and personal care products',
        icon: MdFace,
        image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800',
    },
    {
        id: 'cat-006',
        name: 'Sports',
        slug: 'sports',
        description: 'Fitness, sportswear and sporting equipment',
        icon: MdSportsSoccer,
        image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800',
    },
    {
        id: 'cat-007',
        name: 'Computers',
        slug: 'computers',
        description: 'PCs, components and computer accessories',
        icon: MdLaptop,
        image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    },
    {
        id: 'cat-008',
        name: 'Phones & Tablets',
        slug: 'phones-tablets',
        description: 'Smartphones, tablets and mobile accessories',
        icon: MdLaptop,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    },
    {
        id: 'cat-009',
        name: 'Automotive',
        slug: 'automotive',
        description: 'Car accessories, parts and automotive tools',
        icon: MdDirectionsCar,
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800',
    },
    {
        id: 'cat-010',
        name: 'Kids',
        slug: 'kids',
        description: 'Toys, clothing and kids essentials',
        icon: MdChildCare,
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=800',
    },
    {
        id: 'cat-011',
        name: 'Books',
        slug: 'books',
        description: 'Books, educational materials and stationery',
        icon: MdMenuBook,
        image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800',
    },
    {
        id: 'cat-012',
        name: 'Others',
        slug: 'others',
        description: 'Explore more products and services',
        icon: MdCategory,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
    }
]
export const getCategoryBySlug = (slug) => {
    return sellerCategories.find((category) => category.slug === slug)
}
export default sellerCategories