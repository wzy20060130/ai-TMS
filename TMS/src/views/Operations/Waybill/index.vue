<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Search, Refresh, Download, Plus } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 统计数据
const stats = ref([
  {
    label: '运行中数量',
    value: 85,
    change: '+1.2%',
    icon: '📋',
    color: '#E3F2FD',
  },
  {
    label: '待接单运单',
    value: 42,
    change: '+5.0%',
    icon: '📄',
    color: '#F3E5F5',
  },
  {
    label: '异常运单数',
    value: 44,
    change: '+2.8%',
    icon: '⚠️',
    color: '#FFF3E0',
  },
  {
    label: '已完成运单',
    value: 16,
    change: '+1.6%',
    icon: '✅',
    color: '#E8F5E9',
  },
]);

// 筛选条件
const filters = reactive({
  waybillStatus: '',
  transportType: '',
  paymentStatus: '',
  timeType: '',
  dateRange: [],
  keyword: '',
});

// 运单状态选项
const waybillStatusOptions = [
  { label: '全部', value: '' },
  { label: '待接单', value: '1' },
  { label: '运输中', value: '2' },
  { label: '已完成', value: '3' },
  { label: '已取消', value: '4' },
];

// 运输方式选项
const transportTypeOptions = [
  { label: '全部', value: '' },
  { label: '公路运输', value: '1' },
  { label: '铁路运输', value: '2' },
  { label: '航空运输', value: '3' },
];

// 付款状态选项
const paymentStatusOptions = [
  { label: '全部', value: '' },
  { label: '未付款', value: '1' },
  { label: '部分付款', value: '2' },
  { label: '已付款', value: '3' },
];

// 时间类型选项
const timeTypeOptions = [
  { label: '创建时间', value: '1' },
  { label: '发货时间', value: '2' },
  { label: '签收时间', value: '3' },
];

// 运单列表
const waybillList = ref([
  {
    id: 'WB-2023051001',
    orderNo: '上海 → 北京',
    status: '运输中',
    statusType: 'primary',
    transportType: '公路运输',
    paymentStatus: '已付款',
    paymentType: 'success',
    sender: {
      company: '宁夏物流有限公司',
      contact: '张三 [138****1234]',
      address: '上海市虹口区某某街道123号',
      phone: '138****1234',
    },
    receiver: {
      company: '北京物流有限公司',
      contact: '李四 [139****5678]',
      address: '北京市朝阳区某某大厦456号',
      phone: '139****5678',
    },
    cargo: '电子产品 | 7.5吨',
    driver: '王师傅',
    vehicle: '京A12345',
    createTime: '2023-05-16 10:00',
    pickupTime: '2023-05-16 12:00',
    deliveryTime: '2023-05-17 08:00',
    signTime: '2023-05-17 09:32',
    amount: '8500.00',
    paymentMethod: '转账',
  },
  {
    id: 'WB-2023051002',
    orderNo: '广州 → 深圳',
    status: '运输中',
    statusType: 'primary',
    transportType: '公路运输',
    paymentStatus: '未付款',
    paymentType: 'danger',
    sender: {
      company: '南方货运有限公司',
      contact: '赵六 [135****9012]',
      address: '广州市天河区某某路789号',
      phone: '135****9012',
    },
    receiver: {
      company: '深圳物流有限公司',
      contact: '孙七 [136****3456]',
      address: '深圳市南山区某某中心321号',
      phone: '136****3456',
    },
    cargo: '日用百货 | 5.2吨',
    driver: '赵师傅',
    vehicle: '粤A67890',
    createTime: '2023-05-16 09:30',
    pickupTime: '2023-05-16 11:00',
    deliveryTime: '2023-05-16 16:00',
    signTime: '2023-05-16 17:20',
    amount: '3200.00',
    paymentMethod: '现金',
  },
  {
    id: 'WB-2023051003',
    orderNo: '苏州 → 杭州',
    status: '待接单',
    statusType: 'warning',
    transportType: '公路运输',
    paymentStatus: '已付款',
    paymentType: 'success',
    sender: {
      company: '宁夏物流有限公司',
      contact: '周八 [137****7890]',
      address: '苏州市工业园区某某街123号',
      phone: '137****7890',
    },
    receiver: {
      company: '杭州物流有限公司',
      contact: '吴九 [138****1234]',
      address: '杭州市西湖区某某路456号',
      phone: '138****1234',
    },
    cargo: '机械设备 | 12.8吨',
    driver: '-',
    vehicle: '-',
    createTime: '2023-05-17 08:00',
    pickupTime: '2023-05-17 14:00',
    deliveryTime: '2023-05-18 09:00',
    signTime: '-',
    amount: '4800.00',
    paymentMethod: '转账',
  },
  {
    id: 'WB-2023051004',
    orderNo: '天津 → 青岛',
    status: '运输中',
    statusType: 'primary',
    transportType: '铁路运输',
    paymentStatus: '已付款',
    paymentType: 'success',
    sender: {
      company: '宁夏物流有限公司',
      contact: '郑十 [139****5678]',
      address: '天津市滨海新区某某大道789号',
      phone: '139****5678',
    },
    receiver: {
      company: '青岛物流有限公司',
      contact: '王十一 [135****9012]',
      address: '青岛市市南区某某街321号',
      phone: '135****9012',
    },
    cargo: '化工原料 | 8.5吨',
    driver: '孙师傅',
    vehicle: '津B11111',
    createTime: '2023-05-16 10:00',
    pickupTime: '2023-05-16 18:00',
    deliveryTime: '2023-05-17 10:00',
    signTime: '2023-05-17 11:30',
    amount: '6000.00',
    paymentMethod: '月结',
  },
  {
    id: 'WB-2023051005',
    orderNo: '成都 → 重庆',
    status: '运输中',
    statusType: 'primary',
    transportType: '公路运输',
    paymentStatus: '部分付款',
    paymentType: 'warning',
    sender: {
      company: '中西物流',
      contact: '刘十二 [136****3456]',
      address: '成都市武侯区某某路123号',
      phone: '136****3456',
    },
    receiver: {
      company: '重庆物流有限公司',
      contact: '陈十三 [137****7890]',
      address: '重庆市渝北区某某大厦456号',
      phone: '137****7890',
    },
    cargo: '白酒 | 6.3吨',
    driver: '吴师傅',
    vehicle: '川A22222',
    createTime: '2023-05-16 09:30',
    pickupTime: '2023-05-16 16:00',
    deliveryTime: '2023-05-17 08:00',
    signTime: '2023-05-17 09:20',
    amount: '7200.00',
    paymentMethod: '转账',
  },
  {
    id: 'WB-2023051006',
    orderNo: '广州 → 深圳',
    status: '已完成',
    statusType: 'success',
    transportType: '公路运输',
    paymentStatus: '已付款',
    paymentType: 'success',
    sender: {
      company: '宁夏物流有限公司',
      contact: '杨十四 [138****1234]',
      address: '广州市白云区某某街789号',
      phone: '138****1234',
    },
    receiver: {
      company: '深圳物流有限公司',
      contact: '黄十五 [139****5678]',
      address: '深圳市福田区某某中心321号',
      phone: '139****5678',
    },
    cargo: '服装纺织 | 4.2吨',
    driver: '赵师傅',
    vehicle: '粤B33333',
    createTime: '2023-05-17 08:00',
    pickupTime: '2023-05-17 14:00',
    deliveryTime: '2023-05-18 09:00',
    signTime: '2023-05-18 10:15',
    amount: '4800.00',
    paymentMethod: '转账',
  },
]);

