import React, { useState } from 'react'
import SellerSidebar from './sellers/sidebar'
import { Outlet } from 'react-router-dom'
import SellerHeader from './sellers/header'

export default function SellerLayout() {
    const [open, setOpen] = useState(false)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">

            <SellerSidebar
                open={open}
                setOpen={setOpen}
            />

            <main className="min-w-0">
                <SellerHeader setOpen={setOpen} />

                <Outlet />
            </main>

        </div>
    )
}