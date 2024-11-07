import axios from '../axios'

// Login
export const login = data => {
  return axios({
    url: 'login',
    method: 'post',
    data
  })
}

// Logout
export const logout = () => {
  return axios({
    url: 'logout',
    method: 'get'
  })
}
