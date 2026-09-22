import { createContext, useContext, useEffect, useState } from "react";
import { backendUrl } from "../data/constants";
import { useSocket } from "./socketProvider";
import axios from "axios";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    useEffect(() => {
        checkUser()
    }, [user])
    const { send } = useSocket()
    const checkUser = async () => {
        try {
            const checked = localStorage.getItem("user");
            if (checked) {
                const response = await axios.post(`${backendUrl}/auth/getUser`, {id: checked})
                const data = await response.data;
                setUser(data)
                console.log("USER TEST CHECKED", user)
            } else {
                setUser(null);
                console.log("USER DOES NOT EXISTS");
            }
        } catch (error) {
            console.log(error)
        }
    }
    const login = async (data) => {
        await localStorage.setItem("user", JSON.stringify(data));
        setUser(data)
    }
    const register = async (data) => {
        const response = await axios.post(`${backendUrl}/auth/register`, data);
        const result = response.data;
        if (result.statusCode == 200) {
            await localStorage.setItem("user", JSON.stringify({id: result._id}));
            setUser(result._id)
            return {
                status: true,
                message: result.message
            }
        }else{
            return {
                status: false,
                message: result.message
            }
        }
    }
    return <UserContext.Provider value={{ user, login, register }}>
        {children}
    </UserContext.Provider>
}
export const useUser = () => {
    return useContext(UserContext);
}