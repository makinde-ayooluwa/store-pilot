import { createContext, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { backendUrl } from "../data/constants";
import Swal from "sweetalert2";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const ws = useRef(null);
    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5000");

        ws.current = socket;

        socket.onopen = (e) => {
            console.log("WebSocket connected", e);

            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            console.log("Message received:", event.data);

            setLastMessage(JSON.parse(event.data));
            console.log("LAST MESSAGE", JSON.parse(event.data))
        };

        socket.onerror = (error) => {
            console.error("WebSocket error:", error);
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
            setIsConnected(false);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendToSocket = (message) => {
        if (!ws.current) {
            console.warn("WebSocket is not initialized");
            return;
        }

        if (ws.current.readyState !== WebSocket.OPEN) {
            console.warn("WebSocket is not connected");
            return;
        }

        ws.current.send(JSON.stringify(message) ?? message);
    };
    const closeSocket = () => {
        if (!ws.current) {
            console.warn("WebSocket is not initialized");
            return;
        }
        if (ws.current.readyState !== WebSocket.OPEN) {
            console.warn("WebSocket is not connected");
            return;
        }
        ws.current.close();
    }
    return (
        <SocketContext.Provider
            value={{
                sendToSocket,
                isConnected,
                lastMessage,
                closeSocket
            }}
        >
            {children}
        </SocketContext.Provider>
    );
};

export const useSocket = () => {
    const context = useContext(SocketContext);

    if (!context) {
        throw new Error(
            "useSocket must be used inside SocketProvider"
        );
    }

    return context;
};