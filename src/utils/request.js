import axios from 'axios'

const requset = axios.create({
  baseURL: 'http://toutiao.itheima.net'
})

requset.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default requset
