import axios from 'axios'
import queryString from 'query-string'

const axiosClient = axios.create({
    baseURL: process.env.SERVER_API_URL,
    headers: {
        'content-type': 'application/json',
        "Access-Control-Allow-Origin": "*"
    },
    paramsSerializer: params => queryString.stringify(params)
})

axiosClient.interceptors.request.use(async (config) => {
    //Handle token here
    return config
}, err => {
    console.log(err)
})

axiosClient.interceptors.response.use( res => {
    if(res && res.data) {
        return res.data
    }
    return res
}, err => {
    throw err
})

export default axiosClient