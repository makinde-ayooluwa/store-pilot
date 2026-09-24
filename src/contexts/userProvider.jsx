import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { backendUrl } from "../data/constants";
import { useSocket } from "./socketProvider";
import axios from "axios";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [userError, setUserError] = useState({});

    const { send } = useSocket();

    // useCallback prevents unnecessary re-creations of checkUser
    const checkUser = useCallback(async () => {
        setUserLoading(true);
        try {
            const localUserRaw = localStorage.getItem("user");
            const sessionUserRaw = sessionStorage.getItem("user");

            const rawData = localUserRaw || sessionUserRaw;

            if (rawData) {
                const storedUser = JSON.parse(rawData);
                setUser(storedUser);

                const response = await axios.post(`${backendUrl}/auth/getUser`, {
                    id: storedUser._id,
                });

                const userData = response.data;
                setData(userData);
                setUserError({ status: 200 });
            } else {
                setUser(null);
                setData(null);
                setUserError({ status: 404 });
            }
        } catch (error) {
            console.error("USER CHECK ERROR:", error);
            setUserError({
                status: error.response?.status || 500,
                message: error.message,
            });
            setUser(null);
            setData(null);
        } finally {
            setUserLoading(false);
        }
    }, []);

    // Run initial session check on mount
    useEffect(() => {
        checkUser();
    }, [checkUser]);

    const login = async (loginData) => {
        try {
            setUserLoading(true);
            const response = await axios.post(`${backendUrl}/auth/login`, loginData);
            const result = response.data;

            if (result.statusCode === 200) {
                // Clear previous storage state first
                localStorage.removeItem("user");
                sessionStorage.removeItem("user");

                const sessionPayload = JSON.stringify({ _id: result._id });

                if (loginData.rememberMe) {
                    localStorage.setItem("user", sessionPayload);
                } else {
                    sessionStorage.setItem("user", sessionPayload);
                }

                // Fetch fresh user profile details
                await checkUser();

                return { status: true, message: result.message };
            } else {
                setUserLoading(false);
                return { status: false, message: result.message };
            }
        } catch (error) {
            setUserLoading(false);
            return {
                status: false,
                message: error.response?.data?.message || "Login failed",
            };
        }
    };

    const register = async (registerData) => {
        try {
            setUserLoading(true);
            const response = await axios.post(`${backendUrl}/auth/register`, registerData);
            const result = response.data;

            if (result.statusCode === 200) {
                localStorage.removeItem("user");
                sessionStorage.setItem("user", JSON.stringify({ _id: result._id }));

                await checkUser();

                return { status: true, message: result.message };
            } else {
                setUserLoading(false);
                return { status: false, message: result.message };
            }
        } catch (error) {
            setUserLoading(false);
            return {
                status: false,
                message: error.response?.data?.message || "Registration failed",
            };
        }
    };
    const forgotPassword = async (data) => {
        const to = data.email;

        const sendData = {
            to, email: to
        };
        const response = await axios.post(`${backendUrl}/auth/forgot-password`, sendData)
        const result = response.data;
        return result;
    }
    const resetPassword = async (data) => {
        const response = await axios.post(`${backendUrl}/auth/reset-password`, data)
        const result = response.data;
        if (result.status == true) {
            console.log(result.status)
            return true;
        } else {
            return false;
        }
    }
    const validateToken = async (token) => {
        try {
            const response = await axios.post(`${backendUrl}/auth/validate-token`, { token });
            const result = response.data;

            if (result?.status === true) {
                return result;
            }
            return { status: false };
        } catch (error) {
            console.error("TOKEN VALIDATION ERROR:", error);
            return { status: false };
        }
    };
    const logout = () => {
        localStorage.removeItem("user");
        sessionStorage.removeItem("user");
        setUser(null);
        setData(null);
        setUserError({});
        setUserLoading(false);
    };

    return (
        <UserContext.Provider
            value={{ userLoading, user, data, userError, login, register, logout, checkUser, forgotPassword, validateToken, resetPassword }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};