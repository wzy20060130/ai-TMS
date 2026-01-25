<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as echarts from 'echarts'

const trendChartRef = ref<HTMLDivElement | null>(null)
let trendChart: echarts.ECharts | null = null // 保存图表实例
const pieRef = ref<HTMLDivElement | null>(null)
const pieRef1 = ref<HTMLDivElement | null>(null)
  const DateValue = ref()
// 统计数据
const stats = ref([
  { 
    label: '今日公司数', 
    value: 28, 
    subText: '今日新增 2 (+7.7%)', 
    icon: '💬', 
    color: '#E3F2FD', 
    iconColor: '#2196F3' 
  },
  { 
    label: '在岗司机', 
    value: 16, 
    subText: '今日增减数 2 (+14.3%)', 
    icon: '🚗', 
    color: '#E8F5E9', 
    iconColor: '#4CAF50' 
  },
  { 
    label: '待审评任务', 
    value: 7, 
    subText: '⚠️ 待今日截止1', 
    icon: '📋', 
    color: '#FFF3E0', 
    iconColor: '#FF9800' 
  },
  { 
    label: '运单公司', 
    value: 2, 
    subText: '📈 增减量 (+12.5%)', 
    icon: '🏠', 
    color: '#FFEBEE', 
    iconColor: '#F44336' 
  }
])


// 快捷功能
const quickActions = ref([
  { name: '订单管理', icon: '📋', color: '#FF6B6B' },
  { name: '智能合单', icon: '🔄', color: '#FF9800' },
  { name: '数据导出', icon: '📊', color: '#2196F3' },
  { name: '内容管理', icon: '📁', color: '#FF9800' },
  { name: '车辆管理', icon: '🚗', color: '#FF6B6B' }
])

// 物流跟踪列表
const trackingList = ref([
  { id: 'TF2023021003', tags: ['北京', '上海', '3吨', '7小时车'] },
  { id: 'TF2023021004', tags: ['北京', '天津', '1吨', '半挂车'] },
  { id: 'TF2023021005', tags: ['北京', '南京', '2吨', '7小时车'] },
  { id: 'TF2023021006', tags: ['北京', '天津', '2吨', '半挂车'] }
])

// 司机任务列表
const driverTasks = ref([
  { 
    name: '张三', 
    id: '驾驶员12345',
    phone: '138****1234',
    tags: ['物流运输', '快递']
  },
  { 
    name: '李四', 
    id: '驾驶员7890',
    phone: '139****5678',
    tags: ['物流运输', '快递']
  },
  { 
    name: '王五', 
    id: '驾驶员2468',
    phone: '136****9012',
    tags: ['物流运输', '快递']
  }
])

// 待办事项
const todoList = ref([
  { 
    icon: '📅',
    title: '物流合同续签', 
    desc: '明天下午1点与客户签订物流合同续签',
    bgColor: '#E3F2FD'
  },
  { 
    icon: '📅',
    title: '订单管理培训', 
    desc: '明天下午2点进行订单管理系统培训',
    bgColor: '#E3F2FD'
  },
  { 
    icon: '📅',
    title: '车辆年检提醒', 
    desc: '本周五前完成3辆货车的年检工作',
    bgColor: '#E3F2FD'
  },
  { 
    icon: '📅',
    title: '客户回访调研', 
    desc: '本周内完成重点客户满意度调研',
    bgColor: '#E3F2FD'
  }
])

// 系统通知
const notifications = ref([
  { 
    type: 'info', 
    icon: 'ℹ️',
    title: '系统升级通知', 
    desc: '【系统升级】明天凌晨2点进行系统升级维护，预计持续2小时', 
    time: '1小时 前',
    bgColor: '#E3F2FD'
  },
  { 
    type: 'success', 
    icon: '✅',
    title: '运单审批通过', 
    desc: '运单TF-TASK-2023051005已审批通过，请及时安排发货', 
    time: '2小时 前',
    bgColor: '#E8F5E9'
  },
  { 
    type: 'warning', 
    icon: '⚠️',
    title: 'TASK-2023051005运单超时提醒', 
    desc: '运单TASK-2023051005已超时，请尽快处理，避免影响客户体验', 
    time: '3小时 前',
    bgColor: '#FFF3E0'
  }
])

