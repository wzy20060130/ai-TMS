<script setup lang="ts">
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';

// 当前激活的标签
const activeTab = ref('all');

// 消息统计
const stats = ref([
  {
    label: '全部消息',
    value: 56,
    desc: '共有56条消息',
    icon: '🔔',
    color: '#E3F2FD',
    type: 'all',
  },
  {
    label: '未读消息',
    value: 8,
    desc: '还有8条待阅读',
    icon: '📬',
    color: '#FFEBEE',
    type: 'unread',
    badge: true,
  },
  {
    label: '系统通知',
    value: 24,
    desc: '包含：维护通知',
    icon: '⚙️',
    color: '#F3E5F5',
    type: 'system',
  },
  {
    label: '互动消息',
    value: 32,
    desc: '包含：点赞通知',
    icon: '💬',
    color: '#E8F5E9',
    type: 'interaction',
  },
]);

// 消息类型标签
const messageTabs = [
  { label: '全部通知', value: 'all' },
  { label: '系统通知', value: 'system' },
  { label: '订单通知', value: 'order' },
  { label: '任务通知', value: 'task', badge: 3 },
];

// 消息筛选标签
const filterTabs = [
  { label: '全部类型', value: 'all' },
  { label: '数字人通知', value: 'digital' },
  { label: '公文通知', value: 'document' },
  { label: '评论消息', value: 'comment' },
  { label: '系统公告', value: 'announcement' },
];

// 当前筛选
const activeFilter = ref('all');

// 消息列表
const messageList = ref([
  {
    id: 1,
    type: 'order',
    icon: '📋',
    iconColor: '#1890ff',
    title: '新订单提醒',
    content:
      '您有一个新的订单号为：ORD-2023061501/2，发货地：上海市浦东新区，目的地：北京市朝阳区，请及时处理。',
    time: '10分钟前',
    isRead: false,
    actions: ['查看详情'],
  },
  {
    id: 2,
    type: 'system',
    icon: '🔔',
    iconColor: '#faad14',
    title: '运输状态变更',
    content:
      '运输订单号：TASK-2023061402/3已到达目的地，当前位置：山东省济南市，预计到达时间：明日上午10点。',
    time: '30分钟前',
    isRead: false,
    actions: ['查看详情'],
  },
  {
    id: 3,
    type: 'task',
    icon: '✅',
    iconColor: '#52c41a',
    title: '运输已送达通知',
    content: '运输订单号：TASK-2023061402/3已完成，货物已送达目的地，签收人：王经理。',
    time: '2小时前',
    isRead: false,
    actions: ['查看详情'],
  },
  {
    id: 4,
    type: 'system',
    icon: '📢',
    iconColor: '#1890ff',
    title: '系统公告',
    content: '系统将于2023年6月21日00:00-02:00进行维护，期间可能会影响正常使用，敬请谅解。',
    time: '昨天 10:30',
    isRead: true,
    actions: ['查看详情'],
  },
  {
    id: 5,
    type: 'order',
    icon: '⚠️',
    iconColor: '#ff4d4f',
    title: '运输超时提醒',
    content: '您有一个订单号为：PLAN-2023061300/2超过预期时间，预计送达时间：2023-06-14 08:00。',
    time: '昨天 16:45',
    isRead: true,
    actions: ['查看详情'],
  },
  {
    id: 6,
    type: 'task',
    icon: '✅',
    iconColor: '#52c41a',
    title: '运输已送达通知',
    content: '运输订单号：TASK-2023061402/3已完成，货物已送达目的地，签收人：王经理。',
    time: '2023-01-17',
    isRead: true,
    actions: ['查看详情'],
  },
]);

// 过滤后的消息列表
const filteredMessages = computed(() => {
  if (activeTab.value === 'all') {
    return messageList.value;
  }
  return messageList.value.filter(msg => msg.type === activeTab.value);
});

// 未读消息数量
const _unreadCount = computed(() => {
  return messageList.value.filter(msg => !msg.isRead).length;
});

// 切换标签
const handleTabChange = (tab: string) => {
  activeTab.value = tab;
};

// 切换筛选
const handleFilterChange = (filter: string) => {
  activeFilter.value = filter;
};

// 标记已读
const markAsRead = (id: number) => {
  const message = messageList.value.find(msg => msg.id === id);
  if (message) {
    message.isRead = true;
    ElMessage.success('已标记为已读');
  }
};

// 全部标记已读
const markAllAsRead = () => {
  messageList.value.forEach(msg => {
    msg.isRead = true;
  });
  ElMessage.success('已全部标记为已读');
};

// 查看详情
interface Message {
  id: number;
  type: string;
  icon: string;
  iconColor: string;
  title: string;
  content: string;
  time: string;
  isRead: boolean;
  actions: string[];
}

const handleView = (message: Message) => {
  // TODO: 实现查看详情逻辑
  markAsRead(message.id);
};

// 加载更多
const loadMore = () => {
  ElMessage.info('加载更多消息...');
};
</script>

