<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Search, Refresh, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 筛选条件
const filters = reactive({
  customerType: '',
  customerStatus: '',
  creditLevel: '',
  responsiblePerson: '',
  businessType: '',
  keyword: '',
  dateRange: [],
});

// 客户类型选项
const customerTypeOptions = [
  { label: '全部', value: '' },
  { label: '企业客户', value: '1' },
  { label: '个人客户', value: '2' },
  { label: '代理商', value: '3' },
];

// 客户状态选项
const customerStatusOptions = [
  { label: '全部', value: '' },
  { label: '合作中', value: '1' },
  { label: '待审核', value: '2' },
  { label: '已停用', value: '3' },
];

// 信用等级选项
const creditLevelOptions = [
  { label: '全部', value: '' },
  { label: 'A级客户', value: 'A' },
  { label: 'B级客户', value: 'B' },
  { label: 'C级客户', value: 'C' },
];

// 业务类型选项
const businessTypeOptions = [
  { label: '全部', value: '' },
  { label: '长途运输', value: '1' },
  { label: '短途配送', value: '2' },
  { label: '冷链运输', value: '3' },
  { label: '危险品运输', value: '4' },
];

// 客户列表
const customerList = ref([
  {
    id: 1,
    customerId: 'CUS2023001',
    customerName: '华为技术有限公司',
    address: '北京市海淀区中关村大街1号',
    creditLevel: '等级A',
    creditType: 'success',
    customerType: 'A级客户',
    typeTag: 'success',
    status: '合作',
    statusType: 'success',
    contactPerson: '张明',
    phone: '138****5678',
    createDate: '2023-09-18',
    lastOrderDate: '2022-05-10',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 2,
    customerId: 'CUS2023008',
    customerName: '京东物流有限公司',
    address: '北京市朝阳区北辰西路69号',
    creditLevel: '电子行业',
    creditType: '',
    customerType: 'A级客户',
    typeTag: 'success',
    status: '合作',
    statusType: 'success',
    contactPerson: '李强',
    phone: '139****2345',
    createDate: '2023-09-15',
    lastOrderDate: '2022-08-15',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 3,
    customerId: 'CUS2023015',
    customerName: '三一重工',
    address: '长沙市岳麓区银盆岭街道银盆南路361号',
    creditLevel: '制造业',
    creditType: '',
    customerType: 'A级客户',
    typeTag: 'success',
    status: '合作',
    statusType: 'success',
    contactPerson: '王伟',
    phone: '137****9301',
    createDate: '2023-09-10',
    lastOrderDate: '2022-09-05',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 4,
    customerId: 'CUS2023022',
    customerName: '网易传媒',
    address: '上海市徐汇区龙华中路596号',
    creditLevel: '互联网行业',
    creditType: '',
    customerType: 'B级客户',
    typeTag: 'warning',
    status: '暂停合作',
    statusType: 'danger',
    contactPerson: '赵敏',
    phone: '136****2345',
    createDate: '2023-01-18',
    lastOrderDate: '',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 5,
    customerId: 'CUS2023026',
    customerName: '美团外卖',
    address: '北京市朝阳区望京东路6号',
    creditLevel: '配送行业',
    creditType: '',
    customerType: 'B级客户',
    typeTag: 'warning',
    status: '暂停合作',
    statusType: 'danger',
    contactPerson: '刘芳',
    phone: '135****6789',
    createDate: '2023-06-20',
    lastOrderDate: '2022-11-12',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 6,
    customerId: 'CUS2023015',
    customerName: '三一重工',
    address: '长沙市岳麓区银盆岭街道银盆南路361号',
    creditLevel: '制造业',
    creditType: '',
    customerType: 'A级客户',
    typeTag: 'success',
    status: '合作',
    statusType: 'success',
    contactPerson: '王伟',
    phone: '137****9301',
    createDate: '2023-09-10',
    lastOrderDate: '2022-09-05',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 7,
    customerId: 'CUS2023022',
    customerName: '网易传媒',
    address: '上海市徐汇区龙华中路596号',
    creditLevel: '互联网行业',
    creditType: '',
    customerType: 'B级客户',
    typeTag: 'warning',
    status: '暂停合作',
    statusType: 'danger',
    contactPerson: '赵敏',
    phone: '136****2345',
    createDate: '2023-01-18',
    lastOrderDate: '',
    actions: ['查看', '编辑', '删除'],
  },
  {
    id: 8,
    customerId: 'CUS2023026',
    customerName: '美团外卖',
    address: '北京市朝阳区望京东路6号',
    creditLevel: '配送行业',
    creditType: '',
    customerType: 'A级客户',
    typeTag: 'success',
    status: '合作',
    statusType: 'success',
    contactPerson: '刘芳',
    phone: '135****6789',
    createDate: '2023-06-20',
    lastOrderDate: '2022-11-12',
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
    customerType: '',
    customerStatus: '',
    creditLevel: '',
    responsiblePerson: '',
    businessType: '',
    keyword: '',
    dateRange: [],
  });
};

