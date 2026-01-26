<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import {
  Document,
  Location,
  Setting,
  User,
  Bell,
  Search,
  Fold,
  Expand,
  Calendar,
  Grid,
} from '@element-plus/icons-vue';

const router = useRouter();
const route = useRoute();
const isCollapse = ref(false);

// 图标映射
import type { Component } from 'vue';
const iconMap: Record<string, Component> = {
  Grid,
  Document,
  Location,
  Bell,
  Setting,
};

interface MenuItem {
  index: string;
  title: string;
  icon: Component;
  path: string;
  children?: MenuItem[];
}

// 从路由配置中获取菜单项（包含子菜单）
const menuItems = computed(() => {
  const routes = router.options.routes.find(r => r.path === '/');
  if (routes && routes.children) {
    return routes.children.map(child => {
      const item: MenuItem = {
        index: child.path,
        title: child.meta?.title || '',
        icon: iconMap[child.meta?.icon as string] || Document,
        path: `/${child.path}`,
      };

      // 如果有子路由，添加到菜单项中
      if (child.children && child.children.length > 0) {
        item.children = child.children.map(subChild => ({
          index: `${child.path}/${subChild.path}`,
          title: subChild.meta?.title || '',
          icon: iconMap[subChild.meta?.icon as string] || Document,
          path: `/${child.path}/${subChild.path}`,
        }));
      }

      return item;
    });
  }
  return [];
});

// 当前激活的菜单
const activeMenu = computed(() => {
  const pathSegments = route.path.split('/').filter(Boolean);
  if (pathSegments.length >= 2) {
    return `${pathSegments[0]}/${pathSegments[1]}`;
  }
  return pathSegments[0] || 'workbench';
});

// 当前页面标题
const currentTitle = computed(() => {
  return route.meta?.title || '工作台';
});

const handleSelect = (key: string) => {
  router.push(`/${key}`);
};

const toggleCollapse = () => {
  isCollapse.value = !isCollapse.value;
};
</script>

<template>
  <ElContainer class="layout-container">
    <!-- 侧边栏 -->
    <ElAside :width="isCollapse ? '64px' : '200px'" class="sidebar">
      <!-- Logo区域 -->
      <div class="logo-container" :class="{ collapsed: isCollapse }">
        <Transition name="fade">
          <div v-if="!isCollapse" class="logo-text">
            <div class="logo-title">数据管理</div>
            <div class="logo-subtitle">TMS智能管理系统</div>
          </div>
        </Transition>
      </div>

      <!-- 菜单 -->
      <ElMenu
        :default-active="activeMenu"
        class="sidebar-menu"
        :collapse="isCollapse"
        :collapse-transition="false"
        @select="handleSelect"
      >
        <template v-for="item in menuItems" :key="item.index">
          <!-- 没有子菜单的菜单项 -->
          <ElMenuItem v-if="!item.children || item.children.length === 0" :index="item.index">
            <ElIcon><component :is="item.icon" /></ElIcon>
            <template #title>{{ item.title }}</template>
          </ElMenuItem>

          <!-- 有子菜单的菜单项 -->
          <ElSubMenu v-else :index="item.index">
            <template #title>
              <ElIcon><component :is="item.icon" /></ElIcon>
              <span>{{ item.title }}</span>
            </template>
            <ElMenuItem
              v-for="subItem in item.children"
              :key="subItem.index"
              :index="subItem.index"
            >
              <ElIcon><component :is="subItem.icon" /></ElIcon>
              <template #title>{{ subItem.title }}</template>
            </ElMenuItem>
          </ElSubMenu>
        </template>
      </ElMenu>
    </ElAside>

    <!-- 主内容区 -->
    <ElContainer>
      <!-- 顶部导航栏 -->
      <ElHeader class="header">
        <div class="header-left">
          <!-- 折叠按钮 -->
          <ElButton
            :icon="isCollapse ? Expand : Fold"
            text
            class="collapse-btn"
            @click="toggleCollapse"
          />

          <!-- 面包屑 -->
          <ElBreadcrumb separator="/">
            <ElBreadcrumbItem>首页</ElBreadcrumbItem>
            <ElBreadcrumbItem>{{ currentTitle }}</ElBreadcrumbItem>
          </ElBreadcrumb>
        </div>

        <div class="header-right">
          <!-- 搜索 -->
          <ElInput placeholder="搜索..." :prefix-icon="Search" class="search-input" clearable />

          <!-- 今日日期 -->
          <div class="date-info">
            <ElIcon><Calendar /></ElIcon>
            <span>今日 2023年6月20日 星期二</span>
          </div>

          <!-- 通知 -->
          <ElBadge :value="12" class="notification-badge">
            <ElButton :icon="Bell" circle />
          </ElBadge>

          <!-- 用户信息 -->
          <ElDropdown>
            <div class="user-info">
              <ElAvatar :size="32" :icon="User" />
              <span class="username">李文杰</span>
            </div>
            <template #dropdown>
              <ElDropdownMenu>
                <ElDropdownItem>个人中心</ElDropdownItem>
                <ElDropdownItem>修改密码</ElDropdownItem>
                <ElDropdownItem divided>退出登录</ElDropdownItem>
              </ElDropdownMenu>
            </template>
          </ElDropdown>
        </div>
      </ElHeader>

      <!-- 主内容 - 二级路由出口 -->
      <ElMain class="main-content">
        <RouterView />
      </ElMain>
    </ElContainer>
  </ElContainer>
