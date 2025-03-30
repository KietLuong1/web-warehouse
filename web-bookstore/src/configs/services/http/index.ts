import axios from 'axios'

export const getToken = () => localStorage.getItem('accessToken')

export const axiosAccount = axios.create({
  baseURL: import.meta.env.VITE_LOCAL_API_URL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${getToken()}`
  },
  timeout: 300000
})

export const axiosInstance = axios.create({
  // For Transaction, Location
  baseURL: import.meta.env.VITE_TRANSACTION_LOCATION_API_URL,
  headers: {
    'Content-type': 'application/json'
  }
})

export const axiosInstance2 = axios.create({
  // For Inventory
  baseURL: import.meta.env.VITE_INVENTORY_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const axiosInstance3 = axios.create({
  // For Supplier, Product
  baseURL: import.meta.env.VITE_SUPPLIER_PRODUCT_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const axiosInstance4 = axios.create({
  // For Account
  baseURL: import.meta.env.VITE_ACCOUNT_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const reportsApi = axios.create({
  baseURL: import.meta.env.VITE_REPORTS_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})
