<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Search, Refresh, Download, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 统计数据
const stats = ref([
  {
    label: '运行中数量',
    value: 86,
    change: '+1.2%',
    icon: '📋',
    color: '#E3F2FD',
  },
  {
    label: '待提货',
    value: 42,
    change: '+1.7%',
    icon: '📦',
    color: '#F3E5F5',
  },
  {
    label: '已提货',
    value: 44,
    change: '+3.8%',
    icon: '✅',
    color: '#FFF3E0',
  },
  {
    label: '已签收订单',
    value: 16,
    change: '+1.6%',
    icon: '📝',
    color: '#E8F5E9',
  },
]);

// 筛选条件
const filters = reactive({
  cargoStatus: '',
  pickupType: '',
  deliveryType: '',
  timeType: '',
  customerType: '',
  dateRange: [],
  keyword: '',
});

// 提货单状态选项
const cargoStatusOptions = [
  { label: '全部', value: '' },
  { label: '待提货', value: '1' },
  { label: '提货中', value: '2' },
  { label: '已提货', value: '3' },
  { label: '已取消', value: '4' },
];

// 提货方式选项
const pickupTypeOptions = [
  { label: '全部', value: '' },
  { label: '上门提货', value: '1' },
  { label: '自提', value: '2' },
];

// 配送方式选项
const deliveryTypeOptions = [
  { label: '全部', value: '' },
  { label: '送货上门', value: '1' },
  { label: '自提', value: '2' },
];

// 客户类型选项
const customerTypeOptions = [
  { label: '全部', value: '' },
  { label: '企业客户', value: '1' },
  { label: '个人客户', value: '2' },
];

// 提货单列表
const cargoList = ref([
  {
    id: 'PK-2023061001',
    waybillNo: 'WB-2023061001',
    sender: {
      company: '上海虹口区仓库',
      address: '上海市虹口区某某街道123号仓库A区',
      contact: '张三',
      phone: '138****1234',
    },
    receiver: {
      company: '上海宝冠贸易有限公司',
      contact: '李四',
      phone: '139****5678',
    },
    cargo: {
      name: '电子产品',
      weight: '500kg',
      volume: '12.5m³',
    },
    status: '已提货',
    statusType: 'success',
    pickupType: '上门提货',
    deliveryType: '送货上门',
    driver: {
      name: '王师傅',
      phone: '136****9012',
      vehicle: '沪A12345',
    },
    pickupTime: '2023-06-16 10:30',
    deliveryTime: '2023-06-16 18:00',
    signTime: '2023-06-16 19:30',
    createTime: '2023-06-16 09:00',
    creator: '张明',
    remark: '易碎品，轻拿轻放',
    amount: '2500.00',
  },
  {
    id: 'PK-2023061002',
    waybillNo: 'WB-2023061003',
    sender: {
      company: '苏州工业园区仓库',
      address: '苏州市工业园区某某路456号仓库B区',
      contact: '赵六',
      phone: '137****7890',
    },
    receiver: {
      company: '苏州科技有限公司',
      contact: '孙七',
      phone: '138****1234',
    },
    cargo: {
      name: '机械配件',
      weight: '800kg',
      volume: '18.5m³',
    },
    status: '待提货',
    statusType: 'warning',
    pickupType: '自提',
    deliveryType: '送货上门',
    driver: {
      name: '新增司机',
      phone: '-',
      vehicle: '-',
    },
    pickupTime: '2023-06-16 14:00',
    deliveryTime: '2023-06-17 10:00',
    signTime: '-',
    createTime: '2023-06-16 10:30',
    creator: '李伟',
    remark: '重货，需要叉车',
    amount: '4200.00',
  },
  {
    id: 'PK-2023061003',
    waybillNo: 'WB-2023061002',
    sender: {
      company: '广州白云区仓库',
      address: '广州市白云区某某大道789号仓库C区',
      contact: '周八',
      phone: '139****5678',
    },
    receiver: {
      company: '广州宝冠有限公司',
      contact: '吴九',
      phone: '135****9012',
    },
    cargo: {
      name: '日用百货',
      weight: '300kg',
      volume: '8.2m³',
    },
    status: '提货中',
    statusType: 'primary',
    pickupType: '上门提货',
    deliveryType: '自提',
    driver: {
      name: '赵师傅',
      phone: '136****3456',
      vehicle: '粤A67890',
    },
    pickupTime: '2023-06-16 14:00',
    deliveryTime: '2023-06-16 20:00',
    signTime: '-',
    createTime: '2023-06-16 11:00',
    creator: '刘强',
    remark: '',
    amount: '1800.00',
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
    cargoStatus: '',
    pickupType: '',
    deliveryType: '',
    timeType: '',
    customerType: '',
    dateRange: [],
    keyword: '',
  });
};

// 导出
const handleExport = () => {
  ElMessage.success('正在导出数据...');
};

// 新增提货单
const handleAdd = () => {
  ElMessage.info('跳转到新增提货单页面');
};

