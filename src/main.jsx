import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { CartProvider } from "./contexts/cartProvider.jsx";
import { OrderProvider } from "./contexts/orderProvider.jsx";
import { UserProvider } from "./contexts/userProvider.jsx";
import { ResourceProvider } from "./contexts/resourceProvider.jsx";
import { WishlistProvider } from "./contexts/wishlistProvider.jsx";
import { StoreProvider } from "./contexts/storeProvider.jsx";
import { SocketProvider } from "./contexts/socketProvider.jsx";
// import { UtilityProvider } from "./contexts/utilityProvider.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <UtilityProvider> */}
    <SocketProvider>
      <UserProvider>
        <CartProvider>
          <ResourceProvider>
            <StoreProvider>
              <WishlistProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </WishlistProvider>
            </StoreProvider>
          </ResourceProvider>
        </CartProvider>
      </UserProvider>
    </SocketProvider>
    {/* </UtilityProvider> */}
  </StrictMode>,
);
