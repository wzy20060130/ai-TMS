<script setup lang="ts">
import { ref, reactive } from 'vue';
import { Search } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// 车辆统计数据
const vehicleStats = ref([
  {
    label: '总行驶里程',
    value: '628 km',
    icon: '📍',
  },
  {
    label: '剩余里程',
    value: '156 km',
    icon: '🚗',
  },
  {
    label: '预计到达时间',
    value: '14:30',
    icon: '⏰',
  },
  {
    label: '预计时间',
    value: '7小时50分',
    icon: '⏱️',
  },
]);

// 轨迹回放控制
const playbackControl = reactive({
  isPlaying: false,
  currentTime: '昨天24小时',
  speed: 1,
});

// 历史车辆列表
const historicalVehicles = ref([
  {
    id: 1,
    plateNumber: '京A-12345',
    status: 'active',
    statusColor: '#52c41a',
    driver: '张师傅',
    phone: '138****1234',
    location: '北京市朝阳区',
    address: '朝阳区建国门外大街1号',
    updateTime: 'ORD2023093001',
    coordinates: '北京',
    lastUpdate: '刚刚',
  },
]);

// 当前车辆列表
const currentVehicles = ref([
  {
    id: 1,
    plateNumber: '京A-12345',
    status: 'running',
    statusColor: '#52c41a',
    statusIcon: '🟢',
    driver: '张师傅',
    location: '北京-上海',
    address: '当前位置：杭州市西湖区',
    progress: '运输中',
  },
  {
    id: 2,
    plateNumber: '沪G-67890',
    status: 'running',
    statusColor: '#52c41a',
    statusIcon: '🟢',
    driver: '李师傅',
    location: '广州-深圳',
    address: '当前位置：深圳市南山区',
    progress: '运输中',
  },
  {
    id: 3,
    plateNumber: '粤C-24680',
    status: 'idle',
    statusColor: '#faad14',
    statusIcon: '🟠',
    driver: '王师傅',
    location: '成都-重庆',
    address: '当前位置：成都市武侯区',
    progress: '待命中',
  },
  {
    id: 4,
    plateNumber: '京D-13579',
    status: 'offline',
    statusColor: '#ff4d4f',
    statusIcon: '🔴',
    driver: '赵师傅',
    location: '西安-兰州',
    address: '当前位置：西安市雁塔区',
    progress: '离线',
  },
]);

// 搜索关键词
const searchKeyword = ref('');

// 播放/暂停
const togglePlayback = () => {
  playbackControl.isPlaying = !playbackControl.isPlaying;
  ElMessage.success(playbackControl.isPlaying ? '开始播放' : '暂停播放');
};

// 选择车辆
interface Vehicle {
  plateNumber: string;
  [key: string]: unknown;
}
const selectVehicle = (vehicle: Vehicle) => {
  // TODO: 实现选择车辆逻辑
  ElMessage.info(`已选择车辆：${vehicle.plateNumber}`);
};

// 搜索
const handleSearch = () => {
  // TODO: 实现搜索逻辑
  ElMessage.success('搜索完成');
};
</script>

