import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useEffect } from 'react';
const AuthenticationContext = createContext(undefined);
export const AuthenticationProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken'));
    const login = ({ accessToken, refreshToken, userId, userRole }) => {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('userId', String(userId));
        localStorage.setItem('userRole', userRole);
        setIsAuthenticated(true);
    };
    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        setIsAuthenticated(false);
    };
    useEffect(() => {
        const handler = () => {
            setIsAuthenticated(!!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken'));
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }, []);
    return (_jsx(AuthenticationContext.Provider, { value: { isAuthenticated, login, logout }, children: children }));
};
export const useAuthentication = () => {
    const context = useContext(AuthenticationContext);
    if (!context)
        throw new Error('useAuthentication must be inside AuthenticationProvider');
    return context;
};
