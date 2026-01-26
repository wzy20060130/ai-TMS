<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Search, Refresh, Download } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 统计数据
const stats = ref([
  {
    label: '运行中数量',
    value: 86,
    change: '较昨日 ↑ 2.3%',
    icon: '📋',
    color: '#E3F2FD',
  },
  {
    label: '待处理异常',
    value: 42,
    change: '较昨日 ↑ 1.7%',
    icon: '⚠️',
    color: '#F3E5F5',
  },
  {
    label: '已处理异常',
    value: 44,
    change: '较昨日 ↑ 3.8%',
    icon: '✅',
    color: '#FFF3E0',
  },
  {
    label: '已关闭异常',
    value: 16,
    change: '较昨日 ↑ 1.6%',
    icon: '🔒',
    color: '#E8F5E9',
  },
]);

// 筛选条件
const filters = reactive({
  exceptionStatus: '',
  exceptionType: '',
  urgencyLevel: '',
  processingStatus: '',
  handler: '',
  dateRange: [],
  keyword: '',
});

// 异常状态选项
const exceptionStatusOptions = [
  { label: '全部', value: '' },
  { label: '待处理', value: '1' },
  { label: '处理中', value: '2' },
  { label: '已处理', value: '3' },
  { label: '已关闭', value: '4' },
];

// 异常类型选项
const exceptionTypeOptions = [
  { label: '全部', value: '' },
  { label: '运输延误', value: '1' },
  { label: '货物损坏', value: '2' },
  { label: '货物丢失', value: '3' },
  { label: '拒收', value: '4' },
  { label: '其他', value: '5' },
];

// 紧急程度选项
const urgencyLevelOptions = [
  { label: '全部', value: '' },
  { label: '紧急', value: '1' },
  { label: '重要', value: '2' },
  { label: '一般', value: '3' },
];

// 处理状态选项
const processingStatusOptions = [
  { label: '全部', value: '' },
  { label: '待处理', value: '1' },
  { label: '处理中', value: '2' },
  { label: '已解决', value: '3' },
];

// 异常订单列表
const exceptionList = ref([
  {
    id: 'ABN-2023061001',
    orderNo: 'ORD-2023061001',
    waybillNo: 'WB-2023061001',
    pickupNo: 'PK-2023061001',
    exceptionType: '运输延误',
    exceptionTypeTag: 'danger',
    status: '待处理',
    statusType: 'warning',
    urgency: '紧急',
    urgencyType: 'danger',
    reportTime: '2023-06-16 10:30',
    reporter: '张三',
    handler: '未分配',
    processingTime: '-',
    description: '客户反馈货物未按时送达，延误2小时，客户要求尽快送达，否则将取消订单',
    solution: '-',
  },
  {
    id: 'ABN-2023061002',
    orderNo: 'ORD-2023061003',
    waybillNo: 'WB-2023061003',
    pickupNo: 'PK-2023061002',
    exceptionType: '货物损坏',
    exceptionTypeTag: 'danger',
    status: '已处理',
    statusType: 'success',
    urgency: '重要',
    urgencyType: 'warning',
    reportTime: '2023-06-16 14:15',
    reporter: '李四',
    handler: '王五',
    processingTime: '2023-06-16 15:30',
    description: '收货方反馈货物包装破损，部分货物受损，需要重新配送或赔偿',
    solution: '与客户协商后，重新配送完好货物，损坏货物按价值赔偿30%',
  },
  {
    id: 'ABN-2023061003',
    orderNo: 'ORD-2023061002',
    waybillNo: 'WB-2023061002',
    pickupNo: 'PK-2023061003',
    exceptionType: '异常拒收',
    exceptionTypeTag: 'warning',
    status: '处理中',
    statusType: 'primary',
    urgency: '一般',
    urgencyType: 'info',
    reportTime: '2023-06-16 16:20',
    reporter: '赵六',
    handler: '孙七',
    processingTime: '2023-06-16 16:45',
    description: '收货方拒收货物，理由是订单有误，需要核实订单信息并重新配送',
    solution: '正在与客户沟通确认订单信息',
  },
  {
    id: 'ABN-2023061004',
    orderNo: 'ORD-2023061005',
    waybillNo: 'WB-2023061005',
    pickupNo: 'PK-2023061004',
    exceptionType: '车辆故障',
    exceptionTypeTag: 'danger',
    status: '已处理',
    statusType: 'success',
    urgency: '紧急',
    urgencyType: 'danger',
    reportTime: '2023-06-16 09:15',
    reporter: '周八',
    handler: '吴九',
    processingTime: '2023-06-16 10:30',
    description: '运输车辆在途中发生故障，无法继续运输，需要调配其他车辆接替运输',
    solution: '已调配备用车辆接替运输，货物已按时送达',
  },
  {
    id: 'ABN-2023061005',
    orderNo: 'ORD-2023061008',
    waybillNo: 'WB-2023061008',
    pickupNo: 'PK-2023061005',
    exceptionType: '订单取消',
    exceptionTypeTag: 'info',
    status: '待处理',
    statusType: 'warning',
    urgency: '一般',
    urgencyType: 'info',
    reportTime: '2023-06-17 11:00',
    reporter: '郑十',
    handler: '未分配',
    processingTime: '-',
    description: '客户临时取消订单，货物已装车准备发运，需要协商取消费用及货物退回事宜',
    solution: '-',
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
    exceptionStatus: '',
    exceptionType: '',
    urgencyLevel: '',
    processingStatus: '',
    handler: '',
    dateRange: [],
    keyword: '',
  });
};

