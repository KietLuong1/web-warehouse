import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import AppLayout from './components/AppLayout';
import ChatBot from './components/ChatBot';
import { SidebarCmp } from './components/Sidebar';
import ToastifyContainer from './components/Toastify';
import { AuthenticationProvider, useAuthentication } from './context/AuthenticationContext';
import Account from './pages/Account';
import Profile from './pages/Profile';
import Container from './pages/Container';
import Dashboard from './pages/Dashboard';
import ExpenseTracking from './pages/ExpenseTracking';
import FAQs from './pages/FAQs';
import Inventory from './pages/Inventory';
import Location from './pages/Location';
import Login from './pages/Login';
import Product from './pages/Product';
import Report from './pages/Report';
import Supplier from './pages/Supplier';
import Transaction from './pages/Transaction';
// Create a query client instance
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            refetchOnReconnect: false,
            retry: false,
            staleTime: 5 * 60 * 1000
        }
    }
});
const Layout = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuthentication();
    const isLoginPage = location.pathname === '/login';
    return (_jsxs("div", { style: { display: 'flex' }, children: [!isLoginPage && isAuthenticated && _jsx(SidebarCmp, {}), _jsx(AppLayout, { children: children }), !isLoginPage && isAuthenticated && _jsx(ChatBot, {})] }));
};
function App() {
    return (_jsx(AuthenticationProvider, { children: _jsx(QueryClientProvider, { client: queryClient, children: _jsxs(BrowserRouter, { children: [_jsx(Layout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: '/', element: _jsx(Navigate, { to: '/login', replace: true }) }), _jsx(Route, { path: '/login', element: _jsx(Login, {}) }), _jsx(Route, { path: '/dashboard', element: _jsx(Dashboard, {}) }), _jsx(Route, { path: '/transaction', element: _jsx(Transaction, {}) }), _jsx(Route, { path: '/inventory', element: _jsx(Inventory, {}) }), _jsx(Route, { path: '/product', element: _jsx(Product, {}) }), _jsx(Route, { path: '/expense-tracking', element: _jsx(ExpenseTracking, {}) }), _jsx(Route, { path: '/report', element: _jsx(Report, {}) }), _jsx(Route, { path: '/supplier', element: _jsx(Supplier, {}) }), _jsx(Route, { path: '/location', element: _jsx(Location, {}) }), _jsx(Route, { path: '/users', element: _jsx(Account, {}) }), _jsx(Route, { path: '/account-details', element: _jsx(Profile, {}) }), _jsx(Route, { path: '/faqs', element: _jsx(FAQs, {}) }), _jsx(Route, { path: '/container', element: _jsx(Container, {}) })] }) }), _jsx(ToastifyContainer, {})] }) }) }));
}
export default App;
