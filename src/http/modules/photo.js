import axios from '../axios'

// Get List
export const getList = (page = 1, pageSize = 10) => {
  return axios({
    url: 'Photo',
    method: 'get',
    params: {page, pageSize}
  })
}

// Get Specific Item
export const get = photoId => {
  return axios({
    url: `Photo/${photoId}/`,
    method: 'get'
  })
}

// Upload Photo
export const add = (title, location, file) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('location', location)
  formData.append('file', file)

  return axios({
    url: 'Photo',
    method: 'post',
    headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'},
    data: formData
  })
}

// Delete Specific Item
export const deleteItem = itemId => {
  return axios({
    url: `Photo/${itemId}/`,
    method: 'delete'
  })
}

// Set Featured
export const setFeatured = itemId => {
  return axios({
    url: `Photo/${itemId}/SetFeatured`,
    method: 'post'
  })
}

// Cancel Featured
export const cancelFeatured = itemId => {
  return axios({
    url: `Photo/${itemId}/CancelFeatured`,
    method: 'post'
  })
}
