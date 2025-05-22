// import React from 'react'
// import { Navigate } from 'react-router-dom'
// import { useAuth } from '../../context/AuthContext'

// interface Props {
//   requireAdmin?: boolean
//   children: React.ReactElement
// }

// export const ProtectedRoute = ({ requireAdmin = false, children }: Props) => {
//   const { isAuthenticated, isAdmin } = useAuth()
//   if (!isAuthenticated) {
//     return <Navigate to='/login' replace />
//   }
//   if (requireAdmin && !isAdmin) {
//     return <Navigate to='/' replace />
//   }
//   return children
// }
