<template>
  <div class="auth-layout">
    <!-- 背景装饰 -->
    <div class="auth-bg">
      <div class="auth-bg-pattern"></div>
      <div class="auth-bg-decor">
        <div class="decor-item decor-left">
          <div class="leaf-1"></div>
          <div class="leaf-2"></div>
        </div>
        <div class="decor-item decor-right">
          <div class="bubble-1"></div>
          <div class="bubble-2"></div>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="auth-container">
      <!-- Logo和标题区 -->
      <div class="auth-header">
        <div class="logo-section">
          <img src="/src/assets/logo-light.svg" alt="Logo" class="logo" />
          <h1 class="site-title">一句话<span class="highlight">呈所想</span></h1>
        </div>
        <p class="site-subtitle">与 AI 对话轻松创建应用和网站</p>
      </div>

      <!-- 表单卡片 -->
      <div class="auth-card">
        <router-view />
      </div>

      <!-- 页脚 -->
      <div class="auth-footer">
        <p class="copyright">© 2024 一句话呈所想 - 让创意实现更简单</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// 无需额外逻辑，纯布局组件
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    var(--color-primary-light) 0%,
    var(--color-white) 50%,
    var(--color-secondary-light) 100%
  );
  overflow: hidden;
}

/* 背景装饰 */
.auth-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
}

.auth-bg-pattern {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234096FF' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  opacity: 0.3;
}

.auth-bg-decor {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.decor-item {
  position: absolute;
}

.decor-left {
  top: 20%;
  left: 10%;
}

.decor-right {
  bottom: 20%;
  right: 10%;
}

.leaf-1,
.leaf-2,
.bubble-1,
.bubble-2 {
  position: absolute;
  border-radius: 50%;
  opacity: 0.1;
}

.leaf-1 {
  width: 60px;
  height: 60px;
  background: var(--color-secondary);
  transform: rotate(-15deg);
}

.leaf-2 {
  width: 40px;
  height: 40px;
  background: var(--color-secondary);
  top: 30px;
  left: 20px;
  transform: rotate(15deg);
}

.bubble-1 {
  width: 80px;
  height: 80px;
  background: var(--color-accent);
}

.bubble-2 {
  width: 50px;
  height: 50px;
  background: var(--color-primary);
  top: -20px;
  left: 30px;
}

/* 主容器 */
.auth-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 400px;
  padding: var(--spacing-md);
}

/* 头部区域 */
.auth-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.logo-section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.logo {
  width: 48px;
  height: 48px;
}

.site-title {
  font-size: 28px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
}

.highlight {
  color: var(--color-primary);
}

.site-subtitle {
  font-size: 16px;
  color: var(--color-text-light);
  margin: 0;
}

/* 卡片区域 */
.auth-card {
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-light);
  padding: var(--spacing-lg);
  margin-bottom: var(--spacing-md);
}

/* 页脚 */
.auth-footer {
  text-align: center;
}

.copyright {
  font-size: 12px;
  color: var(--color-text-light);
  margin: 0;
  opacity: 0.8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .auth-container {
    max-width: 320px;
    padding: var(--spacing-sm);
  }

  .auth-card {
    padding: var(--spacing-md);
  }

  .site-title {
    font-size: 24px;
  }

  .site-subtitle {
    font-size: 14px;
  }

  .decor-left,
  .decor-right {
    display: none;
  }
}

/* 进入动画 */
.auth-card {
  animation: slideUp 0.6s ease-out;
}

@keyframes slideUp {
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
