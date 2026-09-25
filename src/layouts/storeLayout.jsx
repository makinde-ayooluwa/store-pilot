import React, { useState } from 'react'
import SellerSidebar from './store/sidebar'
import { Outlet } from 'react-router-dom'
import SellerHeader from './store/header'

export default function SellerLayout() {
    const [open, setOpen] = useState(false)

    return (
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">

            <SellerSidebar
                open={open}
                setOpen={setOpen}
            />

            <main className="min-w-0">
                <SellerHeader open={open} setOpen={setOpen} />

                <Outlet />
            </main>

        </div>
    )
}