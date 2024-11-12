import axios from '../axios'

// Get list
export const getList = (page = 1, pageSize = 10) => {
  return axios({
    url: 'VisitRecord',
    method: 'get',
    params: { page, pageSize }
  })
}

// Get specific item
export const get = photoId => {
  return axios({
    url: `VisitRecord/${photoId}/`,
    method: 'get',
  })
}

// Get all items
export const getAll = () => {
  return axios({ url: 'VisitRecord/All' })
}

// Get overview data
export const getOverview = () => {
  return axios({ url: 'VisitRecord/Overview' })
}

// Get trend data
export const getTrend = (days = 7) => {
  return axios({
    url: 'VisitRecord/Trend',
    method: 'get',
    params: { days }
  })
}

// Get statistics
export const getStats = (date = null) => {
  return axios({
    url: 'VisitRecord/Stats',
    method: 'get',
    params: date === null ? null : { ...date }
  })
}
