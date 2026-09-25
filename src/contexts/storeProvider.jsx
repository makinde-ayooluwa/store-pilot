import { createContext, useCallback, useContext, useState } from "react";
import storeProducts from '../data/storeProducts'
import storeCategories from "../data/storeCategories";
export const StoreContext = createContext();
export const StoreProvider = ({children})=>{
    const [store, setStore] = useState(null);
    const register = async(data)=>{

    }
    const login = async(data)=>{

    }
    return <StoreContext.Provider value={{products: storeProducts, categories: storeCategories}}>
        {children}
    </StoreContext.Provider>
}
export const useStore = ()=>{
    return useContext(StoreContext)
}