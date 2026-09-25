import React, { useState } from 'react'
import SellerSidebar from './store/sidebar'
import { Outlet } from 'react-router-dom'
import SellerHeader from './store/header'
import StoreOnly from '../components/storeOnly'
import { useStore } from '../contexts/storeProvider'

export default function SellerLayout() {
    const [open, setOpen] = useState(false)
    const { storeData } = useStore()
    return (
        <StoreOnly>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">

                <SellerSidebar
                    open={open}
                    setOpen={setOpen}
                />

                <main className="min-w-0">
                    <SellerHeader storeData={storeData} open={open} setOpen={setOpen} />

                    <Outlet />
                </main>

            </div>
        </StoreOnly>
    )
}