import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { SmartPageHeader } from '../PageHeader/exports';
const AppLayout = ({ children }) => {
    const location = useLocation();
    const isLoginPage = location.pathname === '/login';
    if (isLoginPage) {
        return _jsx(_Fragment, { children: children });
    }
    return (_jsxs(Box, { sx: {
            width: '100%',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            maxWidth: '100%',
        }, children: [_jsx(Box, { sx: {
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    backgroundColor: 'white',
                    borderBottom: '1px solid #e0e0e0',
                    width: '100%',
                    flexShrink: 0
                }, children: _jsx(SmartPageHeader, {}) }), _jsx(Box, { sx: {
                    flex: 1,
                    overflow: 'auto',
                    maxWidth: '100%'
                }, children: children })] }));
};
export default AppLayout;
