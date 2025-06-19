import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLocation } from 'react-router-dom';
import { useAuthentication } from '../../context/AuthenticationContext';
import { getPageConfig } from './config';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import CustomDatePicker from '../CustomDatePicker.tsx';
import { CustomTableSearch } from '../CustomTableSearch';
import NotificationBell from '../NotificationBell';
import ProfileAvatar from '../ProfileAvatar';
export default function DynamicPageHeader({ config: customConfig, onSearch, rightContent }) {
    const location = useLocation();
    const { logout } = useAuthentication();
    // Get the default config for this route
    const defaultConfig = getPageConfig(location.pathname);
    // Merge default config with custom overrides
    const finalConfig = {
        ...defaultConfig,
        ...customConfig
    };
    // If no config found and no custom config provided, return null
    if (!finalConfig.title) {
        return null;
    }
    return (_jsxs(Stack, { direction: 'row', spacing: 2, sx: {
            paddingTop: '16px',
            paddingBottom: '8px',
            margin: '0 16px',
            alignItems: 'flex-start'
        }, children: [_jsxs(Box, { flex: 1, children: [_jsxs(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }, children: [finalConfig.icon && _jsx(Box, { sx: { mr: 1, display: 'flex', alignItems: 'center' }, children: finalConfig.icon }), _jsx(Typography, { variant: 'h5', sx: {
                                    fontFamily: 'Poppins',
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }, children: finalConfig.title }), finalConfig.badge && (_jsx(Chip, { label: finalConfig.badge.label, color: finalConfig.badge.color || 'primary', size: 'small', variant: 'outlined' }))] }), finalConfig.subtitle && (_jsx(Typography, { variant: 'body2', color: 'text.secondary', sx: { fontFamily: 'Poppins' }, children: finalConfig.subtitle }))] }), _jsxs(Stack, { direction: 'row', spacing: 1, alignItems: 'center', children: [rightContent, finalConfig.rightContent, finalConfig.showSearch && (_jsx(CustomTableSearch, { placeholder: finalConfig.searchPlaceholder || 'Search...', onSearch: onSearch })), finalConfig.showDatePicker && _jsx(CustomDatePicker, {}), finalConfig.showNotifications && _jsx(NotificationBell, {}), finalConfig.showProfile && _jsx(ProfileAvatar, { onLogout: logout })] })] }));
}
