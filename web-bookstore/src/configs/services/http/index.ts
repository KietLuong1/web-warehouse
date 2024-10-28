import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://671f1b7a1dfc42991983f6dc.mockapi.io/api/v1', // Updated base URL
  headers: {
    'Content-type': 'application/json'
  }
})

export default axiosInstance
