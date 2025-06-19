import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Chip, CircularProgress, Stack, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';
import { useMemo } from 'react';
import { useTransactionTrends } from '../../../queries/Dashboard/useDashboard';
export default function TransactionTrends({ period = 'DAILY', height = 350 }) {
    const theme = useTheme();
    const { trends, loading, error } = useTransactionTrends(period);
    // Debug logging for 403 errors
    if (error) {
        console.error('TransactionTrends Error:', {
            error,
            period,
            authToken: localStorage.getItem('authToken') ? 'Present' : 'Missing',
            endpoint: `/dashboard/transaction-trends?period=${period}`
        });
    }
    // Debug logging
    console.log('TransactionTrends Debug:', {
        trends,
        loading,
        error,
        period,
        authToken: localStorage.getItem('authToken') ? 'Present' : 'Missing'
    });
    const chartData = useMemo(() => {
        if (!trends || trends.length === 0)
            return null;
        const salesData = trends.filter((t) => t.type === 'SALE');
        const purchaseData = trends.filter((t) => t.type === 'PURCHASE');
        const returnData = trends.filter((t) => t.type === 'RETURN');
        // Create time labels based on period
        const labels = trends.map((trend) => {
            const date = new Date(trend.date);
            if (period === 'DAILY') {
                return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            }
            else if (period === 'WEEKLY') {
                return `Week ${Math.ceil(date.getDate() / 7)}`;
            }
            else {
                return date.toLocaleDateString('en-US', { month: 'short' });
            }
        });
        // Calculate percentage changes
        const totalCurrent = trends.reduce((sum, t) => sum + t.amount, 0);
        const totalPrevious = trends.slice(0, Math.floor(trends.length / 2)).reduce((sum, t) => sum + t.amount, 0);
        const change = totalPrevious > 0 ? ((totalCurrent - totalPrevious) / totalPrevious) * 100 : 0;
        return {
            labels: [...new Set(labels)],
            salesData: salesData.map((t) => t.amount),
            purchaseData: purchaseData.map((t) => t.amount),
            returnData: returnData.map((t) => t.amount),
            totalAmount: totalCurrent,
            change: Math.round(change)
        };
    }, [trends, period]);
    if (loading) {
        return (_jsx(Card, { sx: { width: '100%', height, display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(CircularProgress, {}) }));
    }
    if (error || !chartData) {
        const is403Error = error?.includes('403') || error?.includes('Forbidden');
        const isAuthError = error?.includes('Unauthorized') || error?.includes('401');
        return (_jsx(Card, { sx: { width: '100%', height }, children: _jsxs(CardContent, { children: [_jsx(Typography, { color: 'error', variant: "h6", gutterBottom: true, children: "Failed to load transaction trends" }), is403Error && (_jsxs(Stack, { spacing: 1, children: [_jsx(Typography, { variant: "body2", color: 'error', children: "Access Denied (403): You don't have permission to access this resource." }), _jsx(Typography, { variant: "caption", color: 'text.secondary', children: "This might be due to:" }), _jsxs(Typography, { variant: "caption", component: "ul", sx: { pl: 2 }, children: [_jsx("li", { children: "Insufficient user permissions" }), _jsx("li", { children: "Invalid or expired authentication token" }), _jsx("li", { children: "Server-side access restrictions" })] })] })), isAuthError && (_jsx(Typography, { variant: "body2", color: 'error', children: "Authentication Required: Please log in again." })), error && !is403Error && !isAuthError && (_jsxs(Typography, { variant: "body2", color: 'error', children: ["Error: ", error] })), _jsxs(Typography, { variant: "caption", sx: { mt: 2, display: 'block' }, children: ["Endpoint: /dashboard/transaction-trends?period=", period] })] }) }));
    }
    const colorPalette = [
        theme.palette.success.main, // Sales - green
        theme.palette.primary.main, // Purchases - blue
        theme.palette.error.main // Returns - red
    ];
    return (_jsx(Card, { sx: { width: '100%', height }, children: _jsxs(CardContent, { children: [_jsxs(Typography, { component: 'h2', variant: 'subtitle2', gutterBottom: true, children: ["Transaction Trends (", period.toLowerCase(), ")"] }), _jsxs(Stack, { sx: { justifyContent: 'space-between', mb: 2 }, children: [_jsxs(Stack, { direction: 'row', sx: {
                                alignContent: { xs: 'center', sm: 'flex-start' },
                                alignItems: 'center',
                                gap: 1
                            }, children: [_jsxs(Typography, { variant: 'h4', component: 'p', children: ["$", chartData.totalAmount.toLocaleString()] }), _jsx(Chip, { size: 'small', color: chartData.change >= 0 ? 'success' : 'error', label: `${chartData.change >= 0 ? '+' : ''}${chartData.change}%` })] }), _jsx(Typography, { variant: 'caption', sx: { color: 'text.secondary' }, children: "Total transaction value for the period" })] }), _jsx(LineChart, { colors: colorPalette, xAxis: [
                        {
                            scaleType: 'point',
                            data: chartData.labels,
                            tickInterval: (_index, i) => (i + 1) % Math.ceil(chartData.labels.length / 6) === 0
                        }
                    ], series: [
                        {
                            id: 'sales',
                            label: 'Sales',
                            data: chartData.salesData,
                            curve: 'linear',
                            showMark: true
                        },
                        {
                            id: 'purchases',
                            label: 'Purchases',
                            data: chartData.purchaseData,
                            curve: 'linear',
                            showMark: true
                        },
                        {
                            id: 'returns',
                            label: 'Returns',
                            data: chartData.returnData,
                            curve: 'linear',
                            showMark: true
                        }
                    ], height: height - 120, margin: { left: 60, right: 20, top: 20, bottom: 40 }, grid: { horizontal: true }, slotProps: {
                        legend: {
                            direction: 'row',
                            position: { vertical: 'bottom', horizontal: 'middle' }
                        }
                    } })] }) }));
}
