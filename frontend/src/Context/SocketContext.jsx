/* eslint-disable react/prop-types */
import { createContext, useRef, useEffect } from "react";
import io from "socket.io-client";

export const SocketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {
    const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = io("http://127.0.0.1:3000");

        return () => {
            socketRef.current.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socketRef.current}>
            {children}
        </SocketContext.Provider>
    );
};
