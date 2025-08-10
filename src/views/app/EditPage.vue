<template>
  <div class="edit-page">
    <!-- 页面头部 -->
    <header class="edit-header">
      <div class="container">
        <div class="header-content">
          <div class="header-left">
            <a-button type="text" @click="goBack" class="back-btn">
              <Icon icon="material-symbols:arrow-back" />
            </a-button>
            <h1 class="page-title">编辑应用</h1>
          </div>

          <div class="header-right">
            <a-button @click="goBack">取消</a-button>
            <a-button type="primary" :loading="isLoading" @click="saveApp"> 保存更改 </a-button>
          </div>
        </div>
      </div>
    </header>

    <!-- 表单内容 -->
    <main class="edit-main">
      <div class="container">
        <div class="edit-form-container">
          <a-form
            ref="formRef"
            :model="formData"
            :rules="formRules"
            layout="vertical"
            class="edit-form"
          >
            <!-- 基础信息 -->
            <div class="form-section">
              <h3 class="section-title">基础信息</h3>

              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="应用ID" name="id">
                    <a-input :value="formData.id" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="创建时间" name="createTime">
                    <a-input :value="formatDateTime(formData.createTime)" disabled />
                  </a-form-item>
                </a-col>
              </a-row>

              <a-form-item label="应用名称" name="appName">
                <a-input
                  v-model:value="formData.appName"
                  placeholder="请输入应用名称"
                  :maxlength="50"
                  show-count
                />
              </a-form-item>

              <a-form-item label="应用描述" name="initPrompt" v-if="userStore.isAdmin">
                <a-textarea
                  v-model:value="formData.initPrompt"
                  placeholder="请输入应用描述"
                  :auto-size="{ minRows: 3, maxRows: 6 }"
                  :maxlength="500"
                  show-count
                />
              </a-form-item>
            </div>

            <!-- 封面设置 -->
            <div class="form-section">
              <h3 class="section-title">封面设置</h3>

              <a-form-item label="封面图片" name="cover">
                <div class="cover-upload">
                  <div class="cover-preview">
                    <img
                      :src="formData.cover || getDefaultCover()"
                      alt="封面预览"
                      class="cover-image"
                    />
                    <div class="cover-overlay">
                      <Icon icon="material-symbols:edit" />
                    </div>
                  </div>

                  <div class="cover-actions">
                    <a-input
                      v-model:value="formData.cover"
                      placeholder="请输入封面图片URL"
                      class="cover-url-input"
                    />
                    <a-button @click="resetCover">重置为默认</a-button>
                  </div>
                </div>
              </a-form-item>
            </div>

            <!-- 高级设置（仅管理员） -->
            <div class="form-section" v-if="userStore.isAdmin">
              <h3 class="section-title">高级设置</h3>

              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="代码生成类型" name="codeGenType">
                    <a-select v-model:value="formData.codeGenType" placeholder="选择生成类型">
                      <a-select-option value="html">HTML页面</a-select-option>
                      <a-select-option value="multi_file">多文件应用</a-select-option>
                      <a-select-option value="react">React应用</a-select-option>
                      <a-select-option value="vue">Vue应用</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="优先级" name="priority">
                    <a-input-number
                      v-model:value="formData.priority"
                      :min="0"
                      :max="100"
                      placeholder="数值越大优先级越高"
                      style="width: 100%"
                    />
                    <div class="field-hint">优先级大于50的应用将显示在精选区域</div>
                  </a-form-item>
                </a-col>
              </a-row>

              <a-form-item label="创建者ID" name="userId">
                <a-input-number
                  v-model:value="formData.userId"
                  :min="1"
                  placeholder="请输入创建者用户ID"
                  style="width: 100%"
                />
              </a-form-item>
            </div>

            <!-- 部署信息 -->
            <div class="form-section" v-if="formData.deployKey">
              <h3 class="section-title">部署信息</h3>

              <a-row :gutter="16">
                <a-col :span="12">
                  <a-form-item label="部署标识">
                    <a-input :value="formData.deployKey" disabled />
                  </a-form-item>
                </a-col>
                <a-col :span="12">
                  <a-form-item label="部署时间">
                    <a-input :value="formatDateTime(formData.deployedTime)" disabled />
                  </a-form-item>
                </a-col>
              </a-row>
            </div>
          </a-form>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { message } from 'ant-design-vue'
import { useUserStore, useAppStore } from '@/stores'
import type { Rule } from 'ant-design-vue/es/form'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()

// 状态
const formRef = ref()
const isLoading = ref(false)

// 表单数据
const formData = reactive({
  id: 0,
  appName: '',
  cover: '',
  initPrompt: '',
  codeGenType: 'html',
  priority: 0,
  userId: 0,
  deployKey: '',
  deployedTime: '',
  createTime: '',
})

