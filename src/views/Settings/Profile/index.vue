<script setup lang="ts">
import { reactive } from 'vue';
import { ElMessage } from 'element-plus';
import { Upload, Edit } from '@element-plus/icons-vue';

// 个人资料
const profile = reactive({
  avatar: '',
  name: '张三',
  username: 'zhangsan01',
  phone: '13800138000',
  email: 'zhangsan@example.com',
  department: '技术部',
  position: '前端工程师',
  employeeId: 'EMP001',
  joinDate: '2021-08-18',
  gender: '男',
  birthday: '',
  idCard: '110101199001011234',
  address: '北京市朝阳区朝外大街19号楼2单元1001室',
  emergencyContact: '李四',
  emergencyPhone: '13900139000',
  bio: '热爱编程，喜欢学习新技术，擅长前端开发，熟悉Vue、React等主流框架。',
});

// 安全设置
const security = reactive({
  loginPassword: '********',
  paymentPassword: '******',
  emailBind: 'zhangsan@example.com',
  phoneBind: '138****0000',
  twoFactorAuth: false,
});

// 通知设置
const notifications = reactive({
  orderNotify: true,
  systemNotify: true,
  taskNotify: true,
  emailNotify: true,
  smsNotify: false,
});

// 保存个人资料
const saveProfile = () => {
  // TODO: 实现保存个人资料逻辑
  ElMessage.success('保存成功');
};

// 上传头像
const handleAvatarUpload = () => {
  ElMessage.success('上传头像成功');
};

// 修改密码
const handleChangePassword = (type: string) => {
  ElMessage.info(`修改${type}`);
};

// 解绑
const handleUnbind = (type: string) => {
  ElMessage.warning(`确认解绑${type}？`);
};

// 保存通知设置
const saveNotifications = () => {
  // TODO: 实现保存通知设置逻辑
  ElMessage.success('保存成功');
};
</script>

