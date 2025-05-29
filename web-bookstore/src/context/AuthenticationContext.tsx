import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface AuthData {
  accessToken: string
  refreshToken: string
  userId: number
  userRole: string
}

interface AuthenticationContextType {
  isAuthenticated: boolean
  login: (data: AuthData) => void
  logout: () => void
}

const AuthenticationContext = createContext<AuthenticationContextType | undefined>(undefined)

export const AuthenticationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken')
  )

  const login = ({ accessToken, refreshToken, userId, userRole }: AuthData) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('userId', String(userId))
    localStorage.setItem('userRole', userRole)
    setIsAuthenticated(true)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('userId')
    localStorage.removeItem('userRole')
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const handler = () => {
      setIsAuthenticated(!!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken'))
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  return (
    <AuthenticationContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthenticationContext.Provider>
  )
}

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext)
  if (!context) throw new Error('useAuthentication must be inside AuthenticationProvider')
  return context
}
