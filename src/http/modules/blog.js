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

// Get blog overview information
export const overview = () => {
  return axios({
    url: 'Blog/Overview',
  })
}

// Blog Status List
export const getStatusList = () => {
  return axios({
    url: 'Blog/GetStatusList'
  })
}
