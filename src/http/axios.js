import axios from 'axios';
import config from './config';
import router from '@/router'
import * as auth from '@/utils/auth'

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

        if (!auth.isLogin()) {
          // Redirect to login page
          router.push('/login')
        }

        // Send request with token
        let token = auth.getToken()
        config.headers.Authorization = `Bearer ${token}`

        return config
      },
      error => {
        // Handle request errors
        console.log('request:', error)
        // Check for timeout
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout request timed out')
        }
        // Redirect to error page if needed
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // Page can catch detailed error info
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // Return error information for catching in the calling side
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
              err.message = 'Invalid request parameters'
              break
            case 401:
              err.message = 'Please log in before accessing'
              break
            case 403:
              err.message = 'Access Denied, No Access Permission'
              break
            case 404:
              err.message = `URL Error: ${err.response.config.url}`
              break
            case 408:
              err.message = 'Request Timed Out'
              break
            case 500:
              err.message = 'Server Internal Error'
              break
            case 501:
              err.message = 'Service Not Implemented'
              break
            case 502:
              err.message = 'Gateway Error'
              break
            case 503:
              err.message = 'Service Unavailable'
              break
            case 504:
              err.message = 'Gateway Timed Out'
              break
            case 505:
              err.message = 'HTTP Version Not Supported'
              break
            default:
          }

          // Handle error responses if any
          if (err.response.data) {
            reason = err.response.data
            // If there's no message in the reason object, use the default message from the error object
            if (!reason.message) reason.message = err.message
          }
        }
        console.error(err)
        return Promise.reject(reason) // Return interface returned error information
      }
    )

    // Process request
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
