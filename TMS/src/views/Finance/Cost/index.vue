<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 统计数据
const stats = ref([
  {
    label: '货运成本总数',
    value: '¥286,500.00',
    change: '较上月增加 ↑ 2%',
    color: '#fff'
  },
  {
    label: '总运费收入',
    value: '¥428,300.00',
    change: '较上月增加 ↑ 5%',
    color: '#fff'
  },
  {
    label: '总支出费用',
    value: '¥141,800.00',
    change: '较上月增加 ↑ 3%',
    color: '#fff'
  },
  {
    label: '本期盈亏额',
    value: '¥56,200.00',
    change: '较上月 ↑ 8%',
    color: '#fff'
  }
])

// 筛选条件
const filters = reactive({
  costType: '',
  settlementStatus: '',
  paymentMethod: '',
  keyword: '',
  dateRange: []
})

// 成本类型选项
const costTypeOptions = [
  { label: '全部', value: '' },
  { label: '运输成本', value: '1' },
  { label: '人工成本', value: '2' },
  { label: '油费成本', value: '3' },
  { label: '维修成本', value: '4' }
]

// 结算状态选项
const settlementStatusOptions = [
  { label: '全部', value: '' },
  { label: '未结算', value: '1' },
  { label: '已结算', value: '2' }
]

// 货运成本列表
const costList = ref([
  {
    id: 1,
    costNo: 'FIN2023001',
    relatedOrder: 'ORD2023001',
    fleet: '北京-上海',
    fleetTag: 'success',
    route: '沪A-12345',
    routeInfo: '冷藏车',
    routeTag: 'success',
    driver: '张师傅',
    driverTag: 'success',
    fuelCost: '¥550.00',
    tollCost: '¥1,800.00',
    laborCost: '¥800.00',
    otherCost: '¥250.00',
    totalCost: '¥150.00',
    profit: '¥1,600.00',
    profitRate: '¥10,000.00',
    settlementStatus: '已结算',
    settlementTag: 'success',
    createDate: '2023-09-03',
    settlementDate: '2023-09-05',
    actions: ['查看', '编辑']
  },
  {
    id: 2,
    costNo: 'FIN2023008',
    relatedOrder: 'ORD2023008',
    fleet: '北京-广州',
    fleetTag: 'success',
    route: '沪G-67890',
    routeInfo: '厢货车',
    routeTag: 'warning',
    driver: '李师傅',
    driverTag: 'warning',
    fuelCost: '¥980.00',
    tollCost: '¥2,500.00',
    laborCost: '¥1,500.00',
    otherCost: '¥350.00',
    totalCost: '¥220.00',
    profit: '¥6,200.00',
    profitRate: '¥5,000.00',
    settlementStatus: '未结算',
    settlementTag: 'info',
    createDate: '2023-09-09',
    settlementDate: '2023-09-16',
    actions: ['查看', '编辑']
  },
  {
    id: 3,
    costNo: 'FIN2023012',
    relatedOrder: 'ORD2023012',
    fleet: '北京-成都',
    fleetTag: 'success',
    route: '粤G-24680',
    routeInfo: '危险品车',
    routeTag: 'danger',
    driver: '王师傅',
    driverTag: 'danger',
    fuelCost: '¥1,150.00',
    tollCost: '¥2,800.00',
    laborCost: '¥1,600.00',
    otherCost: '¥450.00',
    totalCost: '¥350.00',
    profit: '¥7,300.00',
    profitRate: '¥5,000.00',
    settlementStatus: '已结算',
    settlementTag: 'success',
    createDate: '2023-09-14',
    settlementDate: '2023-09-16',
    actions: ['查看', '编辑']
  },
  {
    id: 4,
    costNo: 'FIN2023015',
    relatedOrder: 'ORD2023015',
    fleet: '京D-13579',
    fleetTag: 'success',
    route: '上海-西安',
    routeInfo: '冷藏车',
    routeTag: 'success',
    driver: '赵师傅',
    driverTag: 'success',
    fuelCost: '¥850.00',
    tollCost: '¥2,900.00',
    laborCost: '¥1,200.00',
    otherCost: '¥350.00',
    totalCost: '¥550.00',
    profit: '¥5,800.00',
    profitRate: '¥9,500.00',
    settlementStatus: '已结算',
    settlementTag: 'success',
    createDate: '2023-09-17',
    settlementDate: '',
    actions: ['查看', '编辑']
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
    costType: '',
    settlementStatus: '',
    paymentMethod: '',
    keyword: '',
    dateRange: []
  })
}

// 导出
const handleExport = () => {
  ElMessage.success('正在导出数据...')
}

