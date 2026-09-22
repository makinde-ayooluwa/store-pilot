const notifications = [
    {
        id: 'not-001',
        type: 'order',
        title: 'Order confirmed',
        message: 'Your order SP-482931 has been confirmed and is being processed.',
        time: '10 minutes ago',
        read: false,
        createdAt: '2026-09-22T09:30:00'
    },
    {
        id: 'not-002',
        type: 'delivery',
        title: 'Order shipped',
        message: 'Your order SP-391204 has been shipped and is on its way.',
        time: '2 hours ago',
        read: false,
        createdAt: '2026-09-22T07:40:00'
    },
    {
        id: 'not-003',
        type: 'promotion',
        title: 'Special offer available',
        message: 'Discover selected products with special prices from our stores.',
        time: 'Yesterday',
        read: true,
        createdAt: '2026-09-21T12:00:00'
    },
    {
        id: 'not-004',
        type: 'payment',
        title: 'Payment successful',
        message: 'Your payment for order SP-275810 was successfully received.',
        time: '2 days ago',
        read: true,
        createdAt: '2026-09-20T15:20:00'
    },
    {
        id: 'not-005',
        type: 'account',
        title: 'Welcome to StorePilot',
        message: 'Your StorePilot account is ready. Start exploring products and stores.',
        time: '3 days ago',
        read: true,
        createdAt: '2026-09-19T09:00:00'
    }
]

export default notifications