const products = [
    {
        id: 'prod-001',
        name: 'iPhone 15 Pro',
        slug: 'iphone-15-pro',
        description: 'Apple iPhone 15 Pro with titanium design and advanced camera system.',
        price: 1250000,
        oldPrice: 1350000,
        image: 'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800',
        images: [
            'https://images.unsplash.com/photo-1696446701796-da61225697cc?w=800',
            'https://images.unsplash.com/photo-1592286927505-2fd0d8a2e6b7?w=800'
        ],
        category: 'Phones & Tablets',
        categorySlug: 'phones-tablets',
        store: 'Tech Haven',
        storeSlug: 'tech-haven',
        rating: 4.8,
        reviews: 124,
        stock: 18,
        featured: true
    },

    {
        id: 'prod-002',
        name: 'Nike Air Max 270',
        slug: 'nike-air-max-270',
        description: 'Comfortable Nike Air Max sneakers designed for everyday wear.',
        price: 145000,
        oldPrice: 175000,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800',
        images: [
            'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800'
        ],
        category: 'Fashion',
        categorySlug: 'fashion',
        store: 'Urban Wear',
        storeSlug: 'urban-wear',
        rating: 4.6,
        reviews: 89,
        stock: 32,
        featured: true
    },

    {
        id: 'prod-003',
        name: 'Leather Backpack',
        slug: 'leather-backpack',
        description: 'Premium leather backpack suitable for work, school and travel.',
        price: 85000,
        oldPrice: 105000,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800',
        images: [
            'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800'
        ],
        category: 'Fashion',
        categorySlug: 'fashion',
        store: 'Urban Wear',
        storeSlug: 'urban-wear',
        rating: 4.5,
        reviews: 57,
        stock: 24,
        featured: false
    },

    {
        id: 'prod-004',
        name: 'Sony WH-1000XM5',
        slug: 'sony-wh-1000xm5',
        description: 'Premium wireless noise cancelling headphones.',
        price: 520000,
        oldPrice: 580000,
        image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800',
        images: [
            'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800'
        ],
        category: 'Electronics',
        categorySlug: 'electronics',
        store: 'Tech Haven',
        storeSlug: 'tech-haven',
        rating: 4.9,
        reviews: 203,
        stock: 15,
        featured: true
    },

    {
        id: 'prod-005',
        name: 'MacBook Air M3',
        slug: 'macbook-air-m3',
        description: 'Apple MacBook Air powered by the M3 chip.',
        price: 1850000,
        oldPrice: 1950000,
        image: 'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800',
        images: [
            'https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800'
        ],
        category: 'Computers',
        categorySlug: 'computers',
        store: 'Tech Haven',
        storeSlug: 'tech-haven',
        rating: 4.9,
        reviews: 156,
        stock: 9,
        featured: true
    },

    {
        id: 'prod-006',
        name: 'Modern Lounge Chair',
        slug: 'modern-lounge-chair',
        description: 'Stylish modern chair designed for comfortable home living.',
        price: 285000,
        oldPrice: 330000,
        image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800',
        images: [
            'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'
        ],
        category: 'Home & Living',
        categorySlug: 'home-living',
        store: 'Home Essentials',
        storeSlug: 'home-essentials',
        rating: 4.4,
        reviews: 42,
        stock: 11,
        featured: false
    },

    {
        id: 'prod-007',
        name: 'Smart LED TV 55"',
        slug: 'smart-led-tv-55',
        description: '55-inch smart LED television with 4K display.',
        price: 680000,
        oldPrice: 750000,
        image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800',
        images: [
            'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=800'
        ],
        category: 'Electronics',
        categorySlug: 'electronics',
        store: 'Tech Haven',
        storeSlug: 'tech-haven',
        rating: 4.7,
        reviews: 74,
        stock: 13,
        featured: true
    },

    {
        id: 'prod-008',
        name: 'Organic Skincare Set',
        slug: 'organic-skincare-set',
        description: 'Complete daily skincare set made with natural ingredients.',
        price: 65000,
        oldPrice: 80000,
        image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800',
        images: [
            'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800'
        ],
        category: 'Beauty',
        categorySlug: 'beauty',
        store: 'Glow Store',
        storeSlug: 'glow-store',
        rating: 4.6,
        reviews: 68,
        stock: 29,
        featured: false
    },

    {
        id: 'prod-009',
        name: 'Premium Running Shoes',
        slug: 'premium-running-shoes',
        description: 'Lightweight running shoes built for training and everyday fitness.',
        price: 125000,
        oldPrice: 150000,
        image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800',
        images: [
            'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800'
        ],
        category: 'Sports',
        categorySlug: 'sports',
        store: 'Fit Zone',
        storeSlug: 'fit-zone',
        rating: 4.5,
        reviews: 51,
        stock: 21,
        featured: false
    },

    {
        id: 'prod-010',
        name: 'Wireless Tablet',
        slug: 'wireless-tablet',
        description: 'Portable tablet suitable for work, entertainment and study.',
        price: 390000,
        oldPrice: 450000,
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
        images: [
            'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800'
        ],
        category: 'Phones & Tablets',
        categorySlug: 'phones-tablets',
        store: 'Tech Haven',
        storeSlug: 'tech-haven',
        rating: 4.4,
        reviews: 63,
        stock: 17,
        featured: false
    },

    {
        id: 'prod-011',
        name: 'Car Dashboard Camera',
        slug: 'car-dashboard-camera',
        description: 'Compact dashboard camera for recording your journeys.',
        price: 95000,
        oldPrice: 120000,
        image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800',
        images: [
            'https://images.unsplash.com/photo-1493238792000-8113da705763?w=800'
        ],
        category: 'Automotive',
        categorySlug: 'automotive',
        store: 'Auto Hub',
        storeSlug: 'auto-hub',
        rating: 4.3,
        reviews: 37,
        stock: 26,
        featured: false
    },

    {
        id: 'prod-012',
        name: 'Educational Building Blocks',
        slug: 'educational-building-blocks',
        description: 'Creative building blocks designed for learning and play.',
        price: 35000,
        oldPrice: 45000,
        image: 'https://images.unsplash.com/photo-1594784054195-8f4f2b4a2f8d?w=800',
        images: [
            'https://images.unsplash.com/photo-1594784054195-8f4f2b4a2f8d?w=800'
        ],
        category: 'Kids',
        categorySlug: 'kids',
        store: 'Little World',
        storeSlug: 'little-world',
        rating: 4.7,
        reviews: 29,
        stock: 40,
        featured: false
    },

    {
        id: 'prod-013',
        name: 'JavaScript Programming Book',
        slug: 'javascript-programming-book',
        description: 'A practical programming book for learning modern JavaScript.',
        price: 28000,
        oldPrice: 35000,
        image: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800',
        images: [
            'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800'
        ],
        category: 'Books',
        categorySlug: 'books',
        store: 'Book Corner',
        storeSlug: 'book-corner',
        rating: 4.8,
        reviews: 44,
        stock: 35,
        featured: true
    },

    {
        id: 'prod-014',
        name: 'Premium Grocery Basket',
        slug: 'premium-grocery-basket',
        description: 'A collection of everyday grocery essentials.',
        price: 75000,
        oldPrice: 85000,
        image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
        images: [
            'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800'
        ],
        category: 'Groceries',
        categorySlug: 'groceries',
        store: 'Fresh Market',
        storeSlug: 'fresh-market',
        rating: 4.5,
        reviews: 32,
        stock: 18,
        featured: false
    },

    {
        id: 'prod-015',
        name: 'Everyday Essentials Bundle',
        slug: 'everyday-essentials-bundle',
        description: 'Useful everyday products bundled into one convenient package.',
        price: 45000,
        oldPrice: 55000,
        image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
        images: [
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800'
        ],
        category: 'Others',
        categorySlug: 'others',
        store: 'Daily Needs',
        storeSlug: 'daily-needs',
        rating: 4.2,
        reviews: 18,
        stock: 50,
        featured: false
    }
]
export const getProductById = (id) => {
    return products.find((product) => product.id === id)
}

export const getProductBySlug = (slug) => {
    return products.find((product) => product.slug === slug)
}

export const getProductsByCategory = (categorySlug) => {
    return products.filter(
        (product) => product.categorySlug === categorySlug
    )
}

export const getFeaturedProducts = () => {
    return products.filter((product) => product.featured)
}
export default products