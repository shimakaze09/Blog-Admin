import axios from '../axios'

/**
 * Get blog list
 * @param categoryId Category ID
 * @param search Search term
 * @param sortBy Sorting field
 * @param page Current page number
 * @param pageSize Number of items per page
 * @returns {*}
 */
export const getList = (
  categoryId = 0,
  search = '',
  sortBy = '',
  page = 1,
  pageSize = 20
) => {
  return axios({
    url: 'BlogPost',
    method: 'get',
    params: { categoryId, search, sortBy, page, pageSize }
  })
}

// Get specific blog post
export const get = itemId => {
  return axios({
    url: `BlogPost/${itemId}/`,
    method: 'get',
  })
}

// Delete a specific blog post
export const deleteItem = itemId => {
  return axios({
    url: `BlogPost/${itemId}/`,
    method: 'delete'
  })
}

// Add blog post
export const add = data => {
  return axios({
    url: `BlogPost`,
    method: 'post',
    data
  })
}

// Update blog post
export const update = data => {
  return axios({
    url: `BlogPost/${data.id}/`,
    method: 'put',
    data
  })
}

/**
 * Upload image
 * @param itemId Article ID
 * @param file Image file
 * @returns {*}
 */
export const uploadImage = (itemId, file) => {
  let formData = new FormData()
  formData.append('file', file)
  return axios({
    url: `BlogPost/${itemId}/UploadImage`,
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    data: formData
  })
}

// Get images from an article
export const getImages = itemId => {
  return axios({
    url: `BlogPost/${itemId}/Images`,
    method: 'get'
  })
}

// Set a blog post as featured
export const setFeatured = itemId => {
  return axios({
    url: `BlogPost/${itemId}/SetFeatured`,
    method: 'post'
  })
}

// Cancel a blog post's featured status
export const cancelFeatured = itemId => {
  return axios({
    url: `BlogPost/${itemId}/CancelFeatured`,
    method: 'post'
  })
}

// Set a blog post as top
export const setTop = itemId => {
  return axios({
    url: `BlogPost/${itemId}/SetTop`,
    method: 'post'
  })
}
