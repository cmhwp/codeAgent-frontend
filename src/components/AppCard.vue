<template>
  <div class="app-card" @click="handleClick">
    <!-- 封面图片 -->
    <div class="card-cover">
      <img
        :src="app.cover || getDefaultCover()"
        :alt="app.appName"
        class="cover-image"
        @error="handleImageError"
      />
      <!-- 代码类型标签 -->
      <div class="code-type-tag" v-if="app.codeGenType">
        <Icon :icon="getCodeTypeIcon(app.codeGenType)" />
        <span>{{ getCodeTypeName(app.codeGenType) }}</span>
      </div>
      <!-- 优先级标签（精选） -->
      <div class="featured-tag" v-if="app.priority && app.priority > 50">
        <Icon icon="material-symbols:star" />
        精选
      </div>
    </div>

    <!-- 卡片内容 -->
    <div class="card-content">
      <div class="app-info">
        <h3 class="app-name" :title="app.appName">{{ app.appName || '未命名应用' }}</h3>
        <p class="app-description" v-if="app.initPrompt">
          {{ truncateText(app.initPrompt, 80) }}
        </p>

        <div class="app-meta">
          <div class="meta-item" v-if="app.createTime">
            <Icon icon="material-symbols:schedule" />
            <span>{{ formatTime(app.createTime) }}</span>
          </div>
          <div class="meta-item" v-if="app.user">
            <Icon icon="material-symbols:person" />
            <span>{{ app.user.userName || app.user.userAccount }}</span>
          </div>
          <div class="meta-item" v-if="app.deployedTime">
            <Icon icon="material-symbols:cloud-done" />
            <span>已部署</span>
          </div>
        </div>
      </div>

      <!-- 操作按钮 -->
      <div class="card-actions" v-if="showActions" @click.stop>
        <a-dropdown :trigger="['click']">
          <a-button type="text" size="small" class="action-btn">
            <Icon icon="material-symbols:more-vert" />
          </a-button>
          <template #overlay>
            <a-menu>
              <a-menu-item @click="$emit('edit', app)">
                <Icon icon="material-symbols:edit-outline" />
                编辑
              </a-menu-item>
              <a-menu-item @click="copyAppLink">
                <Icon icon="material-symbols:link" />
                复制链接
              </a-menu-item>
              <a-menu-divider />
              <a-menu-item @click="$emit('delete', app)" class="danger-item">
                <Icon icon="material-symbols:delete-outline" />
                删除
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>

    <!-- 鼠标悬停效果 -->
    <div class="card-overlay">
      <div class="overlay-content">
        <Icon icon="material-symbols:open-in-new" />
        <span>打开应用</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import { message } from 'ant-design-vue'
import type { API } from '@/api/typings'

interface Props {
  app: API.AppVO
  showActions?: boolean
}

interface Emits {
  (e: 'click'): void
  (e: 'edit', app: API.AppVO): void
  (e: 'delete', app: API.AppVO): void
}

const props = withDefaults(defineProps<Props>(), {
  showActions: false,
})

const emit = defineEmits<Emits>()

// 默认封面图片池
const defaultCovers = [
  '/src/assets/cover-default-1.svg',
  '/src/assets/cover-default-2.svg',
  '/src/assets/cover-default-3.svg',
]

// 获取默认封面
const getDefaultCover = () => {
  const index = (props.app.id || 0) % defaultCovers.length
  return defaultCovers[index]
}

// 处理图片加载错误
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  img.src = getDefaultCover()
}

// 获取代码类型图标
const getCodeTypeIcon = (type: string) => {
  const icons: Record<string, string> = {
    html: 'material-symbols:html',
    multi_file: 'material-symbols:folder-open',
    react: 'material-symbols:code',
    vue: 'material-symbols:code',
  }
  return icons[type] || 'material-symbols:code'
}

// 获取代码类型名称
const getCodeTypeName = (type: string) => {
  const names: Record<string, string> = {
    html: 'HTML',
    multi_file: '多文件',
    react: 'React',
    vue: 'Vue',
  }
  return names[type] || type.toUpperCase()
}

// 截断文本
const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

// 格式化时间
const formatTime = (time: string) => {
  const date = new Date(time)
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minute = 60 * 1000
  const hour = 60 * minute
  const day = 24 * hour
  const week = 7 * day

  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < week) {
    return `${Math.floor(diff / day)}天前`
  } else {
    return date.toLocaleDateString('zh-CN', {
      month: 'short',
      day: 'numeric',
    })
  }
}

// 点击卡片
const handleClick = () => {
  emit('click')
}

// 复制应用链接
const copyAppLink = async () => {
  const link = `${window.location.origin}/app/${props.app.id}/chat`

  try {
    await navigator.clipboard.writeText(link)
    message.success('链接已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
    message.error('复制失败')
  }
}
</script>

<style scoped>
.app-card {
  position: relative;
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-light);
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s ease;
  height: 280px;
  display: flex;
  flex-direction: column;
}

.app-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}

.app-card:hover .card-overlay {
  opacity: 1;
}

.app-card:hover .cover-image {
  transform: scale(1.05);
}

/* 封面区域 */
.card-cover {
  position: relative;
  height: 160px;
  overflow: hidden;
  background: var(--color-bg-light);
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.code-type-tag {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  background: rgba(64, 150, 255, 0.9);
  color: white;
  padding: 2px var(--spacing-xs);
  border-radius: var(--border-radius-sm);
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.featured-tag {
  position: absolute;
  top: var(--spacing-xs);
  left: var(--spacing-xs);
  background: rgba(255, 193, 7, 0.9);
  color: white;
  padding: 2px var(--spacing-xs);
  border-radius: var(--border-radius-sm);
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 内容区域 */
.card-content {
  flex: 1;
  padding: var(--spacing-sm);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
}

.app-info {
  flex: 1;
}

.app-name {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 var(--spacing-xs) 0;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.app-description {
  font-size: 13px;
  color: var(--color-text-light);
  line-height: 1.4;
  margin: 0 0 var(--spacing-sm) 0;
  height: 36px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.app-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--color-text-light);
}

.meta-item svg {
  font-size: 14px;
}

/* 操作按钮 */
.card-actions {
  position: absolute;
  top: var(--spacing-xs);
  right: var(--spacing-xs);
  opacity: 0;
  transition: opacity 0.2s ease;
}

.app-card:hover .card-actions {
  opacity: 1;
}

.action-btn {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid var(--color-border);
  border-radius: 50%;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-light);
}

.action-btn:hover {
  background: var(--color-white);
  border-color: var(--color-primary);
}

/* 悬停覆盖层 */
.card-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(64, 150, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  backdrop-filter: blur(2px);
}

.overlay-content {
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  font-size: 14px;
  font-weight: 500;
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

.app-card:hover .overlay-content {
  transform: translateY(0);
}

/* 危险操作样式 */
:deep(.danger-item) {
  color: #ff4d4f !important;
}

:deep(.danger-item:hover) {
  background-color: #fff2f0 !important;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .app-card {
    height: 240px;
  }

  .card-cover {
    height: 120px;
  }

  .app-name {
    font-size: 14px;
  }

  .app-description {
    font-size: 12px;
    height: 32px;
    -webkit-line-clamp: 2;
  }

  .meta-item {
    font-size: 11px;
  }
}

/* 加载状态 */
.app-card.loading {
  pointer-events: none;
}

.app-card.loading .cover-image {
  opacity: 0.7;
}

/* 错误状态 */
.app-card.error .cover-image {
  filter: grayscale(100%);
}

/* 动画效果 */
.app-card {
  animation: slideInUp 0.6s ease-out;
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