const getTendency = () => {
   if (!trendChartRef.value) return
   trendChart = echarts.init(trendChartRef.value)

  const option = {
  // 全局颜色池（更柔和的配色）
  color: ['#4D81FF', '#36CFC9', '#FF7D00'], // 蓝、青、橙（更高级）

  title: {
    text: '近七天运单审批趋势',
    textStyle: {
      fontSize: 16,
      fontWeight: 'normal',
      color: '#333'
    },
    left: 'center',
    top: 10
  },

  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow', // 改成阴影，更柔和
      shadowStyle: {
        color: 'rgba(0, 0, 0, 0.05)'
      }
    },
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderColor: '#eee',
    borderWidth: 1,
    textStyle: {
      color: '#666'
    },
    padding: [8, 12]
  },

  legend: {
    data: [
      { name: '审批中数', icon: 'circle' },
      { name: '已通过数', icon: 'rect' },
      { name: '已驳回数', icon: 'triangle' }
    ],
    itemWidth: 12,
    itemHeight: 12,
    top: 30,
    left: 'center',
    textStyle: {
      color: '#666',
      fontSize: 12
    }
  },

  grid: {
    left: '5%',
    right: '5%',
    top: '15%',
    bottom: '10%',
    containLabel: true
  },

  xAxis: [
    {
      type: 'category',
      boundaryGap: false,
      data: ['7/15', '7/16', '7/17', '7/18', '7/19', '7/20', '7/21'],
      axisLine: {
        show: true,
        lineStyle: {
          color: '#eee' // 弱化轴线
        }
      },
      axisTick: {
        show: false // 隐藏刻度
      },
      axisLabel: {
        color: '#999',
        fontSize: 11
      }
    }
  ],

  yAxis: [
    {
      type: 'value',
      axisLine: {
        show: false // 隐藏 y 轴线
      },
      axisTick: {
        show: false // 隐藏刻度
      },
      splitLine: {
        lineStyle: {
          color: '#f5f5f5', // 弱化网格线
          type: 'dashed' // 虚线更柔和
        }
      },
      axisLabel: {
        color: '#999',
        fontSize: 11
      }
    }
  ],

  series: [
    // 审批中数（最底层）
    {
      name: '审批中数',
      type: 'line',
      stack: 'Total',
      smooth: true, // ✅ 平滑曲线，更柔和
      symbol: 'circle', // 点的形状
      symbolSize: 6, // ✅ 点更小
      lineStyle: {
        width: 2, // ✅ 线条更细
        color: '#4D81FF'
      },
      itemStyle: {
        color: '#4D81FF'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(77, 129, 255, 0.3)' }, // 上深
          { offset: 1, color: 'rgba(77, 129, 255, 0.05)' } // 下浅
        ])
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#fff'
        }
      },
      data: [70, 60, 65, 70, 65, 60, 65]
    },
    // 已通过数（中间层）
    {
      name: '已通过数',
      type: 'line',
      stack: 'Total',
      smooth: true,
      symbol: 'rect',
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: '#36CFC9'
      },
      itemStyle: {
        color: '#36CFC9'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(54, 207, 201, 0.3)' },
          { offset: 1, color: 'rgba(54, 207, 201, 0.05)' }
        ])
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#fff'
        }
      },
      data: [70, 70, 70, 70, 70, 70, 70]
    },
    // 已驳回数（最上层）
    {
      name: '已驳回数',
      type: 'line',
      stack: 'Total',
      smooth: true,
      symbol: 'triangle',
      symbolSize: 6,
      lineStyle: {
        width: 2,
        color: '#FF7D00'
      },
      itemStyle: {
        color: '#FF7D00'
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          { offset: 0, color: 'rgba(255, 125, 0, 0.3)' },
          { offset: 1, color: 'rgba(255, 125, 0, 0.05)' }
        ])
      },
      emphasis: {
        focus: 'series',
        itemStyle: {
          borderWidth: 2,
          borderColor: '#fff'
        }
      },
      data: [70, 70, 70, 70, 70, 70, 70]
    }
  ]
};

    trendChart.setOption(option)
}
 
   const getPie = () => {
  if (!pieRef.value) return
  // 饼图用独立实例，不要和趋势图共用 trendChart
  const pieChart = echarts.init(pieRef.value)

  const option = {
    // 全局颜色池（用你项目的配色，柔和不刺眼）
    color: [
      '#FF6B6B', '#FF9800', '#2196F3', '#4CAF50', 
      '#9C27B0', '#00BCD4', '#F44336', '#795548'
    ],

    //  图例放在右侧，不挤图表
    legend: {
      orient: 'vertical', // 垂直排列
      right: 10, // 右侧留白
      top: 'center', // 垂直居中
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#666',
        fontSize: 12
      }
    },

    //  去掉多余工具条，保持简洁
    toolbox: {
      show: false // 隐藏工具条
    },

    //  系列配置（玫瑰图核心）
    series: [
      {
        name: '订单类型分布',
        type: 'pie',
        radius: ['45%','70%'], //  内半径30%，外半径70%，有留白
        center: ['40%', '50%'], //  饼图左移，给图例留空间
        roseType: 'area', // 面积模式（按数值大小显示半径）
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4, // 圆角适中，不笨重
          borderColor: '#fff', // 白色边框，更精致
          borderWidth: 2 // 边框宽度
        },
        label: {
          show: false, // 隐藏标签，保持简洁
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false // 隐藏引导线，更干净
        },
        data: [
          { value: 38, name: '待调度' },
          { value: 38, name: '运输中' },
          { value: 38, name: '已取消' },
          { value: 38, name: '已完成' },
        ]
      }
    ]
  }

  pieChart.setOption(option)

  window.addEventListener('resize', () => {
    pieChart.resize()
  })
}

   const getPie1 = () => {
  if (!pieRef1.value) return
  // 饼图用独立实例，不要和趋势图共用 trendChart
  const pieChart1 = echarts.init(pieRef1.value)

  const option = {
    // 全局颜色池（用你项目的配色，柔和不刺眼）
    color: [
      '#0ca8df', '#43d966', '#ffa651'
    ],

    //  图例放在右侧，不挤图表
    legend: {
      orient: 'vertical', // 垂直排列
      right: 10, // 右侧留白
      top: 'center', // 垂直居中
      itemWidth: 12,
      itemHeight: 12,
      textStyle: {
        color: '#666',
        fontSize: 12
      }
    },

    //  去掉多余工具条，保持简洁
    toolbox: {
      show: false // 隐藏工具条
    },

    //  系列配置（玫瑰图核心）
    series: [
      {
        name: '订单类型分布',
        type: 'pie',
        radius: ['30%', '70%'], //  内半径30%，外半径70%，有留白
        center: ['40%', '50%'], //  饼图左移，给图例留空间
        roseType: 'area', // 面积模式（按数值大小显示半径）
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4, // 圆角适中，不笨重
          borderColor: '#fff', // 白色边框，更精致
          borderWidth: 2 // 边框宽度
        },
        label: {
          show: false, // 隐藏标签，保持简洁
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false // 隐藏引导线，更干净
        },
        data: [
          { value: 30, name: '应对单' },
          { value: 55, name: '运输单' },
          { value: 45, name: '结账单' },
        ]
      }
    ]
  }

  pieChart1.setOption(option)

  window.addEventListener('resize', () => {
    pieChart1.resize()
  })
}
onMounted(() => {
  getTendency()
  getPie()
  getPie1()
})
</script>

