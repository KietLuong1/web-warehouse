import React, { createContext, useContext, useState, useEffect } from 'react'

interface AuthenticationContextType {
  isAuthenticated: boolean
  login: (accessToken: string, refreshToken: string) => void
  logout: () => void
}

const AuthenticationConText = createContext<AuthenticationContextType | undefined>(undefined)

export const AuthenticationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // consider yourself "authenticated" if *both* tokens are present
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken')
  })

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    setIsAuthenticated(true)
    console.log('Login successful')
    console.log('Access Token:', accessToken)
    console.log('Refresh Token:', refreshToken)
  }

  const logout = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    setIsAuthenticated(false)
  }

  useEffect(() => {
    // sync across tabs
    const handler = () => {
      setIsAuthenticated(!!localStorage.getItem('accessToken') && !!localStorage.getItem('refreshToken'))
    }
    window.addEventListener('storage', handler)
    return () => window.removeEventListener('storage', handler)
  }, [])

  return (
    <AuthenticationConText.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthenticationConText.Provider>
  )
}

export const useAuthentication = () => {
  const context = useContext(AuthenticationConText)
  if (!context) throw new Error('useAuth must be inside AuthProvider');
  return context
}
