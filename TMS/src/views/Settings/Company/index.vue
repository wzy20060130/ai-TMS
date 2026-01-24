<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus, Upload } from '@element-plus/icons-vue'

// 当前激活的标签页
const activeTab = ref('basic')

// 基本信息表单
const basicForm = reactive({
  companyName: '长沙顺丰速运有限公司',
  companyShortName: '长沙顺丰',
  companyAddress: '上海市浦东新区张江高科技园区1号楼2号',
  creditCode: '91430100MA4L3XXX',
  legalPerson: '',
  registeredCapital: '5,000万',
  establishDate: '',
  businessScope: '物流运输、仓储服务、货运代理等业务',
  contactPerson: '',
  contactPhone: '',
  contactEmail: ''
})

// 收费配置表单
const feeForm = reactive({
  openAccount: '中国工商银行【上海分行】',
  accountNumber: '6222021002025346789',
  accountName: '长沙顺丰速运有限公司',
  bankCode: '102290003456',
  taxRate: '',
  isDefaultAccount: true
})

// Logo设置
const logoForm = reactive({
  mainLogo: '',
  loginLogo: '',
  favicon: ''
})

// 银行账户列表
const bankAccounts = ref([
  {
    id: 1,
    openAccount: '中国工商银行【上海分行】',
    accountNumber: '6222021002025346789',
    accountName: '长沙顺丰速运有限公司',
    bankCode: '102290003456',
    isDefault: true
  }
])

// 保存基本信息
const saveBasicInfo = () => {
  console.log('保存基本信息', basicForm)
  ElMessage.success('保存成功')
}

// 保存收费配置
const saveFeeConfig = () => {
  console.log('保存收费配置', feeForm)
  ElMessage.success('保存成功')
}

// 添加银行账户
const addBankAccount = () => {
  ElMessage.info('添加银行账户')
}

// 删除银行账户
const deleteBankAccount = (id: number) => {
  ElMessage.warning('确认删除该银行账户？')
}

// 上传Logo
const handleLogoUpload = (type: string) => {
  console.log('上传Logo', type)
  ElMessage.success('上传成功')
}

// 删除Logo
const handleLogoDelete = (type: string) => {
  console.log('删除Logo', type)
  ElMessage.success('删除成功')
}
</script>

<template>
  <div class="company-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2 class="page-title">企业设置</h2>
      <p class="page-desc">配置企业基本信息、收费设置、我的银行信息和标识等信息</p>
    </div>

    <!-- 标签页 -->
    <el-tabs v-model="activeTab" class="company-tabs">
      <!-- 基本信息 -->
      <el-tab-pane label="基本信息" name="basic">
        <div class="tab-content">
          <div class="section-card">
            <h3 class="section-title">网站基本信息</h3>
            
            <el-form :model="basicForm" label-width="120px" class="company-form">
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="网站名称">
                    <el-input v-model="basicForm.companyName" placeholder="长沙顺丰速运有限公司" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="网站简称">
                    <el-input v-model="basicForm.companyShortName" placeholder="长沙顺丰" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="企业地址">
                <el-input v-model="basicForm.companyAddress" placeholder="上海市浦东新区张江高科技园区1号楼2号" />
              </el-form-item>

              <el-form-item label="网站简介">
                <el-input
                  v-model="basicForm.businessScope"
                  type="textarea"
                  :rows="4"
                  placeholder="长沙顺丰速运有限公司成立于2000年，是一家专业从事物流运输、仓储服务、货运代理等业务的现代化物流企业。公司拥有完善的物流网络和专业的服务团队，致力于为客户提供高效、安全、便捷的物流解决方案。"
                />
              </el-form-item>
            </el-form>
          </div>

          <div class="section-card">
            <h3 class="section-title">收费配置信息</h3>
            
            <el-form :model="feeForm" label-width="120px" class="company-form">
              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="开户银行">
                    <el-input v-model="feeForm.openAccount" placeholder="中国工商银行【上海分行】" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="银行账号">
                    <el-input v-model="feeForm.accountNumber" placeholder="6222021002025346789" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-row :gutter="40">
                <el-col :span="12">
                  <el-form-item label="开户名">
                    <el-input v-model="feeForm.accountName" placeholder="长沙顺丰速运有限公司" />
                  </el-form-item>
                </el-col>
                <el-col :span="12">
                  <el-form-item label="银行代码">
                    <el-input v-model="feeForm.bankCode" placeholder="102290003456" />
                  </el-form-item>
                </el-col>
              </el-row>

              <el-form-item label="备注信息">
                <el-input
                  type="textarea"
                  :rows="3"
                  placeholder="此账户为对外收款账户，用于收取客户的运费等费用。请仔细核对账户信息，确保准确无误。"
                />
              </el-form-item>

              <el-form-item>
                <el-checkbox v-model="feeForm.isDefaultAccount">设为默认收款账户</el-checkbox>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="addBankAccount">
                  <el-icon><Plus /></el-icon>
                  添加其他收款账户
                </el-button>
              </el-form-item>
            </el-form>
          </div>

          <div class="section-card">
            <h3 class="section-title">Logo设置</h3>
            <p class="section-desc">设置系统的主Logo、登录Logo和网站图标</p>

            <div class="logo-settings">
              <!-- 主Logo -->
              <div class="logo-item">
                <div class="logo-label">
                  <span class="label-text">主Logo</span>
                  <span class="label-desc">显示在系统顶部，建议尺寸：180×60px，支持PNG、JPG格式</span>
                </div>
                <div class="logo-upload">
                  <div class="logo-preview">
                    <div class="logo-placeholder">
                      <el-icon class="logo-icon"><Picture /></el-icon>
                      <span class="logo-text">长沙顺丰速运有限公司</span>
                    </div>
                  </div>
                  <div class="logo-actions">
                    <el-button size="small" @click="handleLogoUpload('main')">
                      <el-icon><Upload /></el-icon>
                      上传Logo
                    </el-button>
                    <el-button size="small" @click="handleLogoDelete('main')">删除</el-button>
                  </div>
                </div>
              </div>

              <!-- 登录Logo -->
              <div class="logo-item">
                <div class="logo-label">
                  <span class="label-text">登录Logo</span>
                  <span class="label-desc">显示在登录页面，建议尺寸：200×80px，支持PNG、JPG格式</span>
                </div>
                <div class="logo-upload">
                  <div class="logo-preview">
                    <div class="logo-placeholder">
                      <div class="logo-demo">
                        <el-icon class="demo-icon" :size="40"><Briefcase /></el-icon>
                        <span class="demo-text">长沙顺丰速运有限公司</span>
                      </div>
                    </div>
                  </div>
                  <div class="logo-actions">
                    <el-button size="small" @click="handleLogoUpload('login')">
                      <el-icon><Upload /></el-icon>
                      上传Logo
                    </el-button>
                    <el-button size="small" @click="handleLogoDelete('login')">删除</el-button>
                  </div>
                </div>
              </div>

              <!-- 网站图标 -->
              <div class="logo-item">
                <div class="logo-label">
                  <span class="label-text">网站Logo</span>
                  <span class="label-desc">显示在浏览器标签页，建议尺寸：32×32px，支持ICO、PNG格式</span>
                </div>
                <div class="logo-upload">
                  <div class="logo-preview favicon-preview">
                    <div class="favicon-placeholder">
                      <el-icon class="favicon-icon" :size="32"><Grid /></el-icon>
                      <span class="favicon-text">企业名称 或 简称 文字</span>
                    </div>
                  </div>
                  <div class="logo-actions">
                    <el-button size="small" @click="handleLogoUpload('favicon')">
                      <el-icon><Upload /></el-icon>
                      上传Logo
                    </el-button>
                    <el-button size="small" @click="handleLogoDelete('favicon')">删除</el-button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 保存按钮 -->
          <div class="form-actions">
            <el-button type="primary" size="large" @click="saveBasicInfo">保存设置</el-button>
          </div>
        </div>
      </el-tab-pane>

      <!-- 其他标签页 -->
      <el-tab-pane label="票据" name="invoice">
        <div class="tab-content">
          <el-empty description="票据设置功能开发中..." />
        </div>
      </el-tab-pane>

      <el-tab-pane label="发票" name="tax">
        <div class="tab-content">
          <el-empty description="发票设置功能开发中..." />
        </div>
      </el-tab-pane>

      <el-tab-pane label="打印" name="print">
        <div class="tab-content">
          <el-empty description="打印设置功能开发中..." />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped>
