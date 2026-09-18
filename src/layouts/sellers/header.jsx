import React from 'react'
import {
    MdSearch,
    MdNotificationsNone,
    MdMenu
} from 'react-icons/md'

export default function SellerHeader({ setOpen }) {
    return (
        <header className="w-full h-[70px] sticky top-0 border-b border-gray-200 bg-white px-3 sm:px-5">

            <div className="h-full flex items-center justify-between">

                {/* LEFT */}
                <div className="flex items-center gap-2">

                    {/* Mobile menu */}
                    <button
                        onClick={() => setOpen(true)}
                        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                    >
                        <MdMenu size={25} />
                    </button>

                    {/* Page title */}
                    <div>
                        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 leading-none">
                            Dashboard
                        </h1>

                        <p className="text-sm font-medium text-gray-500 mt-1">
                            Welcome back
                        </p>
                    </div>

                </div>


                {/* RIGHT */}
                <div className="flex items-center gap-1 sm:gap-3">

                    {/* Search */}
                    <button className="p-2 sm:p-2.5 rounded-xl hover:bg-gray-100">
                        <MdSearch
                            size={23}
                            className="text-gray-600"
                        />
                    </button>

                    {/* Notifications */}
                    <button className="relative p-2 sm:p-2.5 rounded-xl hover:bg-gray-100">
                        <MdNotificationsNone
                            size={25}
                            className="text-gray-600"
                        />

                        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-white" />
                    </button>

                    {/* Divider */}
                    <div className="hidden sm:block h-8 w-px bg-gray-200" />

                    {/* Profile */}
                    <div className="flex items-center gap-2 sm:gap-3">

                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-green-700 flex items-center justify-center shrink-0">
                            <span className="text-white text-sm font-semibold">
                                A
                            </span>
                        </div>

                        {/* Hide text on mobile */}
                        <div className="hidden sm:block">
                            <p className="text-sm font-semibold text-gray-900">
                                Ayooluwa
                            </p>

                            <p className="text-xs text-gray-500">
                                Seller
                            </p>
                        </div>

                    </div>

                </div>

            </div>

        </header>
    )
}