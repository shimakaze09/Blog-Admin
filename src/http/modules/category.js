import axios from "../axios"

// Get blog category list
export const getList = () => {
  return axios({
    url: 'Category',
    method: 'get'
  })
}

export const get = categoryId => {
  return axios({
    url: `Category/${categoryId}`,
    method: 'get'
  })
}
