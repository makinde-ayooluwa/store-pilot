import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider } from './contexts/cartProvider.jsx'
import { OrderProvider } from './contexts/orderProvider.jsx'
import { UserProvider } from './contexts/userProvider.jsx'
import { ProductProvider } from './contexts/productProvider.jsx'
import { WishlistProvider } from './contexts/wishlistProvider.jsx'
import { SellerProvider } from './contexts/sellerProvider.jsx'
import { SocketProvider } from './contexts/socketProvider.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SocketProvider>
      <UserProvider>
        <SellerProvider>
          <WishlistProvider>
            <ProductProvider>
              <CartProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </CartProvider>
            </ProductProvider>
          </WishlistProvider>
        </SellerProvider>
      </UserProvider>
    </SocketProvider>
  </StrictMode>,
)
