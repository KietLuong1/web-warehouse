import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { areaElementClasses } from '@mui/x-charts/LineChart';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
function getDaysInMonth(month, year) {
    const date = new Date(year, month, 0);
    const monthName = date.toLocaleDateString('en-US', {
        month: 'short'
    });
    const daysInMonth = date.getDate();
    const days = [];
    let i = 1;
    while (days.length < daysInMonth) {
        days.push(`${monthName} ${i}`);
        i += 1;
    }
    return days;
}
function AreaGradient({ color, id }) {
    return (_jsx("defs", { children: _jsxs("linearGradient", { id: id, x1: '50%', y1: '0%', x2: '50%', y2: '100%', children: [_jsx("stop", { offset: '0%', stopColor: color, stopOpacity: 0.3 }), _jsx("stop", { offset: '100%', stopColor: color, stopOpacity: 0 })] }) }));
}
export default function StatCard({ title, value, interval, trend, data, realTimeValue, isConnected, isAnimating }) {
    const theme = useTheme();
    const daysInWeek = getDaysInMonth(11, 2024);
    // Use real-time value if available, otherwise fallback to static value
    const displayValue = realTimeValue !== undefined ? realTimeValue.toLocaleString() : value;
    const trendColors = {
        up: theme.palette.mode === 'light' ? theme.palette.success.main : theme.palette.success.dark,
        down: theme.palette.mode === 'light' ? theme.palette.error.main : theme.palette.error.dark,
        neutral: theme.palette.mode === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]
    };
    const labelColors = {
        up: 'success',
        down: 'error',
        neutral: 'default'
    };
    const color = labelColors[trend];
    const chartColor = trendColors[trend];
    const trendValues = { up: '+25%', down: '-25%', neutral: '+5%' };
    return (_jsx(Card, { sx: { height: '100%', flexGrow: 1 }, children: _jsxs(CardContent, { children: [_jsx(Typography, { component: 'h2', variant: 'subtitle2', gutterBottom: true, children: title }), _jsxs(Stack, { direction: 'column', sx: { justifyContent: 'space-between', flexGrow: '1', gap: 1 }, children: [_jsxs(Stack, { sx: { justifyContent: 'space-between' }, children: [_jsxs(Stack, { direction: 'row', sx: { justifyContent: 'space-between', alignItems: 'center' }, children: [_jsx(Typography, { variant: 'h4', component: 'p', sx: {
                                                color: !isConnected ? 'text.disabled' : 'inherit',
                                                transition: 'all 0.3s ease',
                                                transform: isAnimating ? 'scale(1.05)' : 'scale(1)'
                                            }, children: displayValue }), _jsxs(Stack, { direction: 'row', spacing: 1, alignItems: 'center', children: [isConnected && (_jsx(Box, { sx: {
                                                        width: 8,
                                                        height: 8,
                                                        borderRadius: '50%',
                                                        bgcolor: 'success.main',
                                                        animation: 'pulse 2s infinite'
                                                    } })), _jsx(Chip, { size: 'small', color: color, label: trendValues[trend] })] })] }), _jsx(Typography, { variant: 'caption', sx: { color: 'text.secondary' }, children: interval })] }), _jsx(Box, { sx: { width: '100%', height: 50 }, children: _jsx(SparkLineChart, { colors: [chartColor], data: data, area: true, showHighlight: true, showTooltip: true, xAxis: {
                                    scaleType: 'band',
                                    data: daysInWeek
                                }, sx: {
                                    [`& .${areaElementClasses.root}`]: {
                                        fill: `url(#area-gradient-${value})`
                                    }
                                }, children: _jsx(AreaGradient, { color: chartColor, id: `area-gradient-${value}` }) }) })] })] }) }));
}
