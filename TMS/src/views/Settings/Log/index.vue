<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 筛选条件
const filters = reactive({
  operationType: '',
  operatorName: '',
  module: '',
  operationStatus: '',
  keyword: '',
  dateRange: []
})

// 操作类型选项
const operationTypeOptions = [
  { label: '全部', value: '' },
  { label: '新增', value: '1' },
  { label: '修改', value: '2' },
  { label: '删除', value: '3' },
  { label: '查询', value: '4' }
]

// 操作状态选项
const operationStatusOptions = [
  { label: '全部', value: '' },
  { label: '成功', value: '1' },
  { label: '失败', value: '2' }
]

// 操作日志列表
const logList = ref([
  {
    id: 1,
    logId: 'LOG-8765',
    operationTime: '2023-06-16 14:32:25',
    operator: {
      name: '张伟中',
      username: 'zhangzj',
      avatar: '👤'
    },
    ipAddress: '192.168.1.105',
    module: '订单管理',
    moduleTag: 'primary',
    operationType: '新增',
    operationTag: 'warning',
    operationContent: '创建了订单编号：ORD-2023061002的新订单，从：上海市浦东新区，到：北京市朝阳区',
    status: '成功',
    statusTag: 'success',
    actions: ['查看']
  },
  {
    id: 2,
    logId: 'LOG-8764',
    operationTime: '2023-06-16 14:28:10',
    operator: {
      name: '李明中',
      username: 'limzj2',
      avatar: '👤'
    },
    ipAddress: '192.168.1.87',
    module: '司机管理',
    moduleTag: 'success',
    operationType: '删除',
    operationTag: 'danger',
    operationContent: '删除了司机信息编号：PLAN-2023061002/1，司机姓名：张三，联系电话：13800138000',
    status: '成功',
    statusTag: 'success',
    actions: ['查看']
  },
  {
    id: 3,
    logId: 'LOG-8763',
    operationTime: '2023-06-16 14:16:36',
    operator: {
      name: '王伟中',
      username: 'wangzj',
      avatar: '👤'
    },
    ipAddress: '113.25.87.124',
    module: '订单管理',
    moduleTag: 'primary',
    operationType: '新增',
    operationTag: 'warning',
    operationType2: '修改',
    operationContent: '更新了订单编号：TASK-2023061402/1订单信息，更新后编号：TASK-2023061402/2',
    status: '成功',
    statusTag: 'success',
    actions: ['查看']
  },
  {
    id: 4,
    logId: 'LOG-8762',
    operationTime: '2023-06-16 13:58:42',
    operator: {
      name: '赵敏管理',
      username: 'zhaomm',
      avatar: '👤'
    },
    ipAddress: '127.0.0.1',
    module: '系统管理',
    moduleTag: 'warning',
    operationType: '新增',
    operationTag: 'warning',
    operationContent: '启动系统了TASK用户权限文件，并修改的配置项：258',
    status: '成功',
    statusTag: 'success',
    actions: ['查看']
  },
  {
    id: 5,
    logId: 'LOG-8761',
    operationTime: '2023-06-16 13:42:19',
    operator: {
      name: '赵伟中',
      username: 'zhaozj',
      avatar: '👤'
    },
    ipAddress: '192.168.1.85',
    module: '车辆管理',
    moduleTag: 'danger',
    operationType: '删除',
    operationTag: 'danger',
    operationContent: '删除了车辆信息编号：CAR-0238，车牌号：沪A-12345',
    status: '成功',
    statusTag: 'success',
    actions: ['查看']
  },
  {
    id: 6,
    logId: 'LOG-8760',
    operationTime: '2023-06-16 13:20:55',
    operator: {
      name: '李明中',
      username: 'limzj',
      avatar: '👤'
    },
    ipAddress: '218.75.36.92',
    module: '用户管理',
    moduleTag: 'success',
    operationType: '更新',
    operationTag: 'info',
    operationContent: '已成功修改Sammi用户基础信息，修改后信息',
    status: '失败',
    statusTag: 'danger',
    actions: ['查看']
  },
  {
    id: 7,
    logId: 'LOG-8764',
    operationTime: '2023-06-16 14:28:10',
    operator: {
      name: '李明中',
      username: 'limzj2',
      avatar: '👤'
    },
    ipAddress: '192.168.1.87',
    module: '司机管理',
    moduleTag: 'success',
    operationType: '删除',
    operationTag: 'danger',
    operationContent: '删除了司机信息编号：PLAN-2023061002/1，司机姓名：张三，联系电话：13800138000',
    status: '成功',
    statusTag: 'success',
    actions: ['查看']
  },
  {
    id: 8,
    logId: 'LOG-8763',
    operationTime: '2023-06-16 14:16:36',
    operator: {
      name: '王伟中',
      username: 'wangzj',
      avatar: '👤'
    },
    ipAddress: '113.25.87.124',
    module: '订单管理',
    moduleTag: 'primary',
    operationType: '修改',
    operationTag: 'warning',
    operationContent: '更新了订单编号：TASK-2023061402/1订单信息，更新后编号：TASK-2023061402/2',
    status: '成功',
    statusTag: 'success',
    actions: ['查看']
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
    operationType: '',
    operatorName: '',
    module: '',
    operationStatus: '',
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

// 分页改变
const handlePageChange = (page: number) => {
  pagination.value.currentPage = page
}

const handleSizeChange = (size: number) => {
  pagination.value.pageSize = size
}
</script>

<template>
  <div class="log-container">
    <!-- 筛选区域 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">部门类型</label>
          <el-select v-model="filters.operationType" placeholder="全部" clearable>
            <el-option
              v-for="item in operationTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">操作人/账号</label>
          <el-input v-model="filters.operatorName" placeholder="请输入" clearable />
        </div>

        <div class="filter-item">
          <label class="filter-label">模块ID</label>
          <el-input v-model="filters.module" placeholder="请输入" clearable />
        </div>

        <div class="filter-item">
          <label class="filter-label">操作模块</label>
          <el-select v-model="filters.operationStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in operationStatusOptions"
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
          placeholder="请输入操作内容、IP地址等关键词搜索"
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
        <span class="toolbar-title">操作日志列表</span>
      </div>
      <div class="toolbar-right">
        <el-button @click="handleExport">导出</el-button>
        <el-button @click="handlePrint">打印</el-button>
        <el-button text>刷新</el-button>
      </div>
    </div>

    <!-- 日志列表 -->
    <div class="log-table-card">
      <el-table :data="logList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" />
        
        <el-table-column label="ID" width="100" fixed>
          <template #default="{ row }">
            <div class="log-id">{{ row.logId }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作时间" width="180">
          <template #default="{ row }">
            <div class="operation-time">{{ row.operationTime }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作人" width="150">
          <template #default="{ row }">
            <div class="operator-info">
              <div class="operator-avatar">{{ row.operator.avatar }}</div>
              <div class="operator-detail">
                <div class="operator-name">{{ row.operator.name }}</div>
                <div class="operator-username">{{ row.operator.username }}</div>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作IP" width="150">
          <template #default="{ row }">
            <div class="ip-address">{{ row.ipAddress }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作模块" width="120">
          <template #default="{ row }">
            <el-tag :type="row.moduleTag" size="small">{{ row.module }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作类型" width="100">
          <template #default="{ row }">
            <el-tag :type="row.operationTag" size="small">{{ row.operationType }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作内容" min-width="300">
          <template #default="{ row }">
            <div class="operation-content">{{ row.operationContent }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作结果" width="100">
          <template #default="{ row }">
            <el-tag :type="row.statusTag" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row)">
              查看
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
.log-container {
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

/* 日志表格 */
.log-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.log-id {
  font-size: 13px;
  color: #1890ff;
  cursor: pointer;
}

.log-id:hover {
  text-decoration: underline;
}

.operation-time {
  font-size: 13px;
  color: #595959;
}

.operator-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.operator-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.operator-detail {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.operator-name {
  font-size: 12px;
  color: #262626;
  font-weight: 500;
}

.operator-username {
  font-size: 11px;
  color: #8c8c8c;
}

.ip-address {
  font-size: 13px;
  color: #595959;
}

.operation-content {
  font-size: 12px;
  color: #595959;
  line-height: 1.6;
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


