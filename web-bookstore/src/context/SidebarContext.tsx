import React, { createContext, useContext, useState, ReactNode } from 'react'

interface SidebarContextType {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  sidebarWidth: number
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export const useSidebar = () => {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider')
  }
  return context
}

interface SidebarProviderProps {
  children: ReactNode
}

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)

  const sidebarWidth = collapsed ? 85 : 190

  return (
    <SidebarContext.Provider
      value={{
        collapsed,
        setCollapsed,
        sidebarWidth
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
