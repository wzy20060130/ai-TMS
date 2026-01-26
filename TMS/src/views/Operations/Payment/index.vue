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
    label: '待签收',
    value: 42,
    change: '+5.0%',
    icon: '📝',
    color: '#F3E5F5',
  },
  {
    label: '已签收',
    value: 44,
    change: '+2.8%',
    icon: '✅',
    color: '#FFF3E0',
  },
  {
    label: '已完成订单',
    value: 16,
    change: '+1.6%',
    icon: '📦',
    color: '#E8F5E9',
  },
]);

// 筛选条件
const filters = reactive({
  signStatus: '',
  paymentStatus: '',
  deliveryType: '',
  timeType: '',
  signType: '',
  dateRange: [],
  keyword: '',
});

// 签收状态选项
const signStatusOptions = [
  { label: '全部', value: '' },
  { label: '待签收', value: '1' },
  { label: '已签收', value: '2' },
  { label: '拒签', value: '3' },
  { label: '异常', value: '4' },
];

// 付款状态选项
const paymentStatusOptions = [
  { label: '全部', value: '' },
  { label: '未付款', value: '1' },
  { label: '部分付款', value: '2' },
  { label: '已付款', value: '3' },
];

// 配送方式选项
const deliveryTypeOptions = [
  { label: '全部', value: '' },
  { label: '送货上门', value: '1' },
  { label: '自提', value: '2' },
];

// 签收方式选项
const signTypeOptions = [
  { label: '全部', value: '' },
  { label: '本人签收', value: '1' },
  { label: '代签', value: '2' },
];

