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
    // request request interceptor
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get('token')
        // Send token along with the request
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        } else {
          // Redirect to login page
          // TODO: After login, I'll enable redirection here
          router.push('/login')
        }
        return config
      },
      error => {
        // Error handling when request occurs
        console.log('request:', error)
        // Check for timeout
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout request timed out')
        }
        // Redirect to error page
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // Page-side catch can get detailed error information
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // Error information can be caught in the calling side
      }
    )

    // response response interceptor
    instance.interceptors.response.use(
      response => {
        return response.data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = 'Bad request'
              break
            case 401:
              err.message = 'Unauthorized, please log in'
              break
            case 403:
              err.message = 'Forbidden'
              break
            case 404:
              err.message = `Error in requested URL: ${err.response.config.url}`
              break
            case 408:
              err.message = 'Request timed out'
              break
            case 500:
              err.message = 'Internal server error'
              break
            case 501:
              err.message = 'Not implemented'
              break
            case 502:
              err.message = 'Bad gateway'
              break
            case 503:
              err.message = 'Service unavailable'
              break
            case 504:
              err.message = 'Gateway timeout'
              break
            case 505:
              err.message = 'HTTP version not supported'
              break
            default:
          }
        }
        console.error(err)
        return Promise.reject(err) // Return error information returned by the interface
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