// 表单验证规则
const formRules: Record<string, Rule[]> = {
  appName: [
    { required: true, message: '请输入应用名称', trigger: 'blur' },
    { min: 1, max: 50, message: '应用名称长度为1-50个字符', trigger: 'blur' },
  ],
  initPrompt: [{ max: 500, message: '应用描述不能超过500个字符', trigger: 'blur' }],
  cover: [{ type: 'url', message: '请输入有效的URL地址', trigger: 'blur' }],
  priority: [{ type: 'number', min: 0, max: 100, message: '优先级范围为0-100', trigger: 'blur' }],
  userId: [{ type: 'number', min: 1, message: '请输入有效的用户ID', trigger: 'blur' }],
}

// 应用ID
const appId = Number(route.params.id)

// 页面初始化
onMounted(async () => {
  await loadAppData()
})

// 加载应用数据
const loadAppData = async () => {
  try {
    isLoading.value = true

    const result = userStore.isAdmin
      ? await appStore.fetchAppDetail(appId) // 管理员使用admin接口
      : await appStore.fetchAppDetail(appId) // 普通用户使用普通接口

    if (result.success && result.data) {
      const app = result.data
      Object.assign(formData, {
        id: app.id,
        appName: app.appName,
        cover: app.cover,
        initPrompt: app.initPrompt,
        codeGenType: app.codeGenType,
        priority: app.priority,
        userId: app.userId,
        deployKey: app.deployKey,
        deployedTime: app.deployedTime,
        createTime: app.createTime,
      })
    } else {
      message.error('加载应用数据失败')
      goBack()
    }
  } catch (error) {
    console.error('加载应用数据失败:', error)
    message.error('加载应用数据失败')
    goBack()
  } finally {
    isLoading.value = false
  }
}

// 保存应用
const saveApp = async () => {
  try {
    await formRef.value.validate()

    isLoading.value = true

    // 准备更新数据（仅包含可编辑的字段）
    const updateData: Partial<API.AppUpdateRequest> = {
      id: formData.id,
      appName: formData.appName,
      cover: formData.cover || undefined,
    }

    // 如果是管理员，可以编辑更多字段
    if (userStore.isAdmin) {
      Object.assign(updateData, {
        initPrompt: formData.initPrompt,
        codeGenType: formData.codeGenType,
        priority: formData.priority,
        userId: formData.userId,
      })
    }

    const result = await appStore.updateAppInfo(appId, updateData as API.AppUpdateRequest)

    if (result.success) {
      message.success('保存成功')
      goBack()
    } else {
      message.error(result.message || '保存失败')
    }
  } catch (error) {
    console.error('保存失败:', error)
  } finally {
    isLoading.value = false
  }
}

// 获取默认封面
const getDefaultCover = () => {
  const covers = [
    '/src/assets/cover-default-1.svg',
    '/src/assets/cover-default-2.svg',
    '/src/assets/cover-default-3.svg',
  ]
  return covers[appId % covers.length]
}

// 重置封面
const resetCover = () => {
  formData.cover = ''
}

// 格式化日期时间
const formatDateTime = (datetime?: string) => {
  if (!datetime) return '-'

  return new Date(datetime).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.edit-page {
  min-height: 100vh;
  background: var(--color-bg-light);
}

/* 页面头部 */
.edit-header {
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  padding: var(--spacing-md) 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: var(--shadow-light);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-left {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
}

.back-btn {
  color: var(--color-text-light);
}

.back-btn:hover {
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
  gap: var(--spacing-sm);
}

/* 主要内容 */
.edit-main {
  padding: var(--spacing-lg) 0;
}

.edit-form-container {
  max-width: 800px;
  margin: 0 auto;
  background: var(--color-white);
  border-radius: var(--border-radius-md);
  box-shadow: var(--shadow-light);
  padding: var(--spacing-lg);
}

/* 表单区块 */
.form-section {
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--color-border);
}

.form-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 var(--spacing-md) 0;
  padding-bottom: var(--spacing-xs);
  border-bottom: 2px solid var(--color-primary);
  display: inline-block;
}

/* 封面设置 */
.cover-upload {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
}

.cover-preview {
  position: relative;
  width: 200px;
  height: 120px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: all 0.2s ease;
}

.cover-preview:hover {
  border-color: var(--color-primary);
}

.cover-preview:hover .cover-overlay {
  opacity: 1;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.cover-actions {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
}

.cover-url-input {
  margin-bottom: var(--spacing-xs);
}

/* 字段提示 */
.field-hint {
  font-size: 12px;
  color: var(--color-text-light);
  margin-top: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .edit-form-container {
    margin: 0 var(--spacing-sm);
    padding: var(--spacing-md);
  }

  .header-content {
    padding: 0 var(--spacing-sm);
  }

  .cover-upload {
    flex-direction: column;
  }

  .cover-preview {
    width: 100%;
    max-width: 300px;
  }

  .header-right {
    flex-direction: column;
  }
}

@media (max-width: 480px) {
  .page-title {
    font-size: 16px;
  }

  .section-title {
    font-size: 16px;
  }

  .edit-form-container {
    padding: var(--spacing-sm);
  }
}

/* 表单动画 */
.edit-form-container {
  animation: fadeInUp 0.6s ease-out;
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