<template>
  <div class="profile-container">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2 class="page-title">个人设置</h2>
      <p class="page-desc">你的账号个人信息，安全设置和通知管理</p>
    </div>

    <!-- 个人资料 -->
    <div class="section-card">
      <h3 class="section-title">个人资料</h3>

      <div class="profile-content">
        <!-- 左侧头像 -->
        <div class="avatar-section">
          <div class="avatar-wrapper">
            <img v-if="profile.avatar" :src="profile.avatar" class="avatar-img" />
            <div v-else class="avatar-placeholder">
              <span class="avatar-text">{{ profile.name.charAt(0) }}</span>
            </div>
          </div>
          <div class="avatar-info">
            <div class="avatar-name">{{ profile.name }}</div>
            <div class="avatar-username">@{{ profile.username }}</div>
          </div>
          <ElButton size="small" :icon="Upload" @click="handleAvatarUpload"> 上传头像 </ElButton>
        </div>

        <!-- 右侧信息 -->
        <div class="info-section">
          <ElForm :model="profile" label-width="100px" class="profile-form">
            <ElRow :gutter="40">
              <ElCol :span="12">
                <ElFormItem label="姓名">
                  <ElInput v-model="profile.name" placeholder="请输入姓名" />
                </ElFormItem>
              </ElCol>
              <ElCol :span="12">
                <ElFormItem label="用户名">
                  <ElInput v-model="profile.username" placeholder="zhangsan01" />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow :gutter="40">
              <ElCol :span="12">
                <ElFormItem label="手机号码">
                  <ElInput v-model="profile.phone" placeholder="请输入手机号" />
                </ElFormItem>
              </ElCol>
              <ElCol :span="12">
                <ElFormItem label="所属部门">
                  <ElInput v-model="profile.department" placeholder="技术部" />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow :gutter="40">
              <ElCol :span="12">
                <ElFormItem label="联系邮箱">
                  <ElInput v-model="profile.email" placeholder="请输入邮箱" />
                </ElFormItem>
              </ElCol>
              <ElCol :span="12">
                <ElFormItem label="职位">
                  <ElInput v-model="profile.position" placeholder="前端工程师" />
                </ElFormItem>
              </ElCol>
            </ElRow>

            <ElRow :gutter="40">
              <ElCol :span="12">
                <ElFormItem label="入职日期">
                  <ElInput v-model="profile.joinDate" placeholder="2021-08-18" disabled />
                </ElFormItem>
              </ElCol>
              <ElCol :span="12">
                <ElFormItem label="性别">
                  <ElSelect v-model="profile.gender" placeholder="请选择">
                    <ElOption label="男" value="男" />
                    <ElOption label="女" value="女" />
                  </ElSelect>
                </ElFormItem>
              </ElCol>
            </ElRow>
          </ElForm>
        </div>
      </div>
    </div>

    <!-- 详细信息 -->
    <div class="section-card">
      <h3 class="section-title">详细信息</h3>

      <ElForm :model="profile" label-width="120px" class="detail-form">
        <ElFormItem label="身份证号码">
          <ElInput v-model="profile.idCard" placeholder="请输入身份证号" style="width: 400px" />
        </ElFormItem>

        <ElFormItem label="手机号">
          <ElInput v-model="profile.phone" placeholder="13800138000" style="width: 400px" />
        </ElFormItem>

        <ElFormItem label="联系地址">
          <ElInput v-model="profile.address" placeholder="请输入联系地址" style="width: 600px" />
        </ElFormItem>

        <ElFormItem label="紧急联系人">
          <ElInput
            v-model="profile.emergencyContact"
            placeholder="请输入紧急联系人"
            style="width: 400px"
          />
        </ElFormItem>

        <ElFormItem label="个人简介">
          <ElInput
            v-model="profile.bio"
            type="textarea"
            :rows="4"
            placeholder="热爱编程，喜欢学习新技术，擅长前端开发，熟悉Vue、React等主流框架。"
            style="width: 600px"
          />
        </ElFormItem>
      </ElForm>

      <div class="form-actions">
        <ElButton type="primary" size="large" @click="saveProfile">保存设置</ElButton>
      </div>
    </div>

    <!-- 安全设置 -->
    <div class="section-card">
      <h3 class="section-title">安全设置</h3>

      <div class="security-list">
        <div class="security-item">
          <div class="security-info">
            <div class="security-label">登录密码</div>
            <div class="security-desc">上次修改时间：2023-03-15</div>
          </div>
          <div class="security-actions">
            <ElButton link type="primary" @click="handleChangePassword('登录密码')">
              <ElIcon><Edit /></ElIcon>
              修改密码
            </ElButton>
          </div>
        </div>

        <div class="security-item">
          <div class="security-info">
            <div class="security-label">绑定手机</div>
            <div class="security-desc">已绑定：138****0000</div>
          </div>
          <div class="security-actions">
            <ElButton link type="primary" @click="handleUnbind('手机')"> 更换绑定 </ElButton>
          </div>
        </div>

        <div class="security-item">
          <div class="security-info">
            <div class="security-label">绑定邮箱</div>
            <div class="security-desc">已绑定：zhangsan@example.com</div>
          </div>
          <div class="security-actions">
            <ElButton link type="primary" @click="handleUnbind('邮箱')"> 更换绑定 </ElButton>
          </div>
        </div>

        <div class="security-item">
          <div class="security-info">
            <div class="security-label">登录记录</div>
            <div class="security-desc">查看您，最近登录的账号记录</div>
          </div>
          <div class="security-actions">
            <ElSwitch v-model="security.twoFactorAuth" />
          </div>
        </div>
      </div>
    </div>

    <!-- 通知设置 -->
    <div class="section-card">
      <h3 class="section-title">通知设置</h3>

      <div class="notification-list">
        <div class="notification-group">
          <div class="group-title">订单通知</div>

          <div class="notification-item">
            <div class="notification-info">
              <div class="notification-label">接到订单提醒</div>
            </div>
            <div class="notification-actions">
              <ElCheckbox v-model="notifications.orderNotify">平台内</ElCheckbox>
              <ElCheckbox>短信</ElCheckbox>
              <ElCheckbox>邮件</ElCheckbox>
            </div>
          </div>

          <div class="notification-item">
            <div class="notification-info">
              <div class="notification-label">订单状态变更提醒</div>
            </div>
            <div class="notification-actions">
              <ElCheckbox v-model="notifications.systemNotify">平台内</ElCheckbox>
              <ElCheckbox>短信</ElCheckbox>
              <ElCheckbox>邮件</ElCheckbox>
            </div>
          </div>

          <div class="notification-item">
            <div class="notification-info">
              <div class="notification-label">订单超时提醒</div>
            </div>
            <div class="notification-actions">
              <ElCheckbox v-model="notifications.taskNotify">平台内</ElCheckbox>
              <ElCheckbox>短信</ElCheckbox>
              <ElCheckbox>邮件</ElCheckbox>
            </div>
          </div>
        </div>

        <div class="notification-group">
          <div class="group-title">系统消息</div>

          <div class="notification-item">
            <div class="notification-info">
              <div class="notification-label">系统公告</div>
            </div>
            <div class="notification-actions">
              <ElCheckbox v-model="notifications.emailNotify">平台内</ElCheckbox>
              <ElCheckbox>邮件</ElCheckbox>
            </div>
          </div>

          <div class="notification-item">
            <div class="notification-info">
              <div class="notification-label">任务分配</div>
            </div>
            <div class="notification-actions">
              <ElCheckbox v-model="notifications.smsNotify">平台内</ElCheckbox>
              <ElCheckbox>邮件</ElCheckbox>
            </div>
          </div>
        </div>
      </div>

      <div class="form-actions">
        <ElButton type="primary" size="large" @click="saveNotifications">保存设置</ElButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-container {
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

/* 区块卡片 */
.section-card {
  background: white;
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 24px 0;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

/* 个人资料 */
.profile-content {
  display: flex;
  gap: 40px;
}

.avatar-section {
  flex: 0 0 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.avatar-wrapper {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid #f0f0f0;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.avatar-text {
  font-size: 48px;
  font-weight: 600;
  color: white;
}

.avatar-info {
  text-align: center;
}

.avatar-name {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.avatar-username {
  font-size: 13px;
  color: #8c8c8c;
}

.info-section {
  flex: 1;
}

.profile-form :deep(.el-form-item__label) {
  font-size: 13px;
  color: #595959;
  font-weight: 500;
}

.profile-form :deep(.el-input__inner),
.profile-form :deep(.el-textarea__inner) {
  font-size: 13px;
}

/* 详细信息 */
.detail-form :deep(.el-form-item__label) {
  font-size: 13px;
  color: #595959;
  font-weight: 500;
}

.detail-form :deep(.el-input__inner),
.detail-form :deep(.el-textarea__inner) {
  font-size: 13px;
}

/* 安全设置 */
.security-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.security-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}

.security-info {
  flex: 1;
}

.security-label {
  font-size: 14px;
  font-weight: 500;
  color: #262626;
  margin-bottom: 4px;
}

.security-desc {
  font-size: 12px;
  color: #8c8c8c;
}

.security-actions {
  display: flex;
  gap: 8px;
  align-items: center;
}

/* 通知设置 */
.notification-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.notification-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.group-title {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 8px;
}

.notification-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: #fafafa;
  border-radius: 8px;
  border: 1px solid #f0f0f0;
}

.notification-info {
  flex: 1;
}

.notification-label {
  font-size: 13px;
  color: #262626;
}

.notification-actions {
  display: flex;
  gap: 24px;
  align-items: center;
}

.notification-actions :deep(.el-checkbox) {
  margin-right: 0;
}

.notification-actions :deep(.el-checkbox__label) {
  font-size: 13px;
  color: #595959;
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
  .profile-content {
    flex-direction: column;
  }

  .avatar-section {
    flex: none;
  }
}
</style>
