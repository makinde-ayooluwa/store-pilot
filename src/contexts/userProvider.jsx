import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        checkUser()
    }, [user])
    const checkUser = async () => {
        try {
            const checked = localStorage.getItem("user");
            if (checked) {
                setUser(checked);
                console.log("USER TEST CHECKED")
            } else {
                setUser(null);
                console.log("USER DOES NOT EXISTS");
            }
        } catch (error) {
            console.log(error)
        }
    }
    const login = async(data) => {
        await localStorage.setItem("user", JSON.stringify(data));
        setUser(data)
        
    }
    return <UserContext.Provider value={{ user, login }}>
        {children}
    </UserContext.Provider>
}
export const useUser = () => {
    return useContext(UserContext);
}