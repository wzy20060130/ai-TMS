<script setup lang="ts">
import { ref, reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { ArrowLeft } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();

// 订单基本信息
const orderInfo = reactive({
  orderId: 'ORD-2023051001',
  orderStatus: '待派单',
  createTime: '2023-05-10 09:32',

  // 发货信息
  senderCompany: '上海宝冠贸易有限公司',
  senderContact: '张三',
  senderPhone: '138****1234',
  senderAddress: '上海市虹口区某某街道123号',
  pickupTime: '2023-05-10 10:00',

  // 收货信息
  receiverCompany: '北京宝冠贸易有限公司',
  receiverContact: '李四',
  receiverPhone: '139****5678',
  receiverAddress: '北京市朝阳区某某大厦456号',
  deliveryTime: '2023-05-11 16:00',
});

// 货物信息
const cargoList = ref([
  {
    cargoName: '电子产品',
    cargoType: '电子产品',
    quantity: '100',
    weight: '850.00',
    volume: '12.50',
    packingType: '纸箱',
    remark: '易碎品，轻拿轻放',
  },
]);

// 运输信息
const transportInfo = reactive({
  transportType: '公路',
  distance: '2500.00',
  estimatedTime: '48小时',
});

// 调度信息
const dispatchForm = reactive({
  driverType: '',
  driverId: '',
  vehicleType: '',
  vehicleId: '',
  departureTime: '',
  estimatedArrival: '',
  transportRoute: '',
  dispatchRemark: '',
});

// 司机类型选项
const driverTypeOptions = [
  { label: '自有司机', value: '1' },
  { label: '外协司机', value: '2' },
];

// 司机列表
const driverOptions = [
  { label: '王师傅 (京A12345)', value: '1' },
  { label: '赵师傅 (京B67890)', value: '2' },
  { label: '孙师傅 (浙A11111)', value: '3' },
];

// 车辆类型选项
const vehicleTypeOptions = [
  { label: '厢式货车', value: '1' },
  { label: '平板车', value: '2' },
  { label: '冷藏车', value: '3' },
];

// 车辆列表
const vehicleOptions = [
  { label: '京A12345 (厢式货车)', value: '1' },
  { label: '京B67890 (平板车)', value: '2' },
  { label: '浙A11111 (冷藏车)', value: '3' },
];

// 费用信息
const feeInfo = reactive({
  freightFee: '0.00',
  insuranceFee: '0.00',
  otherFee: '0.00',
  totalFee: '0.00',
});

// 返回
const handleBack = () => {
  router.back();
};

// 保存草稿
const handleSaveDraft = () => {
  // TODO: 实现保存草稿逻辑
  ElMessage.success('草稿保存成功');
};

// 提交调度
const handleSubmit = () => {
  // TODO: 实现提交调度逻辑
  ElMessage.success('调度任务已提交');
};
</script>

<template>
  <div class="transfer-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-left">
        <ElButton :icon="ArrowLeft" text @click="handleBack">返回</ElButton>
        <div class="header-info">
          <h2 class="page-title">订单调度</h2>
          <span class="order-id">{{ orderInfo.orderId }}</span>
        </div>
      </div>
      <div class="header-actions">
        <ElButton @click="handleSaveDraft">保存草稿</ElButton>
        <ElButton type="primary" @click="handleSubmit">提交调度</ElButton>
      </div>
    </div>

    <div class="content-wrapper">
      <!-- 左侧：订单信息 -->
      <div class="left-section">
        <!-- 基本信息 -->
        <div class="info-card">
          <div class="card-header">
            <span class="card-icon">📋</span>
            <h3 class="card-title">基本信息</h3>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <label class="info-label">订单状态</label>
              <div class="info-value">
                <ElTag type="warning" size="small">{{ orderInfo.orderStatus }}</ElTag>
              </div>
            </div>
            <div class="info-item">
              <label class="info-label">创建时间</label>
              <div class="info-value">{{ orderInfo.createTime }}</div>
            </div>
            <div class="info-item">
              <label class="info-label">运输方式</label>
              <div class="info-value">{{ transportInfo.transportType }}</div>
            </div>
            <div class="info-item">
              <label class="info-label">预计时效</label>
              <div class="info-value">{{ transportInfo.estimatedTime }}</div>
            </div>
          </div>
        </div>

        <!-- 发货信息 -->
        <div class="info-card">
          <div class="card-header">
            <span class="card-icon">📦</span>
            <h3 class="card-title">发货信息</h3>
          </div>
          <div class="info-list">
            <div class="info-row">
              <label class="info-label">发货方：</label>
              <div class="info-value">{{ orderInfo.senderCompany }}</div>
            </div>
            <div class="info-row">
              <label class="info-label">联系人：</label>
              <div class="info-value">{{ orderInfo.senderContact }}</div>
            </div>
            <div class="info-row">
              <label class="info-label">联系电话：</label>
              <div class="info-value">{{ orderInfo.senderPhone }}</div>
            </div>
            <div class="info-row">
              <label class="info-label">发货地址：</label>
              <div class="info-value">{{ orderInfo.senderAddress }}</div>
            </div>
            <div class="info-row">
              <label class="info-label">预计提货时间：</label>
              <div class="info-value">{{ orderInfo.pickupTime }}</div>
            </div>
          </div>
        </div>

        <!-- 收货信息 -->
        <div class="info-card">
          <div class="card-header">
            <span class="card-icon">📮</span>
            <h3 class="card-title">收货信息</h3>
          </div>
          <div class="info-list">
            <div class="info-row">
              <label class="info-label">收货方：</label>
              <div class="info-value">{{ orderInfo.receiverCompany }}</div>
            </div>
            <div class="info-row">
              <label class="info-label">联系人：</label>
              <div class="info-value">{{ orderInfo.receiverContact }}</div>
            </div>
            <div class="info-row">
              <label class="info-label">联系电话：</label>
              <div class="info-value">{{ orderInfo.receiverPhone }}</div>
            </div>
            <div class="info-row">
              <label class="info-label">收货地址：</label>
              <div class="info-value">{{ orderInfo.receiverAddress }}</div>
            </div>
            <div class="info-row">
              <label class="info-label">要求送达时间：</label>
              <div class="info-value">{{ orderInfo.deliveryTime }}</div>
            </div>
          </div>
        </div>

        <!-- 货物信息 -->
        <div class="info-card">
          <div class="card-header">
            <span class="card-icon">📦</span>
            <h3 class="card-title">货物信息</h3>
          </div>
          <div class="cargo-table">
            <ElTable :data="cargoList" border size="small">
              <ElTableColumn prop="cargoName" label="货物名称" width="120" />
              <ElTableColumn prop="cargoType" label="货物类型" width="100" />
              <ElTableColumn prop="quantity" label="数量" width="80" align="center">
                <template #default="{ row }"> {{ row.quantity }} 件 </template>
              </ElTableColumn>
              <ElTableColumn prop="weight" label="重量(kg)" width="100" align="center" />
              <ElTableColumn prop="volume" label="体积(m³)" width="100" align="center" />
              <ElTableColumn prop="packingType" label="包装方式" width="100" />
              <ElTableColumn prop="remark" label="备注" min-width="150" />
            </ElTable>
          </div>
        </div>

        <!-- 运输信息 -->
        <div class="info-card">
          <div class="card-header">
            <span class="card-icon">🚚</span>
            <h3 class="card-title">运输信息</h3>
          </div>
          <div class="info-grid">
            <div class="info-item">
              <label class="info-label">运输方式</label>
              <div class="info-value">{{ transportInfo.transportType }}</div>
            </div>
            <div class="info-item">
              <label class="info-label">运输距离</label>
              <div class="info-value">{{ transportInfo.distance }} km</div>
            </div>
            <div class="info-item">
              <label class="info-label">预计时效</label>
              <div class="info-value">{{ transportInfo.estimatedTime }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 右侧：调度表单 -->
      <div class="right-section">
        <!-- 调度分配 -->
        <div class="dispatch-card">
          <div class="card-header">
            <span class="card-icon">🚛</span>
            <h3 class="card-title">调度分配</h3>
          </div>

          <ElForm :model="dispatchForm" label-width="120px" class="dispatch-form">
            <ElFormItem label="司机类型" required>
              <ElSelect v-model="dispatchForm.driverType" placeholder="请选择司机类型">
                <ElOption
                  v-for="item in driverTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>

            <ElFormItem label="选择司机" required>
              <ElSelect v-model="dispatchForm.driverId" placeholder="请选择司机" filterable>
                <ElOption
                  v-for="item in driverOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>

            <ElFormItem label="车辆类型" required>
              <ElSelect v-model="dispatchForm.vehicleType" placeholder="请选择车辆类型">
                <ElOption
                  v-for="item in vehicleTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>

            <ElFormItem label="选择车辆" required>
              <ElSelect v-model="dispatchForm.vehicleId" placeholder="请选择车辆" filterable>
                <ElOption
                  v-for="item in vehicleOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>

            <ElFormItem label="计划发车时间" required>
              <ElDatePicker
                v-model="dispatchForm.departureTime"
                type="datetime"
                placeholder="选择发车时间"
                style="width: 100%"
              />
            </ElFormItem>

            <ElFormItem label="预计到达时间" required>
              <ElDatePicker
                v-model="dispatchForm.estimatedArrival"
                type="datetime"
                placeholder="选择到达时间"
                style="width: 100%"
              />
            </ElFormItem>

            <ElFormItem label="运输路线">
              <ElInput
                v-model="dispatchForm.transportRoute"
                type="textarea"
                :rows="3"
                placeholder="请输入运输路线（选填）"
              />
            </ElFormItem>

            <ElFormItem label="调度备注">
              <ElInput
                v-model="dispatchForm.dispatchRemark"
                type="textarea"
                :rows="3"
                placeholder="请输入调度备注信息（选填）"
              />
            </ElFormItem>
          </ElForm>
        </div>

        <!-- 费用信息 -->
        <div class="dispatch-card">
          <div class="card-header">
            <span class="card-icon">💰</span>
            <h3 class="card-title">费用信息</h3>
          </div>

          <div class="fee-list">
            <div class="fee-item">
              <label class="fee-label">运费金额(元)</label>
              <div class="fee-value">{{ feeInfo.freightFee }}</div>
            </div>
            <div class="fee-item">
              <label class="fee-label">保险费用(元)</label>
              <div class="fee-value">{{ feeInfo.insuranceFee }}</div>
            </div>
            <div class="fee-item">
              <label class="fee-label">其他费用(元)</label>
              <div class="fee-value">{{ feeInfo.otherFee }}</div>
            </div>
            <div class="fee-item total">
              <label class="fee-label">预计总费用</label>
              <div class="fee-value total-amount">¥{{ feeInfo.totalFee }}</div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <ElButton size="large" style="width: 48%" @click="handleSaveDraft"> 保存草稿 </ElButton>
          <ElButton type="primary" size="large" style="width: 48%" @click="handleSubmit">
            提交调度
          </ElButton>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.transfer-container {
  padding: 0;
  background: #f8f9fa;
  min-height: 100vh;
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
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #262626;
  margin: 0;
}

.order-id {
  font-size: 14px;
  color: #8c8c8c;
  padding: 4px 12px;
  background: #fafafa;
  border-radius: 4px;
}

.header-actions {
  display: flex;
  gap: 12px;
}

/* 内容区域 */
.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 500px;
  gap: 16px;
}

/* 左侧信息区 */
.left-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 信息卡片 */
.info-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.card-icon {
  font-size: 18px;
}

.card-title {
  font-size: 15px;
  font-weight: 600;
  color: #262626;
  margin: 0;
}

/* 信息网格 */
.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-label {
  font-size: 12px;
  color: #8c8c8c;
}

.info-value {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

/* 信息列表 */
.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-row {
  display: flex;
  align-items: flex-start;
  gap: 8px;
}

.info-row .info-label {
  font-size: 13px;
  color: #8c8c8c;
  min-width: 100px;
  flex-shrink: 0;
}

.info-row .info-value {
  font-size: 13px;
  color: #262626;
  flex: 1;
}

/* 货物表格 */
.cargo-table {
  margin-top: 8px;
}

.cargo-table :deep(.el-table) {
  font-size: 12px;
}

.cargo-table :deep(.el-table th) {
  background: #fafafa;
  color: #595959;
  font-weight: 600;
}

/* 右侧调度区 */
.right-section {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

/* 调度卡片 */
.dispatch-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

/* 调度表单 */
.dispatch-form {
  margin-top: 8px;
}

.dispatch-form :deep(.el-form-item) {
  margin-bottom: 20px;
}

.dispatch-form :deep(.el-form-item__label) {
  font-size: 13px;
  color: #595959;
  font-weight: 500;
}

.dispatch-form :deep(.el-input),
.dispatch-form :deep(.el-select) {
  width: 100%;
}

/* 费用列表 */
.fee-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 8px;
}

.fee-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
}

.fee-item.total {
  background: #e6f7ff;
  border: 1px solid #91d5ff;
  margin-top: 8px;
}

.fee-label {
  font-size: 13px;
  color: #595959;
}

.fee-value {
  font-size: 14px;
  color: #262626;
  font-weight: 600;
}

.total-amount {
  font-size: 18px;
  color: #1890ff;
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}
</style>
