import axios from '../axios'

// Get blog list
export const getList = (categoryId = 0, page = 1, pageSize = 20) => {
  return axios({
    url: 'BlogPost',
    method: 'get',
    params: { categoryId, page, pageSize }
  })
}

// Get specified blog post
export const get = postId => {
  return axios({
    url: `BlogPost/${postId}/`,
    method: 'get',
  })
}
