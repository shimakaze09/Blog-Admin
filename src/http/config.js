import { baseUrl } from '@/utils/global'

export default {
  method: 'get',
  // Base URL prefix
  baseUrl: `${baseUrl}/Api`,
  // Request header information
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  // Parameters
  data: {},
  // Set timeout
  timeout: 10000,
  // Carry credentials
  withCredentials: true,
  // Response data type
  responseType: 'json'
}
