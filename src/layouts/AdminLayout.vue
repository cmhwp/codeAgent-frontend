<template>
  <div class="admin-layout">
    <!-- 侧边栏 -->
    <div class="admin-sidebar" :class="{ collapsed: sidebarCollapsed }">
      <div class="sidebar-header">
        <img src="/src/assets/logo-light.svg" alt="Logo" class="sidebar-logo" />
        <h2 v-if="!sidebarCollapsed" class="sidebar-title">管理后台</h2>
      </div>

      <nav class="sidebar-nav">
        <router-link
          v-for="item in menuItems"
          :key="item.name"
          :to="item.path"
          class="nav-item"
          :class="{ active: isActive(item.path) }"
        >
          <Icon :icon="item.icon" class="nav-icon" />
          <span v-if="!sidebarCollapsed" class="nav-text">{{ item.label }}</span>
        </router-link>
      </nav>
    </div>

    <!-- 主内容区 -->
    <div class="admin-main">
      <!-- 顶部栏 -->
      <header class="admin-header">
        <div class="header-left">
          <button
            class="sidebar-toggle"
            @click="toggleSidebar"
            :title="sidebarCollapsed ? '展开侧边栏' : '收起侧边栏'"
          >
            <Icon icon="material-symbols:menu" />
          </button>
          <h1 class="page-title">{{ currentPageTitle }}</h1>
        </div>

        <div class="header-right">
          <!-- 用户信息 -->
          <a-dropdown>
            <div class="user-info">
              <img :src="userStore.userAvatar" alt="用户头像" class="user-avatar" />
              <span class="user-name">{{ userStore.userName }}</span>
              <Icon icon="material-symbols:keyboard-arrow-down" class="dropdown-icon" />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item @click="goToHome">
                  <Icon icon="material-symbols:home" />
                  返回首页
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item @click="handleLogout">
                  <Icon icon="material-symbols:logout" />
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </header>

      <!-- 内容区域 -->
      <main class="admin-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/stores'
import { message } from 'ant-design-vue'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 侧边栏状态
const sidebarCollapsed = ref(false)

// 菜单项配置
const menuItems = [
  {
    name: 'AdminApps',
    path: '/admin/apps',
    label: '应用管理',
    icon: 'material-symbols:apps',
  },
  {
    name: 'AdminUsers',
    path: '/admin/users',
    label: '用户管理',
    icon: 'material-symbols:group',
  },
]

// 计算当前页面标题
const currentPageTitle = computed(() => {
  const currentItem = menuItems.find((item) => item.path === route.path)
  return currentItem?.label || '管理后台'
})

// 切换侧边栏
const toggleSidebar = () => {
  sidebarCollapsed.value = !sidebarCollapsed.value
}

// 检查路由是否激活
const isActive = (path: string) => {
  return route.path.startsWith(path)
}

// 返回首页
const goToHome = () => {
  router.push({ name: 'Home' })
}

// 退出登录
const handleLogout = async () => {
  try {
    await userStore.logout()
    message.success('已退出登录')
    router.push({ name: 'Login' })
  } catch (error) {
    console.error('退出登录失败:', error)
    message.error('退出登录失败')
  }
}

// 响应式处理
const handleResize = () => {
  if (window.innerWidth < 768) {
    sidebarCollapsed.value = true
  }
}

// 监听窗口大小变化
window.addEventListener('resize', handleResize)
handleResize() // 初始化
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
  background-color: var(--color-bg-light);
}

/* 侧边栏 */
.admin-sidebar {
  width: 240px;
  background: var(--color-white);
  border-right: 1px solid var(--color-border);
  transition: width 0.3s ease;
  flex-shrink: 0;
  box-shadow: var(--shadow-light);
  z-index: 1000;
}

.admin-sidebar.collapsed {
  width: 64px;
}

.sidebar-header {
  padding: var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.sidebar-logo {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-nav {
  padding: var(--spacing-sm) 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-sm) var(--spacing-md);
  color: var(--color-text);
  text-decoration: none;
  transition: all 0.2s ease;
  border-left: 3px solid transparent;
}

.nav-item:hover {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.nav-item.active {
  background: var(--color-primary-light);
  color: var(--color-primary);
  border-left-color: var(--color-primary);
}

.nav-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.nav-text {
  white-space: nowrap;
  overflow: hidden;
}

/* 主内容区 */
.admin-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* 顶部栏 */
.admin-header {
  height: 64px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-light);
  z-index: 999;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
}

.sidebar-toggle {
  background: none;
  border: none;
  font-size: 20px;
  color: var(--color-text);
  cursor: pointer;
  padding: var(--spacing-xs);
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
}

.sidebar-toggle:hover {
  background: var(--color-bg-light);
  color: var(--color-primary);
}

.page-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.header-right {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  cursor: pointer;
  transition: all 0.2s ease;
}

.user-info:hover {
  background: var(--color-bg-light);
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  font-size: 14px;
  color: var(--color-text);
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dropdown-icon {
  font-size: 16px;
  color: var(--color-text-light);
}

/* 内容区域 */
.admin-content {
  flex: 1;
  padding: var(--spacing-md);
  overflow-y: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .admin-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    z-index: 1001;
    transform: translateX(-100%);
    transition: transform 0.3s ease;
  }

  .admin-sidebar:not(.collapsed) {
    transform: translateX(0);
  }

  .admin-main {
    width: 100%;
  }

  .user-name {
    display: none;
  }

  .admin-content {
    padding: var(--spacing-sm);
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .admin-sidebar,
  .admin-header {
    background: #1f1f1f;
    border-color: #333;
  }
}
</style>
