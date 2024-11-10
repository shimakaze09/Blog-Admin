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
export const get = postId => {
  return axios({
    url: `BlogPost/${postId}/`,
    method: 'get',
  })
}

// Delete a specific blog post
export const deletePost = postId => {
  return axios({
    url: `BlogPost/${postId}/`,
    method: 'delete'
  })
}

// Set a blog post as featured
export const setFeatured = postId => {
  return axios({
    url: `BlogPost/${postId}/SetFeatured`,
    method: 'post'
  })
}

// Cancel a blog post's featured status
export const cancelFeatured = postId => {
  return axios({
    url: `BlogPost/${postId}/CancelFeatured`,
    method: 'post'
  })
}

// Set a blog post as top
export const setTop = postId => {
  return axios({
    url: `BlogPost/${postId}/SetTop`,
    method: 'post'
  })
}
