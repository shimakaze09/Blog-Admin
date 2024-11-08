import axios from '../axios'

// Login
export const login = data => {
  return axios({
    url: 'Auth',
    method: 'post',
    data
  })
}
