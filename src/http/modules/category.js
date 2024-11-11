import axios from "../axios"

// Get all categories
export const getAll = () => {
  return axios({
    url: 'Category/All',
    method: 'get',
  })
}

export const getList = (page = 1, pageSize = 10) => {
  return axios({
    url: 'Category',
    method: 'get',
    params: { page, pageSize }
  })
}

// Get a specific category
export const get = itemId => {
  return axios({
    url: `Category/${itemId}`,
    method: 'get'
  })
}

// Generate category word cloud
export const wordCloud = () => {
  return axios({
    url: 'Category/WordCloud'
  })
}

// Set a category as featured
export const setFeatured = (itemId, data) => {
  return axios({
    url: `Category/${itemId}/SetFeatured`,
    method: 'post',
    data
  })
}

// Cancel a category's featured status
export const cancelFeatured = itemId => {
  return axios({
    url: `Category/${itemId}/CancelFeatured`,
    method: 'post'
  })
}