<template>
  <div class="notification-container">
    <!-- 统计卡片 -->
    <div class="stats-grid">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-card"
        :style="{ backgroundColor: stat.color }"
        :class="{ active: activeTab === stat.type }"
        @click="handleTabChange(stat.type)"
      >
        <div class="stat-icon">{{ stat.icon }}</div>
        <div class="stat-content">
          <div class="stat-label">
            {{ stat.label }}
            <ElBadge v-if="stat.badge && stat.value > 0" :value="stat.value" class="stat-badge" />
          </div>
          <div class="stat-value">{{ stat.value }}</div>
          <div class="stat-desc">{{ stat.desc }}</div>
        </div>
      </div>
    </div>

    <!-- 消息内容区 -->
    <div class="message-card">
      <!-- 标签栏 -->
      <div class="message-tabs">
        <div class="tabs-left">
          <div
            v-for="tab in messageTabs"
            :key="tab.value"
            class="tab-item"
            :class="{ active: activeTab === tab.value }"
            @click="handleTabChange(tab.value)"
          >
            {{ tab.label }}
            <ElBadge v-if="tab.badge" :value="tab.badge" class="tab-badge" />
          </div>
        </div>
        <div class="tabs-right">
          <ElButton text @click="markAllAsRead">全部标记已读</ElButton>
          <ElButton text>打印</ElButton>
        </div>
      </div>

      <!-- 筛选栏 -->
      <div class="filter-tabs">
        <div
          v-for="filter in filterTabs"
          :key="filter.value"
          class="filter-item"
          :class="{ active: activeFilter === filter.value }"
          @click="handleFilterChange(filter.value)"
        >
          {{ filter.label }}
        </div>
      </div>

      <!-- 消息列表 -->
      <div class="message-list">
        <div
          v-for="message in filteredMessages"
          :key="message.id"
          class="message-item"
          :class="{ unread: !message.isRead }"
        >
          <div
            class="message-icon"
            :style="{ backgroundColor: message.iconColor + '20', color: message.iconColor }"
          >
            {{ message.icon }}
          </div>
          <div class="message-content">
            <div class="message-header">
              <div class="message-title">{{ message.title }}</div>
              <div class="message-time">{{ message.time }}</div>
            </div>
            <div class="message-text">{{ message.content }}</div>
            <div class="message-actions">
              <ElButton link type="primary" size="small" @click="handleView(message)">
                查看详情
              </ElButton>
            </div>
          </div>
          <div v-if="!message.isRead" class="message-badge">
            <ElBadge is-dot />
          </div>
        </div>
      </div>

      <!-- 加载更多 -->
      <div class="load-more">
        <ElButton text type="primary" @click="loadMore">加载更多</ElButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.notification-container {
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
  border: 2px solid transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
}

.stat-card.active {
  border-color: #1890ff;
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
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-badge {
  margin-left: 4px;
}

.stat-value {
  font-size: 28px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 4px;
}

.stat-desc {
  font-size: 12px;
  color: #8c8c8c;
}

/* 消息卡片 */
.message-card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

/* 标签栏 */
.message-tabs {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
}

.tabs-left {
  display: flex;
  gap: 32px;
}

.tab-item {
  font-size: 14px;
  color: #595959;
  cursor: pointer;
  padding: 8px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.tab-item:hover {
  color: #1890ff;
}

.tab-item.active {
  color: #1890ff;
  font-weight: 600;
  border-bottom-color: #1890ff;
}

.tab-badge {
  margin-left: 4px;
}

.tabs-right {
  display: flex;
  gap: 8px;
}

/* 筛选栏 */
.filter-tabs {
  display: flex;
  gap: 16px;
  padding: 16px 24px;
  border-bottom: 1px solid #f0f0f0;
  background: #fafafa;
}

.filter-item {
  font-size: 13px;
  color: #595959;
  padding: 6px 16px;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s;
  background: white;
  border: 1px solid #e0e0e0;
}

.filter-item:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.filter-item.active {
  color: white;
  background: #1890ff;
  border-color: #1890ff;
}

/* 消息列表 */
.message-list {
  padding: 0;
}

.message-item {
  display: flex;
  gap: 16px;
  padding: 20px 24px;
  border-bottom: 1px solid #f0f0f0;
  transition: all 0.3s;
  position: relative;
}

.message-item:hover {
  background: #fafafa;
}

.message-item.unread {
  background: #f6f9ff;
}

.message-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
}

.message-content {
  flex: 1;
  min-width: 0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.message-title {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}

.message-time {
  font-size: 12px;
  color: #8c8c8c;
  flex-shrink: 0;
  margin-left: 16px;
}

.message-text {
  font-size: 13px;
  color: #595959;
  line-height: 1.6;
  margin-bottom: 8px;
}

.message-actions {
  display: flex;
  gap: 8px;
}

.message-badge {
  position: absolute;
  right: 24px;
  top: 24px;
}

/* 加载更多 */
.load-more {
  padding: 24px;
  text-align: center;
  border-top: 1px solid #f0f0f0;
}

/* 响应式 */
@media (max-width: 1200px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .stats-grid {
    grid-template-columns: 1fr;
  }

  .message-tabs {
    flex-direction: column;
    gap: 16px;
    align-items: flex-start;
  }

  .tabs-left {
    flex-wrap: wrap;
  }

  .filter-tabs {
    flex-wrap: wrap;
  }
}
</style>
