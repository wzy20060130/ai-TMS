<script setup lang="ts">
import { ref } from 'vue';
import { Search, Refresh, Download, Plus } from '@element-plus/icons-vue';

// 统计数据
const stats = ref([
  {
    label: '运行中数量',
    value: 55,
    change: '+2.5%',
    trend: 'up',
    icon: '📦',
    color: '#E3F2FD',
  },
  {
    label: '待派单订单',
    value: 42,
    change: '+2.7%',
    trend: 'up',
    icon: '📋',
    color: '#F3E5F5',
  },
  {
    label: '已派单订单',
    value: 89,
    change: '+3.1%',
    trend: 'up',
    icon: '✅',
    color: '#E8F5E9',
  },
  {
    label: '异常订单',
    value: 12,
    change: '+0.2%',
    trend: 'up',
    icon: '⚠️',
    color: '#FFF3E0',
  },
]);

// 筛选条件
const filters = ref({
  orderType: '',
  orderStatus: '',
  paymentStatus: '',
  transportType: '',
  dateRange: [],
  keyword: '',
});

// 订单类型选项
const orderTypeOptions = [
  { label: '全部', value: '' },
  { label: '整车', value: '1' },
  { label: '零担', value: '2' },
  { label: '快递', value: '3' },
];

// 订单状态选项
const orderStatusOptions = [
  { label: '全部', value: '' },
  { label: '待派单', value: '1' },
  { label: '已派单', value: '2' },
  { label: '运输中', value: '3' },
  { label: '已完成', value: '4' },
  { label: '已取消', value: '5' },
];

// 支付状态选项
const paymentStatusOptions = [
  { label: '全部', value: '' },
  { label: '未支付', value: '1' },
  { label: '部分支付', value: '2' },
  { label: '已支付', value: '3' },
];

// 运输方式选项
const transportTypeOptions = [
  { label: '全部', value: '' },
  { label: '公路运输', value: '1' },
  { label: '铁路运输', value: '2' },
  { label: '航空运输', value: '3' },
];

// 订单列表数据
const orderList = ref([
  {
    id: 'ORD-2023051001',
    subId: 'TQ-2023051001',
    route: {
      from: '上海市虹口区',
      to: '广州天河区',
    },
    cargo: {
      name: '电子产品',
      code: 'SKU-2023051001',
      weight: '500kg',
      volume: '10m³',
    },
    customer: '华东物流配送中心',
    consignee: {
      name: '张三',
      phone: '138****1234',
      address: '广州市天河区...',
    },
    amount: '¥7,850.00',
    status: '待派单',
    statusType: 'warning',
    transportStatus: '待配载',
    driver: '-',
    vehicle: '-',
    createTime: '2023-05-10 09:32',
    creator: '李明',
    remark: '易碎品，请轻拿轻放',
  },
  {
    id: 'ORD-2023051002',
    subId: 'TQ-2023051002',
    route: {
      from: '上海市浦东新区',
      to: '南京市玄武区',
    },
    cargo: {
      name: '日用百货',
      code: 'SKU-2023051002',
      weight: '800kg',
      volume: '15m³',
    },
    customer: '上海百货物流有限公司',
    consignee: {
      name: '李四',
      phone: '139****5678',
      address: '南京市玄武区...',
    },
    amount: '¥5,200.00',
    status: '运输中',
    statusType: 'primary',
    transportStatus: '在途',
    driver: '王师傅',
    vehicle: '苏A12345',
    createTime: '2023-05-10 08:15',
    creator: '张伟',
    remark: '',
  },
  {
    id: 'ORD-2023051003',
    subId: 'TQ-2023051003',
    route: {
      from: '北京市朝阳区',
      to: '成都市武侯区',
    },
    cargo: {
      name: '机械设备',
      code: 'SKU-2023051003',
      weight: '1200kg',
      volume: '20m³',
    },
    customer: '北京工业设备公司',
    consignee: {
      name: '王五',
      phone: '136****9012',
      address: '成都市武侯区...',
    },
    amount: '¥12,500.00',
    status: '已完成',
    statusType: 'success',
    transportStatus: '已签收',
    driver: '赵师傅',
    vehicle: '京B67890',
    createTime: '2023-05-09 14:20',
    creator: '刘强',
    remark: '重货，需要叉车',
  },
  {
    id: 'ORD-2023051004',
    subId: 'TQ-2023051004',
    route: {
      from: '杭州市西湖区',
      to: '南京市建邺区',
    },
    cargo: {
      name: '服装纺织品',
      code: 'SKU-2023051004',
      weight: '300kg',
      volume: '8m³',
    },
    customer: '杭州纺织进出口公司',
    consignee: {
      name: '赵六',
      phone: '137****3456',
      address: '南京市建邺区...',
    },
    amount: '¥3,800.00',
    status: '已派单',
    statusType: 'info',
    transportStatus: '待装车',
    driver: '孙师傅',
    vehicle: '浙A11111',
    createTime: '2023-05-10 10:45',
    creator: '陈明',
    remark: '',
  },
  {
    id: 'ORD-2023051005',
    subId: 'TQ-2023051005',
    route: {
      from: '深圳市南山区',
      to: '西安市雁塔区',
    },
    cargo: {
      name: '电子元器件',
      code: 'SKU-2023051005',
      weight: '150kg',
      volume: '5m³',
    },
    customer: '深圳电子科技有限公司',
    consignee: {
      name: '周七',
      phone: '135****7890',
      address: '西安市雁塔区...',
    },
    amount: '¥6,200.00',
    status: '异常',
    statusType: 'danger',
    transportStatus: '运输延误',
    driver: '吴师傅',
    vehicle: '粤B22222',
    createTime: '2023-05-08 16:30',
    creator: '杨洋',
    remark: '客户要求加急',
  },
]);

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 1528,
});

