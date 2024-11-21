import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: 'https://671f1b7a1dfc42991983f6dc.mockapi.io/api/v1', // Updated base URL
  headers: {
    'Content-type': 'application/json'
  }
})

export const axiosInstance2 = axios.create({
  baseURL: 'https://673be39a96b8dcd5f3f7c922.mockapi.io',
  headers: {
    'Content-Type': 'application/json'
  }
})
