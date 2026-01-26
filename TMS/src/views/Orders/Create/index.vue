<script setup lang="ts">
import { reactive } from 'vue';
import { Plus, Delete } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 表单数据
const formData = reactive({
  // 基本信息
  orderType: '',
  transportType: '',
  serviceType: '',
  urgentLevel: '',
  orderRemark: '',

  // 发货方信息
  senderName: '',
  senderContact: '',
  senderPhone: '',
  senderProvince: '',
  senderCity: '',
  senderDistrict: '',
  senderAddress: '',
  senderPickupTime: '',
  senderRemark: '',

  // 收货方信息
  receiverName: '',
  receiverContact: '',
  receiverPhone: '',
  receiverProvince: '',
  receiverCity: '',
  receiverDistrict: '',
  receiverAddress: '',
  receiverDeliveryTime: '',
  receiverRemark: '',

  // 货物信息
  cargoList: [
    {
      cargoName: '',
      cargoType: '',
      packingType: '',
      quantity: '',
      weight: '',
      volume: '',
      value: '',
      remark: '',
    },
  ],
  totalWeight: '',
  totalVolume: '',
  insuranceType: '',
  insuranceAmount: '',
  specialRequirements: '',

  // 费用信息
  paymentMethod: '',
  paymentType: '',
  estimatedFreight: '',
  actualFreight: '',
  insuranceFee: '',
  otherFees: '',
  totalAmount: '',
});

// 订单类型选项
const orderTypeOptions = [
  { label: '整车运输', value: '1' },
  { label: '零担运输', value: '2' },
  { label: '快递运输', value: '3' },
];

// 运输方式选项
const transportTypeOptions = [
  { label: '公路运输', value: '1' },
  { label: '铁路运输', value: '2' },
  { label: '航空运输', value: '3' },
  { label: '水路运输', value: '4' },
];

// 服务类型选项
const serviceTypeOptions = [
  { label: '门到门', value: '1' },
  { label: '门到站', value: '2' },
  { label: '站到门', value: '3' },
  { label: '站到站', value: '4' },
];

// 紧急程度选项
const urgentLevelOptions = [
  { label: '普通', value: '1' },
  { label: '加急', value: '2' },
  { label: '特急', value: '3' },
];

// 货物类型选项
const cargoTypeOptions = [
  { label: '普通货物', value: '1' },
  { label: '易碎品', value: '2' },
  { label: '危险品', value: '3' },
  { label: '贵重物品', value: '4' },
  { label: '冷藏品', value: '5' },
];

// 包装方式选项
const packingTypeOptions = [
  { label: '纸箱', value: '1' },
  { label: '木箱', value: '2' },
  { label: '托盘', value: '3' },
  { label: '编织袋', value: '4' },
  { label: '裸装', value: '5' },
];

// 保险类型选项
const insuranceTypeOptions = [
  { label: '不投保', value: '0' },
  { label: '基本险', value: '1' },
  { label: '综合险', value: '2' },
  { label: '全险', value: '3' },
];

// 支付方式选项
const paymentMethodOptions = [
  { label: '现金支付', value: '1' },
  { label: '银行转账', value: '2' },
  { label: '支付宝', value: '3' },
  { label: '微信支付', value: '4' },
  { label: '月结', value: '5' },
];

// 付款方式选项
const paymentTypeOptions = [
  { label: '寄付', value: '1' },
  { label: '到付', value: '2' },
  { label: '第三方付', value: '3' },
];

// 添加货物
const addCargo = () => {
  formData.cargoList.push({
    cargoName: '',
    cargoType: '',
    packingType: '',
    quantity: '',
    weight: '',
    volume: '',
    value: '',
    remark: '',
  });
};

// 删除货物
const deleteCargo = (index: number) => {
  if (formData.cargoList.length > 1) {
    formData.cargoList.splice(index, 1);
  } else {
    ElMessage.warning('至少保留一条货物信息');
  }
};

// 保存草稿
const handleSaveDraft = () => {
  // TODO: 实现保存草稿逻辑
  ElMessage.success('草稿保存成功');
};

// 提交订单
const handleSubmit = () => {
  // TODO: 实现提交订单逻辑
  ElMessage.success('订单创建成功');
};

