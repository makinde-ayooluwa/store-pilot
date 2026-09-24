import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './contexts/cartProvider.jsx'
import { OrderProvider } from './contexts/orderProvider.jsx'
import { UserProvider } from './contexts/userProvider.jsx'
import { ResourceProvider } from './contexts/resourceProvider.jsx'
import { WishlistProvider } from './contexts/wishlistProvider.jsx'
import { StoreProvider } from './contexts/storeProvider.jsx'
import { SocketProvider } from './contexts/socketProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <UserProvider>
        <StoreProvider>
          <WishlistProvider>
            <ResourceProvider>
              <CartProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </CartProvider>
            </ResourceProvider>
          </WishlistProvider>
        </StoreProvider>
      </UserProvider>
    </SocketProvider>
  </StrictMode>,
)
