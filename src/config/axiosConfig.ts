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
    return request
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosConfig.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default axiosConfig