// 重置表单
const handleReset = () => {
  Object.assign(formData, {
    orderType: '',
    transportType: '',
    serviceType: '',
    urgentLevel: '',
    orderRemark: '',
    senderName: '',
    senderContact: '',
    senderPhone: '',
    senderProvince: '',
    senderCity: '',
    senderDistrict: '',
    senderAddress: '',
    senderPickupTime: '',
    senderRemark: '',
    receiverName: '',
    receiverContact: '',
    receiverPhone: '',
    receiverProvince: '',
    receiverCity: '',
    receiverDistrict: '',
    receiverAddress: '',
    receiverDeliveryTime: '',
    receiverRemark: '',
    cargoList: [
      {
        cargoName: '',
        cargoType: '',
        packingType: '',
        quantity: '',
        weight: '',
        volume: '',
        value: '',
        remark: '',
      },
    ],
    totalWeight: '',
    totalVolume: '',
    insuranceType: '',
    insuranceAmount: '',
    specialRequirements: '',
    paymentMethod: '',
    paymentType: '',
    estimatedFreight: '',
    actualFreight: '',
    insuranceFee: '',
    otherFees: '',
    totalAmount: '',
  });
};
</script>

<template>
  <div class="create-order-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2 class="page-title">创建新订单</h2>
      <div class="page-actions">
        <ElButton @click="handleSaveDraft">保存草稿</ElButton>
        <ElButton type="primary" @click="handleSubmit">提交订单</ElButton>
      </div>
    </div>

    <ElForm :model="formData" label-width="120px" class="order-form">
      <!-- 基本信息 -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-icon">📋</span>
          <h3 class="section-title">基本信息</h3>
        </div>

        <div class="form-grid">
          <ElFormItem label="订单类型" required>
            <ElSelect v-model="formData.orderType" placeholder="请选择订单类型">
              <ElOption
                v-for="item in orderTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="运输方式" required>
            <ElSelect v-model="formData.transportType" placeholder="请选择运输方式">
              <ElOption
                v-for="item in transportTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="服务类型" required>
            <ElSelect v-model="formData.serviceType" placeholder="请选择服务类型">
              <ElOption
                v-for="item in serviceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="紧急程度">
            <ElSelect v-model="formData.urgentLevel" placeholder="请选择紧急程度">
              <ElOption
                v-for="item in urgentLevelOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>
        </div>

        <ElFormItem label="订单备注">
          <ElInput
            v-model="formData.orderRemark"
            type="textarea"
            :rows="3"
            placeholder="请输入订单备注信息（选填）"
          />
        </ElFormItem>
      </div>

      <!-- 发货方信息 -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-icon">📦</span>
          <h3 class="section-title">发货方信息</h3>
          <ElButton text type="primary" size="small">从地址簿选择</ElButton>
        </div>

        <div class="form-grid">
          <ElFormItem label="发货方" required>
            <ElInput v-model="formData.senderName" placeholder="请输入发货方名称" />
          </ElFormItem>

          <ElFormItem label="联系人" required>
            <ElInput v-model="formData.senderContact" placeholder="请输入联系人姓名" />
          </ElFormItem>

          <ElFormItem label="联系电话" required>
            <ElInput v-model="formData.senderPhone" placeholder="请输入联系电话" />
          </ElFormItem>

          <ElFormItem label="提货时间">
            <ElDatePicker
              v-model="formData.senderPickupTime"
              type="datetime"
              placeholder="选择提货时间"
              style="width: 100%"
            />
          </ElFormItem>
        </div>

        <div class="form-grid">
          <ElFormItem label="所在省份" required>
            <ElSelect v-model="formData.senderProvince" placeholder="请选择省份">
              <ElOption label="上海市" value="31" />
              <ElOption label="北京市" value="11" />
              <ElOption label="广东省" value="44" />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="所在城市" required>
            <ElSelect v-model="formData.senderCity" placeholder="请选择城市">
              <ElOption label="市辖区" value="3101" />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="所在区县" required>
            <ElSelect v-model="formData.senderDistrict" placeholder="请选择区县">
              <ElOption label="黄浦区" value="310101" />
              <ElOption label="徐汇区" value="310104" />
            </ElSelect>
          </ElFormItem>
        </div>

        <ElFormItem label="详细地址" required>
          <ElInput
            v-model="formData.senderAddress"
            placeholder="请输入详细地址（街道、门牌号等）"
          />
        </ElFormItem>

        <ElFormItem label="发货备注">
          <ElInput
            v-model="formData.senderRemark"
            type="textarea"
            :rows="2"
            placeholder="请输入发货备注信息（选填）"
          />
        </ElFormItem>
      </div>

      <!-- 收货方信息 -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-icon">📮</span>
          <h3 class="section-title">收货方信息</h3>
          <ElButton text type="primary" size="small">从地址簿选择</ElButton>
        </div>

        <div class="form-grid">
          <ElFormItem label="收货方" required>
            <ElInput v-model="formData.receiverName" placeholder="请输入收货方名称" />
          </ElFormItem>

          <ElFormItem label="联系人" required>
            <ElInput v-model="formData.receiverContact" placeholder="请输入联系人姓名" />
          </ElFormItem>

          <ElFormItem label="联系电话" required>
            <ElInput v-model="formData.receiverPhone" placeholder="请输入联系电话" />
          </ElFormItem>

          <ElFormItem label="送达时间">
            <ElDatePicker
              v-model="formData.receiverDeliveryTime"
              type="datetime"
              placeholder="选择送达时间"
              style="width: 100%"
            />
          </ElFormItem>
        </div>

        <div class="form-grid">
          <ElFormItem label="所在省份" required>
            <ElSelect v-model="formData.receiverProvince" placeholder="请选择省份">
              <ElOption label="广东省" value="44" />
              <ElOption label="北京市" value="11" />
              <ElOption label="上海市" value="31" />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="所在城市" required>
            <ElSelect v-model="formData.receiverCity" placeholder="请选择城市">
              <ElOption label="广州市" value="4401" />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="所在区县" required>
            <ElSelect v-model="formData.receiverDistrict" placeholder="请选择区县">
              <ElOption label="天河区" value="440106" />
              <ElOption label="越秀区" value="440104" />
            </ElSelect>
          </ElFormItem>
        </div>

        <ElFormItem label="详细地址" required>
          <ElInput
            v-model="formData.receiverAddress"
            placeholder="请输入详细地址（街道、门牌号等）"
          />
        </ElFormItem>

        <ElFormItem label="收货备注">
          <ElInput
            v-model="formData.receiverRemark"
            type="textarea"
            :rows="2"
            placeholder="请输入收货备注信息（选填）"
          />
        </ElFormItem>
      </div>

      <!-- 货物信息 -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-icon">📦</span>
          <h3 class="section-title">货物信息</h3>
          <ElButton text type="primary" size="small" :icon="Plus" @click="addCargo">
            添加货物
          </ElButton>
        </div>

        <div v-for="(cargo, index) in formData.cargoList" :key="index" class="cargo-item">
          <div class="cargo-header">
            <span class="cargo-number">货物 {{ index + 1 }}</span>
            <ElButton
              v-if="formData.cargoList.length > 1"
              text
              type="danger"
              size="small"
              :icon="Delete"
              @click="deleteCargo(index)"
            >
              删除
            </ElButton>
          </div>

          <div class="form-grid">
            <ElFormItem label="货物名称" required>
              <ElInput v-model="cargo.cargoName" placeholder="请输入货物名称" />
            </ElFormItem>

            <ElFormItem label="货物类型" required>
              <ElSelect v-model="cargo.cargoType" placeholder="请选择货物类型">
                <ElOption
                  v-for="item in cargoTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>

            <ElFormItem label="包装方式">
              <ElSelect v-model="cargo.packingType" placeholder="请选择包装方式">
                <ElOption
                  v-for="item in packingTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </ElSelect>
            </ElFormItem>

            <ElFormItem label="数量">
              <ElInput v-model="cargo.quantity" placeholder="请输入数量">
                <template #append>件</template>
              </ElInput>
            </ElFormItem>

            <ElFormItem label="重量(kg)" required>
              <ElInput v-model="cargo.weight" placeholder="请输入重量">
                <template #append>kg</template>
              </ElInput>
            </ElFormItem>

            <ElFormItem label="体积(m³)">
              <ElInput v-model="cargo.volume" placeholder="请输入体积">
                <template #append>m³</template>
              </ElInput>
            </ElFormItem>

            <ElFormItem label="货物价值">
              <ElInput v-model="cargo.value" placeholder="请输入货物价值">
                <template #prepend>¥</template>
              </ElInput>
            </ElFormItem>
          </div>

          <ElFormItem label="货物备注">
            <ElInput
              v-model="cargo.remark"
              type="textarea"
              :rows="2"
              placeholder="请输入货物备注信息（选填）"
            />
          </ElFormItem>
        </div>

        <div class="form-grid">
          <ElFormItem label="总重量">
            <ElInput v-model="formData.totalWeight" placeholder="自动计算" disabled>
              <template #append>kg</template>
            </ElInput>
          </ElFormItem>

          <ElFormItem label="总体积">
            <ElInput v-model="formData.totalVolume" placeholder="自动计算" disabled>
              <template #append>m³</template>
            </ElInput>
          </ElFormItem>

          <ElFormItem label="保险类型">
            <ElSelect v-model="formData.insuranceType" placeholder="请选择保险类型">
              <ElOption
                v-for="item in insuranceTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="保险金额">
            <ElInput v-model="formData.insuranceAmount" placeholder="请输入保险金额">
              <template #prepend>¥</template>
            </ElInput>
          </ElFormItem>
        </div>

        <ElFormItem label="特殊要求">
          <ElInput
            v-model="formData.specialRequirements"
            type="textarea"
            :rows="2"
            placeholder="请输入特殊要求（如温度控制、装卸要求等）"
          />
        </ElFormItem>
      </div>

      <!-- 费用信息 -->
      <div class="form-section">
        <div class="section-header">
          <span class="section-icon">💰</span>
          <h3 class="section-title">费用信息</h3>
        </div>

        <div class="form-grid">
          <ElFormItem label="付款方式" required>
            <ElSelect v-model="formData.paymentMethod" placeholder="请选择付款方式">
              <ElOption
                v-for="item in paymentMethodOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="付款类型" required>
            <ElSelect v-model="formData.paymentType" placeholder="请选择付款类型">
              <ElOption
                v-for="item in paymentTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="预估运费">
            <ElInput v-model="formData.estimatedFreight" placeholder="系统自动计算">
              <template #prepend>¥</template>
            </ElInput>
          </ElFormItem>

          <ElFormItem label="实际运费" required>
            <ElInput v-model="formData.actualFreight" placeholder="请输入实际运费">
              <template #prepend>¥</template>
            </ElInput>
          </ElFormItem>

          <ElFormItem label="保险费">
            <ElInput v-model="formData.insuranceFee" placeholder="请输入保险费">
              <template #prepend>¥</template>
            </ElInput>
          </ElFormItem>

          <ElFormItem label="其他费用">
            <ElInput v-model="formData.otherFees" placeholder="请输入其他费用">
              <template #prepend>¥</template>
            </ElInput>
          </ElFormItem>

          <ElFormItem label="总金额">
            <ElInput v-model="formData.totalAmount" placeholder="自动计算" disabled>
              <template #prepend>¥</template>
            </ElInput>
          </ElFormItem>
        </div>
      </div>

      <!-- 底部操作按钮 -->
      <div class="form-footer">
        <ElButton size="large" @click="handleReset">重置</ElButton>
        <ElButton size="large" @click="handleSaveDraft">保存草稿</ElButton>
        <ElButton type="primary" size="large" @click="handleSubmit">提交订单</ElButton>
      </div>
    </ElForm>
  </div>
