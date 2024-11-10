import axios from '../axios'

// Get blog list
export const getList = (categoryId = 0, page = 1, pageSize = 20) => {
  return axios({
    url: 'BlogPost',
    method: 'get',
    params: { categoryId, page, pageSize }
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
