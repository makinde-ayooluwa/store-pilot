import React, { useState } from 'react'
import SellerSidebar from './sellers/sidebar'

export default function SellerLayout() {
    const [open, setOpen] = useState(false)

    return (
        <div
            className="grid min-h-screen"
            style={{
                gridTemplateColumns: "280px 1fr"
            }}
        >

            <SellerSidebar
                open={open}
                setOpen={setOpen}
            />

            <main className="min-w-0 p-4">
                Seller Mainbar
            </main>
        </div>
    )
}