</template>

<style scoped>
.layout-container {
  height: 100vh;
  width: 100%;
}

/* 侧边栏样式 */
.sidebar {
  background: #ffffff;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  transition: width 0.3s;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  background: #f5f7fa;
  border-bottom: 1px solid #e5e7eb;
  gap: 12px;
  flex-shrink: 0;
}

.logo-container.collapsed {
  justify-content: center;
  padding: 0;
}

.logo-icon {
  font-size: 28px;
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.logo-title {
  color: #303133;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.logo-subtitle {
  color: #909399;
  font-size: 11px;
  letter-spacing: 0.3px;
}

.sidebar-menu {
  border: none;
  background: transparent;
  padding: 10px 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 自定义滚动条样式 */
.sidebar-menu::-webkit-scrollbar {
  width: 6px;
}

.sidebar-menu::-webkit-scrollbar-track {
  background: transparent;
}

.sidebar-menu::-webkit-scrollbar-thumb {
  background: #c0c4cc;
  border-radius: 3px;
}

.sidebar-menu::-webkit-scrollbar-thumb:hover {
  background: #a0a4ac;
}

.sidebar-menu :deep(.el-menu-item) {
  color: #606266;
  margin: 4px 8px;
  border-radius: 8px;
  transition: all 0.3s;
}

.sidebar-menu :deep(.el-menu-item:hover) {
  background: #f5f7fa;
  color: #303133;
}

.sidebar-menu :deep(.el-menu-item.is-active) {
  background: #4facfe;
  color: #fff;
  box-shadow: 0 2px 8px rgba(79, 172, 254, 0.3);
}

.sidebar-menu :deep(.el-sub-menu__title) {
  color: #606266;
  margin: 4px 8px;
  border-radius: 8px;
  transition: all 0.3s;
}

.sidebar-menu :deep(.el-sub-menu__title:hover) {
  background: #f5f7fa;
  color: #303133;
}

.sidebar-menu :deep(.el-sub-menu.is-active > .el-sub-menu__title) {
  color: #303133;
}

/* 子菜单弹出层样式 */
.sidebar-menu :deep(.el-menu--popup) {
  background: #ffffff !important;
  border: 1px solid #e5e7eb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.sidebar-menu :deep(.el-menu--popup .el-menu-item) {
  background: transparent !important;
  color: #606266;
  margin: 2px 8px;
  border-radius: 6px;
}

.sidebar-menu :deep(.el-menu--popup .el-menu-item:hover) {
  background: #f5f7fa !important;
  color: #303133;
}

.sidebar-menu :deep(.el-menu--popup .el-menu-item.is-active) {
  background: #4facfe !important;
  color: #fff;
}

/* 内嵌子菜单样式（侧边栏内展开） */
.sidebar-menu :deep(.el-sub-menu .el-menu) {
  background: #f5f7fa !important;
}

.sidebar-menu :deep(.el-sub-menu .el-menu .el-menu-item) {
  background: transparent !important;
  color: #606266;
  padding-left: 50px !important;
  min-width: auto;
}

.sidebar-menu :deep(.el-sub-menu .el-menu .el-menu-item:hover) {
  background: #e5e7eb !important;
  color: #303133;
}

.sidebar-menu :deep(.el-sub-menu .el-menu .el-menu-item.is-active) {
  background: #4facfe !important;
  color: #fff;
}

.sidebar-menu :deep(.el-icon) {
  font-size: 18px;
}

/* 顶部导航栏样式 */
.header {
  background: #fff;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.header-left {
  display: flex;
  align-items: center;
  gap: 20px;
}

.collapse-btn {
  font-size: 20px;
  color: #606266;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-input {
  width: 200px;
}

.date-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  font-size: 14px;
  padding: 0 12px;
  background: #f5f7fa;
  border-radius: 6px;
  height: 32px;
}

.notification-badge {
  cursor: pointer;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 4px 12px;
  border-radius: 8px;
  transition: background 0.3s;
}

.user-info:hover {
  background: #f5f7fa;
}

.username {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
}

/* 主内容区 */
.main-content {
  background: #f5f7fa;
  padding: 20px;
  overflow-y: auto;
}

/* 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
