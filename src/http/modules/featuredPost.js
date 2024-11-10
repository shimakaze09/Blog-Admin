import axios from "../axios"

// Get all items
export const getAll = () => {
  return axios({
    url: 'FeaturedPost',
    method: 'get',
  })
}

// Get a specific item
export const get = itemId => {
  return axios({
    url: `FeaturedPost/${itemId}`,
    method: 'get'
  })
}

// Add an item
export const add = data => {
  return axios({
    url: 'FeaturedPost',
    method: 'post',
    data
  })
}

// Delete a specific item
export const deleteItem = itemId => {
  return axios({
    url: `FeaturedPost/${itemId}/`,
    method: 'delete'
  })
}