<template>
  <div class="workbench-container">
    <!-- 顶部统计卡片 -->
    <div class="stats-grid">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="stat-card"
      >
        <div class="stat-content">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-subtext">{{ stat.subText }}</div>
          </div>
        <div class="stat-icon-wrapper" :style="{ backgroundColor: stat.color }">
          <span class="stat-icon" :style="{ color: stat.iconColor }">{{ stat.icon }}</span>
        </div>
      </div>
    </div>

    <!-- 中间内容区域 -->
    <div class="content-grid">
      <!-- 左侧：日历和订单列表 -->
      <div class="left-section">
        <div class="calendar-wrapper">
          <el-calendar v-model="DateValue" />
        </div>
      </div>

      <!-- 右侧：趋势图和饼图 -->
      <div class="right-section">
      <!-- 近7天运单审批趋势 -->
        <div class="trend-card">
          <div ref="trendChartRef" style="width: 100%; height: 300px;"></div>
        </div>

        <!-- 饼图区域 -->
        <div class="pie-charts">
          <!-- 订单类型分布 -->
          <div class="pie-card">
            <div ref="pieRef" style="width: 100%; height: 220px;"></div>
          </div>

          <!-- 收款单类型分布 -->
          <div class="pie-card">
           <div ref="pieRef1" style="width: 100%; height: 240px"></div>
          </div>
        </div>

        <!-- 快捷功能 -->
        <div class="quick-actions">
          <h3 class="quick-title">快捷功能</h3>
          <div class="quick-grid">
            <div 
              v-for="(action, index) in quickActions" 
              :key="index"
              class="quick-item"
            >
              <div class="quick-icon" :style="{ backgroundColor: action.color }">
                <span class="icon-text">{{ action.icon }}</span>
                <span class="icon-badge">⚡</span>
              </div>
              <div class="quick-name">{{ action.name }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 底部三栏区域 -->
    <div class="bottom-grid">
      <!-- 物流跟踪界面 -->
      <div class="tracking-card">
        <div class="card-header-with-action">
          <h3 class="card-title">物流跟踪界面</h3>
          <a href="#" class="view-all">查看全部</a>
        </div>
        <div class="tracking-list">
          <div v-for="(item, index) in trackingList" :key="index" class="tracking-item">
            <div class="tracking-header">
              <span class="tracking-id">{{ item.id }}</span>
              <button class="add-btn">+</button>
            </div>
            <div class="tracking-tags">
              <span v-for="(tag, i) in item.tags" :key="i" class="tag">{{ tag }}</span>
            </div>
              </div>
            </div>
          </div>
          
      <!-- 司机任务分配 -->
      <div class="driver-card">
        <div class="card-header-with-action">
          <h3 class="card-title">司机任务分配</h3>
          <div class="header-actions">
            <a href="#" class="action-link">查看全部</a>
            <a href="#" class="action-link">最近浏览</a>
          </div>
        </div>
        <div class="driver-list">
          <div v-for="(driver, index) in driverTasks" :key="index" class="driver-item">
            <div class="driver-avatar">
              <div class="avatar-placeholder">👤</div>
            </div>
            <div class="driver-info">
              <div class="driver-name">{{ driver.name }} [{{ driver.id }}]</div>
              <div class="driver-meta">
                <span class="driver-phone">{{ driver.phone }}</span>
                <span class="driver-tags">
                  <span v-for="(tag, i) in driver.tags" :key="i" class="tag-small">{{ tag }}</span>
                </span>
            </div>
            </div>
            <div class="driver-actions">
              <button class="btn-primary">查看详情</button>
              <button class="btn-secondary">联系司机</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 待办事项和系统通知 -->
      <div class="todo-notification-card">
        <!-- 待办事项 -->
        <div class="todo-section">
          <div class="section-header">
            <h3 class="section-title">待办事项</h3>
            <a href="#" class="view-all">查看全部</a>
          </div>
          <div class="todo-list">
            <div v-for="(todo, index) in todoList" :key="index" class="todo-item">
              <div class="todo-icon" :style="{ backgroundColor: todo.bgColor }">
                <span class="icon-calendar">{{ todo.icon }}</span>
              </div>
              <div class="todo-content">
                <div class="todo-title">{{ todo.title }}</div>
                <div class="todo-desc">{{ todo.desc }}</div>
              </div>
              <button class="btn-action">立即处理</button>
            </div>
          </div>
        </div>
          
        <!-- 系统通知 -->
        <div class="notification-section">
          <div class="section-header">
            <h3 class="section-title">系统通知 (2)</h3>
            <a href="#" class="view-all">查看全部</a>
          </div>
          <div class="notification-list">
            <div v-for="(notif, index) in notifications" :key="index" class="notification-item">
              <div class="notif-icon" :style="{ backgroundColor: notif.bgColor }">
                <span>{{ notif.icon }}</span>
              </div>
              <div class="notif-content">
                <div class="notif-title">{{ notif.title }}</div>
                <div class="notif-desc">{{ notif.desc }}</div>
                <div class="notif-time">{{ notif.time }}</div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.workbench-container {
  width: 100%;
  padding: 0;
  background: #f8f9fa;
  min-height: 100vh;
}

/* 顶部统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  border: 1px solid #f0f0f0;
}

.stat-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #8c8c8c;
  margin-bottom: 8px;
  font-weight: 400;
}

.stat-value {
  font-size: 32px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 6px;
  line-height: 1.2;
}

.stat-subtext {
  font-size: 12px;
  color: #bfbfbf;
}

.stat-icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 12px;
  flex-shrink: 0;
}

.stat-icon {
  font-size: 24px;
}

/* 中间内容区域 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 16px;
}

.left-section,
.right-section {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 日历容器样式 */
.calendar-wrapper {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.calendar-wrapper :deep(.el-calendar) {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.calendar-wrapper :deep(.el-calendar__header) {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 16px;
}

.calendar-wrapper :deep(.el-calendar__body) {
  flex: 1;
  padding: 0;
}

.calendar-wrapper :deep(.el-calendar-table) {
  height: 100%;
  table-layout: fixed;
}

.calendar-wrapper :deep(.el-calendar-table thead th) {
  padding: 12px 0;
  font-weight: 600;
  color: #8c8c8c;
  font-size: 13px;
}

.calendar-wrapper :deep(.el-calendar-table tbody tr) {
  height: 80px;
}

.calendar-wrapper :deep(.el-calendar-table tbody td) {
  height: 80px !important;
  min-height: 80px;
  max-height: 80px;
  padding: 0 !important;
  vertical-align: middle;
  box-sizing: border-box;
}

.calendar-wrapper :deep(.el-calendar-table tbody td.is-selected) {
  background: #e6f7ff;
  height: 80px !important;
  min-height: 80px;
  max-height: 80px;
}

.calendar-wrapper :deep(.el-calendar-table tbody td.is-today) {
  height: 80px !important;
  min-height: 80px;
  max-height: 80px;
}

.calendar-wrapper :deep(.el-calendar-table .el-calendar-day) {
  height: 80px !important;
  min-height: 80px;
  max-height: 80px;
  padding: 0;
  margin: 0;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

.calendar-wrapper :deep(.el-calendar-table .el-calendar-day .el-calendar-day__content) {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  box-sizing: border-box;
}

.calendar-wrapper :deep(.el-calendar-table .el-calendar-day:hover) {
  background: #f5f5f5;
}

.calendar-wrapper :deep(.el-calendar-table td.is-today .el-calendar-day) {
  color: #1890ff;
  font-weight: 600;
  height: 80px !important;
  min-height: 80px;
  max-height: 80px;
}

/* 日历卡片 */
.calendar-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  height: fit-content;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #262626;
  margin: 0;
}

.month-selector {
  display: flex;
  align-items: center;
  gap: 12px;
}

.month-btn {
  background: #fafafa;
  border: 1px solid #e8e8e8;
  color: #595959;
  cursor: pointer;
  padding: 4px 10px;
  border-radius: 4px;
  transition: all 0.3s;
  font-size: 12px;
}

.month-btn:hover {
  background: #f0f0f0;
  color: #262626;
  border-color: #d9d9d9;
}

.month-text {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
  min-width: 90px;
  text-align: center;
}

/* 日历 */
.calendar {
  width: 100%;
}

.week-header {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
  margin-bottom: 8px;
}

.week-day {
  text-align: center;
  font-size: 12px;
  color: #8c8c8c;
  padding: 6px 0;
  font-weight: 500;
}

.calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 4px;
}

.calendar-day {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  color: #262626;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  position: relative;
  background: #fafafa;
  border: 1px solid #f0f0f0;
}

.calendar-day:hover {
  background: #e6f7ff;
  border-color: #91d5ff;
}

.calendar-day.other-month {
  color: #d9d9d9;
  background: transparent;
  border-color: transparent;
}

.calendar-day.highlight {
  background: #ff6b35;
  color: white;
  font-weight: 600;
  border-color: #ff6b35;
  box-shadow: 0 2px 4px rgba(255, 107, 53, 0.3);
}

.day-dot {
  position: absolute;
  bottom: 3px;
  font-size: 6px;
}

/* 订单列表 */
.order-list-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.order-header {
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f5f5f5;
}

.order-title {
  font-size: 13px;
  color: #8c8c8c;
  margin: 0;
  font-weight: 500;
}

.order-item {
  padding: 16px 0;
  border-bottom: 1px solid #fafafa;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
}

.order-item:hover {
  background: #fafafa;
  margin: 0 -12px;
  padding: 16px 12px;
  border-radius: 6px;
}

.order-item:last-child {
  border-bottom: none;
}

.order-left {
  flex: 1;
}

.order-id {
  font-size: 13px;
  color: #262626;
  font-weight: 600;
  margin-bottom: 6px;
}

.order-route {
  font-size: 12px;
  color: #8c8c8c;
}

.order-right {
  text-align: right;
}

.order-status {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
}

.order-info {
  font-size: 11px;
  color: #bfbfbf;
}

/* 趋势图卡片 */
.trend-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.legend {
  display: flex;
  gap: 20px;
  margin: 12px 0 20px 0;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.legend-text {
  font-size: 12px;
  color: #8c8c8c;
}

.trend-chart {
  position: relative;
}

.chart-wrapper {
  width: 100%;
  height: 200px;
  background: white;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #f0f0f0;
}

.chart-svg {
  width: 100%;
  height: 100%;
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  padding: 10px 0 0 0;
  font-size: 12px;
  color: #bfbfbf;
  background: white;
}

/* 饼图区域 */
.pie-charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.pie-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.pie-title {
  font-size: 15px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
}

.pie-content {
  display: flex;
  align-items: center;
  gap: 20px;
}

.pie-chart-wrapper {
  width: 120px;
  height: 120px;
  flex-shrink: 0;
}

.pie-svg {
  width: 100%;
  height: 100%;
}

.pie-legend {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.pie-legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.pie-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  flex-shrink: 0;
}

.pie-label {
  font-size: 12px;
  color: #8c8c8c;
  flex: 1;
}

.pie-percent {
  font-size: 12px;
  color: #262626;
  font-weight: 600;
}

/* 快捷功能 */
.quick-actions {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.quick-title {
  font-size: 15px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
}

.quick-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  background: #fafafa;
  cursor: pointer;
  transition: all 0.3s;
  border: 1px solid #f5f5f5;
}

.quick-item:hover {
  background: #f0f0f0;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #e8e8e8;
}

.quick-icon {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-bottom: 10px;
  position: relative;
}

.icon-text {
  font-size: 24px;
}

.icon-badge {
  position: absolute;
  top: -2px;
  right: -2px;
  font-size: 14px;
}

.quick-name {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

/* 数据统计概览卡片 */
.stats-summary-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  margin-top: 16px;
}

.stats-summary-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  margin-top: 16px;
}

.summary-item {
  padding: 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  text-align: center;
  color: white;
  transition: all 0.3s;
}

.summary-item:nth-child(2) {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
}

.summary-item:nth-child(3) {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
}

.summary-item:nth-child(4) {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
}

.summary-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.summary-label {
  font-size: 12px;
  opacity: 0.9;
  margin-bottom: 6px;
}

.summary-value {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 6px;
}

.summary-trend {
  font-size: 11px;
  opacity: 0.9;
}

.summary-trend.up {
  color: #fff;
}

.summary-trend.down {
  color: #ffeb3b;
}

/* 底部三栏区域 */
.bottom-grid {
  display: grid;
  grid-template-columns: 1fr 1.2fr 1fr;
  gap: 16px;
  margin-top: 16px;
}

/* 物流跟踪界面 */
.tracking-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.card-header-with-action {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.view-all {
  font-size: 12px;
  color: #1890ff;
  text-decoration: none;
  transition: color 0.3s;
}

.view-all:hover {
  color: #40a9ff;
  text-decoration: underline;
}

.tracking-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.tracking-item {
  padding: 14px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #f5f5f5;
  transition: all 0.2s;
}

.tracking-item:hover {
  background: #f5f5f5;
  border-color: #e8e8e8;
}

.tracking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.tracking-id {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
}

.add-btn {
  width: 22px;
  height: 22px;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  background: white;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
  color: #8c8c8c;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.add-btn:hover {
  background: #1890ff;
  color: white;
  border-color: #1890ff;
}

.tracking-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.tag {
  padding: 3px 10px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  font-size: 11px;
  color: #595959;
}

/* 司机任务分配 */
.driver-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.action-link {
  font-size: 12px;
  color: #1890ff;
  text-decoration: none;
  transition: color 0.3s;
}

.action-link:hover {
  color: #40a9ff;
  text-decoration: underline;
}

.driver-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.driver-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #f5f5f5;
  transition: all 0.2s;
}

.driver-item:hover {
  background: #f5f5f5;
  border-color: #e8e8e8;
}

.driver-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background: #e6f7ff;
}

.driver-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #1890ff;
}

