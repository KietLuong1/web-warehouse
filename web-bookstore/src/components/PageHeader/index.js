import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useAuthentication } from '../../context/AuthenticationContext';
import CustomDatePicker from '../CustomDatePicker.tsx';
import NotificationBell from '../NotificationBell';
import ProfileAvatar from '../ProfileAvatar';
export default function PageHeader({ title, icon, breadcrumbs, showSearch = true, showDatePicker = true, searchPlaceholder = 'Search...', onSearch, rightContent, subtitle, badge }) {
    const { logout } = useAuthentication();
    return (_jsxs(Stack, { direction: 'row', spacing: 2, sx: {
            paddingTop: '16px',
            paddingBottom: '8px',
            margin: '0 16px',
            alignItems: 'flex-start'
        }, children: [_jsx(Box, { flex: 1, children: _jsx(Box, { sx: { display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }, children: _jsx(Typography, { variant: 'h5', sx: {
                            fontFamily: 'Poppins',
                            fontWeight: 600,
                            color: 'text.primary'
                        }, children: title }) }) }), _jsxs(Stack, { direction: 'row', spacing: 3, alignItems: 'center', children: [rightContent, showDatePicker && _jsx(CustomDatePicker, {}), _jsx(NotificationBell, {}), _jsx(ProfileAvatar, { onLogout: logout })] })] }));
}
