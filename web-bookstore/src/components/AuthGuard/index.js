import { Fragment as _Fragment, jsx as _jsx } from "react/jsx-runtime";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthentication } from '../../context/AuthenticationContext';
export default function AuthGuard({ children }) {
    const { isAuthenticated } = useAuthentication();
    const navigate = useNavigate();
    useEffect(() => {
        // Check if we have either accessToken or authToken
        const accessToken = localStorage.getItem('accessToken');
        const authToken = localStorage.getItem('authToken');
        if (!isAuthenticated && !accessToken && !authToken) {
            console.log('No authentication found, redirecting to login');
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);
    // Show children only if authenticated
    if (!isAuthenticated) {
        const accessToken = localStorage.getItem('accessToken');
        const authToken = localStorage.getItem('authToken');
        if (!accessToken && !authToken) {
            return null; // Will redirect to login
        }
    }
    return _jsx(_Fragment, { children: children });
}
