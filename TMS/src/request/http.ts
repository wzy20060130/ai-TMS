// src/request/http.ts
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios"
const BASE_URL = 'http://localhost:3000' // 根据你的后端端口调整

// 内存中的 access token（模块级变量）
let accessToken: string | null = null

// 初始化时如果 localStorage 有 token（来自 remember）则加载
try {
  const saved = localStorage.getItem('accessToken')
  if (saved) accessToken = saved
} catch (e) {
  // ignore
}

const http: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 8000,
  withCredentials: true, 
})

// 请求拦截：带上 Authorization
http.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!config.headers) config.headers = {}
  if (accessToken) {
    config.headers['Authorization'] = `Bearer ${accessToken}`
  }
  return config
})

// 刷新队列/状态，避免并发刷新
let isRefreshing = false
type Pending = {
  resolve: (value?: any) => void
  reject: (reason?: any) => void
  config: any
}
let failedQueue: Pending[] = []

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(p => {
    if (error) p.reject(error)
    else {
      if (token && p.config.headers) p.config.headers['Authorization'] = `Bearer ${token}`
      p.resolve(http.request(p.config))
    }
  })
  failedQueue = []
}

http.interceptors.response.use(
  (res: AxiosResponse) => res,
  (err) => {
    const originalRequest = err.config
    if (err.response && err.response.status === 401 && !originalRequest._retry) {
      // 标记已重试，防止死循环
      originalRequest._retry = true

      if (isRefreshing) {
        // 等待刷新完成后重试
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject, config: originalRequest })
        })
      }

      isRefreshing = true

      return new Promise(async (resolve, reject) => {
        try {
          // 请求刷新短 token；浏览器会自动带上 refreshToken HttpOnly cookie（because withCredentials: true）
          const r = await http.post('/refresh-token')
          const newAccess = r.data && r.data.accessToken
          if (!newAccess) throw new Error('No accessToken returned from refresh')

          // 更新内存 token，并可选择是否持久化（如果之前用户选了 remember）
          accessToken = newAccess
          // 如果本地有已保存的 token（用户之前选择记住），同步更新 localStorage
          try {
            if (localStorage.getItem('accessToken')) {
              localStorage.setItem('accessToken', newAccess)
            }
          } catch (e) {
            // 忽略 localStorage 失败
          }

          processQueue(null, newAccess)
          isRefreshing = false

          // 将新的 token 加到原请求并重试
          if (originalRequest.headers) originalRequest.headers['Authorization'] = `Bearer ${newAccess}`
          resolve(http.request(originalRequest))
        } catch (refreshErr) {
          processQueue(refreshErr, null)
          isRefreshing = false
          // 刷新失败：清理本地 token，并可跳转到登录页
          accessToken = null
          try { localStorage.removeItem('accessToken') } catch (e) {}
          // 可选：window.location.href = '/login'
          reject(refreshErr)
        }
      })
    }

    return Promise.reject(err)
  }
)

// 导出登录/登出等方法

export interface User {
  id: number
  username: string
}

export interface LoginResponse {
  success: boolean
  user?: User
  accessToken?: string
  message?: string
}

export async function login(username: string, password: string, remember = false): Promise<LoginResponse> {
  try {
    const { data } = await http.post<LoginResponse>('/login', { username, password, remember })
    if (data && data.success && data.accessToken) {
      accessToken = data.accessToken
      if (remember) {
        try { localStorage.setItem('accessToken', accessToken) } catch (e) {}
      } else {
        // 如果之前 localStorage 存在 token，但这次没有勾选 remember，则清理 localStorage
        try { localStorage.removeItem('accessToken') } catch (e) {}
      }
    }
    return data
  } catch (err: any) {
    if (axios.isAxiosError(err) && err.response && err.response.data) {
      return err.response.data as LoginResponse
    }
    throw err
  }
}

export async function logout() {
  try {
    await http.post('/logout') // 服务器端应清除 refresh cookie
  } finally {
    accessToken = null
    try { localStorage.removeItem('accessToken') } catch (e) {}
  }
}


export async function sendCode(){
  try{
    const res = await http.post('/sendCode')
    
  }
  catch{

  }
}

export { http, accessToken as _accessToken_export_for_debug }
export default http