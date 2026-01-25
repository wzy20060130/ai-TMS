<template>
  <div class="min-h-screen flex flex-col lg:flex-row">
    <!-- 左侧大图：使用固定的 Unsplash 静态链接 -->
    <div class="lg:flex-1 h-64 lg:h-auto relative overflow-hidden bg-gray-50">
      <img
        :src="imageSrc"
      
        alt="abstract tech background"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- 渐变叠加（提高右侧卡片对比度） -->
      <div class="absolute inset-y-0 right-0 w-2/5 pointer-events-none"
     style="background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);">
</div>

      <!-- 左上 logo（大屏显示） -->
      <div class="hidden lg:flex absolute top-8 left-8 items-center gap-3 bg-white/40 backdrop-blur-sm rounded-md px-3 py-2">
        <div class="w-10 h-10 rounded-md flex items-center justify-center bg-brand text-white font-bold">N</div>
        <div>
          <div class="font-semibold text-gray-100">宏运物流</div>
          <div class="text-xs text-gray-200">TMS 运输管理系统</div>
        </div>
      </div>
    </div>

    <!-- 右侧登录卡片 -->
    <div class="flex items-center justify-center lg:flex-[0_0_42rem] p-8">
      <div class="w-full max-w-md">
        <div class="bg-white border border-gray-200 rounded-xl shadow-sm p-8">
          <div class="flex items-center gap-3 mb-6 lg:hidden">
            <div class="w-10 h-10 rounded-md flex items-center justify-center bg-brand text-white font-bold">N</div>
            <div>
              <div class="font-semibold text-gray-800">宏运物流</div>
              <div class="text-xs text-gray-400">TMS运输管理系统</div>
            </div>
          </div>

          <!-- 模式切换 -->
          <div class="flex items-center gap-2 mb-4">
            <button
              :class="['px-3 py-1 rounded-md', mode === 'password' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600']"
              @click="mode = 'password'"
              type="button"
            >
              账号密码登录
            </button>
            <button
              :class="['px-3 py-1 rounded-md', mode === 'phone' ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600']"
              @click="mode = 'phone'"
              type="button"
            >
              手机验证码登录
            </button>
          </div>

          <form @submit.prevent="onSubmit" class="space-y-4">
            <!-- 账号密码模式 -->
            <template v-if="mode === 'password'">
              <div>
                <label class="relative block">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <!-- user icon -->
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M5.121 17.804A9 9 0 0112 15a9 9 0 016.879 2.804M15 11a3 3 0 10-6 0 3 3 0 006 0z"/>
                    </svg>
                  </div>
                  <input
                    v-model="form.username"
                    type="text"
                    placeholder="请输入账号"
                    class="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </label>
              </div>

              <div>
                <label class="relative block">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <!-- lock icon -->
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M12 11c1.657 0 3-1.567 3-3.5S13.657 4 12 4 9 5.567 9 7.5 10.343 11 12 11zM5 11v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                    </svg>
                  </div>

                  <input
                    :type="showPassword ? 'text' : 'password'"
                    v-model="form.password"
                    placeholder="请输入密码"
                    class="w-full pl-10 pr-10 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  />

                  <button type="button" @click="toggleShow" class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg v-if="!showPassword" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                    </svg>
                    <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.98 9.98 0 012.43-4.14M6.88 6.88A9.97 9.97 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.967 9.967 0 01-4.02 5.27M3 3l18 18"/>
                    </svg>
                  </button>
                </label>
              </div>
            </template>

            <!-- 手机号验证码模式 -->
            <template v-else>
              <div>
                <label class="relative block">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M15 10l4.553-2.276A2 2 0 0122 9.618v6.764a2 2 0 01-1.447 1.894L16 20M3 7h10M7 21h8"/>
                    </svg>
                  </div>
                  <input
                    v-model="form.phone"
                    type="text"
                    placeholder="请输入手机号"
                    class="w-full pl-10 pr-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </label>
              </div>

              <div class="relative">
                <label class="relative block">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                    <!-- code icon -->
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m4 8h.01M12 6v.01"/>
                    </svg>
                  </div>
                  <input
                    v-model="form.code"
                    type="text"
                    placeholder="请输入验证码"
                    class="w-full pl-10 pr-28 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </label>

                <button
                  type="button"
                  @click="sendCode"
                  :disabled="sendingCode || countdown > 0 || !phoneValid"
                  class="absolute right-1 top-1/2 -translate-y-1/2 px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-700 disabled:opacity-60"
                >
                  <span v-if="countdown === 0">获取验证码</span>
                  <span v-else>{{ countdown }}s后重试</span>
                </button>
              </div>
            </template>

            <div class="flex items-center justify-between text-sm">
              <label class="flex items-center gap-2 text-gray-500">
                <input type="checkbox" v-model="form.remember" class="w-3 h-3 rounded border-gray-300" />
                <span>记住我（公共场所慎用）</span>
              </label>
              <a href="#" class="text-brand hover:underline">忘记密码?</a>
            </div>

            <div>
              <button type="submit" class="w-full py-2 bg-brand text-white rounded-md hover:opacity-95 transition">
                登录
              </button>
            </div>
          </form>

          <div v-if="error" class="mt-4 text-sm text-red-500">{{ error }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onBeforeUnmount } from 'vue'
