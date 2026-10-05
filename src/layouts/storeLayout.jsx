import React, { useEffect, useState } from 'react'
import StoreSidebar from './store/sidebar'
import { Outlet } from 'react-router-dom'
import StoreHeader from './store/header'
import StoreOnly from '../components/storeOnly'
import { useStore } from '../contexts/storeProvider'

export default function StoreLayout() {
    const [open, setOpen] = useState(false)
    const { storeData } = useStore()
    useEffect(()=>{
        setOpen(false)
    },[])
    return (
        <StoreOnly>
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">

                <StoreSidebar
                    open={open}
                    setOpen={setOpen}
                />

                <main className="min-w-0">
                    <StoreHeader storeData={storeData} open={open} setOpen={setOpen} />

                    <Outlet />
                </main>

            </div>
        </StoreOnly>
    )
}