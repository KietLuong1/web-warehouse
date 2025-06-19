import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { useState } from 'react';
import MainStack from './components/mainStack';
import DashboardErrorHandler from './components/DashboardErrorHandler';
import { useDashboard } from '../../queries/Dashboard/useDashboard';
function Dashboard() {
    const [dateRange] = useState(null);
    const [refreshInterval] = useState(30000); // 30 seconds default
    // Use the real dashboard hook
    const { error: dashboardError, refresh } = useDashboard(dateRange, refreshInterval);
    return (_jsx(Box, { sx: {
            width: '100%',
            maxWidth: '100%',
            display: 'flex',
            justifyContent: 'center',
            margin: '8px 0'
        }, children: _jsxs(Stack, { spacing: 2, sx: { width: '100%' }, children: [_jsx(DashboardErrorHandler, { error: dashboardError, onRetry: refresh }), _jsx(MainStack, {})] }) }));
}
export default Dashboard;
