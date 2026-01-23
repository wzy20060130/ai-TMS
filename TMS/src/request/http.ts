import axios, { AxiosInstance} from 'axios'

// 创建 axios 实例
const http: AxiosInstance = axios.create({
  baseURL: '/api', // API 基础路径
  timeout: 8000 // 请求超时时间
  
})

export default http


