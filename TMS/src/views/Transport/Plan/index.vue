<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Search, Refresh, Download, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 统计数据
const stats = ref([
  {
    label: '待运输计划',
    value: 126,
    change: '较上周 ↓ 5%',
    icon: '📋',
    color: '#E3F2FD',
  },
  {
    label: '待执行计划',
    value: 48,
    change: '较上周 ↑ 2.2%',
    icon: '⏰',
    color: '#F3E5F5',
  },
  {
    label: '执行中计划',
    value: 32,
    change: '较上周 ↓ 1.1%',
    icon: '🚚',
    color: '#FFF3E0',
  },
  {
    label: '计划完成率',
    value: '96.8%',
    change: '较上周 ↑ 1.5%',
    icon: '✅',
    color: '#E8F5E9',
  },
]);

// 筛选条件
const filters = reactive({
  planStatus: '',
  planType: '',
  routeType: '',
  vehicleType: '',
  driverType: '',
  dateRange: [],
  keyword: '',
});

// 计划状态选项
const planStatusOptions = [
  { label: '全部', value: '' },
  { label: '待执行', value: '1' },
  { label: '执行中', value: '2' },
  { label: '已完成', value: '3' },
  { label: '已取消', value: '4' },
];

// 计划类型选项
const planTypeOptions = [
  { label: '全部', value: '' },
  { label: '整车运输', value: '1' },
  { label: '零担运输', value: '2' },
  { label: '快递运输', value: '3' },
];

// 路线类型选项
const routeTypeOptions = [
  { label: '全部', value: '' },
  { label: '短途', value: '1' },
  { label: '中途', value: '2' },
  { label: '长途', value: '3' },
];

// 车辆类型选项
const vehicleTypeOptions = [
  { label: '全部', value: '' },
  { label: '厢式货车', value: '1' },
  { label: '平板车', value: '2' },
  { label: '冷藏车', value: '3' },
];

// 运输计划列表
const planList = ref([
  {
    id: 'PLAN-2023060001',
    status: '待执行',
    statusType: 'warning',
    orders: [
      { id: 'ORD-2023061001', route: '上海 → 北京' },
      { id: 'ORD-2023061002', route: '上海 → 天津' },
    ],
    route: {
      start: '上海仓库',
      end: '北京物流配送中心',
    },
    schedule: {
      departureDate: '2023-06-20',
      departureTime: '08:00',
      arrivalDate: '2023-06-21',
      arrivalTime: '18:00',
    },
    cargo: {
      count: 2,
      weight: '2500kg',
      volume: '15.5m³',
    },
    driver: {
      name: '王师傅',
      phone: '138****1234',
      vehicle: '沪A12345',
    },
    status_label: '车辆调度中',
    remark: '客户要求准时送达，需要在21日18点前送达',
  },
  {
    id: 'PLAN-2023060002',
    status: '执行中',
    statusType: 'primary',
    orders: [{ id: 'ORD-2023061005', route: '广州 → 深圳' }],
    route: {
      start: '广州仓库',
      end: '深圳物流配送中心',
    },
    schedule: {
      departureDate: '2023-06-20',
      departureTime: '09:00',
      arrivalDate: '2023-06-20',
      arrivalTime: '15:30',
    },
    cargo: {
      count: 1,
      weight: '500kg',
      volume: '8.2m³',
    },
    driver: {
      name: '赵师傅',
      phone: '139****5678',
      vehicle: '粤A67890',
    },
    status_label: '运输中',
    remark: '货物已装车，正在运输途中',
  },
  {
    id: 'PLAN-2023060003',
    status: '已完成',
    statusType: 'success',
    orders: [{ id: 'ORD-2023061012', route: '北京 → 天津' }],
    route: {
      start: '北京仓库',
      end: '天津物流配送中心',
    },
    schedule: {
      departureDate: '2023-06-19',
      departureTime: '10:00',
      arrivalDate: '2023-06-19',
      arrivalTime: '14:10',
    },
    cargo: {
      count: 1,
      weight: '1500kg',
      volume: '12.0m³',
    },
    driver: {
      name: '孙师傅',
      phone: '136****9012',
      vehicle: '京B11111',
    },
    status_label: '已签收',
    remark: '已按时送达，客户已签收',
  },
  {
    id: 'PLAN-2023060004',
    status: '待执行',
    statusType: 'warning',
    orders: [{ id: 'ORD-2023061023', route: '成都 → 重庆' }],
    route: {
      start: '成都仓库',
      end: '重庆物流配送中心',
    },
    schedule: {
      departureDate: '2023-06-20',
      departureTime: '14:00',
      arrivalDate: '2023-06-20',
      arrivalTime: '20:30',
    },
    cargo: {
      count: 1,
      weight: '800kg',
      volume: '10.5m³',
    },
    driver: {
      name: '刘师傅',
      phone: '137****7890',
      vehicle: '川A22222',
    },
    status_label: '待装货',
    remark: '预计今日14点装货，20点30分送达',
  },
  {
    id: 'PLAN-2023060005',
    status: '已取消',
    statusType: 'info',
    orders: [{ id: 'ORD-2023061025', route: '武汉 → 长沙' }],
    route: {
      start: '武汉仓库',
      end: '长沙物流配送中心',
    },
    schedule: {
      departureDate: '2023-06-19',
      departureTime: '08:00',
      arrivalDate: '2023-06-19',
      arrivalTime: '16:00',
    },
    cargo: {
      count: 1,
      weight: '700kg',
      volume: '9.5m³',
    },
    driver: {
      name: '吴师傅',
      phone: '138****1234',
      vehicle: '鄂A33333',
    },
    status_label: '已取消',
    remark: '客户取消订单，运输计划已取消',
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
    planStatus: '',
    planType: '',
    routeType: '',
    vehicleType: '',
    driverType: '',
    dateRange: [],
    keyword: '',
  });
};

