import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography, Button, Stack, Chip } from '@mui/material';
import { useState } from 'react';
export default function AuthDebugger() {
    const [testResult, setTestResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const testAuthToken = async () => {
        setIsLoading(true);
        setTestResult(null);
        try {
            const token = localStorage.getItem('accessToken') || localStorage.getItem('authToken');
            const response = await fetch('http://localhost:8080/api/v1/dashboard/transaction-trends?period=DAILY', {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { Authorization: `Bearer ${token}` })
                }
            });
            const data = await response.json().catch(() => ({}));
            setTestResult(JSON.stringify({
                status: response.status,
                statusText: response.statusText,
                ok: response.ok,
                accessToken: localStorage.getItem('accessToken') ? 'Present' : 'Missing',
                authToken: localStorage.getItem('authToken') ? 'Present' : 'Missing',
                response: data
            }, null, 2));
        }
        catch (error) {
            setTestResult(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
        finally {
            setIsLoading(false);
        }
    };
    const clearToken = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userId');
        localStorage.removeItem('userRole');
        setTestResult('All tokens cleared');
    };
    const accessToken = localStorage.getItem('accessToken');
    const authToken = localStorage.getItem('authToken');
    const hasToken = accessToken || authToken;
    return (_jsx(Card, { sx: { width: '100%', mb: 2 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: 'h6', gutterBottom: true, children: "Authentication Debugger" }), _jsxs(Stack, { spacing: 2, children: [' ', _jsxs(Stack, { direction: 'row', spacing: 1, alignItems: 'center', children: [_jsx(Typography, { variant: 'body2', children: "Auth Token:" }), _jsx(Chip, { label: hasToken ? 'Present' : 'Missing', color: hasToken ? 'success' : 'error', size: 'small' }), accessToken && (_jsxs(Typography, { variant: 'caption', sx: { maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }, children: ["Access: ", accessToken.substring(0, 20), "..."] })), authToken && (_jsxs(Typography, { variant: 'caption', sx: { maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis' }, children: ["Auth: ", authToken.substring(0, 20), "..."] }))] }), _jsxs(Stack, { direction: 'row', spacing: 1, children: [_jsx(Button, { variant: 'contained', onClick: testAuthToken, disabled: isLoading, size: 'small', children: isLoading ? 'Testing...' : 'Test API Call' }), _jsx(Button, { variant: 'outlined', onClick: clearToken, size: 'small', color: 'error', children: "Clear Token" })] }), testResult && (_jsx(Card, { variant: 'outlined', children: _jsxs(CardContent, { children: [_jsx(Typography, { variant: 'caption', children: "API Test Result:" }), _jsx("pre", { style: {
                                            fontSize: '12px',
                                            backgroundColor: '#f5f5f5',
                                            padding: '8px',
                                            borderRadius: '4px',
                                            overflow: 'auto',
                                            maxHeight: '200px'
                                        }, children: testResult })] }) }))] })] }) }));
}
