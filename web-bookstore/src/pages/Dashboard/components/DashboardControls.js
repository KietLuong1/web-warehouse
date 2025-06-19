import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DateRange, Refresh as RefreshIcon, Timeline } from '@mui/icons-material';
import { Box, Button, Chip, FormControl, IconButton, InputLabel, MenuItem, Paper, Select, Stack, Tooltip } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
export default function DashboardControls({ onDateRangeChange, onRefreshIntervalChange, onTrendPeriodChange, onManualRefresh, isLoading = false, currentDateRange, currentRefreshInterval, currentTrendPeriod }) {
    const [dateRange, setDateRange] = useState(currentDateRange ? [dayjs(currentDateRange[0]), dayjs(currentDateRange[1])] : undefined);
    const handleDateRangeChange = useCallback((newValue) => {
        setDateRange(newValue);
        if (newValue && newValue[0] && newValue[1]) {
            onDateRangeChange([newValue[0].toDate(), newValue[1].toDate()]);
        }
        else {
            onDateRangeChange(null);
        }
    }, [onDateRangeChange]);
    const handleClearDateRange = useCallback(() => {
        setDateRange(undefined);
        onDateRangeChange(null);
    }, [onDateRangeChange]);
    const refreshIntervalOptions = [
        { value: null, label: 'Manual' },
        { value: 10000, label: '10 seconds' },
        { value: 30000, label: '30 seconds' },
        { value: 60000, label: '1 minute' },
        { value: 300000, label: '5 minutes' }
    ];
    const trendPeriodOptions = [
        { value: 'DAILY', label: 'Daily' },
        { value: 'WEEKLY', label: 'Weekly' },
        { value: 'MONTHLY', label: 'Monthly' }
    ];
    return (_jsx(LocalizationProvider, { dateAdapter: AdapterDayjs, children: _jsx(Paper, { elevation: 1, sx: {
                p: 2,
                mb: 2,
                backgroundColor: '#f8f9fa',
                border: '1px solid #e9ecef'
            }, children: _jsxs(Stack, { direction: { xs: 'column', md: 'row' }, spacing: 2, alignItems: { xs: 'stretch', md: 'center' }, justifyContent: 'space-between', children: [_jsxs(Stack, { direction: { xs: 'column', sm: 'row' }, spacing: 2, alignItems: 'center', children: [' ', _jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1 }, children: [_jsx(DateRange, { color: 'action' }), _jsx(DatePicker, { label: 'Start Date', value: dateRange ? dateRange[0] : null, onChange: (newValue) => {
                                            if (newValue) {
                                                const endDate = dateRange ? dateRange[1] : newValue;
                                                handleDateRangeChange([newValue, endDate]);
                                            }
                                        }, slotProps: {
                                            textField: {
                                                size: 'small',
                                                placeholder: 'Start date'
                                            }
                                        } }), _jsx(DatePicker, { label: 'End Date', value: dateRange ? dateRange[1] : null, onChange: (newValue) => {
                                            if (newValue) {
                                                const startDate = dateRange ? dateRange[0] : newValue;
                                                handleDateRangeChange([startDate, newValue]);
                                            }
                                        }, slotProps: {
                                            textField: {
                                                size: 'small',
                                                placeholder: 'End date'
                                            }
                                        } }), dateRange && (_jsx(Button, { size: 'small', onClick: handleClearDateRange, variant: 'outlined', children: "Clear" }))] }), _jsxs(FormControl, { size: 'small', sx: { minWidth: 120 }, children: [_jsx(InputLabel, { children: "Refresh" }), _jsx(Select, { value: currentRefreshInterval || '', label: 'Refresh', onChange: (e) => onRefreshIntervalChange(e.target.value), children: refreshIntervalOptions.map((option) => (_jsx(MenuItem, { value: option.value || '', children: option.label }, option.value || 'manual'))) })] }), _jsxs(FormControl, { size: 'small', sx: { minWidth: 120 }, children: [_jsx(InputLabel, { children: "Trends" }), _jsx(Select, { value: currentTrendPeriod, label: 'Trends', onChange: (e) => onTrendPeriodChange(e.target.value), children: trendPeriodOptions.map((option) => (_jsx(MenuItem, { value: option.value, children: option.label }, option.value))) })] })] }), _jsxs(Stack, { direction: 'row', spacing: 1, alignItems: 'center', children: [_jsx(Chip, { icon: _jsx(Timeline, {}), label: `Period: ${currentTrendPeriod.toLowerCase()}`, size: 'small', color: 'primary', variant: 'outlined' }), _jsx(Chip, { label: currentRefreshInterval ? `Auto: ${currentRefreshInterval / 1000}s` : 'Manual', size: 'small', color: currentRefreshInterval ? 'success' : 'default', variant: 'outlined' }), _jsx(Tooltip, { title: 'Refresh Now', children: _jsx(IconButton, { size: 'small', onClick: onManualRefresh, disabled: isLoading, color: 'primary', children: _jsx(RefreshIcon, {}) }) })] })] }) }) }));
}
