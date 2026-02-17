import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('auth-token') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('auth-token', token);
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{token, setToken}} >
            {children}
        </AuthContext.Provider>
    )
};