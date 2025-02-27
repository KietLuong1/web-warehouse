import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { SidebarCmp } from './components/Sidebar'
import ToastifyContainer from './components/Toastify'
import Account from './pages/Account'
import Container from './pages/Container'
import Dashboard from './pages/Dashboard'
import ExpenseTracking from './pages/ExpenseTracking'
import FAQs from './pages/FAQs'
import Inventory from './pages/Inventory'
import Location from './pages/Location'
import Product from './pages/Product'
import Report from './pages/Report'
import Supplier from './pages/Supplier'
import Transaction from './pages/Transaction'
import Login from './pages/Login'
import { AuthProvider, useAuth } from './context/AuthContext'
import AccountInformation from './pages/AccountInformation'
import ChatBot from './components/ChatBot'

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
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation()
  const { isAuthenticated } = useAuth()

  const isLoginPage = location.pathname === '/login'

  return (
    <div style={{ display: 'flex' }}>
      {!isLoginPage && isAuthenticated && <SidebarCmp />}
      {children}
    </div>
  )
}
function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout>
            <Routes>
              {/* Redirect to dashboard */}
              <Route path='/' element={<Navigate to='/login' replace />} />
              <Route path='/login' element={<Login />} />

              {/* Menu item routes */}
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/transaction' element={<Transaction />} />
              <Route path='/inventory' element={<Inventory />} />
              <Route path='/product' element={<Product />} />
              <Route path='/expense-tracking' element={<ExpenseTracking />} />
              <Route path='/report' element={<Report />} />
              <Route path='/supplier' element={<Supplier />} />
              <Route path='/location' element={<Location />} />
              <Route path='/users' element={<Account />} />
              <Route path='/account-details' element={<AccountInformation />} />

              <Route path='/faqs' element={<FAQs />} />
              <Route path='/container' element={<Container />} />

              {/* Add other routes */}
            </Routes>

            <ChatBot/>
          </Layout>
          <ToastifyContainer />
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App
