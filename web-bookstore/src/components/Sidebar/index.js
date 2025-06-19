import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { MenuIcon, X } from 'lucide-react';
import Image from 'material-ui-image';
import { useEffect, useState } from 'react';
import { Menu, MenuItem, Sidebar, sidebarClasses, SubMenu } from 'react-pro-sidebar';
import { useLocation, useNavigate } from 'react-router-dom';
import { IMAGES } from '../../configs/images';
import { MenuItems } from './MenuItem';
import './styles.scss';
import { useAuthentication } from '../../context/AuthenticationContext';
export const SidebarCmp = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);
    const { logout } = useAuthentication();
    const [isAdmin, setIsAdmin] = useState(false);
    useEffect(() => {
        const userRole = localStorage.getItem('userRole');
        console.log('User role:', userRole);
        setIsAdmin(userRole === 'ADMIN');
    }, []);
    const filterMenuItem = isAdmin ? MenuItems : MenuItems.filter((item) => item.title !== 'Account');
    const handleMenuClick = (item) => {
        if (item.action === 'logout') {
            logout();
            navigate('/login', { replace: true });
        }
        else if (item.link) {
            navigate(item.link);
        }
    };
    return (_jsxs(Sidebar, { collapsed: collapsed, className: 'cmp-sidebar', rootStyles: {
            [`.${sidebarClasses.container}`]: {
                backgroundColor: '#1F2937',
                height: '100vh',
                position: 'fixed',
                overflowY: 'hidden'
            }
        }, width: '215px', collapsedWidth: '90px', children: [_jsxs(Stack, { className: 'cmp-sidebar__container', children: [_jsx(Box, { className: 'cmp-sidebar__items', children: _jsx(IconButton, { onClick: () => setCollapsed(!collapsed), sx: {
                                color: 'white',
                                height: '50%',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.1)'
                                }
                            }, children: collapsed ? _jsx(MenuIcon, { size: 18 }) : _jsx(X, { size: 18 }) }) }), _jsxs(Stack, { sx: {
                            display: 'flex',
                            flexDirection: collapsed ? 'column' : 'row'
                        }, children: [_jsx(Image, { src: IMAGES.logo, style: {
                                    display: 'block',
                                    paddingTop: '2px',
                                    backgroundColor: 'transparent'
                                }, imageStyle: {
                                    height: '55px',
                                    width: 'auto',
                                    position: 'relative',
                                    borderRadius: '30%'
                                }, disableSpinner: true, disableTransition: true }), !collapsed && (_jsx(Stack, { className: 'cmp-sidebar__heading-text', children: _jsx(Typography, { color: 'white', fontWeight: 700, variant: 'h4', fontFamily: 'Poppins', children: "WMS" }) }))] })] }), _jsx(Menu, { menuItemStyles: {
                    button: ({ active }) => ({
                        color: 'white',
                        marginLeft: '5px',
                        backgroundColor: active ? '#2d3748' : 'transparent',
                        '&:hover': {
                            color: 'white',
                            backgroundColor: active ? '#2d3748' : '#2d3748'
                        }
                    })
                }, children: filterMenuItem.map((item) => {
                    if (collapsed) {
                        if (item.submenus) {
                            const firstSubmenuLink = item.submenus[0].link;
                            return (_jsx(MenuItem, { icon: item.icon, onClick: () => {
                                    handleMenuClick(firstSubmenuLink, item.title);
                                }, active: location.pathname === item.link, children: item.title }, item.title));
                        }
                        // For regular items, render normally
                        return (_jsx(MenuItem, { icon: item.icon, onClick: () => {
                                handleMenuClick(item.link, item.title);
                            }, active: location.pathname === item.link, children: item.title }, item.link));
                    }
                    // When expanded, render with submenus
                    if (item.submenus) {
                        return (_jsx(SubMenu, { label: item.title, icon: item.icon, active: location.pathname === item.link, children: item.submenus.map((subItem) => (_jsx(MenuItem, { icon: subItem.icon, active: location.pathname === subItem.link, onClick: () => handleMenuClick(subItem.link, subItem.title), children: subItem.title }, subItem.title))) }, item.title));
                    }
                    return (_jsx(MenuItem, { icon: item.icon, active: location.pathname === item.link, onClick: () => handleMenuClick(item), children: item.title }, item.title));
                }) })] }));
};
