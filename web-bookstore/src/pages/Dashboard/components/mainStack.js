import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid2 } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useDashboard } from '../../../queries/Dashboard/useDashboard';
import '../styles/animations.css';
import DashboardDebugger from './DashboardDebugger';
import LowStockAlerts from './LowStockAlerts';
import PageViewsBarChart from './pageViewsBarChart';
import SessionsChart from './sessionsChart';
import StatCard from './statCard';
import TransactionTrends from './TransactionTrends';
function Item({ children }) {
    return (_jsx(Box, { sx: {
            textAlign: 'center',
            borderRadius: 2
        }, children: children }));
}
export default function MainStack() {
    // Auto-refresh dashboard data every 30 seconds
    const { data: dashboardMetrics, loading } = useDashboard(null, 30000);
    const data = [
        {
            title: 'Inventory',
            value: dashboardMetrics?.inventoryMetrics?.totalProducts?.toLocaleString() || '0',
            interval: 'Last 30 days',
            trend: dashboardMetrics?.inventoryMetrics
                ? dashboardMetrics.inventoryMetrics.lowStockProducts < 10
                    ? 'up'
                    : 'down'
                : 'neutral',
            realTimeValue: dashboardMetrics?.inventoryMetrics?.totalProducts,
            isConnected: !!dashboardMetrics && !loading,
            isAnimating: loading,
            data: [
                200, 24, 220, 260, 240, 380, 100, 240, 280, 240, 300, 340, 320, 360, 340, 380, 360, 400, 380, 420, 400, 640,
                340, 460, 440, 480, 460, 600, 880, 920
            ]
        },
        {
            title: 'Low Stock Items',
            value: dashboardMetrics?.inventoryMetrics?.lowStockProducts?.toString() || '0',
            interval: 'Critical alerts',
            trend: dashboardMetrics?.inventoryMetrics
                ? dashboardMetrics.inventoryMetrics.lowStockProducts > 20
                    ? 'down'
                    : 'up'
                : 'neutral',
            realTimeValue: dashboardMetrics?.inventoryMetrics?.lowStockProducts,
            isConnected: !!dashboardMetrics && !loading,
            isAnimating: loading,
            data: [
                1640, 1250, 970, 1130, 1050, 900, 720, 1080, 900, 450, 920, 820, 840, 600, 820, 780, 800, 760, 380, 740, 660,
                620, 840, 500, 520, 480, 400, 360, 300, 220
            ]
        },
        {
            title: 'Transactions',
            value: dashboardMetrics?.transactionMetrics?.transactionCount?.toLocaleString() || '0',
            interval: `Revenue: $${dashboardMetrics?.transactionMetrics?.dailyRevenue?.toLocaleString() || 0}`,
            trend: dashboardMetrics?.transactionMetrics
                ? dashboardMetrics.transactionMetrics.dailyRevenue > 10000
                    ? 'up'
                    : 'neutral'
                : 'neutral',
            realTimeValue: dashboardMetrics?.transactionMetrics?.transactionCount,
            isConnected: !!dashboardMetrics && !loading,
            isAnimating: loading,
            data: [
                500, 400, 510, 530, 520, 600, 530, 520, 510, 730, 520, 510, 530, 620, 510, 530, 520, 410, 530, 520, 610, 530,
                520, 610, 530, 420, 510, 430, 520, 510
            ]
        }
    ];
    return (_jsxs(Stack, { spacing: 2, sx: {
            paddingX: 2
        }, children: ["      ", _jsx(DashboardDebugger, {}), _jsx(Grid2, { container: true, spacing: 2, children: data.map((card, index) => (_jsx(Grid2, { size: 4, mt: 2, children: _jsx(Item, { children: _jsx(StatCard, { ...card }) }) }, index))) }), _jsxs(Grid2, { container: true, spacing: 2, children: [_jsx(Grid2, { size: 6, children: _jsx(Item, { children: _jsx(SessionsChart, {}) }) }), _jsx(Grid2, { size: 6, children: _jsx(Item, { children: _jsx(PageViewsBarChart, {}) }) }), _jsx(Grid2, { size: 6, children: _jsx(Item, { children: _jsx(LowStockAlerts, {}) }) }), _jsx(Grid2, { size: 6, children: _jsx(Item, { children: _jsx(TransactionTrends, {}) }) })] })] }));
}
