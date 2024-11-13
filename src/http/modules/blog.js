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

// Upload blog
export const upload = (title, summary, categoryId, file) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('summary', summary)
  formData.append('categoryId', categoryId)
  formData.append('file', file)

  return axios({
    url: 'Blog/Upload',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    data: formData
  })
}