// 打印
const handlePrint = () => {
  ElMessage.success('正在打印...')
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
  <div class="cost-container">
    <!-- 顶部统计卡片 -->
    <div class="stats-grid">
      <div 
        v-for="(stat, index) in stats" 
        :key="index"
        class="stat-card"
        :style="{ backgroundColor: stat.color }"
      >
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
          <label class="filter-label">成本类型</label>
          <el-select v-model="filters.costType" placeholder="全部" clearable>
            <el-option
              v-for="item in costTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">结算状态</label>
          <el-select v-model="filters.settlementStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in settlementStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">车辆类型/规格</label>
          <el-input v-model="filters.keyword" placeholder="请输入" clearable />
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
          placeholder="请输入成本单号、订单号等关键词搜索"
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
        <span class="toolbar-title">列表</span>
      </div>
      <div class="toolbar-right">
        <el-button @click="handleExport">导出</el-button>
        <el-button @click="handlePrint">打印</el-button>
        <el-button text>刷新</el-button>
      </div>
    </div>

    <!-- 货运成本列表 -->
    <div class="cost-table-card">
      <el-table :data="costList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" />
        
        <el-table-column label="ID" width="80" fixed>
          <template #default="{ row }">
            <div class="cost-id">{{ row.id }}</div>
          </template>
        </el-table-column>

        <el-table-column label="关联订单号" width="130">
          <template #default="{ row }">
            <div class="related-order">{{ row.relatedOrder }}</div>
          </template>
        </el-table-column>

        <el-table-column label="运输路线" width="120">
          <template #default="{ row }">
            <el-tag :type="row.fleetTag" size="small">{{ row.fleet }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="车辆/司机" width="120">
          <template #default="{ row }">
            <div class="vehicle-driver">
              <div class="vehicle-info">
                <el-tag :type="row.routeTag" size="small">{{ row.route }}</el-tag>
              </div>
              <div class="driver-info">{{ row.routeInfo }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="司机姓名" width="100">
          <template #default="{ row }">
            <el-tag :type="row.driverTag" size="small">{{ row.driver }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="燃油费" width="100">
          <template #default="{ row }">
            <div class="cost-item">{{ row.fuelCost }}</div>
          </template>
        </el-table-column>

        <el-table-column label="过路费" width="100">
          <template #default="{ row }">
            <div class="cost-item">{{ row.tollCost }}</div>
          </template>
        </el-table-column>

        <el-table-column label="工资" width="100">
          <template #default="{ row }">
            <div class="cost-item">{{ row.laborCost }}</div>
          </template>
        </el-table-column>

        <el-table-column label="其他" width="100">
          <template #default="{ row }">
            <div class="cost-item">{{ row.otherCost }}</div>
          </template>
        </el-table-column>

        <el-table-column label="总成本" width="100">
          <template #default="{ row }">
            <div class="total-cost">{{ row.totalCost }}</div>
          </template>
        </el-table-column>

        <el-table-column label="总收益" width="120">
          <template #default="{ row }">
            <div class="profit">{{ row.profit }}</div>
          </template>
        </el-table-column>

        <el-table-column label="计算盈亏率" width="120">
          <template #default="{ row }">
            <div class="profit-rate">{{ row.profitRate }}</div>
          </template>
        </el-table-column>

        <el-table-column label="结算状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.settlementTag" size="small">{{ row.settlementStatus }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="结算时间" width="120">
          <template #default="{ row }">
            <div class="settlement-date">{{ row.settlementDate || '-' }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row)">
              查看
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
.cost-container {
  padding: 0;
  background: #f8f9fa;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 16px;
}

.stat-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.stat-label {
  font-size: 13px;
  color: #8c8c8c;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #262626;
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

.toolbar-left {
  display: flex;
  align-items: center;
}

.toolbar-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
}

.toolbar-right {
  display: flex;
  gap: 8px;
}

/* 货运成本表格 */
.cost-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.cost-id {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.related-order {
  font-size: 13px;
  color: #1890ff;
  cursor: pointer;
}

.related-order:hover {
  text-decoration: underline;
}

.vehicle-driver {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.vehicle-info {
  font-size: 12px;
}

.driver-info {
  font-size: 11px;
  color: #8c8c8c;
}

.cost-item {
  font-size: 13px;
  color: #262626;
}

.total-cost {
  font-size: 13px;
  color: #262626;
  font-weight: 600;
}

.profit {
  font-size: 13px;
  color: #52c41a;
  font-weight: 600;
}

.profit-rate {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.settlement-date {
  font-size: 13px;
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


