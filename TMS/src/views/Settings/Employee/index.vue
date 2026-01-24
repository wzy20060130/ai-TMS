<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 筛选条件
const filters = reactive({
  department: '',
  position: '',
  employeeStatus: '',
  keyword: '',
  dateRange: []
})

// 部门选项
const departmentOptions = [
  { label: '全部', value: '' },
  { label: '总公司', value: '1' },
  { label: '分公司', value: '2' },
  { label: '运输部', value: '3' },
  { label: '财务部', value: '4' }
]

// 职位选项
const positionOptions = [
  { label: '全部', value: '' },
  { label: '总经理', value: '1' },
  { label: '部门经理', value: '2' },
  { label: '主管', value: '3' },
  { label: '员工', value: '4' }
]

// 员工状态选项
const employeeStatusOptions = [
  { label: '全部', value: '' },
  { label: '在职', value: '1' },
  { label: '离职', value: '2' },
  { label: '休假', value: '3' }
]

// 员工列表
const employeeList = ref([
  {
    id: 1,
    employeeId: 'EMP0001',
    avatar: '👤',
    name: '张伟中',
    department: '总公司',
    departmentTag: 'success',
    position: '总经理',
    positionTag: 'danger',
    phone: '138****1234',
    joinDate: '2019-01-10',
    status: '在职',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 2,
    employeeId: 'EMP0025',
    avatar: '👤',
    name: '李明',
    department: '分公司',
    departmentTag: 'primary',
    position: '部门经理',
    positionTag: 'warning',
    phone: '138****4789',
    joinDate: '2019-05-10',
    status: '在职',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 3,
    employeeId: 'EMP0048',
    avatar: '👤',
    name: '王强',
    department: '运输部门',
    departmentTag: 'success',
    position: '部门经理',
    positionTag: 'warning',
    phone: '139****5827',
    joinDate: '2020-01-15',
    status: '在职',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 4,
    employeeId: 'EMP0052',
    avatar: '👤',
    name: '赵伟',
    department: '市场营销部',
    departmentTag: 'success',
    position: '部门经理',
    positionTag: 'warning',
    phone: '137****8901',
    joinDate: '2020-03-08',
    status: '在职',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 5,
    employeeId: 'EMP0076',
    avatar: '👤',
    name: '张丽',
    department: '运输部门',
    departmentTag: 'success',
    position: '调度主管',
    positionTag: 'primary',
    phone: '136****2345',
    joinDate: '2020-05-20',
    status: '休假',
    statusTag: 'warning',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 6,
    employeeId: 'EMP0120',
    avatar: '👤',
    name: '陈明',
    department: '技术部',
    departmentTag: 'success',
    position: '技术总监',
    positionTag: 'warning',
    phone: '135****5678',
    joinDate: '2020-04-01',
    status: '在职',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 7,
    employeeId: 'EMP0156',
    avatar: '👤',
    name: '刘芳',
    department: '财务部',
    departmentTag: 'success',
    position: '财务经理',
    positionTag: 'warning',
    phone: '134****9012',
    joinDate: '2020-06-15',
    status: '离职',
    statusTag: 'info',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 8,
    employeeId: 'EMP0048',
    avatar: '👤',
    name: '王强',
    department: '运输部门',
    departmentTag: 'success',
    position: '部门经理',
    positionTag: 'warning',
    phone: '139****5827',
    joinDate: '2020-01-15',
    status: '在职',
    statusTag: 'success',
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
    department: '',
    position: '',
    employeeStatus: '',
    keyword: '',
    dateRange: []
  })
}

// 新增员工
const handleAdd = () => {
  ElMessage.info('跳转到新增员工页面')
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

// 删除
const handleDelete = (row: any) => {
  console.log('删除', row)
  ElMessage.warning('确认删除该员工？')
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
  <div class="employee-container">
    <!-- 筛选区域 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">部门</label>
          <el-select v-model="filters.department" placeholder="全部" clearable>
            <el-option
              v-for="item in departmentOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">职务类型/级别</label>
          <el-select v-model="filters.position" placeholder="全部" clearable>
            <el-option
              v-for="item in positionOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">工资</label>
          <el-input v-model="filters.keyword" placeholder="请输入" clearable />
        </div>

        <div class="filter-item">
          <label class="filter-label">岗位</label>
          <el-input v-model="filters.keyword" placeholder="请输入" clearable />
        </div>

        <div class="filter-item">
          <label class="filter-label">目的地</label>
          <el-select v-model="filters.employeeStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in employeeStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
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
          placeholder="请输入员工姓名、工号等关键词搜索"
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
        <span class="toolbar-title">员工列表</span>
      </div>
      <div class="toolbar-right">
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button @click="handleExport">导出</el-button>
        <el-button @click="handlePrint">打印</el-button>
        <el-button text>刷新</el-button>
      </div>
    </div>

    <!-- 员工列表 -->
    <div class="employee-table-card">
      <el-table :data="employeeList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" />
        
        <el-table-column label="员工工号" width="120" fixed>
          <template #default="{ row }">
            <div class="employee-id">{{ row.employeeId }}</div>
          </template>
        </el-table-column>

        <el-table-column label="姓名" width="150">
          <template #default="{ row }">
            <div class="employee-info">
              <div class="employee-avatar">{{ row.avatar }}</div>
              <div class="employee-name">{{ row.name }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="所属部门" width="150">
          <template #default="{ row }">
            <el-tag :type="row.departmentTag" size="small">{{ row.department }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="职位" width="120">
          <template #default="{ row }">
            <el-tag :type="row.positionTag" size="small">{{ row.position }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="联系电话" width="150">
          <template #default="{ row }">
            <div class="phone">{{ row.phone }}</div>
          </template>
        </el-table-column>

        <el-table-column label="入职时间" width="120">
          <template #default="{ row }">
            <div class="join-date">{{ row.joinDate }}</div>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.statusTag" size="small">{{ row.status }}</el-tag>
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
.employee-container {
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

/* 员工表格 */
.employee-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.employee-id {
  font-size: 14px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.employee-id:hover {
  text-decoration: underline;
}

.employee-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.employee-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.employee-name {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.phone {
  font-size: 13px;
  color: #595959;
}

.join-date {
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


