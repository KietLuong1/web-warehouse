import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import React, { useState } from 'react';
import { IconButton, Badge, Menu, MenuItem, Typography, Box, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Notifications, Circle, MarkEmailRead } from '@mui/icons-material';
export default function NotificationBell({ notifications = [], onMarkAsRead, onMarkAllAsRead }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const sampleNotifications = [
        {
            id: '1',
            title: 'Low Stock Alert',
            message: 'Product ABC123 is running low on stock',
            timestamp: '2 mins ago',
            isRead: false,
            type: 'warning'
        },
        {
            id: '2',
            title: 'New Order Received',
            message: 'Order #ORD-001 has been placed',
            timestamp: '5 mins ago',
            isRead: false,
            type: 'info'
        },
        {
            id: '3',
            title: 'Inventory Updated',
            message: 'Location A inventory has been updated',
            timestamp: '10 mins ago',
            isRead: true,
            type: 'success'
        }
    ];
    const allNotifications = notifications.length > 0 ? notifications : sampleNotifications;
    const unreadCount = allNotifications.filter((n) => !n.isRead).length;
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMarkAsRead = (id) => {
        if (onMarkAsRead) {
            onMarkAsRead(id);
        }
    };
    const handleMarkAllAsRead = () => {
        if (onMarkAllAsRead) {
            onMarkAllAsRead();
        }
        handleMenuClose();
    };
    const getNotificationColor = (type) => {
        const colors = {
            info: '#2196f3',
            warning: '#ff9800',
            error: '#f44336',
            success: '#4caf50'
        };
        return colors[type] || colors.info;
    };
    return (_jsxs(_Fragment, { children: [_jsx(IconButton, { onClick: handleMenuOpen, sx: {
                    p: 1,
                    '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                    }
                }, children: _jsx(Badge, { badgeContent: unreadCount, color: 'error', sx: {
                        '& .MuiBadge-badge': {
                            fontSize: '10px',
                            height: '16px',
                            minWidth: '16px'
                        }
                    }, children: _jsx(Notifications, { sx: { fontSize: 24, color: 'text.primary' } }) }) }), _jsxs(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: handleMenuClose, anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'right'
                }, transformOrigin: {
                    vertical: 'top',
                    horizontal: 'right'
                }, PaperProps: {
                    sx: {
                        mt: 1,
                        minWidth: 320,
                        maxWidth: 400,
                        maxHeight: 400,
                        '& .MuiMenuItem-root': {
                            fontFamily: 'Poppins'
                        }
                    }
                }, children: [_jsxs(Box, { sx: { px: 2, py: 1.5, borderBottom: '1px solid #e0e0e0' }, children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' }, children: [_jsx(Typography, { variant: 'h6', sx: { fontFamily: 'Poppins', fontWeight: 600, fontSize: '16px' }, children: "Notifications" }), unreadCount > 0 && (_jsx(IconButton, { size: 'small', onClick: handleMarkAllAsRead, sx: { p: 0.5 }, children: _jsx(MarkEmailRead, { sx: { fontSize: 16 } }) }))] }), unreadCount > 0 && (_jsxs(Typography, { variant: 'caption', sx: { color: 'text.secondary', fontFamily: 'Poppins' }, children: [unreadCount, " unread notification", unreadCount > 1 ? 's' : ''] }))] }), allNotifications.length === 0 ? (_jsx(Box, { sx: { p: 3, textAlign: 'center' }, children: _jsx(Typography, { variant: 'body2', color: 'text.secondary', sx: { fontFamily: 'Poppins' }, children: "No notifications" }) })) : (_jsx(List, { sx: { p: 0, maxHeight: 300, overflow: 'auto' }, children: allNotifications.map((notification, index) => (_jsxs(React.Fragment, { children: [_jsxs(ListItem, { sx: {
                                        px: 2,
                                        py: 1.5,
                                        cursor: 'pointer',
                                        backgroundColor: notification.isRead ? 'transparent' : 'rgba(25, 118, 210, 0.04)',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)'
                                        }
                                    }, onClick: () => handleMarkAsRead(notification.id), children: [_jsx(ListItemIcon, { sx: { minWidth: 36 }, children: _jsx(Circle, { sx: {
                                                    fontSize: 8,
                                                    color: notification.isRead ? 'transparent' : getNotificationColor(notification.type)
                                                } }) }), _jsx(ListItemText, { primary: _jsx(Typography, { variant: 'body2', sx: {
                                                    fontFamily: 'Poppins',
                                                    fontWeight: notification.isRead ? 400 : 600,
                                                    fontSize: '13px',
                                                    mb: 0.5
                                                }, children: notification.title }), secondary: _jsxs(Box, { children: [_jsx(Typography, { variant: 'body2', sx: {
                                                            fontFamily: 'Poppins',
                                                            fontSize: '12px',
                                                            color: 'text.secondary',
                                                            mb: 0.5
                                                        }, children: notification.message }), _jsx(Typography, { variant: 'caption', sx: {
                                                            fontFamily: 'Poppins',
                                                            fontSize: '11px',
                                                            color: 'text.disabled'
                                                        }, children: notification.timestamp })] }) })] }), index < allNotifications.length - 1 && _jsx(Divider, {})] }, notification.id))) })), allNotifications.length > 0 && (_jsxs(_Fragment, { children: [_jsx(Divider, {}), _jsx(MenuItem, { onClick: handleMenuClose, sx: {
                                    justifyContent: 'center',
                                    py: 1.5,
                                    color: 'primary.main',
                                    fontWeight: 500
                                }, children: "View All Notifications" })] }))] })] }));
}
