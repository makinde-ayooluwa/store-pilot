import { createContext, useCallback, useContext } from "react";
import sellerProducts from '../data/sellerProducts'
import sellerCategories from "../data/sellerCategories";
export const SellerContext = createContext();
export const SellerProvider = ({children})=>{
    return <SellerContext.Provider value={{products: sellerProducts, categories: sellerCategories}}>
        {children}
    </SellerContext.Provider>
}
export const useSeller = ()=>{
    return useContext(SellerContext)
}