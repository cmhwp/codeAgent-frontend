<template>
  <div class="login-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2 class="page-title">欢迎回来</h2>
      <p class="page-subtitle">登录您的账户，继续创作之旅</p>
    </div>

    <!-- 登录表单 -->
    <a-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      layout="vertical"
      @finish="handleLogin"
      class="login-form"
    >
      <a-form-item name="userAccount" label="账号">
        <a-input
          v-model:value="formData.userAccount"
          placeholder="请输入账号"
          size="large"
          :prefix="h(UserOutlined)"
          class="form-input"
        />
      </a-form-item>

      <a-form-item name="userPassword" label="密码">
        <a-input-password
          v-model:value="formData.userPassword"
          placeholder="请输入密码"
          size="large"
          :prefix="h(LockOutlined)"
          class="form-input"
        />
      </a-form-item>

      <a-form-item>
        <div class="form-options">
          <a-checkbox v-model:checked="rememberMe">记住我</a-checkbox>
          <a class="forgot-link" @click="showForgotPassword">忘记密码？</a>
        </div>
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="userStore.isLoading"
          block
          class="submit-btn"
        >
          <template #icon>
            <Icon icon="material-symbols:login" />
          </template>
          登录
        </a-button>
      </a-form-item>
    </a-form>

    <!-- 页面操作 -->
    <div class="page-actions">
      <p class="switch-text">
        还没有账户？
        <router-link to="/auth/register" class="switch-link">立即注册</router-link>
      </p>
    </div>

    <!-- 忘记密码模态框 -->
    <a-modal v-model:open="forgotPasswordVisible" title="重置密码" :footer="null" width="400px">
      <a-form
        :model="resetForm"
        :rules="resetRules"
        layout="vertical"
        @finish="handleResetPassword"
      >
        <a-form-item name="email" label="邮箱地址">
          <a-input
            v-model:value="resetForm.email"
            placeholder="请输入注册邮箱"
            :prefix="h(MailOutlined)"
          />
        </a-form-item>

        <a-form-item name="code" label="验证码">
          <a-input-group compact>
            <a-input
              v-model:value="resetForm.code"
              placeholder="请输入验证码"
              style="width: calc(100% - 100px)"
            />
            <a-button
              @click="sendResetCode"
              :loading="sendingCode"
              :disabled="!resetForm.email || countdown > 0"
            >
              {{ countdown > 0 ? `${countdown}s` : '发送验证码' }}
            </a-button>
          </a-input-group>
        </a-form-item>

        <a-form-item name="newPassword" label="新密码">
          <a-input-password v-model:value="resetForm.newPassword" placeholder="请输入新密码" />
        </a-form-item>

        <a-form-item name="confirmPassword" label="确认密码">
          <a-input-password
            v-model:value="resetForm.confirmPassword"
            placeholder="请再次输入新密码"
          />
        </a-form-item>

        <a-form-item>
          <a-button type="primary" html-type="submit" block :loading="resetting">
            重置密码
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Icon } from '@iconify/vue'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { useUserStore } from '@/stores'
import { sendCode, resetPassword } from '@/api/userManagement'
import type { Rule } from 'ant-design-vue/es/form'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

// 表单引用
const formRef = ref()

// 登录表单数据
const formData = reactive({
  userAccount: '',
  userPassword: '',
})

// 表单验证规则
const formRules: Record<string, Rule[]> = {
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度为3-20个字符', trigger: 'blur' },
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 50, message: '密码长度为6-50个字符', trigger: 'blur' },
  ],
}

// 其他状态
const rememberMe = ref(false)
const forgotPasswordVisible = ref(false)
const sendingCode = ref(false)
const resetting = ref(false)
const countdown = ref(0)

// 重置密码表单
const resetForm = reactive({
  email: '',
  code: '',
  newPassword: '',
  confirmPassword: '',
})

// 重置密码验证规则
const resetRules: Record<string, Rule[]> = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' },
  ],
  code: [
    { required: true, message: '请输入验证码', trigger: 'blur' },
    { len: 6, message: '验证码为6位数字', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, max: 50, message: '密码长度为6-50个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (_, value) => {
        if (value !== resetForm.newPassword) {
          return Promise.reject('两次输入的密码不一致')
        }
        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
}

// 处理登录
const handleLogin = async (values: any) => {
  try {
    const result = await userStore.login(values)

    if (result?.success) {
      message.success('登录成功')

      // 跳转到重定向页面或首页
      const redirect = route.query.redirect as string
      router.replace(redirect || { name: 'Home' })
    } else {
      message.error(result?.message || '登录失败')
    }
  } catch (error: any) {
    console.error('登录失败:', error)
    message.error(error.message || '登录失败')
  }
}

// 显示忘记密码对话框
const showForgotPassword = () => {
  forgotPasswordVisible.value = true
}

// 发送重置验证码
const sendResetCode = async () => {
  if (!resetForm.email) {
    message.warning('请先输入邮箱地址')
    return
  }

  try {
    sendingCode.value = true
    const response = await sendCode({
      email: resetForm.email,
      purpose: 'reset_password',
    })

    if (response.code === 0) {
      message.success('验证码已发送到您的邮箱')
      startCountdown()
    } else {
      message.error(response.message || '发送验证码失败')
    }
  } catch (error: any) {
    console.error('发送验证码失败:', error)
    message.error('发送验证码失败')
  } finally {
    sendingCode.value = false
  }
}

// 开始倒计时
const startCountdown = () => {
  countdown.value = 60
  const timer = setInterval(() => {
    countdown.value--
    if (countdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
}

// 处理重置密码
const handleResetPassword = async (values: any) => {
  try {
    resetting.value = true
    const response = await resetPassword({
      email: values.email,
      code: values.code,
      newPassword: values.newPassword,
      confirmPassword: values.confirmPassword,
    })

    if (response.success) {
      message.success('密码重置成功，请使用新密码登录')
      forgotPasswordVisible.value = false

      // 清空重置表单
      Object.assign(resetForm, {
        email: '',
        code: '',
        newPassword: '',
        confirmPassword: '',
      })
    } else {
      message.error(response.message || '重置密码失败')
    }
  } catch (error: any) {
    console.error('重置密码失败:', error)
    message.error('重置密码失败')
  } finally {
    resetting.value = false
  }
}
</script>

<style scoped>
.login-page {
  width: 100%;
}

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-lg);
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 var(--spacing-xs) 0;
}

.page-subtitle {
  font-size: 14px;
  color: var(--color-text-light);
  margin: 0;
}

.login-form {
  margin-bottom: var(--spacing-md);
}

.form-input {
  border-radius: var(--border-radius-sm);
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-link {
  color: var(--color-primary);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.forgot-link:hover {
  color: #1677ff;
}

.submit-btn {
  height: 44px;
  border-radius: var(--border-radius-sm);
  font-size: 16px;
  font-weight: 500;
  background: var(--color-primary);
  border-color: var(--color-primary);
}

.submit-btn:hover {
  background: #1677ff;
  border-color: #1677ff;
}

.page-actions {
  text-align: center;
}

.switch-text {
  font-size: 14px;
  color: var(--color-text-light);
  margin: 0;
}

.switch-link {
  color: var(--color-primary);
  text-decoration: none;
  font-weight: 500;
  margin-left: var(--spacing-xs);
}

.switch-link:hover {
  color: #1677ff;
}

/* 响应式设计 */
@media (max-width: 480px) {
  .page-title {
    font-size: 20px;
  }

  .page-subtitle {
    font-size: 13px;
  }
}

/* 表单动画 */
.login-form {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

@keyframes fadeInUp {
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
