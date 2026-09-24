import { createContext, useCallback, useContext } from "react";
import sellerProducts from '../data/sellerProducts'
import sellerCategories from "../data/sellerCategories";
export const StoreContext = createContext();
export const StoreProvider = ({children})=>{
    return <StoreContext.Provider value={{products: sellerProducts, categories: sellerCategories}}>
        {children}
    </StoreContext.Provider>
}
export const useStore = ()=>{
    return useContext(StoreContext)
}