// 搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
};

// 重置
const handleReset = () => {
  filters.value = {
    orderType: '',
    orderStatus: '',
    paymentStatus: '',
    transportType: '',
    dateRange: [],
    keyword: '',
  };
};

// 导出
const handleExport = () => {
  // TODO: 实现导出逻辑
};

// 新增订单
const handleAdd = () => {
  // TODO: 实现新增订单逻辑
};

// 查看详情
interface OrderRow {
  id: number;
  [key: string]: unknown;
}
const handleView = (_row: OrderRow) => {
  // TODO: 实现查看详情逻辑
};

// 编辑
const handleEdit = (_row: OrderRow) => {
  // TODO: 实现编辑逻辑
};

// 删除
const handleDelete = (_row: OrderRow) => {
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
  <div class="order-data-container">
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
          <div class="stat-change" :class="stat.trend">
            {{ stat.change }}
          </div>
        </div>
      </div>
    </div>

    <!-- 筛选区域 -->
    <div class="filter-card">
      <div class="filter-row">
        <div class="filter-item">
          <label class="filter-label">订单类型</label>
          <ElSelect v-model="filters.orderType" placeholder="全部" clearable>
            <ElOption
              v-for="item in orderTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">订单状态</label>
          <ElSelect v-model="filters.orderStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in orderStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">支付状态</label>
          <ElSelect v-model="filters.paymentStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in paymentStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">运输方式</label>
          <ElSelect v-model="filters.transportType" placeholder="全部" clearable>
            <ElOption
              v-for="item in transportTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item date-range">
          <label class="filter-label">日期</label>
          <ElDatePicker
            v-model="filters.dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="YYYY/MM/DD"
          />
        </div>

        <div class="filter-actions">
          <ElButton type="primary" :icon="Search" @click="handleSearch"> 搜索 </ElButton>
          <ElButton :icon="Refresh" @click="handleReset"> 重置 </ElButton>
        </div>
      </div>
    </div>

    <!-- 操作栏 -->
    <div class="toolbar">
      <div class="toolbar-left">
        <ElButton type="danger" :icon="Plus" @click="handleAdd"> 新增 </ElButton>
        <ElButton type="primary" :icon="Download" @click="handleExport"> 导出 </ElButton>
      </div>
      <div class="toolbar-right">
        <ElButton text>刷新</ElButton>
        <ElButton text>列设置</ElButton>
        <ElButton text>批量操作</ElButton>
      </div>
    </div>

    <!-- 订单列表 -->
    <div class="order-table-card">
      <ElTable :data="orderList" stripe style="width: 100%">
        <ElTableColumn type="selection" width="50" />

        <ElTableColumn label="订单编号" width="180">
          <template #default="{ row }">
            <div class="order-id-cell">
              <div class="main-id">{{ row.id }}</div>
              <div class="sub-id">{{ row.subId }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="运输路线" width="200">
          <template #default="{ row }">
            <div class="route-cell">
              <div class="route-item">
                <span class="route-label">起：</span>
                <span class="route-text">{{ row.route.from }}</span>
              </div>
              <div class="route-item">
                <span class="route-label">止：</span>
                <span class="route-text">{{ row.route.to }}</span>
              </div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="货物信息" width="180">
          <template #default="{ row }">
            <div class="cargo-cell">
              <div class="cargo-name">{{ row.cargo.name }}</div>
              <div class="cargo-detail">{{ row.cargo.weight }} / {{ row.cargo.volume }}</div>
              <div class="cargo-code">{{ row.cargo.code }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="客户名称" prop="customer" width="150" />

        <ElTableColumn label="订单状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.statusType" size="small">
              {{ row.status }}
            </ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="运输状态" width="100">
          <template #default="{ row }">
            <div class="transport-status">{{ row.transportStatus }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="司机/车辆" width="120">
          <template #default="{ row }">
            <div class="driver-cell">
              <div>{{ row.driver }}</div>
              <div class="vehicle-no">{{ row.vehicle }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="运费金额" prop="amount" width="120" />

        <ElTableColumn label="订单创建" width="150">
          <template #default="{ row }">
            <div class="create-cell">
              <div class="create-time">{{ row.createTime }}</div>
              <div class="creator">创建人：{{ row.creator }}</div>
            </div>
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
.order-data-container {
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

.stat-change.up {
  color: #52c41a;
}

.stat-change.down {
  color: #ff4d4f;
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

/* 订单表格 */
.order-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.order-id-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.main-id {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
}

.sub-id {
  font-size: 11px;
  color: #8c8c8c;
}

.route-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.route-item {
  font-size: 12px;
  display: flex;
  align-items: center;
}

.route-label {
  color: #8c8c8c;
  margin-right: 4px;
}

.route-text {
  color: #262626;
}

.cargo-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cargo-name {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
}

.cargo-detail {
  font-size: 11px;
  color: #8c8c8c;
}

.cargo-code {
  font-size: 11px;
  color: #bfbfbf;
}

.transport-status {
  font-size: 12px;
  color: #595959;
}

.driver-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
}

.vehicle-no {
  color: #8c8c8c;
  font-size: 11px;
}

.create-cell {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.create-time {
  font-size: 12px;
  color: #262626;
}

.creator {
  font-size: 11px;
  color: #8c8c8c;
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
