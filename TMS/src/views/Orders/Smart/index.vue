<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Search, Refresh } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 筛选条件
const filters = reactive({
  orderStatus: '',
  startProvince: '',
  startCity: '',
  endProvince: '',
  endCity: '',
  dateRange: [],
});

// 订单状态选项
const orderStatusOptions = [
  { label: '待合单', value: '1' },
  { label: '已合单', value: '2' },
];

// 合单统计
const mergeStats = reactive({
  totalOrders: 15,
  totalGroups: 5,
  totalDistance: 12550,
  totalVehicles: 2,
});

// 推荐合单方案
const recommendPlans = ref([
  {
    id: 1,
    planName: '方案一（推荐）',
    orders: [
      {
        orderId: 'ORD-2023051-0-002',
        status: '待派单',
        sender: '上海虹口区',
        receiver: '广州天河区',
        cargo: '电子产品',
        weight: '500kg',
        createTime: '2023-05-21',
      },
      {
        orderId: 'ORD-2023051-0-003',
        status: '待派单',
        sender: '上海浦东区',
        receiver: '广州越秀区',
        cargo: '日用百货',
        weight: '300kg',
        createTime: '2023-05-21',
      },
    ],
    route: {
      startCity: '上海',
      endCity: '广州',
      distance: '1360 km',
      estimatedTime: '24小时',
    },
    vehicle: {
      type: '厢式货车',
      capacity: '5吨',
    },
    cost: {
      freight: '¥3,200',
      saving: '节省 ¥800',
    },
    timeline: [
      { city: '上海', time: '2023-05-22 08:00', status: 'start', desc: '装货点1：上海虹口区' },
      { city: '上海', time: '2023-05-22 10:00', status: 'pickup', desc: '装货点2：上海浦东区' },
      { city: '广州', time: '2023-05-23 08:00', status: 'delivery', desc: '卸货点1：广州天河区' },
      { city: '广州', time: '2023-05-23 10:00', status: 'end', desc: '卸货点2：广州越秀区' },
    ],
  },
  {
    id: 2,
    planName: '方案二',
    orders: [
      {
        orderId: 'ORD-2023051-0-004',
        status: '待派单',
        sender: '北京朝阳区',
        receiver: '上海徐汇区',
        cargo: '机械设备',
        weight: '800kg',
        createTime: '2023-05-21',
      },
      {
        orderId: 'ORD-2023051-0-005',
        status: '待派单',
        sender: '北京海淀区',
        receiver: '上海浦东区',
        cargo: '办公用品',
        weight: '200kg',
        createTime: '2023-05-21',
      },
    ],
    route: {
      startCity: '北京',
      endCity: '上海',
      distance: '1200 km',
      estimatedTime: '20小时',
    },
    vehicle: {
      type: '平板车',
      capacity: '3吨',
    },
    cost: {
      freight: '¥2,800',
      saving: '节省 ¥600',
    },
    timeline: [
      { city: '北京', time: '2023-05-22 09:00', status: 'start', desc: '装货点1：北京朝阳区' },
      { city: '北京', time: '2023-05-22 11:00', status: 'pickup', desc: '装货点2：北京海淀区' },
      { city: '上海', time: '2023-05-23 05:00', status: 'delivery', desc: '卸货点1：上海徐汇区' },
      { city: '上海', time: '2023-05-23 07:00', status: 'end', desc: '卸货点2：上海浦东区' },
    ],
  },
  {
    id: 3,
    planName: '方案三',
    orders: [
      {
        orderId: 'ORD-2023051-0-006',
        status: '待派单',
        sender: '杭州西湖区',
        receiver: '南京玄武区',
        cargo: '服装纺织',
        weight: '400kg',
        createTime: '2023-05-21',
      },
    ],
    route: {
      startCity: '杭州',
      endCity: '南京',
      distance: '280 km',
      estimatedTime: '5小时',
    },
    vehicle: {
      type: '厢式货车',
      capacity: '2吨',
    },
    cost: {
      freight: '¥800',
      saving: '节省 ¥200',
    },
    timeline: [
      { city: '杭州', time: '2023-05-22 08:00', status: 'start', desc: '装货点：杭州西湖区' },
      { city: '南京', time: '2023-05-22 13:00', status: 'end', desc: '卸货点：南京玄武区' },
    ],
  },
]);

// 备选合单方案
const alternativePlans = ref([
  {
    orderId: 'ORD-2023051-0-007',
    sender: '深圳南山区',
    receiver: '北京朝阳区',
    cargo: '电子元器件',
    weight: '12.5t',
    volume: '25.4m³',
    createTime: '2023-05-18',
    estimatedCost: '¥5,200',
    status: '待合单',
  },
  {
    orderId: 'ORD-2023051-0-008',
    sender: '广州天河区',
    receiver: '成都武侯区',
    cargo: '日用百货',
    weight: '8.3t',
    volume: '18.2m³',
    createTime: '2023-05-19',
    estimatedCost: '¥4,100',
    status: '待合单',
  },
  {
    orderId: 'ORD-2023051-0-009',
    sender: '南京建邺区',
    receiver: '西安雁塔区',
    cargo: '机械配件',
    weight: '15.7t',
    volume: '32.1m³',
    createTime: '2023-05-20',
    estimatedCost: '¥6,800',
    status: '待合单',
  },
]);

// 搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  ElMessage.success('搜索完成');
};

// 重置
const handleReset = () => {
  Object.assign(filters, {
    orderStatus: '',
    startProvince: '',
    startCity: '',
    endProvince: '',
    endCity: '',
    dateRange: [],
  });
};

// 执行合单
interface Plan {
  id: number;
  [key: string]: unknown;
}
const handleMerge = (_plan: Plan) => {
  // TODO: 实现执行合单逻辑
  ElMessage.success('合单方案已提交');
};

// 查看详情
interface Order {
  id: number;
  [key: string]: unknown;
}
const handleViewDetail = (_order: Order) => {
  // TODO: 实现查看详情逻辑
};

// 生成新方案
const handleGenerateNew = () => {
  ElMessage.success('正在生成新的合单方案...');
};
</script>

