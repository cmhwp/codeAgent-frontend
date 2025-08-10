<template>
  <div class="home-page">
    <!-- 顶部导航栏 -->
    <header class="home-header">
      <div class="container">
        <div class="header-content">
          <div class="logo-section">
            <img src="/src/assets/logo-light.svg" alt="Logo" class="logo" />
            <h1 class="site-title">一句话<span class="highlight">呈所想</span></h1>
          </div>

          <div class="user-section">
            <a-dropdown>
              <div class="user-info">
                <img :src="userStore.userAvatar" alt="用户头像" class="user-avatar" />
                <span class="user-name">{{ userStore.userName }}</span>
                <Icon icon="material-symbols:keyboard-arrow-down" class="dropdown-icon" />
              </div>
              <template #overlay>
                <a-menu>
                  <a-menu-item v-if="userStore.isAdmin" @click="goToAdmin">
                    <Icon icon="material-symbols:admin-panel-settings" />
                    管理后台
                  </a-menu-item>
                  <a-menu-item @click="handleLogout">
                    <Icon icon="material-symbols:logout" />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>
        </div>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="home-main">
      <div class="container">
        <!-- 头部标题区 -->
        <section class="hero-section">
          <h1 class="hero-title">一句话<span class="gradient-text">呈所想</span></h1>
          <p class="hero-subtitle">与 AI 对话轻松创建应用和网站</p>

          <!-- 提示词输入区 -->
          <div class="prompt-section">
            <div class="prompt-input-container">
              <a-textarea
                v-model:value="promptText"
                placeholder="使用 NoCode 创建一个高效的小工具，帮我计算......"
                :auto-size="{ minRows: 3, maxRows: 6 }"
                :maxlength="500"
                show-count
                class="prompt-input"
              />
              <div class="input-actions">
                <a-button type="text" size="small" @click="showUploadOptions" class="upload-btn">
                  <Icon icon="material-symbols:attach-file" />
                  上传
                </a-button>
                <a-button
                  type="primary"
                  size="large"
                  :loading="appStore.isLoading"
                  :disabled="!promptText.trim()"
                  @click="createApp"
                  class="submit-btn"
                >
                  <Icon icon="material-symbols:arrow-upward" />
                </a-button>
              </div>
            </div>

            <!-- 预设应用类型 -->
            <div class="preset-apps">
              <a-button
                v-for="preset in presetApps"
                :key="preset.type"
                @click="selectPreset(preset)"
                class="preset-btn"
              >
                {{ preset.name }}
              </a-button>
            </div>
          </div>
        </section>

        <!-- 我的作品区域 -->
        <section class="apps-section">
          <div class="section-header">
            <h2 class="section-title">我的作品</h2>
            <div class="section-actions">
              <a-input
                v-model:value="myAppsSearch"
                placeholder="搜索应用..."
                :prefix="h(SearchOutlined)"
                style="width: 200px"
                @pressEnter="searchMyApps"
                class="search-input"
              />
            </div>
          </div>

          <div class="apps-grid" v-if="appStore.myApps.length > 0">
            <AppCard
              v-for="app in appStore.myApps"
              :key="app.id"
              :app="app"
              :showActions="true"
              @click="goToChat(app.id!)"
              @edit="editApp"
              @delete="deleteApp"
            />
          </div>

          <a-empty
            v-else-if="!appStore.isLoading"
            description="还没有创建应用，快来创建第一个吧！"
            class="empty-state"
          >
            <a-button type="primary" @click="focusPromptInput"> 立即创建 </a-button>
          </a-empty>

          <!-- 加载更多 -->
          <div v-if="appStore.myAppsPage.hasMore" class="load-more-section">
            <a-button @click="loadMoreMyApps" :loading="appStore.isLoading" class="load-more-btn">
              加载更多
            </a-button>
          </div>
        </section>

        <!-- 精选案例区域 -->
        <section class="apps-section">
          <div class="section-header">
            <h2 class="section-title">精选案例</h2>
            <div class="section-actions">
              <a-input
                v-model:value="featuredAppsSearch"
                placeholder="搜索精选应用..."
                :prefix="h(SearchOutlined)"
                style="width: 200px"
                @pressEnter="searchFeaturedApps"
                class="search-input"
              />
            </div>
          </div>

          <div class="apps-grid" v-if="appStore.featuredApps.length > 0">
            <AppCard
              v-for="app in appStore.featuredApps"
              :key="app.id"
              :app="app"
              :showActions="false"
              @click="goToChat(app.id!)"
            />
          </div>

          <a-empty v-else-if="!appStore.isLoading" description="暂无精选应用" class="empty-state" />

          <!-- 加载更多 -->
          <div v-if="appStore.featuredAppsPage.hasMore" class="load-more-section">
            <a-button
              @click="loadMoreFeaturedApps"
              :loading="appStore.isLoading"
              class="load-more-btn"
            >
              加载更多
            </a-button>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, h } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { SearchOutlined } from '@ant-design/icons-vue'
import { message, Modal } from 'ant-design-vue'
import { useUserStore, useAppStore } from '@/stores'
import AppCard from '@/components/AppCard.vue'

const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

// 状态
const promptText = ref('')
const myAppsSearch = ref('')
const featuredAppsSearch = ref('')

// 预设应用类型
const presetApps = [
  { type: 'webpage', name: '波普网电商页面' },
  { type: 'enterprise', name: '企业网站' },
  { type: 'ecommerce', name: '电商运营后台' },
  { type: 'community', name: '暗黑话题社区' },
]

// 页面初始化
onMounted(async () => {
  // 加载我的应用和精选应用
  await Promise.all([appStore.loadMyApps(true), appStore.loadFeaturedApps(true)])
})

