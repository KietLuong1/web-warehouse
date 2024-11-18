import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SidebarCmp } from './components/Sidebar'
import ToastifyContainer from './components/Toastify'
import CostCalculating from './pages/CostCalculating'
import Dashboard from './pages/Dashboard'
import Service from './pages/Import_Export'
import Location from './pages/Location'
import Login from './pages/Login'
import Transaction from './pages/Transaction'
import Container from './pages/Container'

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
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div style={{ display: 'flex' }}>
          <SidebarCmp />
          <Routes>
            {/* Redirect to dashboard */}
            <Route path='/' element={<Navigate to='/dashboard' replace />} />

            {/* Menu item routes */}
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/service' element={<Service />} />
            <Route path='/transaction' element={<Transaction />} />
            <Route path='/container' element={<Container />} />
            <Route path='/cost-calculating' element={<CostCalculating />} />
            <Route path='/location' element={<Location />} />
            {/* Add other routes */}
            <Route path='/login' element={<Login />} />
          </Routes>
          <ToastifyContainer />
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
