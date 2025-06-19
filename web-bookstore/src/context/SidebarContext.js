import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const SidebarContext = createContext(undefined);
export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (context === undefined) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};
export const SidebarProvider = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);
    const sidebarWidth = collapsed ? 85 : 190;
    return (_jsx(SidebarContext.Provider, { value: {
            collapsed,
            setCollapsed,
            sidebarWidth
        }, children: children }));
};
