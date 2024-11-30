import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import { SidebarCmp } from './components/Sidebar'
import ToastifyContainer from './components/Toastify'
import ExpenseTracking from './pages/ExpenseTracking'
import Dashboard from './pages/Dashboard'
import Transaction from './pages/Transaction'
import Location from './pages/Location'
import Login from './pages/Login'
import Container from './pages/Container'
import Inventory from './pages/Inventory'
import Product from './pages/Product'
import Report from './pages/Report'
import Supplier from './pages/Supplier'
import FAQs from './pages/FAQs'

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
            <Route path='/transaction' element={<Transaction />} />
            <Route path='/inventory' element={<Inventory />} />
            <Route path='/product' element={<Product />} />
            <Route path='/expense-tracking' element={<ExpenseTracking />} />
            <Route path='/report' element={<Report />} />
            <Route path='/supplier' element={<Supplier />} />
            <Route path='/location' element={<Location />} />
            <Route path='/faqs' element={<FAQs />} />
            <Route path='/container' element={<Container />} />
            
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