// 签收单列表
const signList = ref([
  {
    id: 'SIGN-2023061001',
    waybillNo: 'WB-2023061001',
    pickupNo: 'PK-2023061001',
    receiver: {
      company: '北京宝冠科技有限公司',
      contact: '张三',
      phone: '138****1234',
      address: '北京市朝阳区某某街道123号',
    },
    cargo: {
      name: '电子产品',
      weight: '500kg',
      volume: '12.5m³',
    },
    status: '已签收',
    statusType: 'success',
    paymentStatus: '已付款',
    paymentType: 'success',
    signType: '本人签收',
    signer: {
      name: '张三',
      phone: '138****1234',
      time: '2023-06-16 10:00',
    },
    driver: {
      name: '王师傅',
      phone: '136****9012',
    },
    deliveryTime: '2023-06-16 09:30',
    signTime: '2023-06-16 10:00',
    remark: '货物完好，客户满意',
    images: ['签收单照片1.jpg', '货物照片1.jpg'],
    amount: '8500.00',
  },
  {
    id: 'SIGN-2023061002',
    waybillNo: 'WB-2023061003',
    pickupNo: 'PK-2023061002',
    receiver: {
      company: '杭州科技有限公司',
      contact: '李四',
      phone: '139****5678',
      address: '杭州市西湖区某某路456号',
    },
    cargo: {
      name: '机械配件',
      weight: '800kg',
      volume: '18.5m³',
    },
    status: '拒签',
    statusType: 'danger',
    paymentStatus: '未付款',
    paymentType: 'danger',
    signType: '-',
    signer: {
      name: '-',
      phone: '-',
      time: '-',
    },
    driver: {
      name: '赵师傅',
      phone: '137****7890',
    },
    deliveryTime: '2023-06-16 14:00',
    signTime: '-',
    remark: '客户拒收，货物有损坏',
    images: [],
    amount: '4200.00',
  },
  {
    id: 'SIGN-2023061003',
    waybillNo: 'WB-2023061002',
    pickupNo: 'PK-2023061003',
    receiver: {
      company: '北京物流配送有限公司',
      contact: '王五',
      phone: '135****9012',
      address: '北京市海淀区某某大厦789号',
    },
    cargo: {
      name: '日用百货',
      weight: '300kg',
      volume: '8.2m³',
    },
    status: '待签收',
    statusType: 'warning',
    paymentStatus: '已付款',
    paymentType: 'success',
    signType: '-',
    signer: {
      name: '-',
      phone: '-',
      time: '-',
    },
    driver: {
      name: '孙师傅',
      phone: '138****1234',
    },
    deliveryTime: '2023-06-16 15:00',
    signTime: '-',
    remark: '',
    images: [],
    amount: '1800.00',
  },
  {
    id: 'SIGN-2023061004',
    waybillNo: 'WB-2023061005',
    pickupNo: 'PK-2023061004',
    receiver: {
      company: '深圳物流配送中心',
      contact: '赵六',
      phone: '136****3456',
      address: '深圳市南山区某某路321号',
    },
    cargo: {
      name: '办公用品',
      weight: '200kg',
      volume: '5.5m³',
    },
    status: '部分签收',
    statusType: 'warning',
    paymentStatus: '部分付款',
    paymentType: 'warning',
    signType: '代签',
    signer: {
      name: '前台',
      phone: '0755-12345678',
      time: '2023-06-16 16:00',
    },
    driver: {
      name: '吴师傅',
      phone: '139****5678',
    },
    deliveryTime: '2023-06-16 15:30',
    signTime: '2023-06-16 16:00',
    remark: '部分货物签收，剩余待确认',
    images: ['签收单照片2.jpg'],
    amount: '1500.00',
  },
  {
    id: 'SIGN-2023061005',
    waybillNo: 'WB-2023061008',
    pickupNo: 'PK-2023061005',
    receiver: {
      company: '成都货运中心',
      contact: '孙七',
      phone: '137****7890',
      address: '成都市武侯区某某街654号',
    },
    cargo: {
      name: '食品饮料',
      weight: '600kg',
      volume: '15.8m³',
    },
    status: '已签收',
    statusType: 'success',
    paymentStatus: '已付款',
    paymentType: 'success',
    signType: '本人签收',
    signer: {
      name: '孙七',
      phone: '137****7890',
      time: '2023-06-17 09:15',
    },
    driver: {
      name: '郑师傅',
      phone: '138****1234',
    },
    deliveryTime: '2023-06-17 08:00',
    signTime: '2023-06-17 09:15',
    remark: '货物完好，冷链运输正常',
    images: ['签收单照片3.jpg', '货物照片2.jpg'],
    amount: '3200.00',
  },
  {
    id: 'SIGN-2023061006',
    waybillNo: 'WB-2023061002',
    pickupNo: 'PK-2023061002',
    receiver: {
      company: '南京宝冠出品有限公司',
      contact: '周八',
      phone: '139****5678',
      address: '南京市鼓楼区某某路789号',
    },
    cargo: {
      name: '家电产品',
      weight: '450kg',
      volume: '10.2m³',
    },
    status: '已签收',
    statusType: 'success',
    paymentStatus: '已付款',
    paymentType: 'success',
    signType: '本人签收',
    signer: {
      name: '周八',
      phone: '139****5678',
      time: '2023-06-16 16:00',
    },
    driver: {
      name: '刘师傅',
      phone: '135****9012',
    },
    deliveryTime: '2023-06-16 14:30',
    signTime: '2023-06-16 16:00',
    remark: '货物完好，按时送达',
    images: ['签收单照片4.jpg'],
    amount: '5200.00',
  },
  {
    id: 'SIGN-2023061007',
    waybillNo: 'WB-2023061008',
    pickupNo: 'PK-2023061006',
    receiver: {
      company: '西安宝冠有限公司',
      contact: '吴九',
      phone: '136****3456',
      address: '西安市雁塔区某某大道321号',
    },
    cargo: {
      name: '工业设备',
      weight: '1200kg',
      volume: '25.5m³',
    },
    status: '待签收',
    statusType: 'warning',
    paymentStatus: '已付款',
    paymentType: 'success',
    signType: '-',
    signer: {
      name: '-',
      phone: '-',
      time: '-',
    },
    driver: {
      name: '陈师傅',
      phone: '137****7890',
    },
    deliveryTime: '2023-06-17 10:00',
    signTime: '-',
    remark: '',
    images: [],
    amount: '8800.00',
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
    signStatus: '',
    paymentStatus: '',
    deliveryType: '',
    timeType: '',
    signType: '',
    dateRange: [],
    keyword: '',
  });
};

// 导出
const handleExport = () => {
  ElMessage.success('正在导出数据...');
};

// 新增签收单
const handleAdd = () => {
  ElMessage.info('跳转到新增签收单页面');
};

// 查看详情
interface PaymentRow {
  id: number;
  [key: string]: unknown;
}
const handleView = (_row: PaymentRow) => {
  // TODO: 实现查看详情逻辑
};

