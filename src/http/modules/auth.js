import axios from '../axios'

// Login
export const login = data => {
  return axios({
    url: 'Auth',
    method: 'post',
    data
  })
}

// Get user information
export const get = () => axios({
  url: 'Auth',
  method: 'get'
})
