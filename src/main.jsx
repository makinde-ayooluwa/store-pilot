import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './contexts/cartProvider.jsx'
import { OrderProvider } from './contexts/orderProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <OrderProvider>
        <App />
      </OrderProvider>
    </CartProvider>
  </StrictMode>,
)
