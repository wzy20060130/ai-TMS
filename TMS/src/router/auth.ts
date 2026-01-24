// auth.js
let refreshPromise = null;

export function getAccessToken() {
  return localStorage.getItem('accessToken');
}

// 返回 token 字符串或 null，且内部不做路由跳转
export function trySilentRefresh() {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    try {
      console.log('[auth] trySilentRefresh start');
      const res = await fetch('http://localhost:3000/refresh-token', {
        method: 'POST',
        credentials: 'include'
      });
      console.log('[auth] refresh response', res.status);
      if (!res.ok) return null;
      const data = await res.json();
      const token = data?.accessToken ?? null;
      if (token) {
        localStorage.setItem('accessToken', token);
        // 如果有 axios 实例，可同步设置 Authorization header
        // api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
        console.log('[auth] got new access token');
        return token;
      }
      return null;
    } catch (err) {
      console.error('[auth] refresh error', err);
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}