// 创建应用
const createApp = async () => {
  if (!promptText.value.trim()) {
    message.warning('请输入您的创意描述')
    return
  }

  try {
    const result = await appStore.createApp({
      initPrompt: promptText.value.trim(),
      codeGenType: 'html', // 默认类型
    })

    if (result?.success && result?.data) {
      message.success('应用创建成功！')
      // 跳转到对话页面
      router.push({ name: 'AppChat', params: { id: result?.data } })
    } else {
      message.error(result?.message || '创建失败')
    }
  } catch (error: any) {
    console.error('创建应用失败:', error)
    message.error('创建应用失败')
  }
}

// 选择预设应用
const selectPreset = (preset: any) => {
  const presetPrompts: Record<string, string> = {
    webpage: '创建一个现代化的波普风格电商页面，包含产品展示、购物车和用户登录功能',
    enterprise: '设计一个专业的企业官网，包含公司介绍、产品服务、新闻动态和联系我们页面',
    ecommerce: '开发一个功能完整的电商运营后台，包含商品管理、订单处理、数据统计和用户管理',
    community: '构建一个暗黑主题的话题讨论社区，支持发帖、评论、点赞和用户交互功能',
  }

  promptText.value = presetPrompts[preset.type] || preset.name
}

// 聚焦到输入框
const focusPromptInput = () => {
  nextTick(() => {
    const textarea = document.querySelector('.prompt-input textarea') as HTMLTextAreaElement
    textarea?.focus()
  })
}

// 显示上传选项
const showUploadOptions = () => {
  message.info('文件上传功能即将开放')
}

// 搜索我的应用
const searchMyApps = () => {
  appStore.loadMyApps(true, myAppsSearch.value)
}

// 搜索精选应用
const searchFeaturedApps = () => {
  appStore.loadFeaturedApps(true, featuredAppsSearch.value)
}

// 加载更多我的应用
const loadMoreMyApps = () => {
  appStore.loadMoreMyApps(myAppsSearch.value)
}

// 加载更多精选应用
const loadMoreFeaturedApps = () => {
  appStore.loadMoreFeaturedApps(featuredAppsSearch.value)
}

// 跳转到对话页
const goToChat = (appId: number) => {
  router.push({ name: 'AppChat', params: { id: appId } })
}

// 编辑应用
const editApp = (app: API.AppVO) => {
  router.push({ name: 'AppEdit', params: { id: app.id! } })
}

// 删除应用
const deleteApp = (app: API.AppVO) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除应用"${app.appName}"吗？此操作不可撤销。`,
    okText: '确认删除',
    okType: 'danger',
    cancelText: '取消',
    onOk: async () => {
      try {
        const result = await appStore.removeApp(app.id!)
        if (result?.success) {
          message.success('删除成功')
        } else {
          message.error(result?.message || '删除失败')
        }
      } catch (error) {
        console.error('删除应用失败:', error)
        message.error('删除失败')
      }
    },
  })
}

// 跳转到管理后台
const goToAdmin = () => {
  router.push({ name: 'AdminApps' })
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
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--color-primary-light) 0%,
    var(--color-white) 30%,
    var(--color-secondary-light) 100%
  );
}

/* 顶部导航 */
.home-header {
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-sm) 0;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.logo {
  width: 32px;
  height: 32px;
}

.site-title {
  font-size: 20px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.highlight {
  color: var(--color-primary);
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

/* 主要内容 */
.home-main {
  padding: var(--spacing-lg) 0;
}

/* 英雄区域 */
.hero-section {
  text-align: center;
  margin-bottom: var(--spacing-lg) * 2;
}

.hero-title {
  font-size: 48px;
  font-weight: 700;
  color: var(--color-text);
  margin: 0 0 var(--spacing-sm) 0;
  line-height: 1.2;
}

.gradient-text {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 18px;
  color: var(--color-text-light);
  margin: 0 0 var(--spacing-lg) * 2 0;
}

/* 提示词输入区 */
.prompt-section {
  max-width: 800px;
  margin: 0 auto;
}

.prompt-input-container {
  position: relative;
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-light);
  padding: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.prompt-input {
  border: none !important;
  box-shadow: none !important;
  font-size: 16px;
  resize: none;
}

.prompt-input:focus {
  box-shadow: none !important;
}

.input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--spacing-sm);
}

.upload-btn {
  color: var(--color-text-light);
}

.submit-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
}

/* 预设应用 */
.preset-apps {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.preset-btn {
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-border);
  background: var(--color-white);
  color: var(--color-text);
  transition: all 0.2s ease;
}

.preset-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-hover);
}

/* 应用区域 */
.apps-section {
  margin-bottom: var(--spacing-lg) * 2;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-sm);
  border-bottom: 2px solid var(--color-border);
}

.section-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.search-input {
  border-radius: var(--border-radius-sm);
}

.apps-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-md);
}

.empty-state {
  padding: var(--spacing-lg);
}

.load-more-section {
  text-align: center;
  margin-top: var(--spacing-md);
}

.load-more-btn {
  border-radius: var(--border-radius-sm);
}

/* 响应式设计 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }

  .apps-grid {
    grid-template-columns: 1fr;
  }

  .section-header {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: stretch;
  }

  .search-input {
    width: 100% !important;
  }

  .user-name {
    display: none;
  }

  .preset-apps {
    gap: var(--spacing-xs);
  }

  .preset-btn {
    font-size: 12px;
    padding: 4px 8px;
  }
}

/* 动画效果 */
.hero-section {
  animation: fadeInUp 0.8s ease-out;
}

.apps-section {
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
