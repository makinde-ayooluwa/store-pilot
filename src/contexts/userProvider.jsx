import { createContext, useContext, useEffect, useState } from "react";
import { backendUrl } from "../data/constants";
import { useSocket } from "./socketProvider";
import axios from "axios";

export const UserContext = createContext();
export const UserProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState({});
    useEffect(() => {
        checkUser()
    }, [user])
    const { send } = useSocket()
    const checkUser = async () => {
        try {
            setLoading(true);
            const checked = localStorage.getItem("user");
            if (checked) {
                const response = await axios.post(`${backendUrl}/auth/getUser`, { id: checked })
                const data = await response.data;
                setUser(data)
                console.log("USER TEST CHECKED", user)
            } else {
                setUser(null);
                console.log("USER DOES NOT EXISTS");
            }
        } catch (error) {
            console.log("USER CHECK ERROR", error)
        }
        finally{
            setLoading(false);
        }
    }
    const login = async (data) => {
        await localStorage.setItem("user", JSON.stringify(data));
        setUser(data)
    }
    const register = async (data) => {
        const response = await axios.post(`${backendUrl}/auth/register`, data);
        // const response = {
        //     data:{
        //         message: "Testing"
        //     }
        // }
        const result = response.data;
        if (result.statusCode == 200) {
            await localStorage.setItem("user", JSON.stringify({ id: result._id }));
            setUser(result._id)
            return {
                status: true,
                message: result.message
            }
        } else {
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