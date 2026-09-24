import React from 'react'
import LOGO2 from "../../assets/images/logo-2.png"
import SellerSidebarNav from '../../components/seller/sellerSidebarNav'

import {
    MdDashboard,
    MdInventory,
    MdShoppingCart,
    MdPeople,
    MdPointOfSale,
    MdReceiptLong,
    MdAccountBalanceWallet,
    MdLocalOffer,
    MdAnalytics,
    MdAssessment,
    MdStore,
    MdGroup,
    MdSettings
} from "react-icons/md"

export default function SellerSidebar({ open, setOpen }) {

    const sidebarNavs = [
    // MAIN
    {
        title: "Dashboard",
        icon: (
            <MdDashboard
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "Overview",
                link: "/seller"
            },
            // {
            //     title: "Statistics",
            //     link: "/seller/statistics"
            // }
        ]
    },

    // STORE
    {
        title: "Products",
        icon: (
            <MdInventory
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "All Products",
                link: "/seller/products"
            },
            {
                title: "Add Product",
                link: "/seller/products/add"
            },
            {
                title: "Categories",
                link: "/seller/products/categories"
            }
        ]
    },

    {
        title: "Inventory",
        icon: (
            <MdInventory
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "Stock Overview",
                link: "/seller/inventory"
            },
            // {
            //     title: "Low Stock",
            //     link: "/seller/inventory/low-stock"
            // },
            // {
            //     title: "Stock History",
            //     link: "/seller/inventory/history"
            // }
        ]
    },

    {
        title: "Orders",
        icon: (
            <MdShoppingCart
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "All Orders",
                link: "/seller/orders"
            },
            // {
            //     title: "Pending",
            //     link: "/seller/orders/pending"
            // },
            // {
            //     title: "Completed",
            //     link: "/seller/orders/completed"
            // }
        ]
    },

    {
        title: "Customers",
        icon: (
            <MdPeople
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: false,
        link: "/seller/customers"
    },

    // SALES
    {
        title: "Sales",
        icon: (
            <MdPointOfSale
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "Sales Overview",
                link: "/seller/sales"
            },
            {
                title: "Sales History",
                link: "/seller/sales/history"
            }
        ]
    },

    {
        title: "Transactions",
        icon: (
            <MdReceiptLong
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: false,
        link: "/seller/transactions"
    },

    {
        title: "Wallet",
        icon: (
            <MdAccountBalanceWallet
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: false,
        link: "/seller/wallet"
    },

    {
        title: "Discounts",
        icon: (
            <MdLocalOffer
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "All Discounts",
                link: "/seller/discounts"
            },
            {
                title: "Create Discount",
                link: "/seller/discounts/create"
            }
        ]
    },

    // ANALYTICS
    {
        title: "Analytics",
        icon: (
            <MdAnalytics
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "Overview",
                link: "/seller/analytics"
            },
            {
                title: "Sales Analytics",
                link: "/seller/analytics/sales"
            },
            {
                title: "Product Analytics",
                link: "/seller/analytics/products"
            }
        ]
    },

    {
        title: "Reports",
        icon: (
            <MdAssessment
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "Sales Report",
                link: "/seller/reports/sales"
            },
            {
                title: "Inventory Report",
                link: "/seller/reports/inventory"
            },
            {
                title: "Customer Report",
                link: "/seller/reports/customers"
            }
        ]
    },

    // MANAGEMENT
    {
        title: "My Store",
        icon: (
            <MdStore
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "Store Profile",
                link: "/seller/store"
            },
            {
                title: "Store Appearance",
                link: "/seller/store/appearance"
            },
            {
                title: "Store Information",
                link: "/seller/store/information"
            }
        ]
    },

    {
        title: "Team",
        icon: (
            <MdGroup
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "Team Members",
                link: "/seller/team"
            },
            {
                title: "Roles & Permissions",
                link: "/seller/team/roles"
            }
        ]
    },

    {
        title: "Settings",
        icon: (
            <MdSettings
                size={20}
                className="text-white/60 group-hover:text-green-400 transition-colors"
            />
        ),
        hasDropdown: true,
        dropdown: [
            {
                title: "General",
                link: "/seller/settings"
            },
            {
                title: "Account",
                link: "/seller/settings/account"
            },
            {
                title: "Notifications",
                link: "/seller/settings/notifications"
            }
        ]
    }
]
    return (
        <aside
            className={`
        bg-green-950 text-white
        h-screen
        sticky top-0
        w-[280px]

        max-lg:fixed
        max-lg:left-0
        max-lg:z-50
        max-lg:transition-transform
        max-lg:duration-300

        ${open
                    ? "max-lg:translate-x-0"
                    : "max-lg:-translate-x-full"
                }
    `}
        >
            {/* Close button */}
            <button
                onClick={() => setOpen(!open)}
                className="lg:hidden absolute top-4 right-4 text-2xl z-50"
            >
                ×
            </button>

            {/* HEADER */}
            <div className="h-[75px] shrink-0 flex items-center justify-center border-b border-white/10">
                <div className="flex items-center gap-3 px-5 py-2">
                    <div className="shrink-0">
                        <img
                            src={LOGO2}
                            alt="StorePilot"
                            className="w-10 h-10 object-contain"
                        />
                    </div>

                    <div className="min-w-0">
                        <h1 className="text-white font-semibold text-sm leading-tight truncate">
                            SELLER DASHBOARD
                        </h1>

                        <span className="text-green-400 text-xs">
                            StorePilot
                        </span>
                    </div>
                </div>
            </div>

            {/* SCROLLABLE NAVIGATION */}
            <div className="h-[calc(100vh-75px)] overflow-y-auto scrollbar-none p-1">
                <div className="grid gap-5">
                    {sidebarNavs.map((data, index) => (
                        <SellerSidebarNav
                            key={index}
                            data={data}
                        />
                    ))}
                </div>
            </div>

        </aside>
    )
}