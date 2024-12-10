import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  login: (token: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('accessToken') // Check if token exists in localStorage
  })

  const login = (token: string) => {
    localStorage.setItem('accessToken', token) // Store token in localStorage
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('accessToken') // Remove token from localStorage
    setIsAuthenticated(false)
  }

  useEffect(() => {
    // Sync state with localStorage in case it changes from another tab/window
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('accessToken'))
    }
    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within an AuthProvider')
  return context
}
