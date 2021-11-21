import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
  timeout: 20000,
  baseURL: 'https://mst-recruitment.herokuapp.com/api/v1/',
  headers: {
    'content-type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
  paramsSerializer: (params) => {
    return queryString.stringify(params)
  },
})

axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.authorization = `Bearer ${token}`
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

axiosClient.interceptors.response.use(
  (res) => {
    if (res && res.data) {
      return res.data
    }
    return res
  },
  (err) => {
    if (err.response && err.response.data) return err.response.data
    return Promise.reject(err)
  }
)

export default axiosClient
