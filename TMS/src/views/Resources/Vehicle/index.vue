<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Search, Refresh, Download, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 统计数据
const stats = ref([
  {
    label: '总车辆数',
    value: 46,
    change: '较上月 ↑ 2',
    icon: '🚚',
    color: '#E3F2FD',
  },
  {
    label: '运行中车辆',
    value: 28,
    change: '较昨日增加4辆',
    icon: '🚛',
    color: '#E8F5E9',
  },
  {
    label: '空闲车辆',
    value: 10,
    change: '较昨日 ↓ 2',
    icon: '🅿️',
    color: '#F3E5F5',
  },
  {
    label: '保养中车辆',
    value: 5,
    change: '较昨日 ↑ 1辆',
    icon: '🔧',
    color: '#FFF3E0',
  },
  {
    label: '本月维修费',
    value: 8,
    change: '较昨日增加费用',
    icon: '💰',
    color: '#FFEBEE',
  },
]);

// 筛选条件
const filters = reactive({
  vehicleType: '',
  vehicleStatus: '',
  ownershipType: '',
  maintenanceStatus: '',
  driverStatus: '',
  dateRange: [],
  keyword: '',
});

// 车辆类型选项
const vehicleTypeOptions = [
  { label: '全部', value: '' },
  { label: '厢式货车', value: '1' },
  { label: '平板车', value: '2' },
  { label: '冷藏车', value: '3' },
  { label: '危险品车', value: '4' },
];

// 车辆状态选项
const vehicleStatusOptions = [
  { label: '全部', value: '' },
  { label: '运行中', value: '1' },
  { label: '空闲', value: '2' },
  { label: '保养中', value: '3' },
  { label: '维修中', value: '4' },
];

// 归属类型选项
const ownershipTypeOptions = [
  { label: '全部', value: '' },
  { label: '自有车辆', value: '1' },
  { label: '外协车辆', value: '2' },
];

// 保养状态选项
const maintenanceStatusOptions = [
  { label: '全部', value: '' },
  { label: '正常', value: '1' },
  { label: '即将保养', value: '2' },
  { label: '保养中', value: '3' },
];

// 车辆列表
const vehicleList = ref([
  {
    id: 1,
    plateNumber: '沪A-12345',
    vehicleType: '厢式货车',
    vehicleInfo: {
      brand: '福田欧马可S3',
      model: '4.2米',
      load: '3000kg',
      volume: '18m³',
    },
    ownership: '自有',
    driver: {
      name: '张师傅',
      phone: '138****1234',
      avatar: '👤',
    },
    status: '运行中',
    statusType: 'success',
    currentOrder: 'PLAN-2023062001',
    mileage: '126,854 km',
    lastMaintenance: '2023-06-21',
    nextMaintenance: '2024-05-15',
    maintenanceStatus: '正常',
  },
  {
    id: 2,
    plateNumber: '粤A-67890',
    vehicleType: '冷藏车',
    vehicleInfo: {
      brand: '解放J6',
      model: '6.8米',
      load: '8000kg',
      volume: '35m³',
    },
    ownership: '自有',
    driver: {
      name: '李师傅',
      phone: '139****5678',
      avatar: '👤',
    },
    status: '运行中',
    statusType: 'success',
    currentOrder: 'PLAN-2023062002',
    mileage: '89,452 km',
    lastMaintenance: '2023-06-26 (5天前)',
    nextMaintenance: '2024-05-20',
    maintenanceStatus: '正常',
  },
  {
    id: 3,
    plateNumber: '京A-24680',
    vehicleType: '冷藏车',
    vehicleInfo: {
      brand: '东风天锦',
      model: '7.6米',
      load: '10000kg',
      volume: '42m³',
    },
    ownership: '外协',
    driver: {
      name: '王师傅',
      phone: '136****9012',
      avatar: '👤',
    },
    status: '空闲',
    statusType: 'info',
    currentOrder: '-',
    mileage: '65,321 km',
    lastMaintenance: '2023-06-24 (3天前)',
    nextMaintenance: '2024-01-10',
    maintenanceStatus: '正常',
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
    vehicleType: '',
    vehicleStatus: '',
    ownershipType: '',
    maintenanceStatus: '',
    driverStatus: '',
    dateRange: [],
    keyword: '',
  });
};

// 导出
const handleExport = () => {
  ElMessage.success('正在导出数据...');
};