import bg from '../public/1.jpg'
import { getCurrentInstance} from 'vue'
const { proxy } = getCurrentInstance()!
import { useRouter } from 'vue-router'


const primaryImage = bg
const route = useRouter()
const imageSrc = ref(primaryImage)

/* UI / form logic */
const mode = ref<'password'|'phone'>('password')
const showPassword = ref(false)
const error = ref('')

function toggleShow() { showPassword.value = !showPassword.value }

type FormState = { username: string; password: string; remember: boolean; phone: string; code: string }
const form = reactive<FormState>({ username: '', password: '', remember: false, phone: '', code: '' })

/* 验证码发送 / 倒计时 */
const sendingCode = ref(false)
const countdown = ref(0)
let timer: number | null = null

const phoneValid = computed(() => {
  // 简单校验：10-15 位数字。根据需要替换为更严格正则（如中国手机号 ^1\d{10}$）
  return /^\d{10,15}$/.test(form.phone.trim())
})

function startCountdown(sec = 60) {
  countdown.value = sec
  timer = window.setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1
    } else {
      if (timer) {
        clearInterval(timer)
        timer = null
      }
    }
  }, 1000)
}

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})

async function sendCode() {
  error.value = ''
  if (!phoneValid.value) {
    error.value = '请输入有效的手机号'
    return
  }
  if (countdown.value > 0) return

  sendingCode.value = true
  try {
   
  } catch (e) {
    console.error('sendCode err', e)
    error.value = '验证码发送异常，请稍后重试'
  } finally {
    sendingCode.value = false
  }
}

/* 提交登录 */




async function onSubmit() {
  error.value = ''
 
  if (!form.username) {
    error.value = '请输入账号'
    return
  }
  if (!form.password) {
    error.value = '请输入密码'
    return
  }
  try {
    // 注意请求地址与后端保持一致，比如/login
    const data = await proxy.$http.post('/login', {
      username: form.username,
      password: form.password
    })
    // 你封装的响应拦截器会拿走外层 code,message 直接返回 data
    // 因为你后端返回时token等在外层包data内部
    // 建议后端返回结构的data字段包token和用户信息，在此拿出并存
    // 这里按后端修改后，假设data形如{ user:{}, accessToken:"..." }
    if (data && data.accessToken) {
      localStorage.setItem('token', data.accessToken)
      localStorage.setItem('userInfo', JSON.stringify(data.user))
      route.push('/') // 登录成功跳首页
    } else {
      error.value = '登录失败，数据异常'
    }
  } catch (e: any) {
    error.value = e.message || '登录异常'
  }
}
</script>

<style>
:root { --brand: #f36b3b; }
.bg-brand { background-color: var(--brand); }
.text-brand { color: var(--brand); }
</style>