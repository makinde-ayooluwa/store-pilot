import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { backendUrl } from "../data/constants";
import { useSocket } from "./socketProvider";
import axios from "axios";
import { MdErrorOutline } from "react-icons/md";
import Loading from "../components/loading";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userLoading, setUserLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [data, setData] = useState(null);
    const [userError, setUserError] = useState({});
    const { send } = useSocket();

    // useCallback prevents unnecessary re-creations of checkUser
    const checkUser = useCallback(async () => {
        try {
            setUserLoading(true);
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
                console.log("USER ERROR", userError)
            } else {
                setUser(null);
                setData(null);
                // setUserError({ status: 500 });
                setUserLoading(false);
            }
        } catch (error) {
            console.error("USER CHECK ERROR:", error);
            setUserError({
                status: error.response?.status || 500,
                message: error.message,
            });
            setUser(null);
            setData(null);
            setUserLoading(false);
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
            // const response = {
            //     data:{
            //         statusCode: 200,
            //         _id:"119199191991919"
            //     }
            // }
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
        return result.userId;
    }
    const requestToken = async (userId) => {
        const response = await axios.post(`${backendUrl}/auth/request-token`, { userId })
        const result = response.data;
        if (result.status) {
            return result;
        }
    }
    const requestMail = async (userId, token) => {
        // 4. Use environment variable for domain with localhost fallback
        const clientUrl = process.env.CLIENT_URL || "http://localhost:5173";
        const resetLink = `${clientUrl}/reset-password/${token}`;

        const subject = "Forgot password -- StorePilot";
        const message = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body { font-family: Arial, sans-serif; background-color: #f4f4f7; color: #51545e; margin: 0; padding: 0; width: 100%; }
        .email-wrapper { width: 100%; padding: 20px 0; background-color: #f4f4f7; }
        .email-content { max-width: 570px; margin: 0 auto; padding: 30px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05); }
        h1 { color: #333333; font-size: 20px; font-weight: bold; margin-top: 0; }
        p { color: #51545e; font-size: 15px; line-height: 1.5; }
        .btn-container { margin: 25px 0; text-align: center; }
        .btn { background-color: #22c55e; color: #ffffff; display: inline-block; padding: 12px 24px; font-size: 15px; font-weight: bold; text-decoration: none; border-radius: 6px; }
        .subtext { font-size: 12px; color: #6b7280; margin-top: 25px; border-top: 1px solid #e5e7eb; padding-top: 15px; word-break: break-all; }
      </style>
    </head>
    <body>
      <div class="email-wrapper">
        <div class="email-content">
          <h1>Password Reset Request</h1>
          <p>Hello,</p>
          <p>We received a request to reset your password for your Store Pilot account. Click the button below to choose a new password:</p>
          
          <div class="btn-container">
            <a href="${resetLink}" class="btn" target="_blank">Reset Password</a>
          </div>

          <p>This password reset link will expire in 1 hour.</p>
          <p>If you did not request a password reset, you can safely ignore this email.</p>
          
          <div class="subtext">
            <p>If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
          </div>
        </div>
      </div>
    </body>
    </html>
    `;
        const user = await axios.post(`${backendUrl}/auth/getUser`, { id: userId });
        const result = user.data;
        if (result) {
            const mailRequest = await axios.post(`${backendUrl}/auth/request-mail`, { to: result.email, subject, message })
            const {status} = mailRequest.data;
            return {
                status
            }
        }

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
            value={{ userLoading, user, requestMail, data, userError, login, register, logout, checkUser, forgotPassword, validateToken, resetPassword, requestToken }}
        >
            {userError?.status == 500 && (
                <>
                    <div className="w-full h-screen flex justify-center">
                        <div className="mt-50 justify-center">
                            <MdErrorOutline className="text-5xl text-red-500" />
                            <p>Error occured while loading.</p>
                            <div className="m-5 justify-self-center">
                                <button onClick={() => checkUser()} className="border-2 border-blue-500 p-3 text-blue-500 cursor-pointer rounded">Try again</button>
                            </div>
                        </div>
                    </div>
                </>
            )}
            {userLoading && <Loading page={"profile"} />}
            {(!userLoading && userError?.status != 500) && children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};