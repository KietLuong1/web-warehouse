import { SidebarCmp } from './components/Sidebar'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Service from './pages/Import_Export'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <SidebarCmp />
        <Routes>
          {/* Redirect to dashboard */}
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
          {/* Menu item routes */}
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/service' element={<Service />} />
          {/* Add other routes */}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