.company-container {
  padding: 0;
  background: #f8f9fa;
}

/* 页面标题 */
.page-header {
  background: white;
  padding: 24px;
  margin-bottom: 16px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 8px 0;
}

.page-desc {
  font-size: 13px;
  color: #8c8c8c;
  margin: 0;
}

/* 标签页 */
.company-tabs {
  background: white;
  padding: 0 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.company-tabs :deep(.el-tabs__header) {
  margin-bottom: 0;
}

.company-tabs :deep(.el-tabs__nav-wrap::after) {
  height: 1px;
}

.tab-content {
  padding: 24px 0;
}

/* 区块卡片 */
.section-card {
  margin-bottom: 32px;
  padding-bottom: 32px;
  border-bottom: 1px solid #f0f0f0;
}

.section-card:last-child {
  border-bottom: none;
  margin-bottom: 0;
  padding-bottom: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
}

.section-desc {
  font-size: 13px;
  color: #8c8c8c;
  margin: 0 0 20px 0;
}

/* 表单 */
.company-form {
  margin-top: 20px;
}

.company-form :deep(.el-form-item__label) {
  font-size: 13px;
  color: #595959;
  font-weight: 500;
}

.company-form :deep(.el-input__inner),
.company-form :deep(.el-textarea__inner) {
  font-size: 13px;
}

/* Logo设置 */
.logo-settings {
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 20px;
}

.logo-item {
  display: flex;
  gap: 24px;
  padding: 20px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}

.logo-label {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.label-text {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}

.label-desc {
  font-size: 12px;
  color: #8c8c8c;
  line-height: 1.6;
}

.logo-upload {
  flex: 1;
  display: flex;
  gap: 16px;
  align-items: center;
}

.logo-preview {
  width: 240px;
  height: 100px;
  background: white;
  border: 1px dashed #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.favicon-preview {
  width: 120px;
  height: 80px;
}

.logo-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
}

.logo-icon {
  font-size: 32px;
  color: #d9d9d9;
}

.logo-text {
  font-size: 12px;
  color: #8c8c8c;
  text-align: center;
}

.logo-demo {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.demo-icon {
  color: #1890ff;
}

.demo-text {
  font-size: 13px;
  color: #262626;
  font-weight: 500;
}

.favicon-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.favicon-icon {
  color: #1890ff;
}

.favicon-text {
  font-size: 11px;
  color: #8c8c8c;
  text-align: center;
}

.logo-actions {
  display: flex;
  gap: 8px;
}

/* 表单操作 */
.form-actions {
  margin-top: 32px;
  padding-top: 24px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: center;
}

/* 响应式 */
@media (max-width: 768px) {
  .logo-item {
    flex-direction: column;
  }

  .logo-label {
    flex: none;
  }

  .logo-upload {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>