// 编辑
const handleEdit = (_row: PaymentRow) => {
  // TODO: 实现编辑逻辑
};

// 删除
const handleDelete = (_row: PaymentRow) => {
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
  <div class="payment-container">
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
          <label class="filter-label">签收状态</label>
          <ElSelect v-model="filters.signStatus" placeholder="全部" clearable>
            <ElOption
              v-for="item in signStatusOptions"
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
          <label class="filter-label">签收方式</label>
          <ElSelect v-model="filters.signType" placeholder="全部" clearable>
            <ElOption
              v-for="item in signTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">时间</label>
          <ElSelect v-model="filters.timeType" placeholder="签收时间">
            <ElOption label="签收时间" value="1" />
            <ElOption label="送达时间" value="2" />
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
          placeholder="请输入签收单编号、运单编号等关键词搜索"
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

    <!-- 签收单列表 -->
    <div class="sign-table-card">
      <ElTable :data="signList" stripe style="width: 100%">
        <ElTableColumn type="selection" width="50" />

        <ElTableColumn label="签收单号" width="150" fixed>
          <template #default="{ row }">
            <div class="sign-id">{{ row.id }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="关联运单号" width="150">
          <template #default="{ row }">
            <div class="waybill-no">{{ row.waybillNo }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="关联提货单号" width="150">
          <template #default="{ row }">
            <div class="pickup-no">{{ row.pickupNo }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="收货方信息" width="200">
          <template #default="{ row }">
            <div class="receiver-info">
              <div class="receiver-company">{{ row.receiver.company }}</div>
              <div class="receiver-contact">
                {{ row.receiver.contact }} | {{ row.receiver.phone }}
              </div>
              <div class="receiver-address">{{ row.receiver.address }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="签收状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.statusType" size="small">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>

        <ElTableColumn label="付款状态" width="100">
          <template #default="{ row }">
            <ElTag :type="row.paymentType" size="small">{{ row.paymentStatus }}</ElTag>
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

        <ElTableColumn label="签收人及时间" width="180">
          <template #default="{ row }">
            <div class="signer-info">
              <div class="signer-name">签收人：{{ row.signer.name }}</div>
              <div class="signer-phone">电话：{{ row.signer.phone }}</div>
              <div class="signer-time">时间：{{ row.signer.time }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="司机/车辆信息" width="150">
          <template #default="{ row }">
            <div class="driver-info">
              <div class="driver-name">{{ row.driver.name }}</div>
              <div class="driver-phone">{{ row.driver.phone }}</div>
            </div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="送达时间" width="150">
          <template #default="{ row }">
            <div class="delivery-time">{{ row.deliveryTime }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="签收时间" width="150">
          <template #default="{ row }">
            <div class="sign-time">{{ row.signTime }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="签收备注" width="200">
          <template #default="{ row }">
            <div class="remark">{{ row.remark || '-' }}</div>
          </template>
        </ElTableColumn>

        <ElTableColumn label="附件" width="100">
          <template #default="{ row }">
            <ElButton v-if="row.images.length > 0" link type="primary" size="small">
              查看({{ row.images.length }})
            </ElButton>
            <span v-else class="no-images">-</span>
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
.payment-container {
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

/* 签收单表格 */
.sign-table-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.sign-id {
  font-size: 13px;
  font-weight: 600;
  color: #1890ff;
  cursor: pointer;
}

.sign-id:hover {
  text-decoration: underline;
}

.waybill-no,
.pickup-no {
  font-size: 13px;
  color: #262626;
}

.receiver-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.receiver-company {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.receiver-contact {
  font-size: 11px;
  color: #8c8c8c;
}

.receiver-address {
  font-size: 11px;
  color: #bfbfbf;
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

.signer-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.signer-name,
.signer-phone,
.signer-time {
  font-size: 12px;
  color: #595959;
}

.driver-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.driver-name,
.driver-phone {
  font-size: 12px;
  color: #595959;
}

.delivery-time,
.sign-time {
  font-size: 12px;
  color: #595959;
}

.remark {
  font-size: 12px;
  color: #595959;
  line-height: 1.5;
}

.no-images {
  font-size: 12px;
  color: #bfbfbf;
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
