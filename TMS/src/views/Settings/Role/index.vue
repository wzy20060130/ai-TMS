<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Search, Refresh, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 筛选条件
const filters = reactive({
  roleType: '',
  roleStatus: '',
  department: '',
  keyword: '',
  dateRange: [],
});

// 角色类型选项
const roleTypeOptions = [
  { label: '全部', value: '' },
  { label: '系统管理员', value: '1' },
  { label: '部门管理员', value: '2' },
  { label: '普通用户', value: '3' },
];

// 角色状态选项
const roleStatusOptions = [
  { label: '全部', value: '' },
  { label: '启用', value: '1' },
  { label: '停用', value: '2' },
];

// 角色列表
const roleList = ref([
  {
    id: 1,
    roleName: '系统管理员',
    roleNameTag: 'danger',
    roleCode: 'SYS_ADMIN',
    department: '全体部门',
    departmentTag: 'danger',
    userCount: 3,
    status: true,
    createDate: '2023-01-15 09:30',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 2,
    roleName: '销售经理',
    roleNameTag: 'primary',
    roleCode: 'SALES_MANAGER',
    department: '销售部门',
    departmentTag: 'primary',
    userCount: 8,
    status: true,
    createDate: '2023-02-20 14:25',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 3,
    roleName: '运营专员',
    roleNameTag: 'success',
    roleCode: 'OPERATOR',
    department: '运营部门',
    departmentTag: 'success',
    userCount: 12,
    status: true,
    createDate: '2023-03-05 11:40',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 4,
    roleName: '财务审核员',
    roleNameTag: 'warning',
    roleCode: 'FINANCE_CHECKER',
    department: '财务部门',
    departmentTag: 'warning',
    userCount: 5,
    status: false,
    createDate: '2023-04-18 16:10',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 5,
    roleName: '销售经理',
    roleNameTag: 'primary',
    roleCode: 'SALES_MANAGER',
    department: '销售部门',
    departmentTag: 'primary',
    userCount: 8,
    status: true,
    createDate: '2023-02-20 14:25',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 6,
    roleName: '运营专员',
    roleNameTag: 'success',
    roleCode: 'OPERATOR',
    department: '运营部门',
    departmentTag: 'success',
    userCount: 12,
    status: true,
    createDate: '2023-03-05 11:40',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 7,
    roleName: '财务审核员',
    roleNameTag: 'warning',
    roleCode: 'FINANCE_CHECKER',
    department: '财务部门',
    departmentTag: 'warning',
    userCount: 5,
    status: false,
    createDate: '2023-04-18 16:10',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 8,
    roleName: '销售经理',
    roleNameTag: 'primary',
    roleCode: 'SALES_MANAGER',
    department: '销售部门',
    departmentTag: 'primary',
    userCount: 8,
    status: true,
    createDate: '2023-02-20 14:25',
    actions: ['查看', '编辑', '删除'],
  },
]);

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 1248,
});

// 搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  ElMessage.success('搜索完成');
};

// 重置
const handleReset = () => {
  Object.assign(filters, {
    roleType: '',
    roleStatus: '',
    department: '',
    keyword: '',
    dateRange: [],
  });
};

// 新增角色
const handleAdd = () => {
  ElMessage.info('跳转到新增角色页面');
};

// 导出
const handleExport = () => {
  ElMessage.success('正在导出数据...');
};

// 打印
const handlePrint = () => {
  ElMessage.success('正在打印...');
};

// 查看详情
interface RoleRow {
  id: number;
  status?: boolean;
  [key: string]: unknown;
}
const handleView = (_row: RoleRow) => {
  // TODO: 实现查看详情逻辑
};

// 编辑
const handleEdit = (_row: RoleRow) => {
  // TODO: 实现编辑逻辑
};

// 删除
const handleDelete = (_row: RoleRow) => {
  // TODO: 实现删除逻辑
  ElMessage.warning('确认删除该角色？');
};

