import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { Avatar, Menu, MenuItem, Typography, Box, Divider, ListItemIcon, ListItemText } from '@mui/material';
import { Person, Settings, ExitToApp, ArrowDropDown } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useGetAccountDetail } from '../../queries/Account/useGetAccountDetail';
export default function ProfileAvatar({ showDropdown = true, onLogout }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();
    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');
    const { data: user, isLoading } = useGetAccountDetail(userId ? Number(userId) : 0);
    const handleMenuOpen = (event) => {
        if (showDropdown) {
            setAnchorEl(event.currentTarget);
        }
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleProfileClick = () => {
        navigate('/account-details');
        handleMenuClose();
    };
    const handleSettingsClick = () => {
        navigate('/settings');
        handleMenuClose();
    };
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
        navigate('/login');
        handleMenuClose();
    };
    const getAvatarLetter = () => {
        if (user?.name) {
            return user.name.charAt(0).toUpperCase();
        }
        return 'U';
    };
    const getAvatarColor = () => {
        if (!user?.name)
            return '#1976d2';
        const colors = ['#1976d2', '#388e3c', '#f57c00', '#d32f2f', '#7b1fa2', '#0288d1', '#5d4037', '#616161'];
        const index = user.name.charCodeAt(0) % colors.length;
        return colors[index];
    };
    const formatRole = (role) => {
        return role.charAt(0) + role.slice(1).toLowerCase();
    };
    return (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: {
                    display: 'flex',
                    alignItems: 'center',
                    cursor: showDropdown ? 'pointer' : 'default'
                }, onClick: handleMenuOpen, children: [_jsx(Avatar, { sx: {
                            width: 32,
                            height: 32,
                            bgcolor: getAvatarColor(),
                            fontSize: '16px',
                            fontWeight: 600,
                            mr: showDropdown ? 1 : 0
                        }, children: isLoading ? '...' : getAvatarLetter() }), showDropdown && (_jsxs(_Fragment, { children: [_jsxs(Box, { sx: { display: 'flex', flexDirection: 'column', mr: 0.5 }, children: [_jsx(Typography, { variant: 'body2', sx: {
                                            fontFamily: 'Poppins',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            lineHeight: 1.2,
                                            color: 'text.primary'
                                        }, children: isLoading ? 'Loading...' : user?.name || 'User' }), _jsx(Typography, { variant: 'caption', sx: {
                                            fontFamily: 'Poppins',
                                            fontSize: '12px',
                                            color: 'text.secondary',
                                            lineHeight: 1
                                        }, children: userRole ? formatRole(userRole) : 'User' })] }), _jsx(ArrowDropDown, { sx: { fontSize: 16, color: 'text.secondary' } })] }))] }), showDropdown && (_jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right'
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }, PaperProps: {
                    sx: {
                        mt: 1,
                        minWidth: 200,
                        '& .MuiMenuItem-root': {
                            fontFamily: 'Poppins',
                            fontSize: '14px'
                        }
                    }
                }, children: [_jsxs(Box, { sx: { px: 2, py: 1 }, children: [_jsx(Typography, { variant: 'body2', sx: {
                                    fontFamily: 'Poppins',
                                    fontWeight: 600,
                                    color: 'text.primary'
                                }, children: user?.name || 'User' }), _jsx(Typography, { variant: 'caption', sx: {
                                    fontFamily: 'Poppins',
                                    color: 'text.secondary'
                                }, children: user?.email || 'user@example.com' })] }), _jsx(Divider, {}), _jsxs(MenuItem, { onClick: handleProfileClick, children: [_jsx(ListItemIcon, { children: _jsx(Person, { fontSize: 'small' }) }), _jsx(ListItemText, { primary: 'Profile' })] }), _jsxs(MenuItem, { onClick: handleSettingsClick, children: [_jsx(ListItemIcon, { children: _jsx(Settings, { fontSize: 'small' }) }), _jsx(ListItemText, { primary: 'Settings' })] }), _jsx(Divider, {}), _jsxs(MenuItem, { onClick: handleLogout, children: [_jsx(ListItemIcon, { children: _jsx(ExitToApp, { fontSize: 'small' }) }), _jsx(ListItemText, { primary: 'Logout' })] })] }))] }));
}