.driver-info {
  flex: 1;
}

.driver-name {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 5px;
}

.driver-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  color: #bfbfbf;
}

.driver-phone {
  color: #8c8c8c;
}

.driver-tags {
  display: flex;
  gap: 5px;
}

.tag-small {
  padding: 2px 6px;
  background: white;
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  font-size: 10px;
  color: #595959;
}

.driver-actions {
  display: flex;
  gap: 6px;
}

.btn-primary {
  padding: 5px 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-primary:hover {
  background: #40a9ff;
}

.btn-secondary {
  padding: 5px 12px;
  background: white;
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: #e6f7ff;
  border-color: #40a9ff;
  color: #40a9ff;
}

/* 待办事项和系统通知 */
.todo-notification-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-title {
  font-size: 15px;
  font-weight: 600;
  color: #262626;
  margin: 0;
}

.todo-list,
.notification-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.todo-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #f5f5f5;
  transition: all 0.2s;
}

.todo-item:hover {
  background: #f5f5f5;
  border-color: #e8e8e8;
}

.todo-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e6f7ff;
  border-radius: 6px;
  flex-shrink: 0;
  font-size: 14px;
}

.todo-content {
  flex: 1;
}

.todo-title {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.todo-desc {
  font-size: 11px;
  color: #8c8c8c;
  line-height: 1.5;
}

.btn-action {
  padding: 5px 12px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 11px;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.3s;
}

.btn-action:hover {
  background: #40a9ff;
}

.notification-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
  border: 1px solid #f5f5f5;
  transition: all 0.2s;
}

.notification-item:hover {
  background: #f5f5f5;
  border-color: #e8e8e8;
}

.notif-icon {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  flex-shrink: 0;
  font-size: 14px;
}

.notif-icon.notif-info {
  background: #e6f7ff;
}

.notif-icon.notif-success {
  background: #f6ffed;
}

.notif-icon.notif-warning {
  background: #fffbe6;
}

.notif-content {
  flex: 1;
}

.notif-title {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.notif-desc {
  font-size: 11px;
  color: #8c8c8c;
  line-height: 1.5;
  margin-bottom: 4px;
}

.notif-time {
  font-size: 10px;
  color: #bfbfbf;
}
</style>
