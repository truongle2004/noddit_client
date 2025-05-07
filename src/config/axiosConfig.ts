import axios from 'axios'
import { env } from './environment'

const axiosConfig = axios.create({
  baseURL: env.API_URL,
  headers: {
    'Content-Type': 'application/json',
    'X-Client-Platform': 'web'
  },
  withCredentials: true,
  timeout: 1000 * 60 * 5 // 5 minutes
})

axiosConfig.interceptors.request.use(
  (request) => {
    const token = sessionStorage.getItem('token')
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosConfig.interceptors.response.use(
  (response) => response.data,
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosConfig
