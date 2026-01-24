<script setup lang="ts">
import { ref, reactive } from 'vue'
import { Search, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

// 统计数据
const stats = ref([
  {
    label: '收款单总数',
    value: 128,
    change: '较上月 ↑ 2',
    icon: '📋',
    color: '#E3F2FD'
  },
  {
    label: '收款总金额',
    value: '¥3,586,200',
    change: '较昨日增加',
    icon: '💰',
    color: '#E8F5E9'
  },
  {
    label: '已收金额',
    value: '¥2,953,680',
    change: '较昨日 ↑',
    icon: '👤',
    color: '#F3E5F5'
  },
  {
    label: '未收金额',
    value: '¥632,520',
    change: '较昨日 ↓ 2',
    icon: '📊',
    color: '#FFF3E0'
  },
  {
    label: '未收总数',
    value: 8,
    change: '较上周增加3笔',
    icon: '🔔',
    color: '#FFEBEE'
  }
])

// 筛选条件
const filters = reactive({
  receiptStatus: '',
  paymentStatus: '',
  paymentMethod: '',
  customerType: '',
  settlementStatus: '',
  keyword: '',
  dateRange: []
})

// 收款状态选项
const receiptStatusOptions = [
  { label: '全部', value: '' },
  { label: '待收款', value: '1' },
  { label: '部分收款', value: '2' },
  { label: '已收款', value: '3' }
]

// 付款状态选项
const paymentStatusOptions = [
  { label: '全部', value: '' },
  { label: '未付款', value: '1' },
  { label: '部分付款', value: '2' },
  { label: '已付款', value: '3' }
]

// 付款方式选项
const paymentMethodOptions = [
  { label: '全部', value: '' },
  { label: '现金', value: '1' },
  { label: '转账', value: '2' },
  { label: '支票', value: '3' }
]

// 结算状态选项
const settlementStatusOptions = [
  { label: '全部', value: '' },
  { label: '未结算', value: '1' },
  { label: '已结算', value: '2' }
]

// 收款单列表
const receiptList = ref([
  {
    id: 1,
    receiptNo: 'AEQ2039001',
    customerId: 'CUS2023001',
    customerName: '上海申通快递有限公司',
    orderDate: '2023年第1-3期',
    orderInfo: '上海-北京线',
    relatedOrder: 'ORD2023001001',
    relatedOrderTag: 'success',
    paymentInfo: {
      total: '¥38,600.00',
      paid: '¥38,600.00',
      unpaid: '¥0.00'
    },
    status: '已收款',
    statusTag: 'success',
    paymentDate: {
      create: '2023-09-01',
      receive: '2023-09-02',
      deadline: '16:30:32'
    },
    approvalStatus: {
      finance: { status: 'success', label: '已审核' },
      payment: { status: 'success', label: '已付款' },
      settlement: { status: 'success', label: '已结算' }
    },
    handler: '张财务',
    createDate: '2023-09-15',
    actions: ['详情']
  },
  {
    id: 2,
    receiptNo: 'AEQ2039002',
    customerId: 'CUS2023002',
    customerName: '北京顺丰速运有限公司',
    orderDate: '分件费+包装费+分拣费',
    orderInfo: '',
    relatedOrder: 'ORD2023002001',
    relatedOrderTag: 'success',
    paymentInfo: {
      total: '¥126,300.00',
      paid: '¥60,000.00',
      unpaid: '¥66,300.00'
    },
    status: '部分收款',
    statusTag: 'warning',
    paymentDate: {
      create: '2023-09-02',
      receive: '2023-09-04',
      deadline: '16:30:32'
    },
    approvalStatus: {
      finance: { status: 'success', label: '已审核' },
      payment: { status: 'warning', label: '已付款' },
      settlement: { status: 'warning', label: '已结算' }
    },
    handler: '李会计',
    createDate: '2023-09-16',
    actions: ['详情']
  },
  {
    id: 3,
    receiptNo: 'AEQ2039003',
    customerId: 'CUS2023003',
    customerName: '广州德邦物流管理有限公司',
    orderDate: '干线物流+配送费+分拣费',
    orderInfo: '',
    relatedOrder: 'ORD2023003001',
    relatedOrderTag: 'success',
    paymentInfo: {
      total: '¥89,500.00',
      paid: '¥0.00',
      unpaid: '¥89,500.00'
    },
    status: '未收款',
    statusTag: 'danger',
    paymentDate: {
      create: '2023-09-03',
      receive: '2023-09-03',
      deadline: '16:42:10'
    },
    approvalStatus: {
      finance: { status: 'success', label: '已审核' },
      payment: { status: 'info', label: '已付款' },
      settlement: { status: 'info', label: '已结算' }
    },
    handler: '支付宝',
    createDate: '2023-09-17',
    actions: ['详情']
  },
  {
    id: 4,
    receiptNo: 'AEQ2039004',
    customerId: 'CUS2023004',
    customerName: '深圳大森林物流有限公司',
    orderDate: '今晚物流+包装费+分拣费',
    orderInfo: '',
    relatedOrder: 'ORD2023004002',
    relatedOrderTag: 'success',
    paymentInfo: {
      total: '¥215,800.00',
      paid: '¥0.00',
      unpaid: '¥215,800.00'
    },
    status: '消费中',
    statusTag: 'info',
    paymentDate: {
      create: '2023-09-04',
      receive: '2023-09-06',
      deadline: '11:20:35'
    },
    approvalStatus: {
      finance: { status: 'success', label: '已审核' },
      payment: { status: 'warning', label: '已付款' },
      settlement: { status: 'info', label: '已结算' }
    },
    handler: '张财务',
    createDate: '2023-09-18',
    actions: ['详情']
  },
  {
    id: 5,
    receiptNo: 'AEQ2039005',
    customerId: 'CUS2023005',
    customerName: '上海申通快递有限公司',
    orderDate: '2023年第1-3期',
    orderInfo: '上海-北京线',
    relatedOrder: 'ORD2023005007',
    relatedOrderTag: 'success',
    paymentInfo: {
      total: '¥65,200.00',
      paid: '¥65,200.00',
      unpaid: '¥0.00'
    },
    status: '已收款',
    statusTag: 'success',
    paymentDate: {
      create: '2023-09-05',
      receive: '2023-09-07',
      deadline: '10:10:05'
    },
    approvalStatus: {
      finance: { status: 'success', label: '已审核' },
      payment: { status: 'success', label: '已付款' },
      settlement: { status: 'success', label: '已结算' }
    },
    handler: '微信支付',
    createDate: '2023-09-19',
    actions: ['详情']
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
    receiptStatus: '',
    paymentStatus: '',
    paymentMethod: '',
    customerType: '',
    settlementStatus: '',
    keyword: '',
    dateRange: []
  })
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
  <div class="receipt-container">
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
          <label class="filter-label">收款单状态</label>
          <el-select v-model="filters.receiptStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in receiptStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">付款状态</label>
          <el-select v-model="filters.paymentStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in paymentStatusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">付款方式</label>
          <el-select v-model="filters.paymentMethod" placeholder="全部" clearable>
            <el-option
              v-for="item in paymentMethodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>

        <div class="filter-item">
          <label class="filter-label">关联订单号</label>
          <el-input v-model="filters.keyword" placeholder="请输入" clearable />
        </div>

        <div class="filter-item">
          <label class="filter-label">结算状态</label>
          <el-select v-model="filters.settlementStatus" placeholder="全部" clearable>
            <el-option
              v-for="item in settlementStatusOptions"
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
          placeholder="请输入收款单号、客户名称等关键词搜索"
          clearable
          style="width: 400px"
        >
          <template #prefix>
            <el-icon><Search /></el-icon>
          </template>
        </el-input>
      </div>
    </div>

    <!-- 收款单列表 -->
    <div class="receipt-table-card">
      <el-table :data="receiptList" stripe style="width: 100%">
        <el-table-column type="selection" width="50" />
        
        <el-table-column label="收款单号" width="130" fixed>
          <template #default="{ row }">
            <div class="receipt-no">{{ row.receiptNo }}</div>
          </template>
        </el-table-column>

        <el-table-column label="客户信息" width="180">
          <template #default="{ row }">
            <div class="customer-info">
              <div class="customer-id">{{ row.customerId }}</div>
              <div class="customer-name">{{ row.customerName }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="订单信息" width="180">
          <template #default="{ row }">
            <div class="order-info">
              <div class="order-date">{{ row.orderDate }}</div>
              <div v-if="row.orderInfo" class="order-detail">{{ row.orderInfo }}</div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="关联订单" width="150">
          <template #default="{ row }">
            <el-tag :type="row.relatedOrderTag" size="small">{{ row.relatedOrder }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="订单金额" width="120">
          <template #default="{ row }">
            <div class="payment-info">
              <div class="payment-row">
                <span class="label">应付：</span>
                <span class="value">{{ row.paymentInfo.total }}</span>
              </div>
              <div class="payment-row">
                <span class="label">已付：</span>
                <span class="value paid">{{ row.paymentInfo.paid }}</span>
              </div>
              <div class="payment-row">
                <span class="label">未收：</span>
                <span class="value unpaid">{{ row.paymentInfo.unpaid }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="收款信息" width="120">
          <template #default="{ row }">
            <div class="receipt-info">
              <div class="info-row">
                <span class="label">创建：</span>
                <span class="value">{{ row.paymentDate.create }}</span>
              </div>
              <div class="info-row">
                <span class="label">收款：</span>
                <span class="value">{{ row.paymentDate.receive }}</span>
              </div>
              <div class="info-row">
                <span class="label">截止：</span>
                <span class="value">{{ row.paymentDate.deadline }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="收款状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.statusTag" size="small">{{ row.status }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column label="收款审核流程" width="150">
          <template #default="{ row }">
            <div class="approval-flow">
              <div class="approval-item">
                <el-icon :class="['approval-icon', row.approvalStatus.finance.status]">
                  <component :is="row.approvalStatus.finance.status === 'success' ? 'CircleCheck' : 'CircleClose'" />
                </el-icon>
                <span class="approval-label">{{ row.approvalStatus.finance.label }}</span>
              </div>
              <div class="approval-item">
                <el-icon :class="['approval-icon', row.approvalStatus.payment.status]">
                  <component :is="row.approvalStatus.payment.status === 'success' ? 'CircleCheck' : row.approvalStatus.payment.status === 'warning' ? 'Warning' : 'CircleClose'" />
                </el-icon>
                <span class="approval-label">{{ row.approvalStatus.payment.label }}</span>
              </div>
              <div class="approval-item">
                <el-icon :class="['approval-icon', row.approvalStatus.settlement.status]">
                  <component :is="row.approvalStatus.settlement.status === 'success' ? 'CircleCheck' : row.approvalStatus.settlement.status === 'warning' ? 'Warning' : 'CircleClose'" />
                </el-icon>
                <span class="approval-label">{{ row.approvalStatus.settlement.label }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="经办人" width="100">
          <template #default="{ row }">
            <div class="handler">{{ row.handler }}</div>
          </template>
        </el-table-column>

        <el-table-column label="创建日期" width="120">
          <template #default="{ row }">
            <div class="create-date">{{ row.createDate }}</div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="100" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="handleView(row)">
              详情
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
.receipt-container {
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
  font-size: 24px;
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

/* 收款单表格 */
.receipt-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.receipt-no {
  font-size: 14px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.receipt-no:hover {
  text-decoration: underline;
}

.customer-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.customer-id {
  font-size: 12px;
  color: #8c8c8c;
}

.customer-name {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-date {
  font-size: 12px;
  color: #262626;
}

.order-detail {
  font-size: 11px;
  color: #8c8c8c;
}

.payment-info,
.receipt-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.payment-row,
.info-row {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.payment-row .label,
.info-row .label {
  color: #8c8c8c;
  min-width: 36px;
}

.payment-row .value,
.info-row .value {
  color: #262626;
}

.payment-row .value.paid {
  color: #52c41a;
}

.payment-row .value.unpaid {
  color: #ff4d4f;
}

.approval-flow {
  display: flex;
  align-items: center;
  gap: 8px;
}

.approval-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}

.approval-icon {
  font-size: 20px;
}

.approval-icon.success {
  color: #52c41a;
}

.approval-icon.warning {
  color: #faad14;
}

.approval-icon.info {
  color: #d9d9d9;
}

.approval-label {
  font-size: 11px;
  color: #595959;
}

.handler {
  font-size: 13px;
  color: #262626;
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


