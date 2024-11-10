import axios from '../axios'

// Get top blogs
export const top = () => {
  return axios({
    url: 'Blog/Top',
    method: 'get'
  })
}

// Get featured blogs
export const featured = () => {
  return axios({
    url: 'Blog/Featured',
    method: 'get'
  })
}
