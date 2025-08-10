<template>
  <div class="register-page">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2 class="page-title">创建账户</h2>
      <p class="page-subtitle">加入我们，开始您的创作之旅</p>
    </div>

    <!-- 注册表单 -->
    <a-form
      ref="formRef"
      :model="formData"
      :rules="formRules"
      layout="vertical"
      @finish="handleRegister"
      class="register-form"
    >
      <a-form-item name="userAccount" label="账号">
        <a-input
          v-model:value="formData.userAccount"
          placeholder="请输入账号（3-20个字符）"
          size="large"
          :prefix="h(UserOutlined)"
          class="form-input"
        />
      </a-form-item>

      <a-form-item name="userPassword" label="密码">
        <a-input-password
          v-model:value="formData.userPassword"
          placeholder="请输入密码（至少6个字符）"
          size="large"
          :prefix="h(LockOutlined)"
          class="form-input"
        />
      </a-form-item>

      <a-form-item name="checkPassword" label="确认密码">
        <a-input-password
          v-model:value="formData.checkPassword"
          placeholder="请再次输入密码"
          size="large"
          :prefix="h(LockOutlined)"
          class="form-input"
        />
      </a-form-item>

      <a-form-item name="userName" label="昵称（可选）">
        <a-input
          v-model:value="formData.userName"
          placeholder="请输入昵称，留空则使用账号"
          size="large"
          :prefix="h(Icon, { icon: 'material-symbols:badge-outline' })"
          class="form-input"
        />
      </a-form-item>

      <a-form-item name="userEmail" label="邮箱（可选）">
        <a-input
          v-model:value="formData.userEmail"
          placeholder="请输入邮箱，用于找回密码"
          size="large"
          :prefix="h(MailOutlined)"
          class="form-input"
        />
      </a-form-item>

      <a-form-item name="agreement">
        <a-checkbox v-model:checked="agreementChecked">
          我已阅读并同意
          <a @click="showTerms" class="terms-link">《用户协议》</a>
          和
          <a @click="showPrivacy" class="terms-link">《隐私政策》</a>
        </a-checkbox>
      </a-form-item>

      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          size="large"
          :loading="isRegistering"
          :disabled="!agreementChecked"
          block
          class="submit-btn"
        >
          <template #icon>
            <Icon icon="material-symbols:person-add" />
          </template>
          注册账户
        </a-button>
      </a-form-item>
    </a-form>

    <!-- 页面操作 -->
    <div class="page-actions">
      <p class="switch-text">
        已有账户？
        <router-link to="/auth/login" class="switch-link">立即登录</router-link>
      </p>
    </div>

    <!-- 用户协议模态框 -->
    <a-modal
      v-model:open="termsVisible"
      title="用户协议"
      :footer="null"
      width="600px"
      :bodyStyle="{ maxHeight: '400px', overflow: 'auto' }"
    >
      <div class="terms-content">
        <h3>1. 服务条款</h3>
        <p>欢迎使用"一句话呈所想"平台。通过使用我们的服务，您同意遵守以下条款...</p>

        <h3>2. 用户责任</h3>
        <p>用户应当对其使用本服务的行为负责，不得利用本服务从事违法或违规活动...</p>

        <h3>3. 知识产权</h3>
        <p>用户通过本平台生成的内容归用户所有，平台不会声明对用户内容的所有权...</p>

        <h3>4. 免责声明</h3>
        <p>平台提供的AI生成服务仅供参考，用户应当对生成内容的使用承担责任...</p>
      </div>
    </a-modal>

    <!-- 隐私政策模态框 -->
    <a-modal
      v-model:open="privacyVisible"
      title="隐私政策"
      :footer="null"
      width="600px"
      :bodyStyle="{ maxHeight: '400px', overflow: 'auto' }"
    >
      <div class="terms-content">
        <h3>1. 信息收集</h3>
        <p>我们收集您提供的注册信息，包括账号、邮箱等基本信息...</p>

        <h3>2. 信息使用</h3>
        <p>我们使用收集的信息为您提供服务、改进产品体验和确保账户安全...</p>

        <h3>3. 信息保护</h3>
        <p>我们采用行业标准的安全措施保护您的个人信息，不会向第三方泄露...</p>

        <h3>4. Cookie使用</h3>
        <p>我们使用Cookie来改善用户体验，您可以在浏览器中管理Cookie设置...</p>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, h } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons-vue'
import { message } from 'ant-design-vue'
import { userRegister } from '@/api/userManagement'
import type { Rule } from 'ant-design-vue/es/form'

const router = useRouter()

// 表单引用
const formRef = ref()

// 注册表单数据
const formData = reactive({
  userAccount: '',
  userPassword: '',
  checkPassword: '',
  userName: '',
  userEmail: '',
})

// 表单验证规则
const formRules: Record<string, Rule[]> = {
  userAccount: [
    { required: true, message: '请输入账号', trigger: 'blur' },
    { min: 3, max: 20, message: '账号长度为3-20个字符', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9_]+$/,
      message: '账号只能包含字母、数字和下划线',
      trigger: 'blur',
    },
  ],
  userPassword: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 50, message: '密码长度为6-50个字符', trigger: 'blur' },
  ],
  checkPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (_, value) => {
        if (value !== formData.userPassword) {
          return Promise.reject('两次输入的密码不一致')
        }
        return Promise.resolve()
      },
      trigger: 'blur',
    },
  ],
  userName: [{ max: 20, message: '昵称不能超过20个字符', trigger: 'blur' }],
  userEmail: [{ type: 'email', message: '请输入有效的邮箱地址', trigger: 'blur' }],
  agreement: [
    {
      validator: (_, value) => {
        if (!agreementChecked.value) {
          return Promise.reject('请同意用户协议和隐私政策')
        }
        return Promise.resolve()
      },
      trigger: 'change',
    },
  ],
}

// 其他状态
const isRegistering = ref(false)
const agreementChecked = ref(false)
const termsVisible = ref(false)
const privacyVisible = ref(false)

// 处理注册
const handleRegister = async (values: any) => {
  try {
    isRegistering.value = true
    const response = await userRegister(values)

    if (response.data?.success) {
      message.success('注册成功！请登录您的账户')
      router.push({ name: 'Login' })
    } else {
      message.error(response.data?.message || '注册失败')
    }
  } catch (error: any) {
    console.error('注册失败:', error)
    message.error(error?.response?.data?.message || '注册失败')
  } finally {
    isRegistering.value = false
  }
}

// 显示用户协议
const showTerms = () => {
  termsVisible.value = true
}

// 显示隐私政策
const showPrivacy = () => {
  privacyVisible.value = true
}
</script>

<style scoped>
.register-page {
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

.register-form {
  margin-bottom: var(--spacing-md);
}

.form-input {
  border-radius: var(--border-radius-sm);
}

.terms-link {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.terms-link:hover {
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

.submit-btn:hover:not(:disabled) {
  background: #1677ff;
  border-color: #1677ff;
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
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

.terms-content {
  line-height: 1.6;
}

.terms-content h3 {
  color: var(--color-text);
  font-size: 16px;
  margin: var(--spacing-md) 0 var(--spacing-xs) 0;
}

.terms-content h3:first-child {
  margin-top: 0;
}

.terms-content p {
  color: var(--color-text-light);
  font-size: 14px;
  margin: 0 0 var(--spacing-sm) 0;
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
.register-form {
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
