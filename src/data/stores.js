const stores = [
    {
        id: 'store-001',
        name: 'Tech Haven',
        slug: 'tech-haven',
        description:
            'Your trusted destination for smartphones, laptops, electronics and accessories.',
        logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200',
        cover:
            'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200',
        category: 'Electronics',
        categorySlug: 'electronics',
        location: 'Lagos, Nigeria',
        rating: 4.8,
        reviews: 342,
        productsCount: 128,
        verified: true,
        featured: true
    },

    {
        id: 'store-002',
        name: 'Urban Wear',
        slug: 'urban-wear',
        description:
            'Modern fashion, footwear, bags and accessories for everyday style.',
        logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200',
        cover:
            'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
        category: 'Fashion',
        categorySlug: 'fashion',
        location: 'Lagos, Nigeria',
        rating: 4.6,
        reviews: 218,
        productsCount: 246,
        verified: true,
        featured: true
    },

    {
        id: 'store-003',
        name: 'Home Essentials',
        slug: 'home-essentials',
        description:
            'Furniture, home decor and everyday essentials for beautiful spaces.',
        logo: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200',
        cover:
            'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200',
        category: 'Home & Living',
        categorySlug: 'home-living',
        location: 'Abuja, Nigeria',
        rating: 4.5,
        reviews: 167,
        productsCount: 184,
        verified: true,
        featured: false
    },

    {
        id: 'store-004',
        name: 'Fresh Market',
        slug: 'fresh-market',
        description:
            'Fresh groceries, food items and everyday household essentials.',
        logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200',
        cover:
            'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200',
        category: 'Groceries',
        categorySlug: 'groceries',
        location: 'Port Harcourt, Nigeria',
        rating: 4.7,
        reviews: 193,
        productsCount: 312,
        verified: true,
        featured: true
    },

    {
        id: 'store-005',
        name: 'Glow Store',
        slug: 'glow-store',
        description:
            'Skincare, beauty products and personal care essentials.',
        logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200',
        cover:
            'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=1200',
        category: 'Beauty',
        categorySlug: 'beauty',
        location: 'Lagos, Nigeria',
        rating: 4.6,
        reviews: 154,
        productsCount: 156,
        verified: true,
        featured: false
    },

    {
        id: 'store-006',
        name: 'Fit Zone',
        slug: 'fit-zone',
        description:
            'Sportswear, fitness equipment and products for active lifestyles.',
        logo: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=200',
        cover:
            'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1200',
        category: 'Sports',
        categorySlug: 'sports',
        location: 'Ibadan, Nigeria',
        rating: 4.5,
        reviews: 98,
        productsCount: 97,
        verified: true,
        featured: false
    },

    {
        id: 'store-007',
        name: 'Auto Hub',
        slug: 'auto-hub',
        description:
            'Car accessories, parts, tools and automotive products.',
        logo: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=200',
        cover:
            'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200',
        category: 'Automotive',
        categorySlug: 'automotive',
        location: 'Lagos, Nigeria',
        rating: 4.4,
        reviews: 76,
        productsCount: 86,
        verified: true,
        featured: false
    },

    {
        id: 'store-008',
        name: 'Book Corner',
        slug: 'book-corner',
        description:
            'Books, educational materials, stationery and learning resources.',
        logo: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=200',
        cover:
            'https://images.unsplash.com/photo-1526243741027-444d633d7365?w=1200',
        category: 'Books',
        categorySlug: 'books',
        location: 'Enugu, Nigeria',
        rating: 4.8,
        reviews: 121,
        productsCount: 74,
        verified: true,
        featured: true
    },

    {
        id: 'store-009',
        name: 'Little World',
        slug: 'little-world',
        description:
            'Toys, kids clothing, educational products and children essentials.',
        logo: 'https://images.unsplash.com/photo-1594784054195-8f4f2b4a2f8d?w=200',
        cover:
            'https://images.unsplash.com/photo-1596464716127-f2a82984de30?w=1200',
        category: 'Kids',
        categorySlug: 'kids',
        location: 'Lagos, Nigeria',
        rating: 4.7,
        reviews: 83,
        productsCount: 119,
        verified: true,
        featured: false
    },

    {
        id: 'store-010',
        name: 'Daily Needs',
        slug: 'daily-needs',
        description:
            'Convenient everyday products for homes, offices and businesses.',
        logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=200',
        cover:
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200',
        category: 'Others',
        categorySlug: 'others',
        location: 'Benin City, Nigeria',
        rating: 4.3,
        reviews: 61,
        productsCount: 205,
        verified: true,
        featured: false
    }
]

export default stores

export const getStoreBySlug = (slug) => {
    return stores.find((store) => store.slug === slug)
}

export const getStoreById = (id) => {
    return stores.find((store) => store.id === id)
}

export const getFeaturedStores = () => {
    return stores.filter((store) => store.featured)
}

export const getStoresByCategory = (categorySlug) => {
    return stores.filter(
        (store) => store.categorySlug === categorySlug
    )
}