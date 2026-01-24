<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh, Download, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 统计数据
const stats = ref([
  {
    label: '总司机数',
    value: 46,
    change: '较上月 ↑ 2',
    icon: '🚚',
    color: '#E3F2FD'
  },
  {
    label: '今日在岗',
    value: 28,
    change: '出勤率 ↑ 92%',
    icon: '🚛',
    color: '#E8F5E9'
  },
  {
    label: '空闲中',
    value: 10,
    change: '较昨日 ↓ 2',
    icon: '🅿️',
    color: '#F3E5F5'
  },
  {
    label: '空闲',
    value: 5,
    change: '较昨日 ↑ 1',
    icon: '📋',
    color: '#FFF3E0'
  },
  {
    label: '证件即将到期',
    value: 8,
    change: '较上周增加3人',
    icon: '⚠️',
    color: '#FFEBEE'
  }
])

// 筛选条件
const filters = reactive({
  driverStatus: '',
  driverType: '',
  vehicleType: '',
  certificateStatus: '',
  workStatus: '',
  keyword: '',
  dateRange: []
})

// 司机状态选项
const driverStatusOptions = [
  { label: '全部', value: '' },
  { label: '在岗', value: '1' },
  { label: '休息', value: '2' },
  { label: '离职', value: '3' }
]

// 司机类型选项
const driverTypeOptions = [
  { label: '全部', value: '' },
  { label: '专职司机', value: '1' },
  { label: '兼职司机', value: '2' }
]

// 车辆类型选项
const vehicleTypeOptions = [
  { label: '全部', value: '' },
  { label: '厢式货车', value: '1' },
  { label: '平板车', value: '2' },
  { label: '冷藏车', value: '3' }
]

// 证件状态选项
const certificateStatusOptions = [
  { label: '全部', value: '' },
  { label: '正常', value: '1' },
  { label: '即将到期', value: '2' },
  { label: '已过期', value: '3' }
]

// 工作状态选项
const workStatusOptions = [
  { label: '全部', value: '' },
  { label: '运输中', value: '1' },
  { label: '空闲', value: '2' },
  { label: '休息', value: '3' }
]

// 司机列表
const driverList = ref([
  {
    id: 1,
    avatar: '👤',
    name: '张三',
    driverId: '13912345678',
    idCard: '310102198XXXXXX',
    certificateType: '全部',
    certificateTag: 'success',
    age: '12年',
    fleet: '快递一队',
    vehicle: '沪A-12345 厢式货车',
    vehicleTag: 'primary',
    status: '在岗',
    statusTag: 'success',
    workStatus: '运输中',
    workStatusTag: 'success',
    rating: 4.5,
    lastWorkTime: '2020-03-15 09:22',
    certExpireDate: '2023-05-10',
    actions: ['详情', '编辑']
  },
  {
    id: 2,
    avatar: '👤',
    name: '李四',
    driverId: '13987654321',
    idCard: '310102198XXXXXX',
    certificateType: '即将到期',
    certificateTag: 'warning',
    age: '-1年',
    fleet: '快递二队',
    vehicle: '沪A-67890 厢式货车',
    vehicleTag: 'warning',
    status: '空闲',
    statusTag: 'info',
    workStatus: '空闲',
    workStatusTag: 'info',
    rating: 4.0,
    lastWorkTime: '2021-03-20 14:35',
    certExpireDate: '2023-05-11',
    actions: ['详情', '编辑']
  },
  {
    id: 3,
    avatar: '👤',
    name: '王五',
    driverId: '13812345678',
    idCard: '310103199XXXXXX',
    certificateType: '全部',
    certificateTag: 'success',
    age: '-7年',
    fleet: '长途运输队',
    vehicle: '沪A-54321 冷藏车',
    vehicleTag: 'success',
    status: '休息',
    statusTag: 'warning',
    workStatus: '休息',
    workStatusTag: 'warning',
    rating: 5.0,
    lastWorkTime: '2019-11-01 10:18',
    certExpireDate: '2023-09-09',
    actions: ['详情', '编辑']
  },
  {
    id: 4,
    avatar: '👤',
    name: '赵六',
    driverId: '13712345421',
    idCard: '310104199XXXXXX',
    certificateType: '已过期',
    certificateTag: 'danger',
    age: '-5年',
    fleet: '快递一队',
    vehicle: '本地',
    vehicleTag: '',
    status: '休息',
    statusTag: 'warning',
    workStatus: '休息',
    workStatusTag: 'warning',
    rating: 3.0,
    lastWorkTime: '2022-01-18 16:42',
    certExpireDate: '2023-04-25',
    actions: ['详情', '编辑']
  },
  {
    id: 5,
    avatar: '👤',
    name: '钱七',
    driverId: '13612345678',
    idCard: '310105199XXXXXX',
    certificateType: '全部',
    certificateTag: 'success',
    age: '10年',
    fleet: '快递一队',
    vehicle: '本地',
    vehicleTag: '',
    status: '在岗',
    statusTag: 'success',
    workStatus: '运输中',
    workStatusTag: 'success',
    rating: 3.5,
    lastWorkTime: '2020-08-30 08:05',
    certExpireDate: '2023-05-05',
    actions: ['详情', '编辑']
  }
])

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 1248
})