// 查看详情
interface CargoRow {
  id: number;
  [key: string]: unknown;
}
const handleView = (_row: CargoRow) => {
  // TODO: 实现查看详情逻辑
};

// 编辑
const handleEdit = (_row: CargoRow) => {
  // TODO: 实现编辑逻辑
};

// 删除
const handleDelete = (_row: CargoRow) => {
  // TODO: 实现删除逻辑
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
  <div class="cargo-container">
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
          <label class="filter-label">提货单状态</label>
          <ElSelect v-model="filters.cargoStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in cargoStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">提货方式</label>
          <ElSelect v-model="filters.pickupType" placeholder="全部" clearable>
            <ElOption
              v-for="item in pickupTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">配送方式</label>
          <ElSelect v-model="filters.deliveryType" placeholder="全部" clearable>
            <ElOption
              v-for="item in deliveryTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

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
          <label class="filter-label">日期</label>
          <ElSelect v-model="filters.timeType" placeholder="创建时间">
            <ElOption label="创建时间" value="1" />
            <ElOption label="提货时间" value="2" />
            <ElOption label="签收时间" value="3" />
          </ElSelect>
        </div>

        <div class="filter-item date-range">
          <label class="filter-label">日期范围</label>
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
          placeholder="请输入提货单编号、运单编号等关键词搜索"
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
        <ElButton type="danger" :icon="Plus" @click="handleAdd">新增</ElButton>
        <ElButton type="primary" :icon="Download" @click="handleExport">导出</ElButton>
      </div>
      <div class="toolbar-right">
        <ElButton text>刷新</ElButton>
        <ElButton text>列设置</ElButton>
      </div>
    </div>

    <!-- 提货单列表 -->
    <div class="cargo-table-card">
      <ElTable :data="cargoList" stripe style="width: 100%">
        <ElTableColumn type="selection" width="50" />

        <ElTableColumn label="提货单号" width="150" fixed>
          <template #default="{ row }">
            <div class="cargo-id">{{ row.id }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="关联运单号" width="150">
          <template #default="{ row }">
            <div class="waybill-no">{{ row.waybillNo }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="提货仓库/地址" width="200">
          <template #default="{ row }">
            <div class="location-info">
              <div class="location-name">{{ row.sender.company }}</div>
              <div class="location-address">{{ row.sender.address }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="发货方" width="150">
          <template #default="{ row }">
            <div class="party-info">
              <div class="party-name">{{ row.receiver.company }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="提货单状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.statusType" size="small">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="提货方式" width="100">
          <template #default="{ row }">
            <div class="pickup-type">{{ row.pickupType }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="配送类型" width="100">
          <template #default="{ row }">
            <div class="delivery-type">{{ row.deliveryType }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="货物信息" width="150">
          <template #default="{ row }">
            <div class="cargo-info">
              <div class="cargo-name">{{ row.cargo.name }}</div>
              <div class="cargo-detail">{{ row.cargo.weight }} | {{ row.cargo.volume }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="计划提货时间/时间" width="180">
          <template #default="{ row }">
            <div class="time-info">
              <div class="time-label">计划：{{ row.pickupTime }}</div>
              <div class="time-label">实际：{{ row.deliveryTime }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="提货司机/车辆信息" width="180">
          <template #default="{ row }">
            <div class="driver-info">
              <div class="driver-name">司机：{{ row.driver.name }}</div>
              <div class="driver-detail">车牌：{{ row.driver.vehicle }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="签收时间" width="150">
          <template #default="{ row }">
            <div class="sign-time">{{ row.signTime }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="运费金额(元)" width="120" align="right">
          <template #default="{ row }">
            <div class="amount">{{ row.amount }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="操作" width="180" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" size="small" @click="handleView(row)"> 详情 </ElButton>
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
.cargo-container {
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

.filter-item.date-range {
  flex: 1;
  min-width: 300px;
}

.filter-label {
  font-size: 13px;
  color: #595959;
  font-weight: 500;
}

.filter-item :deep(.el-select) {
  width: 160px;
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

/* 提货单表格 */
.cargo-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.cargo-id {
  font-size: 13px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.cargo-id:hover {
  text-decoration: underline;
}

.waybill-no {
  font-size: 13px;
  color: #262626;
}

.location-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.location-name {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.location-address {
  font-size: 11px;
  color: #8c8c8c;
}

.party-info {
  font-size: 13px;
  color: #262626;
}

.party-name {
  font-weight: 500;
}

.pickup-type,
.delivery-type {
  font-size: 12px;
  color: #262626;
}

.cargo-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cargo-name {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.cargo-detail {
  font-size: 11px;
  color: #8c8c8c;
}

.time-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.time-label {
  font-size: 12px;
  color: #595959;
}

.driver-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.driver-name,
.driver-detail {
  font-size: 12px;
  color: #595959;
}

.sign-time {
  font-size: 12px;
  color: #595959;
}

.amount {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
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
