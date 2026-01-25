// src/auth/token.ts
import { ref } from 'vue'

const ACCESS_KEY = 'accessToken'
const REFRESH_KEY = 'refreshToken'

// 内存储存 access token（短期）
const accessTokenRef = ref<string | null>(null)

export function getAccessToken(): string | null {
  return accessTokenRef.value ?? localStorage.getItem(ACCESS_KEY)
}

export function setAccessToken(token: string | null, persist = false) {
  accessTokenRef.value = token
  if (persist) {
    if (token) localStorage.setItem(ACCESS_KEY, token)
    else localStorage.removeItem(ACCESS_KEY)
  }
}

export function clearAccessToken() {
  accessTokenRef.value = null
  localStorage.removeItem(ACCESS_KEY)
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY)
}

export function setRefreshToken(token: string | null) {
  if (token) localStorage.setItem(REFRESH_KEY, token)
  else localStorage.removeItem(REFRESH_KEY)
}

export function clearRefreshToken() {
  localStorage.removeItem(REFRESH_KEY)
}

export function clearAllTokens() {
  clearAccessToken()
  clearRefreshToken()
}