// 分页
const pagination = ref({
  currentPage: 1,
  pageSize: 20,
  total: 1238,
});

// 搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  ElMessage.success('搜索完成');
};

// 重置
const handleReset = () => {
  Object.assign(filters, {
    waybillStatus: '',
    transportType: '',
    paymentStatus: '',
    timeType: '',
    dateRange: [],
    keyword: '',
  });
};

// 导出
const handleExport = () => {
  ElMessage.success('正在导出数据...');
};

// 新增运单
const handleAdd = () => {
  ElMessage.info('跳转到新增运单页面');
};

// 查看详情
interface WaybillRow {
  id: number;
  [key: string]: unknown;
}
const handleView = (_row: WaybillRow) => {
  // TODO: 实现查看详情逻辑
};

// 编辑
const handleEdit = (_row: WaybillRow) => {
  // TODO: 实现编辑逻辑
};

// 删除
const handleDelete = (_row: WaybillRow) => {
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
  <div class="waybill-container">
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
          <label class="filter-label">运单状态</label>
          <ElSelect v-model="filters.waybillStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in waybillStatusOptions"
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

        <div class="filter-item">
          <label class="filter-label">付款状态</label>
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
          <label class="filter-label">时间</label>
          <ElSelect v-model="filters.timeType" placeholder="创建时间">
            <ElOption
              v-for="item in timeTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
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
          placeholder="请输入运单编号、发货方、收货方等关键词搜索"
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

    <!-- 运单列表 -->
    <div class="waybill-table-card">
      <ElTable :data="waybillList" stripe style="width: 100%">
        <ElTableColumn type="selection" width="50" />

        <ElTableColumn label="运单号" width="150" fixed>
          <template #default="{ row }">
            <div class="waybill-id">{{ row.id }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="运输路线" width="150">
          <template #default="{ row }">
            <div class="route-text">{{ row.orderNo }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="运单状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.statusType" size="small">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="付款状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.paymentType" size="small">{{ row.paymentStatus }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="发货方信息" width="200">
          <template #default="{ row }">
            <div class="party-info">
              <div class="party-company">{{ row.sender.company }}</div>
              <div class="party-contact">{{ row.sender.contact }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="收货方信息" width="200">
          <template #default="{ row }">
            <div class="party-info">
              <div class="party-company">{{ row.receiver.company }}</div>
              <div class="party-contact">{{ row.receiver.contact }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="货物信息" width="150">
          <template #default="{ row }">
            <div class="cargo-info">{{ row.cargo }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="司机/车辆" width="120">
          <template #default="{ row }">
            <div class="driver-info">
              <div>{{ row.driver }}</div>
              <div class="vehicle-no">{{ row.vehicle }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="创建时间" width="150">
          <template #default="{ row }">
            <div class="time-info">{{ row.createTime }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="提货时间" width="150">
          <template #default="{ row }">
            <div class="time-info">{{ row.pickupTime }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="签收时间" width="150">
          <template #default="{ row }">
            <div class="time-info">{{ row.signTime }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="运单方式" width="100">
          <template #default="{ row }">
            <div class="payment-method">{{ row.paymentMethod }}</div>
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
.waybill-container {
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

/* 运单表格 */
.waybill-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.waybill-id {
  font-size: 13px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.waybill-id:hover {
  text-decoration: underline;
}

.route-text {
  font-size: 13px;
  color: #262626;
}

.party-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.party-company {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.party-contact {
  font-size: 11px;
  color: #8c8c8c;
}

.cargo-info {
  font-size: 12px;
  color: #262626;
}

.driver-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 12px;
  color: #262626;
}

.vehicle-no {
  font-size: 11px;
  color: #8c8c8c;
}

.time-info {
  font-size: 12px;
  color: #595959;
}

.payment-method {
  font-size: 12px;
  color: #262626;
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
