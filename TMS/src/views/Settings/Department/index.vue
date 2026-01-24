<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh, Plus } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 筛选条件
const filters = reactive({
  departmentType: '',
  departmentStatus: '',
  responsiblePerson: '',
  keyword: '',
  dateRange: []
})

// 部门类型选项
const departmentTypeOptions = [
  { label: '全部', value: '' },
  { label: '总公司', value: '1' },
  { label: '分公司', value: '2' },
  { label: '部门', value: '3' }
]

// 部门状态选项
const departmentStatusOptions = [
  { label: '全部', value: '' },
  { label: '启用', value: '1' },
  { label: '停用', value: '2' }
]

// 部门列表
const departmentList = ref([
  {
    id: 1,
    departmentId: 'DEPT001',
    departmentName: '总公司',
    parentDepartment: '-',
    level: '总公司',
    responsiblePerson: '张总经理',
    phone: '010-12345678',
    employeeCount: 128,
    createDate: '2020-01-15',
    status: '启用',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 2,
    departmentId: 'DEPT002',
    departmentName: '综合部门',
    parentDepartment: '总公司',
    level: '分公司',
    responsiblePerson: '李总监',
    phone: '010-12345679',
    employeeCount: 45,
    createDate: '2020-02-20',
    status: '启用',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 3,
    departmentId: 'DEPT003',
    departmentName: '运输部门',
    parentDepartment: '分公司',
    level: '分公司',
    responsiblePerson: '王经理',
    phone: '010-12345680',
    employeeCount: 22,
    createDate: '2020-03-05',
    status: '启用',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 4,
    departmentId: 'DEPT004',
    departmentName: '市场营销部',
    parentDepartment: '分公司',
    level: '分公司',
    responsiblePerson: '赵经理',
    phone: '010-12345681',
    employeeCount: 18,
    createDate: '2020-03-10',
    status: '启用',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 5,
    departmentId: 'DEPT005',
    departmentName: '技术部',
    parentDepartment: '总公司',
    level: '总公司',
    responsiblePerson: '陈总监',
    phone: '010-12345682',
    employeeCount: 32,
    createDate: '2020-04-01',
    status: '启用',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 6,
    departmentId: 'DEPT006',
    departmentName: '财务部',
    parentDepartment: '总公司',
    level: '总公司',
    responsiblePerson: '刘总监',
    phone: '010-12345683',
    employeeCount: 15,
    createDate: '2020-04-15',
    status: '停用',
    statusTag: 'info',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 7,
    departmentId: 'DEPT005',
    departmentName: '技术部',
    parentDepartment: '总公司',
    level: '总公司',
    responsiblePerson: '陈总监',
    phone: '010-12345682',
    employeeCount: 32,
    createDate: '2020-04-01',
    status: '启用',
    statusTag: 'success',
    actions: ['查看', '编辑', '删除']
  },
  {
    id: 8,
    departmentId: 'DEPT006',
    departmentName: '财务部',
    parentDepartment: '总公司',
    level: '总公司',
    responsiblePerson: '刘总监',
    phone: '010-12345683',
    employeeCount: 15,
    createDate: '2020-04-15',
    status: '停用',
    statusTag: 'info',
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
    departmentType: '',
    departmentStatus: '',
    responsiblePerson: '',
    keyword: '',
    dateRange: []
  })
}

// 新增部门
const handleAdd = () => {
  ElMessage.info('跳转到新增部门页面')
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
  ElMessage.warning('确认删除该部门？')
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
  <div class="department-container">
    <!-- 筛选区域 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">部门</label>
          <el-select v-model="filters.departmentType" placeholder="全部" clearable>
            <el-option
              v-for="item in departmentTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">部门状态</label>
          <el-select v-model="filters.departmentStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in departmentStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">负责人</label>
          <el-input v-model="filters.responsiblePerson" placeholder="请输入" clearable />
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
          placeholder="请输入部门名称、负责人等关键词搜索"
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
        <span class="toolbar-title">部门列表</span>
      </div>
      <div class="toolbar-right">
        <el-button type="primary" :icon="Plus" @click="handleAdd">新增</el-button>
        <el-button @click="handleExport">导出</el-button>
        <el-button @click="handlePrint">打印</el-button>
        <el-button text>刷新</el-button>
      </div>
    </div>

    <!-- 部门列表 -->
    <div class="department-table-card">
      <el-table :data="departmentList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" />
        
        <el-table-column label="部门ID" width="120" fixed>
          <template #default="{ row }">
            <div class="department-id">{{ row.departmentId }}</div>
          </template>
        </el-table-column>

        <el-table-column label="部门名称" width="150">
          <template #default="{ row }">
            <div class="department-name">{{ row.departmentName }}</div>
          </template>
        </el-table-column>

        <el-table-column label="上级部门" width="150">
          <template #default="{ row }">
            <div class="parent-department">{{ row.parentDepartment }}</div>
          </template>
        </el-table-column>

        <el-table-column label="负责人" width="120">
          <template #default="{ row }">
            <div class="responsible-person">{{ row.responsiblePerson }}</div>
          </template>
        </el-table-column>

        <el-table-column label="联系电话" width="150">
          <template #default="{ row }">
            <div class="phone">{{ row.phone }}</div>
          </template>
        </el-table-column>

        <el-table-column label="部门人数" width="100">
          <template #default="{ row }">
            <div class="employee-count">{{ row.employeeCount }}</div>
          </template>
        </el-table-column>

        <el-table-column label="创建时间" width="120">
          <template #default="{ row }">
            <div class="create-date">{{ row.createDate }}</div>
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
.department-container {
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

/* 部门表格 */
.department-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.department-id {
  font-size: 14px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.department-id:hover {
  text-decoration: underline;
}

.department-name {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.parent-department {
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

.employee-count {
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


