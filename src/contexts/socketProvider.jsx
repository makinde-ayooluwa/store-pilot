import { createContext, useContext, useEffect, useRef, useState } from "react";

export const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
    const ws = useRef(null);

    const [isConnected, setIsConnected] = useState(false);
    const [lastMessage, setLastMessage] = useState(null);

    useEffect(() => {
        const socket = new WebSocket("ws://localhost:5000");

        ws.current = socket;

        socket.onopen = () => {
            console.log("WebSocket connected");
            setIsConnected(true);
        };

        socket.onmessage = (event) => {
            console.log("Message received:", event.data);

            setLastMessage(event.data);
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

    const send = (message) => {
        if (!ws.current) {
            console.warn("WebSocket is not initialized");
            return;
        }

        if (ws.current.readyState !== WebSocket.OPEN) {
            console.warn("WebSocket is not connected");
            return;
        }

        ws.current.send(
            typeof message === "string"
                ? message
                : JSON.stringify(message)
        );
    };

    return (
        <SocketContext.Provider
            value={{
                send,
                isConnected,
                lastMessage
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