<template>
  <div class="vehicle-track-container">
    <!-- 左侧面板 -->
    <div class="left-panel">
      <!-- 统计卡片 -->
      <div class="stats-section">
        <h3 class="section-title">实时监控数据</h3>
        <div class="stats-grid">
          <div v-for="(stat, index) in vehicleStats" :key="index" class="stat-item">
            <div class="stat-icon">{{ stat.icon }}</div>
            <div class="stat-content">
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-value">{{ stat.value }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 轨迹回放控制 -->
      <div class="playback-section">
        <h3 class="section-title">轨迹回放控制</h3>
        <div class="playback-controls">
          <ElButton
            :type="playbackControl.isPlaying ? 'danger' : 'primary'"
            @click="togglePlayback"
          >
            {{ playbackControl.isPlaying ? '⏸ 暂停回放' : '▶ 开始回放' }}
          </ElButton>
          <ElButton>⏹ 停止</ElButton>
          <ElSelect v-model="playbackControl.currentTime" style="width: 150px">
            <ElOption label="昨天24小时" value="昨天24小时" />
            <ElOption label="最近7天" value="最近7天" />
            <ElOption label="最近30天" value="最近30天" />
          </ElSelect>
        </div>
      </div>

      <!-- 历史车辆 -->
      <div class="vehicles-section">
        <h3 class="section-title">历史车辆</h3>
        <div class="vehicle-list">
          <div
            v-for="vehicle in historicalVehicles"
            :key="vehicle.id"
            class="vehicle-item"
            @click="selectVehicle(vehicle)"
          >
            <div class="vehicle-header">
              <div class="vehicle-plate">
                <span class="plate-icon">🚗</span>
                <span class="plate-number">{{ vehicle.plateNumber }}</span>
              </div>
              <div class="vehicle-status" :style="{ color: vehicle.statusColor }">
                {{ vehicle.lastUpdate }}
              </div>
            </div>
            <div class="vehicle-info">
              <div class="info-row">
                <span class="info-label">司机：</span>
                <span class="info-value">{{ vehicle.driver }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">电话：</span>
                <span class="info-value">{{ vehicle.phone }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">位置：</span>
                <span class="info-value">{{ vehicle.location }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">地址：</span>
                <span class="info-value">{{ vehicle.address }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">运单号：</span>
                <span class="info-value">{{ vehicle.updateTime }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">坐标：</span>
                <span class="info-value">{{ vehicle.coordinates }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧地图和车辆列表 -->
    <div class="right-panel">
      <!-- 顶部搜索和车辆列表 -->
      <div class="top-section">
        <div class="search-bar">
          <ElInput
            v-model="searchKeyword"
            placeholder="请输入车牌号或司机姓名"
            clearable
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <ElIcon><Search /></ElIcon>
            </template>
          </ElInput>
          <ElSelect placeholder="车辆状态" style="width: 150px; margin-left: 10px">
            <ElOption label="全部" value="" />
            <ElOption label="运输中" value="1" />
            <ElOption label="待命中" value="2" />
            <ElOption label="离线" value="3" />
          </ElSelect>
          <ElButton type="primary" :icon="Search" @click="handleSearch">搜索</ElButton>
        </div>

        <div class="vehicle-cards">
          <h3 class="section-title">监控车辆列表</h3>
          <div class="cards-grid">
            <div
              v-for="vehicle in currentVehicles"
              :key="vehicle.id"
              class="vehicle-card"
              @click="selectVehicle(vehicle)"
            >
              <div class="card-header">
                <div class="card-plate">
                  <span class="status-dot" :style="{ color: vehicle.statusColor }">
                    {{ vehicle.statusIcon }}
                  </span>
                  <span class="plate-text">{{ vehicle.plateNumber }}</span>
                </div>
                <ElTag
                  :type="
                    vehicle.status === 'running'
                      ? 'success'
                      : vehicle.status === 'idle'
                        ? 'warning'
                        : 'danger'
                  "
                  size="small"
                >
                  {{ vehicle.progress }}
                </ElTag>
              </div>
              <div class="card-body">
                <div class="card-info">
                  <span class="info-label">司机：</span>
                  <span class="info-value">{{ vehicle.driver }}</span>
                </div>
                <div class="card-info">
                  <span class="info-label">路线：</span>
                  <span class="info-value">{{ vehicle.location }}</span>
                </div>
                <div class="card-info">
                  <span class="info-label">位置：</span>
                  <span class="info-value">{{ vehicle.address }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 地图区域 -->
      <div class="map-section">
        <div class="map-container">
          <div class="map-placeholder">
            <div class="map-overlay">
              <h3>🗺️ 地图区域</h3>
              <p>此处为地图显示区域</p>
              <p style="font-size: 12px; color: #8c8c8c; margin-top: 10px">
                可集成百度地图、高德地图或其他地图服务
              </p>
            </div>
          </div>
        </div>

        <!-- 地图图例 -->
        <div class="map-legend">
          <div class="legend-title">图例</div>
          <div class="legend-items">
            <div class="legend-item">
              <span class="legend-dot" style="background: #1890ff">📍</span>
              <span class="legend-label">LTE 车辆实时</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #52c41a">🚗</span>
              <span class="legend-label">运输中车辆</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #faad14">🅿️</span>
              <span class="legend-label">停车点</span>
            </div>
            <div class="legend-item">
              <span class="legend-dot" style="background: #ff4d4f">⚠️</span>
              <span class="legend-label">当前位置</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vehicle-track-container {
  display: flex;
  gap: 16px;
  height: calc(100vh - 120px);
  background: #f8f9fa;
}

/* 左侧面板 */
.left-panel {
  width: 320px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
}

.section-title {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 16px 0;
}

/* 统计卡片 */
.stats-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
}

.stat-icon {
  font-size: 24px;
}

.stat-content {
  flex: 1;
}

.stat-label {
  font-size: 12px;
  color: #8c8c8c;
  margin-bottom: 4px;
}

.stat-value {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
}

/* 轨迹回放控制 */
.playback-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.playback-controls {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

/* 历史车辆 */
.vehicles-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.vehicle-list {
  flex: 1;
  overflow-y: auto;
}

.vehicle-item {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.vehicle-item:hover {
  background: #f0f7ff;
  border-color: #1890ff;
}

.vehicle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.vehicle-plate {
  display: flex;
  align-items: center;
  gap: 8px;
}

.plate-icon {
  font-size: 20px;
}

.plate-number {
  font-size: 16px;
  font-weight: 600;
  color: #262626;
}

.vehicle-status {
  font-size: 12px;
  font-weight: 500;
}

.vehicle-info {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.info-row {
  display: flex;
  font-size: 12px;
}

.info-label {
  color: #8c8c8c;
  min-width: 50px;
}

.info-value {
  color: #595959;
  flex: 1;
}

/* 右侧面板 */
.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow: hidden;
}

/* 顶部搜索和车辆列表 */
.top-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
}

.search-bar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.search-bar :deep(.el-input) {
  flex: 1;
}

.vehicle-cards {
  margin-top: 20px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.vehicle-card {
  padding: 16px;
  background: #fafafa;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.vehicle-card:hover {
  background: #f0f7ff;
  border-color: #1890ff;
  transform: translateY(-2px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.card-plate {
  display: flex;
  align-items: center;
  gap: 6px;
}

.status-dot {
  font-size: 12px;
}

.plate-text {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
}

.card-body {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.card-info {
  display: flex;
  font-size: 12px;
}

.card-info .info-label {
  color: #8c8c8c;
  min-width: 40px;
}

.card-info .info-value {
  color: #595959;
  flex: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* 地图区域 */
.map-section {
  flex: 1;
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  border: 1px solid #f0f0f0;
  position: relative;
  overflow: hidden;
}

.map-container {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  overflow: hidden;
}

.map-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.map-overlay {
  text-align: center;
  color: white;
}

.map-overlay h3 {
  font-size: 32px;
  margin: 0 0 10px 0;
}

.map-overlay p {
  font-size: 16px;
  margin: 5px 0;
}

/* 地图图例 */
.map-legend {
  position: absolute;
  bottom: 30px;
  left: 30px;
  background: white;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.legend-title {
  font-size: 14px;
  font-weight: 600;
  color: #262626;
  margin-bottom: 12px;
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.legend-dot {
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
}

.legend-label {
  font-size: 12px;
  color: #595959;
}

/* 滚动条样式 */
.left-panel::-webkit-scrollbar,
.vehicle-list::-webkit-scrollbar {
  width: 6px;
}

.left-panel::-webkit-scrollbar-thumb,
.vehicle-list::-webkit-scrollbar-thumb {
  background: #d9d9d9;
  border-radius: 3px;
}

.left-panel::-webkit-scrollbar-thumb:hover,
.vehicle-list::-webkit-scrollbar-thumb:hover {
  background: #bfbfbf;
}
</style>
