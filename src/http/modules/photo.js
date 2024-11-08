import axios from '../axios'

export const getList = (page = 1, pageSize = 10) => {
  return axios({
    url: 'Photo',
    method: 'get',
    params: { page, pageSize }
  })
}

export const get = photoId => {
  return axios({
    url: `Photo/${photoId}/`,
    method: 'get',
  })
}

// Upload Photo
export const add = (title, file) => {
  let formData = new FormData()
  formData.append('title', title)
  formData.append('file', file)

  return axios({
    url: 'Photo',
    method: 'post',
    headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    data: formData
  })
}