// 新增客户
const handleAdd = () => {
  ElMessage.info('跳转到新增客户页面');
};

// 查看详情
interface CustomerRow {
  id: number;
  [key: string]: unknown;
}
const handleView = (_row: CustomerRow) => {
  // TODO: 实现查看详情逻辑
};

// 编辑
const handleEdit = (_row: CustomerRow) => {
  // TODO: 实现编辑逻辑
};

// 删除
const handleDelete = (_row: CustomerRow) => {
  // TODO: 实现删除逻辑
  ElMessage.warning('确认删除该客户？');
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
  <div class="customer-container">
    <!-- 筛选区域 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">客户类型</label>
          <ElSelect v-model="filters.customerType" placeholder="全部" clearable>
            <ElOption
              v-for="item in customerTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">客户状态</label>
          <ElSelect v-model="filters.customerStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in customerStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">信用等级</label>
          <ElSelect v-model="filters.creditLevel" placeholder="全部" clearable>
            <ElOption
              v-for="item in creditLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">联系人/电话</label>
          <ElInput v-model="filters.responsiblePerson" placeholder="请输入" clearable />
        </div>

        <div class="filter-item">
          <label class="filter-label">所属行业</label>
          <ElSelect v-model="filters.businessType" placeholder="全部" clearable>
            <ElOption
              v-for="item in businessTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">目的地</label>
          <ElSelect v-model="filters.keyword" placeholder="全部" clearable>
            <ElOption label="北京" value="1" />
            <ElOption label="上海" value="2" />
            <ElOption label="广州" value="3" />
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
          placeholder="请输入客户名称、联系人等关键词搜索"
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
        <ElButton type="primary" :icon="Plus" @click="handleAdd">新增</ElButton>
        <ElButton>导出</ElButton>
        <ElButton>打印</ElButton>
      </div>
      <div class="toolbar-right">
        <ElButton text>刷新</ElButton>
      </div>
    </div>

    <!-- 客户列表 -->
    <div class="customer-table-card">
      <ElTable :data="customerList" stripe style="width: 100%">
        <ElTableColumn type="selection" width="50" />

        <ElTableColumn label="客户编号" width="130" fixed>
          <template #default="{ row }">
            <div class="customer-id">{{ row.customerId }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="客户名称" width="180">
          <template #default="{ row }">
            <div class="customer-name">
              <div class="name-text">{{ row.customerName }}</div>
              <div class="address-text">{{ row.address }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="信用/行业" width="120">
          <template #default="{ row }">
            <div class="credit-info">
              <ElTag v-if="row.creditType" :type="row.creditType" size="small">
                {{ row.creditLevel }}
              </ElTag>
              <span v-else class="credit-text">{{ row.creditLevel }}</span>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="客户等级" width="100">
          <template #default="{ row }">
            <ElTag :type="row.typeTag" size="small">{{ row.customerType }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.statusType" size="small">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="联系人" width="100">
          <template #default="{ row }">
            <div class="contact-person">{{ row.contactPerson }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="手机号码" width="130">
          <template #default="{ row }">
            <div class="phone">{{ row.phone }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="创建日期" width="120">
          <template #default="{ row }">
            <div class="create-date">{{ row.createDate }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="最新订单日期" width="120">
          <template #default="{ row }">
            <div class="last-order-date">{{ row.lastOrderDate || '-' }}</div>
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
.customer-container {
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

/* 客户表格 */
.customer-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.customer-id {
  font-size: 14px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.customer-id:hover {
  text-decoration: underline;
}

.customer-name {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.name-text {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.address-text {
  font-size: 12px;
  color: #8c8c8c;
}

.credit-info {
  font-size: 13px;
}

.credit-text {
  color: #595959;
}

.contact-person {
  font-size: 13px;
  color: #262626;
}

.phone {
  font-size: 13px;
  color: #595959;
}

.create-date,
.last-order-date {
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