// 新增车辆
const handleAdd = () => {
  ElMessage.info('跳转到新增车辆页面');
};

// 查看详情
interface VehicleRow {
  id: number;
  [key: string]: unknown;
}
const handleView = (_row: VehicleRow) => {
  // TODO: 实现查看详情逻辑
};

// 编辑
const handleEdit = (_row: VehicleRow) => {
  // TODO: 实现编辑逻辑
};

// 保养记录
const handleMaintenance = (_row: VehicleRow) => {
  // TODO: 实现查看保养记录逻辑
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
  <div class="vehicle-container">
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
          <label class="filter-label">车辆状态</label>
          <ElSelect v-model="filters.vehicleStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in vehicleStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">车辆归属</label>
          <ElSelect v-model="filters.ownershipType" placeholder="全部" clearable>
            <ElOption
              v-for="item in ownershipTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">保养状态</label>
          <ElSelect v-model="filters.maintenanceStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in maintenanceStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">司机状态</label>
          <ElSelect v-model="filters.driverStatus" placeholder="全部" clearable>
            <ElOption label="在岗" value="1" />
            <ElOption label="休息" value="2" />
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
          placeholder="请输入车牌号、司机姓名等关键词搜索"
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
      </div>
    </div>

    <!-- 车辆列表 -->
    <div class="vehicle-table-card">
      <ElTable :data="vehicleList" stripe style="width: 100%">
        <ElTableColumn type="selection" width="50" />

        <ElTableColumn label="车牌号" width="120" fixed>
          <template #default="{ row }">
            <div class="plate-number">{{ row.plateNumber }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="车辆型号" width="150">
          <template #default="{ row }">
            <div class="vehicle-type">{{ row.vehicleType }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="车辆信息" width="200">
          <template #default="{ row }">
            <div class="vehicle-info">
              <div class="info-row">品牌：{{ row.vehicleInfo.brand }}</div>
              <div class="info-row">
                规格：{{ row.vehicleInfo.model }} | 载重：{{ row.vehicleInfo.load }}
              </div>
              <div class="info-row">容积：{{ row.vehicleInfo.volume }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="归属信息" width="100">
          <template #default="{ row }">
            <ElTag :type="row.ownership === '自有' ? 'success' : 'info'" size="small">
              {{ row.ownership }}
            </ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="当前状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.statusType" size="small">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="当前司机" width="150">
          <template #default="{ row }">
            <div class="driver-info">
              <div class="driver-avatar">{{ row.driver.avatar }}</div>
              <div class="driver-detail">
                <div class="driver-name">{{ row.driver.name }}</div>
                <div class="driver-phone">{{ row.driver.phone }}</div>
              </div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="当前运单/状态" width="180">
          <template #default="{ row }">
            <div class="current-order">{{ row.currentOrder }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="下次保养" width="150">
          <template #default="{ row }">
            <div class="maintenance-info">
              <div class="maintenance-date">{{ row.nextMaintenance }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="车辆保养情况" width="180">
          <template #default="{ row }">
            <div class="maintenance-status">
              <div class="status-text">{{ row.maintenanceStatus }}</div>
              <div class="last-maintenance">上次：{{ row.lastMaintenance }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" size="small" @click="handleView(row)"> 详情 </ElButton>
            <ElButton link type="primary" size="small" @click="handleEdit(row)"> 编辑 </ElButton>
            <ElButton link type="primary" size="small" @click="handleMaintenance(row)">
              保养记录
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
.vehicle-container {
  padding: 0;
  background: #f8f9fa;
}

/* 统计卡片 */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
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

/* 车辆表格 */
.vehicle-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.plate-number {
  font-size: 14px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.plate-number:hover {
  text-decoration: underline;
}

.vehicle-type {
  font-size: 13px;
  color: #262626;
}

.vehicle-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-row {
  font-size: 12px;
  color: #595959;
}

.driver-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.driver-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #e6f7ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
}

.driver-detail {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.driver-name {
  font-size: 12px;
  color: #262626;
  font-weight: 500;
}

.driver-phone {
  font-size: 11px;
  color: #8c8c8c;
}

.current-order {
  font-size: 12px;
  color: #595959;
}

.maintenance-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.maintenance-date {
  font-size: 12px;
  color: #262626;
}

.maintenance-status {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.status-text {
  font-size: 12px;
  color: #262626;
  font-weight: 500;
}

.last-maintenance {
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
