<script setup lang="ts">
import { ref } from 'vue'

// 统计数据
const stats = ref([
  { label: '今日公司数', value: 28, subText: '今日新增 2 (+7.7%)', icon: '📊', color: 'bg-blue-50', iconColor: 'text-blue-500' },
  { label: '在岗公司', value: 16, subText: '今日增减 2 (+14.3%)', icon: '✅', color: 'bg-green-50', iconColor: 'text-green-500' },
  { label: '待审评任务', value: 7, icon: '📋', color: 'bg-orange-50', iconColor: 'text-orange-500', subText: '待今日截止1' },
  { label: '运单公司', value: 2, icon: '🏠', color: 'bg-red-50', iconColor: 'text-red-500', subText: '增减量 (+12.5%)' }
])

// 当前月份
const currentMonth = ref('2023年6月')

// 日历数据
const calendarDays = ref([
  { day: 28, isOtherMonth: true },
  { day: 29, isOtherMonth: true },
  { day: 30, isOtherMonth: true },
  { day: 31, isOtherMonth: true },
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15 },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20, isHighlight: true },
  { day: 21 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 1, isOtherMonth: true }
])

const weekDays = ['日', '一', '二', '三', '四', '五', '六']
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- 顶部统计卡片 -->
    <div class="grid grid-cols-4 gap-6 mb-6">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
      >
        <div class="flex items-start justify-between">
          <div>
            <div class="text-gray-500 text-sm mb-2">{{ stat.label }}</div>
            <div class="text-3xl font-bold text-gray-800 mb-1">{{ stat.value }}</div>
            <div class="text-xs text-gray-400">{{ stat.subText }}</div>
          </div>
          <div :class="[stat.color, 'w-12 h-12 rounded-lg flex items-center justify-center']">
            <span :class="[stat.iconColor, 'text-2xl']">{{ stat.icon }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 中间内容区域 -->
    <div class="grid grid-cols-2 gap-6 mb-6">
      <!-- 运单审批日历视图 -->
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-800">运单审批日历视图</h3>
          <div class="flex items-center gap-2">
            <button class="px-2 py-1 hover:bg-gray-100 rounded">
              <span class="text-gray-600">◀</span>
            </button>
            <span class="text-sm font-medium text-gray-700">{{ currentMonth }}</span>
            <button class="px-2 py-1 hover:bg-gray-100 rounded">
              <span class="text-gray-600">▶</span>
            </button>
          </div>
        </div>

        <!-- 日历表格 -->
        <div class="calendar">
          <!-- 星期标题 -->
          <div class="grid grid-cols-7 gap-2 mb-2">
            <div 
              v-for="day in weekDays" 
              :key="day"
              class="text-center text-sm font-medium text-gray-600 py-2"
            >
              {{ day }}
            </div>
          </div>

          <!-- 日期格子 -->
          <div class="grid grid-cols-7 gap-2">
            <div 
              v-for="(date, index) in calendarDays" 
              :key="index"
              :class="[
                'aspect-square flex items-center justify-center text-sm rounded-lg cursor-pointer transition-colors relative',
                date.isOtherMonth ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-50',
                date.isHighlight ? 'bg-orange-500 text-white hover:bg-orange-600' : ''
              ]"
            >
              {{ date.day }}
              <span v-if="date.isHighlight" class="absolute bottom-1 text-xs">•</span>
            </div>
          </div>

          <!-- 日历底部统计 -->
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="text-center">
              <span class="text-4xl font-bold text-orange-500">1696</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 近7天运单审批趋势 -->
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">近7天运单审批趋势</h3>
        
        <!-- 图例 -->
        <div class="flex items-center gap-6 mb-4">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-blue-500"></span>
            <span class="text-sm text-gray-600">审批中数</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-green-500"></span>
            <span class="text-sm text-gray-600">已通过数</span>
          </div>
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-orange-500"></span>
            <span class="text-sm text-gray-600">已驳回数</span>
          </div>
        </div>

        <!-- 趋势图占位 -->
        <div class="h-64 bg-gradient-to-b from-orange-50 via-green-50 to-blue-50 rounded-lg flex items-center justify-center relative overflow-hidden">
          <!-- 模拟折线图 -->
          <svg class="w-full h-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <!-- 橙色区域 -->
            <path d="M 0 60 Q 100 50 200 55 T 400 60 L 400 0 L 0 0 Z" fill="rgba(251, 146, 60, 0.3)" />
            <!-- 绿色区域 -->
            <path d="M 0 120 Q 100 110 200 115 T 400 120 L 400 60 Q 300 55 200 55 Q 100 50 0 60 Z" fill="rgba(34, 197, 94, 0.3)" />
            <!-- 蓝色区域 -->
            <path d="M 0 180 Q 100 170 200 175 T 400 180 L 400 120 Q 300 115 200 115 Q 100 110 0 120 Z" fill="rgba(59, 130, 246, 0.3)" />
            
            <!-- 折线 -->
            <polyline points="0,60 100,50 200,55 300,60 400,60" fill="none" stroke="#f97316" stroke-width="2" />
            <polyline points="0,120 100,110 200,115 300,120 400,120" fill="none" stroke="#22c55e" stroke-width="2" />
            <polyline points="0,180 100,170 200,175 300,180 400,180" fill="none" stroke="#3b82f6" stroke-width="2" />
          </svg>
          
          <!-- X轴日期标签 -->
          <div class="absolute bottom-2 left-0 right-0 flex justify-around text-xs text-gray-500">
            <span>7/16</span>
            <span>7/17</span>
            <span>7/18</span>
            <span>7/19</span>
            <span>7/20</span>
            <span>7/21</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部饼图区域 -->
    <div class="grid grid-cols-2 gap-6">
      <!-- 订单类型分布 -->
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">订单类型分布</h3>
        <div class="flex items-center justify-center h-64">
          <!-- 饼图占位 -->
          <div class="relative w-48 h-48">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <!-- 蓝色扇形 -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="20" 
                      stroke-dasharray="75 251" stroke-dashoffset="0" />
              <!-- 橙色扇形 -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" stroke-width="20" 
                      stroke-dasharray="50 251" stroke-dashoffset="-75" />
              <!-- 绿色扇形 -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" stroke-width="20" 
                      stroke-dasharray="63 251" stroke-dashoffset="-125" />
              <!-- 红色扇形 -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" stroke-width="20" 
                      stroke-dasharray="63 251" stroke-dashoffset="-188" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-800">100%</div>
              </div>
            </div>
          </div>
          
          <!-- 图例 -->
          <div class="ml-8 space-y-3">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-blue-500"></span>
              <span class="text-sm text-gray-600">出差类</span>
              <span class="text-sm font-medium text-gray-800">30%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-orange-500"></span>
              <span class="text-sm text-gray-600">培训类</span>
              <span class="text-sm font-medium text-gray-800">20%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-green-500"></span>
              <span class="text-sm text-gray-600">会议类</span>
              <span class="text-sm font-medium text-gray-800">25%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-red-500"></span>
              <span class="text-sm text-gray-600">其他类</span>
              <span class="text-sm font-medium text-gray-800">25%</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 收款单类型分布 -->
      <div class="bg-white rounded-lg p-6 shadow-sm">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">收款单类型分布</h3>
        <div class="flex items-center justify-center h-64">
          <!-- 饼图占位 -->
          <div class="relative w-48 h-48">
            <svg class="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <!-- 紫色扇形 -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" stroke-width="20" 
                      stroke-dasharray="94 251" stroke-dashoffset="0" />
              <!-- 橙色扇形 -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f97316" stroke-width="20" 
                      stroke-dasharray="94 251" stroke-dashoffset="-94" />
              <!-- 绿色扇形 -->
              <circle cx="50" cy="50" r="40" fill="none" stroke="#22c55e" stroke-width="20" 
                      stroke-dasharray="63 251" stroke-dashoffset="-188" />
            </svg>
            <div class="absolute inset-0 flex items-center justify-center">
              <div class="text-center">
                <div class="text-2xl font-bold text-gray-800">100%</div>
              </div>
            </div>
          </div>
          
          <!-- 图例 -->
          <div class="ml-8 space-y-3">
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-purple-500"></span>
              <span class="text-sm text-gray-600">应付款</span>
              <span class="text-sm font-medium text-gray-800">37.5%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-orange-500"></span>
              <span class="text-sm text-gray-600">应收款</span>
              <span class="text-sm font-medium text-gray-800">37.5%</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="w-3 h-3 rounded-full bg-green-500"></span>
              <span class="text-sm text-gray-600">已完成</span>
              <span class="text-sm font-medium text-gray-800">25%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.calendar {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>