</template>

<style scoped>
.create-order-container {
  padding: 0;
  background: #f8f9fa;
}

/* 页面头部 */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.page-title {
  font-size: 18px;
  font-weight: 600;
  color: #262626;
  margin: 0;
}

.page-actions {
  display: flex;
  gap: 12px;
}

/* 表单 */
.order-form {
  background: white;
  border-radius: 8px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

/* 表单区块 */
.form-section {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #f0f0f0;
}

.form-section:last-of-type {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.section-icon {
  font-size: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin: 0;
  flex: 1;
}

/* 表单网格 */
.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px 24px;
}

.form-grid .el-form-item {
  margin-bottom: 0;
}

/* 货物项 */
.cargo-item {
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #f0f0f0;
}

.cargo-item:last-child {
  margin-bottom: 0;
}

.cargo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e8e8e8;
}

.cargo-number {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}

/* 表单底部 */
.form-footer {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
}

/* 表单项样式调整 */
:deep(.el-form-item__label) {
  font-size: 13px;
  color: #595959;
  font-weight: 500;
}

:deep(.el-input),
:deep(.el-select),
:deep(.el-textarea) {
  width: 100%;
}

:deep(.el-input__inner) {
  font-size: 13px;
}

:deep(.el-textarea__inner) {
  font-size: 13px;
}

/* 必填标记 */
:deep(.el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before) {
  color: #ff4d4f;
}
</style>