// 导出
const handleExport = () => {
  ElMessage.success('正在导出数据...');
};

// 批量处理
const handleBatchProcess = () => {
  ElMessage.info('批量处理异常');
};

// 查看详情
interface ExceptionRow {
  id: number;
  [key: string]: unknown;
}
const handleView = (_row: ExceptionRow) => {
  // TODO: 实现查看详情逻辑
};

// 处理异常
const handleProcess = (_row: ExceptionRow) => {
  // TODO: 实现处理异常逻辑
  ElMessage.success('已分配处理人员');
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
  <div class="exception-container">
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
          <label class="filter-label">异常状态</label>
          <ElSelect v-model="filters.exceptionStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in exceptionStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">异常类型</label>
          <ElSelect v-model="filters.exceptionType" placeholder="全部" clearable>
            <ElOption
              v-for="item in exceptionTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">紧急程度/优先级</label>
          <ElSelect v-model="filters.urgencyLevel" placeholder="全部" clearable>
            <ElOption
              v-for="item in urgencyLevelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">处理状态</label>
          <ElSelect v-model="filters.processingStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in processingStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">主责人</label>
          <ElSelect v-model="filters.handler" placeholder="全部" clearable>
            <ElOption label="张三" value="1" />
            <ElOption label="李四" value="2" />
            <ElOption label="王五" value="3" />
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
          placeholder="请输入异常编号、订单编号等关键词搜索"
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
        <ElButton type="primary" :icon="Download" @click="handleExport">导出</ElButton>
        <ElButton @click="handleBatchProcess">批量处理</ElButton>
      </div>
      <div class="toolbar-right">
        <ElButton text>刷新</ElButton>
        <ElButton text>已处理异常</ElButton>
      </div>
    </div>

    <!-- 异常订单列表 -->
    <div class="exception-table-card">
      <ElTable :data="exceptionList" stripe style="width: 100%">
        <ElTableColumn type="selection" width="50" />

        <ElTableColumn label="异常编号" width="150" fixed>
          <template #default="{ row }">
            <div class="exception-id">{{ row.id }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="关联订单号" width="150">
          <template #default="{ row }">
            <div class="order-no">{{ row.orderNo }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="关联运单/提货单" width="180">
          <template #default="{ row }">
            <div class="related-info">
              <div class="related-item">运单：{{ row.waybillNo }}</div>
              <div class="related-item">提货：{{ row.pickupNo }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="异常类型" width="120">
          <template #default="{ row }">
            <ElTag :type="row.exceptionTypeTag" size="small">{{ row.exceptionType }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="异常状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.statusType" size="small">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="优先级" width="100">
          <template #default="{ row }">
            <ElTag :type="row.urgencyType" size="small">{{ row.urgency }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="上报人/时间" width="180">
          <template #default="{ row }">
            <div class="reporter-info">
              <div class="reporter-name">{{ row.reporter }}</div>
              <div class="reporter-time">{{ row.reportTime }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="处理人/时间" width="180">
          <template #default="{ row }">
            <div class="handler-info">
              <div class="handler-name">{{ row.handler }}</div>
              <div class="handler-time">{{ row.processingTime }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="异常描述" width="250">
          <template #default="{ row }">
            <div class="description">{{ row.description }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="处理方案" width="250">
          <template #default="{ row }">
            <div class="solution">{{ row.solution || '-' }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="操作" width="150" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" size="small" @click="handleView(row)"> 详情 </ElButton>
            <ElButton
              v-if="row.status === '待处理'"
              link
              type="primary"
              size="small"
              @click="handleProcess(row)"
            >
              处理
            </ElButton>
            <ElButton v-if="row.status === '已处理'" link type="success" size="small">
              查看
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
.exception-container {
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

/* 异常订单表格 */
.exception-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.exception-id {
  font-size: 13px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.exception-id:hover {
  text-decoration: underline;
}

.order-no {
  font-size: 13px;
  color: #262626;
}

.related-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.related-item {
  font-size: 12px;
  color: #595959;
}

.reporter-info,
.handler-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.reporter-name,
.handler-name {
  font-size: 12px;
  color: #262626;
  font-weight: 500;
}

.reporter-time,
.handler-time {
  font-size: 11px;
  color: #8c8c8c;
}

.description,
.solution {
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
