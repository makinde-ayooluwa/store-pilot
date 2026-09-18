import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SellerLayout from '../layouts/sellerLayout'

export default function AppRouter() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<h1>Homepage</h1>} />
            <Route path='/seller' element={<SellerLayout />}>
            
            </Route>
        </Routes>
    </BrowserRouter>
  )
}
