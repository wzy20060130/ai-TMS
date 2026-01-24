<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 筛选条件
const filters = reactive({
  fleetType: '',
  fleetStatus: '',
  vehicleCount: '',
  responsiblePerson: '',
  driverStatus: '',
  keyword: '',
  dateRange: []
})

// 车队类型选项
const fleetTypeOptions = [
  { label: '全部', value: '' },
  { label: '长途运输', value: '1' },
  { label: '短途配送', value: '2' },
  { label: '冷链运输', value: '3' },
  { label: '危险品运输', value: '4' }
]

// 车队状态选项
const fleetStatusOptions = [
  { label: '全部', value: '' },
  { label: '运营中', value: '1' },
  { label: '待命中', value: '2' },
  { label: '维护中', value: '3' }
]

// 车辆数量选项
const vehicleCountOptions = [
  { label: '全部', value: '' },
  { label: '10辆以下', value: '1' },
  { label: '10-30辆', value: '2' },
  { label: '30-50辆', value: '3' },
  { label: '50辆以上', value: '4' }
]

// 司机状态选项
const driverStatusOptions = [
  { label: '全部', value: '' },
  { label: '在岗', value: '1' },
  { label: '休息', value: '2' }
]

// 车队列表
const fleetList = ref([
  {
    id: 1,
    fleetId: 'FL2023001',
    fleetName: '快递车队一队',
    fleetType: '短途配送',
    address: '北京市朝阳区朝外大街19号',
    responsiblePerson: '张明',
    phone: '138****5678',
    vehicleCount: 25,
    driverCount: 30,
    status: '运营中',
    statusType: 'success',
    workStatus: '正常运营',
    workStatusType: 'success',
    createDate: '2021-03-18',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 2,
    fleetId: 'FL2023002',
    fleetName: '干线车队一队',
    fleetType: '长途运输',
    address: '上海市浦东新区张江高科技园区1号楼2号',
    responsiblePerson: '李强',
    phone: '139****8765',
    vehicleCount: 18,
    driverCount: 22,
    status: '运营中',
    statusType: 'success',
    workStatus: '正常运营',
    workStatusType: 'success',
    createDate: '2021-04-03',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 3,
    fleetId: 'FL2023003',
    fleetName: '城市配送一队',
    fleetType: '短途配送',
    address: '广州市天河区天河路1号楼1号',
    responsiblePerson: '王伟',
    phone: '137****4543',
    vehicleCount: 32,
    driverCount: 35,
    status: '运营中',
    statusType: 'success',
    workStatus: '异常运营',
    workStatusType: 'danger',
    createDate: '2022-01-15',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 4,
    fleetId: 'FL2023004',
    fleetName: '中长线城际物流队',
    fleetType: '长途运输',
    address: '北京市海淀区中关村大街59号',
    responsiblePerson: '赵伟',
    phone: '136****4321',
    vehicleCount: 45,
    driverCount: 50,
    status: '运营中',
    statusType: 'success',
    workStatus: '正常运营',
    workStatusType: 'success',
    createDate: '2022-03-22',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 5,
    fleetId: 'FL2023005',
    fleetName: '城市配送二队',
    fleetType: '短途配送',
    address: '深圳市南山区科技园南区科苑路15号',
    responsiblePerson: '陈杰',
    phone: '135****2109',
    vehicleCount: 22,
    driverCount: 25,
    status: '待命中',
    statusType: 'warning',
    workStatus: '异常运营',
    workStatusType: 'danger',
    createDate: '2022-06-30',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 6,
    fleetId: 'FL2023002',
    fleetName: '干线车队一队',
    fleetType: '长途运输',
    address: '上海市浦东新区张江高科技园区1号楼2号',
    responsiblePerson: '李强',
    phone: '139****8765',
    vehicleCount: 18,
    driverCount: 22,
    status: '运营中',
    statusType: 'success',
    workStatus: '正常运营',
    workStatusType: 'success',
    createDate: '2021-04-03',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 7,
    fleetId: 'FL2023003',
    fleetName: '城市配送一队',
    fleetType: '短途配送',
    address: '广州市天河区天河路1号楼1号',
    responsiblePerson: '王伟',
    phone: '137****4543',
    vehicleCount: 32,
    driverCount: 35,
    status: '运营中',
    statusType: 'success',
    workStatus: '异常运营',
    workStatusType: 'danger',
    createDate: '2022-01-15',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 8,
    fleetId: 'FL2023002',
    fleetName: '干线车队一队',
    fleetType: '长途运输',
    address: '上海市浦东新区张江高科技园区1号楼2号',
    responsiblePerson: '李强',
    phone: '139****8765',
    vehicleCount: 18,
    driverCount: 22,
    status: '运营中',
    statusType: 'success',
    workStatus: '正常运营',
    workStatusType: 'success',
    createDate: '2021-04-03',
    actions: ['查看', '编辑', '删除']
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
    fleetType: '',
    fleetStatus: '',
    vehicleCount: '',
    responsiblePerson: '',
    driverStatus: '',
    keyword: '',
    dateRange: []
  })
}

