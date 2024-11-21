import axios from "../axios"

export const getNodes = () => {
  return axios({
    url: `Category/Nodes`,
  })
}

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

// Add category
export const add = data => {
  return axios({
    url: `Category`,
    method: 'post',
    data
  })
}

// Update category
export const update = data => {
  return axios({
    url: `Category/${data.id}/`,
    method: 'put',
    data
  })
}

export const deleteItem = itemId => {
  return axios({
    url: `Category/${itemId}/`,
    method: 'delete'
  })
}

// Category word cloud
export const wordCloud = () => {
  return axios({
    url: 'Category/WordCloud'
  })
}

// Set featured category
export const setFeatured = (itemId, data) => {
  return axios({
    url: `Category/${itemId}/SetFeatured`,
    method: 'post',
    data
  })
}

// Cancel featured category
export const cancelFeatured = itemId => {
  return axios({
    url: `Category/${itemId}/CancelFeatured`,
    method: 'post'
  })
}

// Set visible
export const setVisible = itemId => {
  return axios({
    url: `Category/${itemId}/SetVisible`,
    method: 'post',
  })
}

// Set invisible
export const setInvisible = itemId => {
  return axios({
    url: `Category/${itemId}/SetInvisible`,
    method: 'post',
  })
}
