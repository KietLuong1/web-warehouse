import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Typography, Box, Chip, Stack, List, ListItem, ListItemText, ListItemIcon, CircularProgress, Alert } from '@mui/material';
import { Warning, Error } from '@mui/icons-material';
import { useLowStockAlerts } from '../../../queries/Dashboard/useDashboard';
export default function LowStockAlerts() {
    const { alerts, loading, error } = useLowStockAlerts();
    if (loading) {
        return (_jsx(Card, { sx: { width: '100%', height: 350, display: 'flex', alignItems: 'center', justifyContent: 'center' }, children: _jsx(CircularProgress, {}) }));
    }
    if (error) {
        return (_jsx(Card, { sx: { width: '100%', height: 350 }, children: _jsx(CardContent, { children: _jsx(Typography, { color: 'error', children: "Failed to load low stock alerts" }) }) }));
    }
    const criticalAlerts = alerts?.filter((alert) => alert.severity === 'CRITICAL') || [];
    const warningAlerts = alerts?.filter((alert) => alert.severity === 'WARNING') || [];
    return (_jsx(Card, { sx: { width: '100%', height: 350 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { component: 'h2', variant: 'subtitle2', gutterBottom: true, children: "Low Stock Alerts" }), _jsxs(Stack, { direction: 'row', spacing: 2, sx: { mb: 2 }, children: [_jsx(Chip, { size: 'small', color: 'error', label: `${criticalAlerts.length} Critical`, icon: _jsx(Error, {}) }), _jsx(Chip, { size: 'small', color: 'warning', label: `${warningAlerts.length} Warning`, icon: _jsx(Warning, {}) })] }), alerts && alerts.length === 0 ? (_jsx(Alert, { severity: 'success', sx: { mt: 2 }, children: "All products are adequately stocked!" })) : (_jsx(Box, { sx: { maxHeight: 250, overflow: 'auto' }, children: _jsx(List, { dense: true, children: alerts?.slice(0, 8).map((alert) => (_jsxs(ListItem, { divider: true, children: [_jsx(ListItemIcon, { children: alert.severity === 'CRITICAL' ? (_jsx(Error, { color: 'error', fontSize: 'small' })) : (_jsx(Warning, { color: 'warning', fontSize: 'small' })) }), _jsx(ListItemText, { primary: alert.productName, secondary: _jsxs(Box, { children: [_jsxs(Typography, { variant: 'caption', display: 'block', children: ["SKU: ", alert.sku] }), _jsxs(Typography, { variant: 'caption', display: 'block', children: ["Stock: ", alert.currentStock, " / Min: ", alert.minimumThreshold] })] }) }), _jsx(Chip, { size: 'small', color: alert.severity === 'CRITICAL' ? 'error' : 'warning', label: alert.severity })] }, alert.productId))) }) })), alerts && alerts.length > 8 && (_jsxs(Typography, { variant: 'caption', sx: { color: 'text.secondary', mt: 1, display: 'block' }, children: ["Showing 8 of ", alerts.length, " alerts"] }))] }) }));
}
