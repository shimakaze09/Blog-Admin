import axios from "../axios"

// Get all featured categories
export const getAll = () => {
  return axios({
    url: 'FeaturedCategory',
    method: 'get',
  })
}

// Get a specific featured category
export const get = itemId => {
  return axios({
    url: `FeaturedCategory/${itemId}`,
    method: 'get'
  })
}

// Add a new featured category
export const add = data => {
  return axios({
    url: 'FeaturedCategory',
    method: 'post',
    data
  })
}

// Delete a specific featured category
export const deleteItem = itemId => {
  return axios({
    url: `FeaturedCategory/${itemId}/`,
    method: 'delete'
  })
}