// 切换状态
const handleStatusChange = (row: RoleRow) => {
  // TODO: 实现切换状态逻辑
  ElMessage.success(row.status ? '已启用' : '已停用');
};

// 分页改变
const handlePageChange = (page: number) => {
  pagination.value.currentPage = page;
};

const handleSizeChange = (size: number) => {
  pagination.value.pageSize = size;
};
</script>

<template>
  <div class="role-container">
    <!-- 筛选区域 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">部门</label>
          <ElSelect v-model="filters.roleType" placeholder="全部" clearable>
            <ElOption
              v-for="item in roleTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">角色名称</label>
          <ElInput v-model="filters.keyword" placeholder="请输入" clearable />
        </div>

        <div class="filter-item">
          <label class="filter-label">角色ID</label>
          <ElInput v-model="filters.keyword" placeholder="请输入" clearable />
        </div>

        <div class="filter-item">
          <label class="filter-label">岗位</label>
          <ElInput v-model="filters.department" placeholder="全部" clearable />
        </div>

        <div class="filter-item">
          <label class="filter-label">目的地</label>
          <ElSelect v-model="filters.roleStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in roleStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">时间</label>
          <ElDatePicker
            v-model="filters.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>

        <div class="filter-actions">
          <ElButton type="primary" :icon="Search" @click="handleSearch">搜索</ElButton>
          <ElButton :icon="Refresh" @click="handleReset">重置</ElButton>
        </div>
      </div>

      <div class="keyword-search">
        <ElInput
          v-model="filters.keyword"
          placeholder="请输入角色名称、角色代码等关键词搜索"
          clearable
          style="width: 400px"
        >
          <template #prefix>
            <ElIcon><Search /></ElIcon>
          </template>
        </ElInput>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <span class="toolbar-title">角色列表</span>
      </div>
      <div class="toolbar-right">
        <ElButton type="primary" :icon="Plus" @click="handleAdd">新增</ElButton>
        <ElButton @click="handleExport">导出</ElButton>
        <ElButton @click="handlePrint">打印</ElButton>
        <ElButton text>刷新</ElButton>
      </div>
    </div>

    <!-- 角色列表 -->
    <div class="role-table-card">
      <ElTable :data="roleList" stripe style="width: 100%">
        <ElTableColumn type="selection" width="50" />

        <ElTableColumn label="角色名称" width="150" fixed>
          <template #default="{ row }">
            <ElTag :type="row.roleNameTag" size="small">{{ row.roleName }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="角色ID" width="180">
          <template #default="{ row }">
            <div class="role-code">{{ row.roleCode }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="所属部门" width="150">
          <template #default="{ row }">
            <ElTag :type="row.departmentTag" size="small">{{ row.department }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="用户数量" width="100">
          <template #default="{ row }">
            <div class="user-count">{{ row.userCount }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="状态" width="100">
          <template #default="{ row }">
            <ElSwitch
              v-model="row.status"
              active-text="启用"
              inactive-text="停用"
              @change="handleStatusChange(row)"
            />
          </template>
        </ElTableColumn>

        <ElTableColumn label="创建时间" width="180">
          <template #default="{ row }">
            <div class="create-date">{{ row.createDate }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" size="small" @click="handleView(row)"> 查看 </ElButton>
            <ElButton link type="primary" size="small" @click="handleEdit(row)"> 编辑 </ElButton>
            <ElButton link type="danger" size="small" @click="handleDelete(row)"> 删除 </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>

      <!-- 分页 -->
      <div class="pagination-wrapper">
        <ElPagination
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
.role-container {
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

/* 角色表格 */
.role-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.role-code {
  font-size: 13px;
  color: #1890ff;
  cursor: pointer;
}

.role-code:hover {
  text-decoration: underline;
}

.user-count {
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

:deep(.el-switch) {
  --el-switch-on-color: #52c41a;
  --el-switch-off-color: #d9d9d9;
}

:deep(.el-switch__label) {
  font-size: 12px;
}

:deep(.el-switch__label.is-active) {
  color: #262626;
}
</style>
