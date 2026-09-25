import React from 'react'
import LOGO2 from "../../assets/images/logo-2.png"
import SellerSidebarNav from '../../components/store/storeSidebarNav'

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
                link: "/store"
            },
            // {
            //     title: "Statistics",
            //     link: "/store/statistics"
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
                link: "/store/products"
            },
            {
                title: "Add Product",
                link: "/store/products/add"
            },
            {
                title: "Categories",
                link: "/store/products/categories"
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
                link: "/store/inventory"
            },
            // {
            //     title: "Low Stock",
            //     link: "/store/inventory/low-stock"
            // },
            // {
            //     title: "Stock History",
            //     link: "/store/inventory/history"
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
                link: "/store/orders"
            },
            // {
            //     title: "Pending",
            //     link: "/store/orders/pending"
            // },
            // {
            //     title: "Completed",
            //     link: "/store/orders/completed"
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
        link: "/store/customers"
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
                link: "/store/sales"
            },
            {
                title: "Sales History",
                link: "/store/sales/history"
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
        link: "/store/transactions"
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
        link: "/store/wallet"
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
                link: "/store/discounts"
            },
            {
                title: "Create Discount",
                link: "/store/discounts/create"
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
                link: "/store/analytics"
            },
            {
                title: "Sales Analytics",
                link: "/store/analytics/sales"
            },
            {
                title: "Product Analytics",
                link: "/store/analytics/products"
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
                link: "/store/reports/sales"
            },
            {
                title: "Inventory Report",
                link: "/store/reports/inventory"
            },
            {
                title: "Customer Report",
                link: "/store/reports/customers"
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
                link: "/store/store"
            },
            {
                title: "Store Appearance",
                link: "/store/store/appearance"
            },
            {
                title: "Store Information",
                link: "/store/store/information"
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
                link: "/store/team"
            },
            {
                title: "Roles & Permissions",
                link: "/store/team/roles"
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
                link: "/store/settings"
            },
            {
                title: "Account",
                link: "/store/settings/account"
            },
            {
                title: "Notifications",
                link: "/store/settings/notifications"
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