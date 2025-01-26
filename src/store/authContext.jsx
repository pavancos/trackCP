import React, { createContext, useState, useContext, useEffect } from "react";
import { verifyUser } from "./authHandlers";
const AuthContext = createContext();
export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [authState, setAuthState] = useState({
        isAuthenticated: null,
        token: null,
        username: null,
        role: null,
    });

    const login = (token, username, role) => {
        setAuthState({
            isAuthenticated: true,
            token: token,
            username:username,
            role:role,
        });
        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);
    };

    const logout = (message=null) => {
        setAuthState({
            isAuthenticated: false,
            token: null,
            username: null,
            role: null,
        });
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");       
    };


    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            verifyUser(token).then((data) => {
                if (data.isAuthenticated) {
                    // console.log(data)
                    setAuthState(data);
                } else {
                    // console.log(data, "Token verification failed: Context");
                    logout();
                }
            });
        }
    }, []);
    

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