// 新增车队
const handleAdd = () => {
  ElMessage.info('跳转到新增车队页面')
}

// 查看详情
const handleView = (row: any) => {
  console.log('查看详情', row)
}

// 编辑
const handleEdit = (row: any) => {
  console.log('编辑', row)
}

// 删除
const handleDelete = (row: any) => {
  console.log('删除', row)
  ElMessage.warning('确认删除该车队？')
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
  <div class="team-container">
    <!-- 筛选区域 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">车队类型</label>
          <el-select v-model="filters.fleetType" placeholder="全部" clearable>
            <el-option
              v-for="item in fleetTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">车队状态</label>
          <el-select v-model="filters.fleetStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in fleetStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">车辆人员规模</label>
          <el-select v-model="filters.vehicleCount" placeholder="全部" clearable>
            <el-option
              v-for="item in vehicleCountOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">负责人/电话</label>
          <el-input v-model="filters.responsiblePerson" placeholder="请输入" clearable />
        </div>

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
          <label class="filter-label">目的地</label>
          <el-input v-model="filters.keyword" placeholder="请输入" clearable />
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
          placeholder="请输入车队名称、负责人等关键词搜索"
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
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button>导出</el-button>
        <el-button>打印</el-button>
      </div>
      <div class="toolbar-right">
        <el-button text>刷新</el-button>
      </div>
    </div>

    <!-- 车队列表 -->
    <div class="fleet-table-card">
      <el-table :data="fleetList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" />
        
        <el-table-column label="车队ID" width="120" fixed>
          <template #default="{ row }">
            <div class="fleet-id">{{ row.fleetId }}</div>
          </template>
        </el-table-column>

        <el-table-column label="车队名称" width="150">
          <template #default="{ row }">
            <div class="fleet-name">{{ row.fleetName }}</div>
          </template>
        </el-table-column>

        <el-table-column label="车队类型" width="120">
          <template #default="{ row }">
            <div class="fleet-type">{{ row.fleetType }}</div>
          </template>
        </el-table-column>

        <el-table-column label="负责人" width="100">
          <template #default="{ row }">
            <div class="responsible-person">{{ row.responsiblePerson }}</div>
          </template>
        </el-table-column>

        <el-table-column label="联系电话" width="130">
          <template #default="{ row }">
            <div class="phone">{{ row.phone }}</div>
          </template>
        </el-table-column>

        <el-table-column label="车辆数量" width="100">
          <template #default="{ row }">
            <div class="vehicle-count">{{ row.vehicleCount }}</div>
          </template>
        </el-table-column>

        <el-table-column label="司机数量" width="100">
          <template #default="{ row }">
            <div class="driver-count">{{ row.driverCount }}</div>
          </template>
        </el-table-column>

        <el-table-column label="当前状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.statusType" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="运营状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.workStatusType" size="small">{{ row.workStatus }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="成立时间" width="120">
          <template #default="{ row }">
            <div class="create-date">{{ row.createDate }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row)">
              查看
            </el-button>
            <el-button link type="primary" size="small" @click="handleEdit(row)">
              编辑
            </el-button>
            <el-button link type="danger" size="small" @click="handleDelete(row)">
              删除
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
.team-container {
  padding: 0;
  background: #f8f9fa;
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

/* 车队表格 */
.fleet-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.fleet-id {
  font-size: 14px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.fleet-id:hover {
  text-decoration: underline;
}

.fleet-name {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.fleet-type {
  font-size: 13px;
  color: #595959;
}

.responsible-person {
  font-size: 13px;
  color: #262626;
}

.phone {
  font-size: 13px;
  color: #595959;
}

.vehicle-count,
.driver-count {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.create-date {
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


