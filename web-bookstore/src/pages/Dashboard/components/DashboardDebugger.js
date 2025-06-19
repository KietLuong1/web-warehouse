import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Alert, Box, Button, Card, CardContent, Chip, Divider, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuthentication } from '../../../context/AuthenticationContext';
export default function DashboardDebugger() {
    const [testResults, setTestResults] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const { isAuthenticated } = useAuthentication();
    const endpoints = [
        { name: 'Dashboard Summary', url: '/dashboard/summary' },
        { name: 'Transaction Trends', url: '/dashboard/transaction-trends?period=DAILY' },
        { name: 'Low Stock Alerts', url: '/dashboard/low-stock-alerts' },
        { name: 'User Info', url: '/users/me' }
    ];
    const testEndpoint = async (endpoint) => {
        const token = localStorage.getItem('accessToken') || localStorage.getItem('authToken');
        try {
            const response = await fetch(`http://localhost:8080/api/v1${endpoint.url}`, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            const data = await response.json().catch(() => ({}));
            return {
                name: endpoint.name,
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                data: response.ok ? 'Success' : data,
                error: !response.ok ? data.message || `${response.status} ${response.statusText}` : null
            };
        }
        catch (error) {
            return {
                name: endpoint.name,
                status: 'Error',
                error: error instanceof Error ? error.message : 'Network error',
                data: null
            };
        }
    };
    const testAllEndpoints = async () => {
        setIsLoading(true);
        const results = {};
        for (const endpoint of endpoints) {
            const result = await testEndpoint(endpoint);
            results[endpoint.name] = result;
        }
        setTestResults(results);
        setIsLoading(false);
    };
    const getAuthInfo = () => {
        return {
            isAuthenticated,
            accessToken: localStorage.getItem('accessToken') ? 'Present' : 'Missing',
            refreshToken: localStorage.getItem('refreshToken') ? 'Present' : 'Missing',
            userId: localStorage.getItem('userId') || 'Missing',
            userRole: localStorage.getItem('userRole') || 'Missing',
            tokenPreview: localStorage.getItem('accessToken')?.substring(0, 30) + '...' || 'N/A'
        };
    };
    useEffect(() => {
        // Auto-test on component mount
        if (isAuthenticated) {
            testAllEndpoints();
        }
    }, [isAuthenticated]);
    const authInfo = getAuthInfo();
    return (_jsx(Card, { sx: { width: '100%', mb: 2 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: 'h6', gutterBottom: true, color: 'primary', children: "\uD83D\uDD0D Dashboard Debug Center" }), _jsxs(Box, { sx: { mb: 2 }, children: [_jsx(Typography, { variant: 'subtitle2', gutterBottom: true, children: "Authentication Status:" }), _jsxs(Stack, { direction: 'row', spacing: 1, alignItems: 'center', flexWrap: 'wrap', children: [_jsx(Chip, { label: `Auth: ${authInfo.isAuthenticated ? 'OK' : 'FAILED'}`, color: authInfo.isAuthenticated ? 'success' : 'error', size: 'small' }), _jsx(Chip, { label: `Token: ${authInfo.accessToken}`, color: authInfo.accessToken === 'Present' ? 'success' : 'error', size: 'small' }), _jsx(Chip, { label: `Role: ${authInfo.userRole}`, color: authInfo.userRole !== 'Missing' ? 'info' : 'warning', size: 'small' }), _jsx(Chip, { label: `User ID: ${authInfo.userId}`, color: authInfo.userId !== 'Missing' ? 'info' : 'warning', size: 'small' })] }), authInfo.accessToken === 'Present' && (_jsxs(Typography, { variant: 'caption', sx: { display: 'block', mt: 1, fontFamily: 'monospace' }, children: ["Token Preview: ", authInfo.tokenPreview] }))] }), _jsx(Divider, { sx: { my: 2 } }), _jsxs(Stack, { direction: 'row', spacing: 1, sx: { mb: 2 }, children: [_jsx(Button, { variant: 'contained', onClick: testAllEndpoints, disabled: isLoading || !authInfo.isAuthenticated, size: 'small', children: isLoading ? 'Testing APIs...' : 'Test All Endpoints' }), _jsx(Button, { variant: 'outlined', onClick: () => (window.location.href = '/login'), size: 'small', color: 'warning', children: "Re-Login" })] }), !authInfo.isAuthenticated && (_jsx(Alert, { severity: 'error', sx: { mb: 2 }, children: "\u274C Not authenticated! Please log in first." })), Object.keys(testResults).length > 0 && (_jsxs(Box, { children: [_jsx(Typography, { variant: 'subtitle2', gutterBottom: true, children: "API Test Results:" }), Object.entries(testResults).map(([name, result]) => (_jsxs(Card, { variant: 'outlined', sx: { mb: 1, p: 1 }, children: [_jsxs(Stack, { direction: 'row', justifyContent: 'space-between', alignItems: 'center', children: [_jsx(Typography, { variant: 'body2', fontWeight: 'bold', children: result.name }), _jsx(Chip, { label: result.status, color: result.ok ? 'success' : 'error', size: 'small' })] }), result.error && (_jsxs(Alert, { severity: 'error', sx: { mt: 1, p: 1 }, children: [_jsxs(Typography, { variant: 'caption', children: ["\uD83D\uDEA8 ", result.error] }), result.status === 403 && (_jsxs(Box, { sx: { mt: 1 }, children: [_jsx(Typography, { variant: 'caption', color: 'error.main', fontWeight: 'bold', children: "Possible causes:" }), _jsxs("ul", { style: { margin: 0, paddingLeft: '16px', fontSize: '12px' }, children: [_jsxs("li", { children: ["User role '", authInfo.userRole, "' doesn't have dashboard access"] }), _jsx("li", { children: "Token expired or invalid" }), _jsx("li", { children: "Backend permission settings" }), _jsx("li", { children: "API endpoint requires different role/permissions" })] })] }))] })), result.ok && (_jsx(Typography, { variant: 'caption', color: 'success.main', children: "\u2705 Success" }))] }, name)))] })), _jsx(Divider, { sx: { my: 2 } }), _jsx(Typography, { variant: 'subtitle2', gutterBottom: true, children: "Quick Actions:" }), _jsxs(Stack, { direction: 'row', spacing: 1, flexWrap: 'wrap', children: [_jsx(Button, { size: 'small', variant: 'outlined', onClick: () => {
                                console.log('Full Auth Debug:', {
                                    localStorage: { ...localStorage },
                                    sessionStorage: { ...sessionStorage },
                                    authInfo
                                });
                            }, children: "Console Log Auth" }), _jsx(Button, { size: 'small', variant: 'outlined', color: 'error', onClick: () => {
                                localStorage.clear();
                                sessionStorage.clear();
                                window.location.href = '/login';
                            }, children: "Clear All & Re-login" })] })] }) }));
}