<template>
  <div class="smart-merge-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <div class="header-left">
        <h2 class="page-title">智能合单推荐</h2>
        <p class="page-desc">系统根据订单信息自动推荐最优合单方案，帮助您降低运输成本</p>
      </div>
      <div class="header-actions">
        <ElButton type="primary" @click="handleGenerateNew">生成新方案</ElButton>
      </div>
    </div>

    <!-- 筛选条件 -->
    <div class="filter-card">
      <div class="filter-row">
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
          <label class="filter-label">出发省份</label>
          <ElSelect v-model="filters.startProvince" placeholder="全部" clearable>
            <ElOption label="上海市" value="31" />
            <ElOption label="北京市" value="11" />
            <ElOption label="广东省" value="44" />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">出发城市</label>
          <ElSelect v-model="filters.startCity" placeholder="全部" clearable>
            <ElOption label="市辖区" value="3101" />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">目的省份</label>
          <ElSelect v-model="filters.endProvince" placeholder="全部" clearable>
            <ElOption label="广东省" value="44" />
            <ElOption label="北京市" value="11" />
          </ElSelect>
        </div>

        <div class="filter-item">
          <label class="filter-label">目的城市</label>
          <ElSelect v-model="filters.endCity" placeholder="全部" clearable>
            <ElOption label="广州市" value="4401" />
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
    </div>

    <!-- 合单统计 -->
    <div class="stats-card">
      <div class="stat-item">
        <div class="stat-label">待合单订单数</div>
        <div class="stat-value">{{ mergeStats.totalOrders }} <span class="stat-unit">个</span></div>
        <div class="stat-desc">可节省运输成本 ¥2,800</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">推荐合单组数</div>
        <div class="stat-value">{{ mergeStats.totalGroups }} <span class="stat-unit">组</span></div>
        <div class="stat-desc">
          平均每组 {{ Math.floor(mergeStats.totalOrders / mergeStats.totalGroups) }} 个订单
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-label">总运输距离</div>
        <div class="stat-value">
          {{ mergeStats.totalDistance.toLocaleString() }} <span class="stat-unit">km</span>
        </div>
        <div class="stat-desc">较分散运输减少 15%</div>
      </div>
      <div class="stat-item">
        <div class="stat-label">所需车辆数</div>
        <div class="stat-value">
          {{ mergeStats.totalVehicles }} <span class="stat-unit">辆</span>
        </div>
        <div class="stat-desc">较分散运输减少 8 辆</div>
      </div>
    </div>

    <!-- 推荐合单方案 -->
    <div class="section-header">
      <h3 class="section-title">推荐合单方案</h3>
    </div>

    <div class="plans-list">
      <div v-for="plan in recommendPlans" :key="plan.id" class="plan-card">
        <div class="plan-header">
          <div class="plan-title">
            <span class="plan-name">{{ plan.planName }}</span>
            <ElTag v-if="plan.id === 1" type="success" size="small">推荐方案</ElTag>
          </div>
          <ElButton type="primary" size="small" @click="handleMerge(plan)"> 执行合单 </ElButton>
        </div>

        <div class="plan-content">
          <!-- 订单列表 -->
          <div class="orders-section">
            <div class="section-label">合并订单</div>
            <div class="orders-grid">
              <div v-for="(order, index) in plan.orders" :key="index" class="order-item">
                <div class="order-header">
                  <span class="order-id">{{ order.orderId }}</span>
                  <ElTag type="warning" size="small">{{ order.status }}</ElTag>
                </div>
                <div class="order-info">
                  <div class="info-row">
                    <span class="info-label">起：</span>
                    <span class="info-value">{{ order.sender }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">止：</span>
                    <span class="info-value">{{ order.receiver }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">货物：</span>
                    <span class="info-value">{{ order.cargo }}</span>
                  </div>
                  <div class="info-row">
                    <span class="info-label">重量：</span>
                    <span class="info-value">{{ order.weight }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 运输路线 -->
          <div class="route-section">
            <div class="section-label">运输路线</div>
            <div class="route-timeline">
              <div v-for="(point, index) in plan.timeline" :key="index" class="timeline-item">
                <div class="timeline-dot" :class="point.status"></div>
                <div class="timeline-content">
                  <div class="timeline-city">{{ point.city }}</div>
                  <div class="timeline-time">{{ point.time }}</div>
                  <div class="timeline-desc">{{ point.desc }}</div>
                </div>
                <div v-if="index < plan.timeline.length - 1" class="timeline-line"></div>
              </div>
            </div>
          </div>

          <!-- 方案详情 -->
          <div class="details-section">
            <div class="detail-group">
              <div class="detail-label">运输距离</div>
              <div class="detail-value">{{ plan.route.distance }}</div>
            </div>
            <div class="detail-group">
              <div class="detail-label">预计时效</div>
              <div class="detail-value">{{ plan.route.estimatedTime }}</div>
            </div>
            <div class="detail-group">
              <div class="detail-label">车辆类型</div>
              <div class="detail-value">{{ plan.vehicle.type }}</div>
            </div>
            <div class="detail-group">
              <div class="detail-label">载重能力</div>
              <div class="detail-value">{{ plan.vehicle.capacity }}</div>
            </div>
            <div class="detail-group">
              <div class="detail-label">运输费用</div>
              <div class="detail-value highlight">{{ plan.cost.freight }}</div>
            </div>
            <div class="detail-group">
              <div class="detail-label">成本节省</div>
              <div class="detail-value success">{{ plan.cost.saving }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 备选合单方案 -->
    <div class="section-header">
      <h3 class="section-title">备选合单方案列表</h3>
      <span class="section-desc">以下订单暂未找到合适的合单方案</span>
    </div>

    <div class="alternative-table">
      <ElTable :data="alternativePlans" stripe>
        <ElTableColumn prop="orderId" label="订单编号" width="180" />
        <ElTableColumn label="起始地" width="150">
          <template #default="{ row }">
            {{ row.sender }}
          </template>
        </ElTableColumn>
        <ElTableColumn label="目的地" width="150">
          <template #default="{ row }">
            {{ row.receiver }}
          </template>
        </ElTableColumn>
        <ElTableColumn prop="cargo" label="货物" width="120" />
        <ElTableColumn prop="weight" label="重量" width="100" />
        <ElTableColumn prop="volume" label="体积" width="100" />
        <ElTableColumn prop="createTime" label="创建时间" width="120" />
        <ElTableColumn prop="estimatedCost" label="预估费用" width="120" />
        <ElTableColumn label="状态" width="100">
          <template #default="{ row }">
            <ElTag type="info" size="small">{{ row.status }}</ElTag>
          </template>
        </ElTableColumn>
        <ElTableColumn label="操作" width="120" fixed="right">
          <template #default="{ row }">
            <ElButton link type="primary" size="small" @click="handleViewDetail(row)">
              查看详情
            </ElButton>
          </template>
        </ElTableColumn>
      </ElTable>
    </div>
  </div>
</template>

<style scoped>
.smart-merge-container {
  padding: 0;
  background: #f8f9fa;
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: white;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.header-left {
  flex: 1;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 6px 0;
}

.page-desc {
  font-size: 13px;
  color: #8c8c8c;
  margin: 0;
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

/* 统计卡片 */
.stats-card {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
  margin-bottom: 24px;
}

.stat-item {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  text-align: center;
}

.stat-label {
  font-size: 13px;
  color: #8c8c8c;
  margin-bottom: 12px;
}

.stat-value {
  font-size: 32px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 8px;
}

.stat-unit {
  font-size: 14px;
  color: #8c8c8c;
  font-weight: 400;
  margin-left: 4px;
}

.stat-desc {
  font-size: 12px;
  color: #52c41a;
}

/* 区块标题 */
.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin: 0;
}

.section-desc {
  font-size: 13px;
  color: #8c8c8c;
}

/* 方案列表 */
.plans-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 24px;
}

/* 方案卡片 */
.plan-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  transition: all 0.3s;
}

.plan-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.plan-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 20px;
}

.plan-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.plan-name {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
}

/* 方案内容 */
.plan-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 订单区域 */
.orders-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.section-label {
  font-size: 14px;
  font-weight: 600;
  color: #595959;
}

.orders-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 12px;
}

.order-item {
  background: #fafafa;
  border-radius: 6px;
  padding: 14px;
  border: 1px solid #f0f0f0;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.order-id {
  font-size: 13px;
  font-weight: 600;
  color: #262626;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-row {
  display: flex;
  align-items: center;
  font-size: 12px;
}

.info-label {
  color: #8c8c8c;
  min-width: 40px;
}

.info-value {
  color: #262626;
}

/* 运输路线 */
.route-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.route-timeline {
  display: flex;
  align-items: flex-start;
  gap: 0;
  padding: 20px;
  background: #fafafa;
  border-radius: 6px;
  position: relative;
}

.timeline-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.timeline-dot {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: #d9d9d9;
  border: 3px solid white;
  box-shadow: 0 0 0 2px #d9d9d9;
  z-index: 2;
  margin-bottom: 12px;
}

.timeline-dot.start {
  background: #1890ff;
  box-shadow: 0 0 0 2px #1890ff;
}

.timeline-dot.pickup {
  background: #1890ff;
  box-shadow: 0 0 0 2px #1890ff;
}

.timeline-dot.delivery {
  background: #52c41a;
  box-shadow: 0 0 0 2px #52c41a;
}

.timeline-dot.end {
  background: #52c41a;
  box-shadow: 0 0 0 2px #52c41a;
}

.timeline-content {
  text-align: center;
}

.timeline-city {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.timeline-time {
  font-size: 12px;
  color: #8c8c8c;
  margin-bottom: 4px;
}

.timeline-desc {
  font-size: 11px;
  color: #bfbfbf;
}

.timeline-line {
  position: absolute;
  top: 8px;
  left: 50%;
  right: -50%;
  height: 2px;
  background: linear-gradient(to right, #1890ff, #52c41a);
  z-index: 1;
}

/* 详情区域 */
.details-section {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
  padding: 16px;
  background: #fafafa;
  border-radius: 6px;
}

.detail-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.detail-label {
  font-size: 12px;
  color: #8c8c8c;
}

.detail-value {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}

.detail-value.highlight {
  color: #1890ff;
  font-size: 16px;
}

.detail-value.success {
  color: #52c41a;
  font-size: 16px;
}

/* 备选方案表格 */
.alternative-table {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.alternative-table :deep(.el-table) {
  font-size: 13px;
}

.alternative-table :deep(.el-table th) {
  background: #fafafa;
  color: #595959;
  font-weight: 600;
}
</style>
