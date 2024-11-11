import axios from 'axios';
import config from './config';
import Cookies from "js-cookie";
import router from '@/router'

export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })

    // Request interceptor
    instance.interceptors.request.use(
      config => {
        let expiration = localStorage.getItem('expiration')
        if (expiration) {
          let now = new Date()
          let expirationTime = new Date(expiration)
          if (now > expirationTime) {
            console.log('Token has expired, redirecting to login')
            localStorage.removeItem('user')
            localStorage.removeItem('expiration')
            Cookies.set('token', null)
            router.push('/login')
          }
        }
        let token = Cookies.get('token')
        // Send request with token
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        } else {
          // Redirect to login page
          router.push('/login')
        }
        return config
      },
      error => {
        // Handle request errors
        console.log('request:', error)
        // Check for timeout
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('Request timed out')
        }
        // Redirect to error page
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // Page-side catch can retrieve detailed error information
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // Error information can be retrieved in the calling side (catch)
      }
    )

    // Response interceptor
    instance.interceptors.response.use(
      response => {
        return response.data
      },
      err => {
        let reason = err
        if (err && err.response) {
          // Wrap default error message
          switch (err.response.status) {
            case 400:
              err.message = 'Invalid request'
              break
            case 401:
              err.message = 'Unauthorized, please log in'
              break
            case 403:
              err.message = 'Access denied'
              break
            case 404:
              err.message = `URL error: ${err.response.config.url}`
              break
            case 408:
              err.message = 'Request timed out'
              break
            case 500:
              err.message = 'Server internal error'
              break
            case 501:
              err.message = 'Service not implemented'
              break
            case 502:
              err.message = 'Gateway error'
              break
            case 503:
              err.message = 'Service unavailable'
              break
            case 504:
              err.message = 'Gateway timed out'
              break
            case 505:
              err.message = 'HTTP version not supported'
              break
            default:
          }
          // Process returned error information if available
          if (err.response.data) {
            reason = err.response.data
            if (reason.message) err.message = reason.message
          }
        }
        console.error(err)
        return Promise.reject(reason) // Return interface returned error information
      }
    )

    // Request processing
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
