<template>
  <div class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <!-- 404 插图 -->
        <div class="illustration">
          <div class="error-code">404</div>
          <div class="floating-elements">
            <div class="element element-1"></div>
            <div class="element element-2"></div>
            <div class="element element-3"></div>
          </div>
        </div>

        <!-- 错误信息 -->
        <div class="error-info">
          <h1 class="error-title">页面未找到</h1>
          <p class="error-description">
            抱歉，您访问的页面不存在或已被移动。
            <br />
            请检查网址是否正确，或返回首页继续浏览。
          </p>
        </div>

        <!-- 操作按钮 -->
        <div class="actions">
          <a-button type="primary" size="large" @click="goHome" class="action-btn">
            <Icon icon="material-symbols:home" />
            返回首页
          </a-button>
          <a-button size="large" @click="goBack" class="action-btn">
            <Icon icon="material-symbols:arrow-back" />
            返回上页
          </a-button>
        </div>

        <!-- 建议链接 -->
        <div class="suggestions">
          <h3 class="suggestions-title">您可能想要：</h3>
          <div class="suggestion-links">
            <router-link to="/" class="suggestion-link">
              <Icon icon="material-symbols:apps" />
              <span>浏览应用</span>
            </router-link>
            <router-link to="/auth/login" class="suggestion-link" v-if="!userStore.isLoggedIn">
              <Icon icon="material-symbols:login" />
              <span>用户登录</span>
            </router-link>
            <a href="mailto:support@example.com" class="suggestion-link">
              <Icon icon="material-symbols:support-agent" />
              <span>联系客服</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { useUserStore } from '@/stores'

const router = useRouter()
const userStore = useUserStore()

// 返回首页
const goHome = () => {
  router.push({ name: 'Home' })
}

// 返回上一页
const goBack = () => {
  if (history.length > 1) {
    router.back()
  } else {
    goHome()
  }
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: linear-gradient(
    135deg,
    var(--color-primary-light) 0%,
    var(--color-white) 50%,
    var(--color-secondary-light) 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-md);
}

.container {
  max-width: 600px;
  width: 100%;
}

.not-found-content {
  text-align: center;
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-light);
  padding: var(--spacing-lg);
  animation: fadeInUp 0.6s ease-out;
}

/* 404 插图 */
.illustration {
  position: relative;
  margin-bottom: var(--spacing-lg);
}

.error-code {
  font-size: 120px;
  font-weight: 800;
  color: var(--color-primary);
  opacity: 0.8;
  margin-bottom: var(--spacing-md);
  text-shadow: 0 4px 8px rgba(64, 150, 255, 0.2);
  position: relative;
}

.floating-elements {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.element {
  position: absolute;
  border-radius: 50%;
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;
}

.element-1 {
  width: 20px;
  height: 20px;
  background: var(--color-secondary);
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.element-2 {
  width: 30px;
  height: 30px;
  background: var(--color-accent);
  top: 30%;
  right: 25%;
  animation-delay: 1s;
}

.element-3 {
  width: 15px;
  height: 15px;
  background: var(--color-primary);
  bottom: 20%;
  left: 30%;
  animation-delay: 2s;
}

/* 错误信息 */
.error-info {
  margin-bottom: var(--spacing-lg);
}

.error-title {
  font-size: 32px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 var(--spacing-sm) 0;
}

.error-description {
  font-size: 16px;
  color: var(--color-text-light);
  line-height: 1.6;
  margin: 0;
}

/* 操作按钮 */
.actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  margin-bottom: var(--spacing-lg);
  flex-wrap: wrap;
}

.action-btn {
  height: 44px;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  min-width: 120px;
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
}

/* 建议链接 */
.suggestions {
  border-top: 1px solid var(--color-border);
  padding-top: var(--spacing-md);
}

.suggestions-title {
  font-size: 18px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0 0 var(--spacing-sm) 0;
}

.suggestion-links {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
}

.suggestion-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: var(--spacing-xs) var(--spacing-sm);
  color: var(--color-text-light);
  text-decoration: none;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
  font-size: 14px;
}

.suggestion-link:hover {
  color: var(--color-primary);
  background: var(--color-primary-light);
}

/* 动画效果 */
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .error-code {
    font-size: 80px;
  }

  .error-title {
    font-size: 24px;
  }

  .error-description {
    font-size: 14px;
  }

  .actions {
    flex-direction: column;
    align-items: center;
  }

  .action-btn {
    width: 100%;
    max-width: 200px;
  }

  .suggestion-links {
    flex-direction: column;
    align-items: center;
  }

  .suggestion-link {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .not-found-content {
    padding: var(--spacing-md);
  }

  .error-code {
    font-size: 60px;
  }

  .error-title {
    font-size: 20px;
  }

  .error-description {
    font-size: 13px;
  }
}

/* 深色模式适配 */
@media (prefers-color-scheme: dark) {
  .not-found-content {
    background: #1f1f1f;
  }

  .error-code {
    color: #4096ff;
  }
}
</style>