// 导出
const handleExport = () => {
  ElMessage.success('正在导出数据...');
};

// 新增计划
const handleAdd = () => {
  ElMessage.info('跳转到新增运输计划页面');
};

// 查看详情
interface PlanRow {
  id: number;
  [key: string]: unknown;
}
const handleView = (_row: PlanRow) => {
  // TODO: 实现查看详情逻辑
};

// 编辑
const handleEdit = (_row: PlanRow) => {
  // TODO: 实现编辑逻辑
};

// 删除
const handleDelete = (_row: PlanRow) => {
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
  <div class="plan-container">
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
          <label class="filter-label">计划状态</label>
          <ElSelect v-model="filters.planStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in planStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">计划类型</label>
          <ElSelect v-model="filters.planType" placeholder="全部" clearable>
            <ElOption
              v-for="item in planTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">路线类型</label>
          <ElSelect v-model="filters.routeType" placeholder="全部" clearable>
            <ElOption
              v-for="item in routeTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">车辆类型</label>
          <ElSelect v-model="filters.vehicleType" placeholder="全部" clearable>
            <ElOption
              v-for="item in vehicleTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">驾驶员类型</label>
          <ElSelect v-model="filters.driverType" placeholder="全部" clearable>
            <ElOption label="自有司机" value="1" />
            <ElOption label="外协司机" value="2" />
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
          placeholder="请输入计划编号、订单编号等关键词搜索"
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
        <ElButton text>批量操作</ElButton>
      </div>
    </div>

    <!-- 运输计划列表 -->
    <div class="plan-table-card">
      <ElTable :data="planList" stripe style="width: 100%">
        <ElTableColumn type="selection" width="50" />

        <ElTableColumn label="计划编号" width="150" fixed>
          <template #default="{ row }">
            <div class="plan-id">{{ row.id }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="计划状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.statusType" size="small">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="关联订单号" width="200">
          <template #default="{ row }">
            <div class="orders-list">
              <div v-for="(order, index) in row.orders" :key="index" class="order-item">
                <span class="order-id">{{ order.id }}</span>
                <span class="order-route">{{ order.route }}</span>
              </div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="出发地/目的地" width="200">
          <template #default="{ row }">
            <div class="route-info">
              <div class="route-start">起：{{ row.route.start }}</div>
              <div class="route-end">止：{{ row.route.end }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="发车时间" width="150">
          <template #default="{ row }">
            <div class="schedule-info">
              <div class="schedule-date">{{ row.schedule.departureDate }}</div>
              <div class="schedule-time">{{ row.schedule.departureTime }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="预计到达" width="150">
          <template #default="{ row }">
            <div class="schedule-info">
              <div class="schedule-date">{{ row.schedule.arrivalDate }}</div>
              <div class="schedule-time">{{ row.schedule.arrivalTime }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="货量/重量" width="120">
          <template #default="{ row }">
            <div class="cargo-info">
              <div class="cargo-count">{{ row.cargo.count }}单</div>
              <div class="cargo-weight">{{ row.cargo.weight }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="司机/车辆" width="150">
          <template #default="{ row }">
            <div class="driver-info">
              <div class="driver-name">{{ row.driver.name }}</div>
              <div class="driver-detail">{{ row.driver.phone }} | {{ row.driver.vehicle }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="执行状态" width="120">
          <template #default="{ row }">
            <div class="status-label">{{ row.status_label }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="备注信息" width="200">
          <template #default="{ row }">
            <div class="remark">{{ row.remark }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" size="small" @click="handleView(row)">
              查看详情
            </ElButton>
            <ElButton
              v-if="row.status === '待执行'"
              link
              type="primary"
              size="small"
              @click="handleEdit(row)"
            >
              编辑计划
            </ElButton>
            <ElButton
              v-if="row.status === '待执行'"
              link
              type="danger"
              size="small"
              @click="handleDelete(row)"
            >
              取消计划
            </ElButton>
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
.plan-container {
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

/* 运输计划表格 */
.plan-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.plan-id {
  font-size: 13px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.plan-id:hover {
  text-decoration: underline;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.order-item {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.order-id {
  font-size: 12px;
  color: #262626;
  font-weight: 500;
}

.order-route {
  font-size: 11px;
  color: #8c8c8c;
}

.route-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.route-start,
.route-end {
  font-size: 12px;
  color: #595959;
}

.schedule-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.schedule-date {
  font-size: 12px;
  color: #262626;
  font-weight: 500;
}

.schedule-time {
  font-size: 11px;
  color: #8c8c8c;
}

.cargo-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.cargo-count,
.cargo-weight {
  font-size: 12px;
  color: #595959;
}

.driver-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.driver-name {
  font-size: 12px;
  color: #262626;
  font-weight: 500;
}

.driver-detail {
  font-size: 11px;
  color: #8c8c8c;
}

.status-label {
  font-size: 12px;
  color: #595959;
}

.remark {
  font-size: 12px;
  color: #595959;
  line-height: 1.5;
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