// 搜索
const handleSearch = () => {
  console.log('搜索', filters)
  ElMessage.success('搜索完成')
}

// 重置
const handleReset = () => {
  Object.assign(filters, {
    driverStatus: '',
    driverType: '',
    vehicleType: '',
    certificateStatus: '',
    workStatus: '',
    keyword: '',
    dateRange: []
  })
}

// 导出
const handleExport = () => {
  ElMessage.success('正在导出数据...')
}

// 新增司机
const handleAdd = () => {
  ElMessage.info('跳转到新增司机页面')
}

// 查看详情
const handleView = (row: any) => {
  console.log('查看详情', row)
}

// 编辑
const handleEdit = (row: any) => {
  console.log('编辑', row)
}

// 分页改变
const handlePageChange = (page: number) => {
  pagination.value.currentPage = page
}

const handleSizeChange = (size: number) => {
  pagination.value.pageSize = size
}
</script>

<template>
  <div class="driver-container">
    <!-- 顶部统计卡片 -->
    <div class="stats-grid">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="stat-card"
        :style="{ backgroundColor: stat.color }"
      >
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-content">
          <div class="stat-label">{{ stat.label }}</div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-change">{{ stat.change }}</div>
        </div>
      </div>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">司机状态</label>
          <el-select v-model="filters.driverStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in driverStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">司机类型</label>
          <el-select v-model="filters.driverType" placeholder="全部" clearable>
            <el-option
              v-for="item in driverTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">车辆类型/规格</label>
          <el-select v-model="filters.vehicleType" placeholder="全部" clearable>
            <el-option
              v-for="item in vehicleTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">证照状态</label>
          <el-select v-model="filters.certificateStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in certificateStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">所属车队</label>
          <el-select v-model="filters.workStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in workStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">目的地</label>
          <el-select v-model="filters.keyword" placeholder="全部" clearable>
            <el-option label="北京" value="1" />
            <el-option label="上海" value="2" />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">时间</label>
          <el-date-picker
            v-model="filters.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>

        <div class="filter-actions">
          <el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
          <el-button :icon="Refresh" @click="handleReset">重置</el-button>
        </div>
      </div>

      <div class="keyword-search">
        <el-input
          v-model="filters.keyword"
          placeholder="请输入司机姓名、手机号等关键词搜索"
          clearable
          style="width: 400px"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <el-button type="danger" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button type="primary" :icon="Download" @click="handleExport">导出</el-button>
      </div>
      <div class="toolbar-right">
        <el-button text>刷新</el-button>
      </div>
    </div>

    <!-- 司机列表 -->
    <div class="driver-table-card">
      <el-table :data="driverList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" />
        
        <el-table-column label="司机信息" width="180" fixed>
          <template #default="{ row }">
            <div class="driver-info">
              <div class="driver-avatar">{{ row.avatar }}</div>
              <div class="driver-detail">
                <div class="driver-name">{{ row.name }}</div>
                <div class="driver-id">{{ row.driverId }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="驾驶证信息" width="150">
          <template #default="{ row }">
            <div class="license-info">
              <div class="id-card">身份证：{{ row.idCard }}</div>
              <div class="license-type">驾驶证：{{ row.idCard }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="证照" width="100">
          <template #default="{ row }">
            <el-tag :type="row.certificateTag" size="small">{{ row.certificateType }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="驾驶年限" width="100">
          <template #default="{ row }">
            <div class="driving-years">{{ row.age }}</div>
          </template>
        </el-table-column>

        <el-table-column label="车辆归属" width="120">
          <template #default="{ row }">
            <div class="fleet">{{ row.fleet }}</div>
          </template>
        </el-table-column>

        <el-table-column label="工作状态" width="150">
          <template #default="{ row }">
            <div class="work-status">
              <div class="vehicle-info">
                <el-tag v-if="row.vehicleTag" :type="row.vehicleTag" size="small">
                  {{ row.vehicle }}
                </el-tag>
                <span v-else class="vehicle-text">{{ row.vehicle }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="司机状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.statusTag" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="最近评分" width="120">
          <template #default="{ row }">
            <div class="rating">
              <el-rate 
                v-model="row.rating" 
                disabled 
                show-score 
                text-color="#ff9900"
                score-template="{value}"
              />
            </div>
          </template>
        </el-table-column>

        <el-table-column label="最新任务时间" width="150">
          <template #default="{ row }">
            <div class="last-work-time">{{ row.lastWorkTime }}</div>
          </template>
        </el-table-column>

        <el-table-column label="最近证件" width="120">
          <template #default="{ row }">
            <div class="cert-expire">{{ row.certExpireDate }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row)">
              详情
            </el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <el-pagination
          v-model:current-page="pagination.currentPage"
          v-model:page-size="pagination.pageSize"
          :page-sizes="[10, 20, 50, 100]"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.driver-container {
  padding: 0;
  background: #f8f9fa;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.stat-icon {
  font-size: 32px;
  width: 56px;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 13px;
  color: #8c8c8c;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.stat-change {
  font-size: 12px;
  color: #52c41a;
}

/* 筛选区域 */
.filter-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.filter-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  margin-bottom: 16px;
}

.filter-item {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-label {
  font-size: 13px;
  color: #595959;
  font-weight: 500;
}

.filter-item :deep(.el-select),
.filter-item :deep(.el-input) {
  width: 160px;
}

.filter-item :deep(.el-date-editor) {
  width: 240px;
}

.filter-actions {
  display: flex;
  gap: 8px;
  margin-left: auto;
}

.keyword-search {
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* 操作栏 */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.toolbar-left,
.toolbar-right {
  display: flex;
  gap: 8px;
}

/* 司机表格 */
.driver-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.driver-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.driver-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

.driver-detail {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.driver-name {
  font-size: 14px;
  color: #262626;
  font-weight: 600;
}

.driver-id {
  font-size: 12px;
  color: #8c8c8c;
}

.license-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.id-card,
.license-type {
  font-size: 12px;
  color: #595959;
}

.driving-years {
  font-size: 13px;
  color: #262626;
}

.fleet {
  font-size: 13px;
  color: #595959;
}

.work-status {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.vehicle-info {
  font-size: 12px;
}

.vehicle-text {
  color: #595959;
}

.rating {
  display: flex;
  align-items: center;
}

.rating :deep(.el-rate) {
  height: 20px;
}

.rating :deep(.el-rate__icon) {
  font-size: 14px;
}

.rating :deep(.el-rate__text) {
  font-size: 12px;
  margin-left: 4px;
}

.last-work-time,
.cert-expire {
  font-size: 12px;
  color: #595959;
}

/* 分页 */
.pagination-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

:deep(.el-table) {
  font-size: 13px;
}

:deep(.el-table th) {
  background: #fafafa;
  color: #595959;
  font-weight: 600;
}

:deep(.el-table td) {
  padding: 12px 0;
}
</style>


