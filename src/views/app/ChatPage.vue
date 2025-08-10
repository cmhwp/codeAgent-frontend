<template>
  <div class="chat-page">
    <!-- 顶部栏 -->
    <header class="chat-header">
      <div class="header-left">
        <a-button type="text" @click="goBack" class="back-btn">
          <Icon icon="material-symbols:arrow-back" />
        </a-button>
        <div class="app-info">
          <h1 class="app-name">{{ currentApp?.appName || '加载中...' }}</h1>
          <span class="app-type" v-if="currentApp?.codeGenType">
            {{ getCodeTypeName(currentApp.codeGenType) }}
          </span>
        </div>
      </div>

      <div class="header-right">
        <a-button
          type="primary"
          :loading="appStore.isDeploying"
          @click="deployApp"
          class="deploy-btn"
        >
          <Icon icon="material-symbols:cloud-upload" />
          部署应用
        </a-button>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="chat-main">
      <!-- 左侧对话区 -->
      <div class="chat-container">
        <div class="chat-messages" ref="messagesContainer">
          <!-- 消息列表 -->
          <div
            v-for="message in chatStore.messages"
            :key="message.id"
            class="message-item"
            :class="{
              'user-message': message.messageType === 'user',
              'ai-message': message.messageType === 'ai',
            }"
          >
            <div class="message-avatar">
              <img
                v-if="message.messageType === 'user'"
                :src="userStore.userAvatar"
                alt="用户头像"
                class="avatar"
              />
              <img v-else src="/src/assets/avatar-ai.svg" alt="AI头像" class="avatar" />
            </div>

            <div class="message-content">
              <div class="message-bubble">
                <!-- 正在输入指示器 -->
                <div v-if="message.isStreaming" class="typing-indicator">
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                  <div class="typing-dot"></div>
                </div>

                <!-- 消息内容 -->
                <div
                  v-else
                  class="message-text"
                  v-html="formatMessage(message.message || '')"
                ></div>

                <!-- 错误状态 -->
                <div v-if="message.error" class="message-error">
                  <Icon icon="material-symbols:error" />
                  <span>{{ message.error }}</span>
                  <a-button type="link" size="small" @click="retryMessage">重试</a-button>
                </div>
              </div>

              <div class="message-time">
                {{ formatTime(message.createTime) }}
              </div>
            </div>
          </div>

          <!-- 空状态 -->
          <div v-if="chatStore.messages.length === 0 && !chatStore.isGenerating" class="empty-chat">
            <div class="empty-illustration">
              <Icon icon="material-symbols:chat" />
            </div>
            <h3>开始对话</h3>
            <p>输入您的需求，AI将帮助您完善应用</p>
          </div>
        </div>

        <!-- 输入区域 -->
        <div class="chat-input-container">
          <div class="input-wrapper">
            <a-textarea
              v-model:value="inputMessage"
              placeholder="描述你想要添加的功能或修改..."
              :auto-size="{ minRows: 1, maxRows: 4 }"
              :maxlength="500"
              @keydown.enter.exact.prevent="sendMessage"
              @keydown.ctrl.enter.exact="addNewLine"
              class="chat-input"
            />
            <div class="input-actions">
              <a-button
                type="primary"
                :loading="chatStore.isGenerating"
                :disabled="!inputMessage.trim()"
                @click="sendMessage"
                class="send-btn"
              >
                <Icon icon="material-symbols:send" />
              </a-button>
            </div>
          </div>
          <div class="input-hint">按 Enter 发送，Ctrl + Enter 换行</div>
        </div>
      </div>

      <!-- 右侧预览区 -->
      <div class="preview-container">
        <div class="preview-header">
          <h3 class="preview-title">实时预览</h3>
          <div class="preview-actions">
            <a-button type="text" size="small" @click="refreshPreview">
              <Icon icon="material-symbols:refresh" />
            </a-button>
            <a-button type="text" size="small" @click="openInNewTab" v-if="previewUrl">
              <Icon icon="material-symbols:open-in-new" />
            </a-button>
          </div>
        </div>

        <div class="preview-content">
          <!-- 加载状态 -->
          <div v-if="!previewUrl || chatStore.isGenerating" class="preview-loading">
            <img src="/src/assets/loading-spinner.svg" alt="加载中" class="loading-spinner" />
            <p>{{ chatStore.isGenerating ? '正在生成代码...' : '初始化预览...' }}</p>
          </div>

          <!-- 预览iframe -->
          <iframe
            v-else
            :src="previewUrl"
            class="preview-frame"
            @load="handlePreviewLoad"
            @error="handlePreviewError"
          ></iframe>

          <!-- 错误状态 -->
          <div v-if="previewError" class="preview-error">
            <Icon icon="material-symbols:error" />
            <p>预览加载失败</p>
            <a-button type="primary" @click="refreshPreview">重新加载</a-button>
          </div>
        </div>
      </div>
    </main>

    <!-- 部署成功模态框 -->
    <a-modal v-model:open="deployModalVisible" title="部署成功" :footer="null" width="500px">
      <div class="deploy-success">
        <div class="success-icon">
          <Icon icon="material-symbols:check-circle" />
        </div>
        <h3>应用部署成功！</h3>
        <p>您的应用已成功部署，可以通过以下链接访问：</p>

        <div class="deploy-url">
          <a-input :value="deployedUrl" readonly class="url-input" />
          <a-button @click="copyDeployUrl" class="copy-btn">
            <Icon icon="material-symbols:content-copy" />
            复制
          </a-button>
        </div>

        <div class="deploy-actions">
          <a-button @click="openDeployedApp" type="primary">
            <Icon icon="material-symbols:open-in-new" />
            打开应用
          </a-button>
          <a-button @click="deployModalVisible = false"> 知道了 </a-button>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { message as messageAntd } from 'ant-design-vue'
import { useUserStore, useAppStore, useChatStore } from '@/stores'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const appStore = useAppStore()
const chatStore = useChatStore()

// 状态
const inputMessage = ref('')
const messagesContainer = ref<HTMLElement>()
const previewUrl = ref('')
const previewError = ref(false)
const deployModalVisible = ref(false)
const deployedUrl = ref('')

// 计算属性
const appId = computed(() => Number(route.params.id))
const currentApp = computed(() => appStore.currentApp)

// 页面初始化
onMounted(async () => {
  if (appId.value) {
    // 设置当前应用ID
    chatStore.setCurrentAppId(appId.value)

    // 并行加载应用详情和聊天历史
    await Promise.all([loadAppDetail(), loadChatHistory()])

    // 如果没有聊天记录，自动发送初始prompt
    if (chatStore.messages.length === 0 && currentApp.value?.initPrompt) {
      await sendInitialMessage()
    }

    // 初始化预览
    updatePreviewUrl()
  }
})

// 监听消息变化，自动滚动到底部
watch(
  () => chatStore.messages.length,
  () => {
    nextTick(() => {
      scrollToBottom()
    })
  },
)

// 监听生成状态，更新预览
watch(
  () => chatStore.isGenerating,
  (isGenerating) => {
    if (!isGenerating) {
      updatePreviewUrl()
    }
  },
)

// 加载应用详情
const loadAppDetail = async () => {
  try {
    await appStore.fetchAppDetail(appId.value)
  } catch (error) {
    console.error('加载应用详情失败:', error)
    messageAntd.error('加载应用详情失败')
    router.push({ name: 'Home' })
  }
}

// 加载聊天历史
const loadChatHistory = async () => {
  try {
    await chatStore.loadChatHistory(appId.value)
  } catch (error) {
    console.error('加载聊天历史失败:', error)
  }
}

// 发送初始消息
const sendInitialMessage = async () => {
  if (!currentApp.value?.initPrompt) return

  try {
    // 发送用户消息
    const result = await chatStore.sendUserMessage(currentApp.value.initPrompt, appId.value)

    if (result?.success && result?.messageId) {
      // 开始流式生成AI回复
      await generateAIResponse(result?.messageId)
    }
  } catch (error) {
    console.error('发送初始消息失败:', error)
  }
}

// 发送消息
const sendMessage = async () => {
  if (!inputMessage.value.trim() || chatStore.isGenerating) return

  const message = inputMessage.value.trim()
  inputMessage.value = ''

  try {
    // 发送用户消息
    const result = await chatStore.sendUserMessage(message, appId.value)

    if (result?.success && result?.messageId) {
      // 开始流式生成AI回复
      await generateAIResponse(result?.messageId)
    } else {
      messageAntd.error(result?.message || '发送消息失败')
    }
  } catch (error) {
    console.error('发送消息失败:', error)
    messageAntd.error('发送消息失败')
  }
}

// 生成AI回复
const generateAIResponse = async (userMessageId: number) => {
  try {
    // 创建AI消息占位符
    const aiMessage = chatStore.startStreamingResponse(appId.value, userMessageId)

    // 这里应该调用流式API
    // 由于流式响应比较复杂，这里简化处理
    // 实际项目中需要使用EventSource或WebSocket

    // 模拟流式响应
    await simulateStreamingResponse(userMessageId)
  } catch (error) {
    console.error('生成AI回复失败:', error)
    chatStore.handleGenerationError('生成失败，请重试')
  }
}

// 模拟流式响应（实际项目中需要替换为真实的流式API调用）
const simulateStreamingResponse = async (userMessageId: number) => {
  const responses = [
    '我理解您的需求，让我来帮您实现这个功能。',
    '正在分析您的需求...',
    '开始生成代码...',
    '功能已添加完成！您可以在右侧预览中查看效果。',
  ]

  let fullResponse = ''

  for (const response of responses) {
    await new Promise((resolve) => setTimeout(resolve, 800))
    fullResponse += (fullResponse ? ' ' : '') + response
    chatStore.updateStreamingMessage(fullResponse)
  }

  // 完成流式生成
  await chatStore.finishStreamingResponse(appId.value, userMessageId, fullResponse)
}

// 添加换行
const addNewLine = () => {
  inputMessage.value += '\n'
}

// 重试消息
const retryMessage = async () => {
  try {
    await chatStore.retryLastResponse(appId.value)
  } catch (error) {
    console.error('重试失败:', error)
    messageAntd.error('重试失败')
  }
}

// 滚动到底部
const scrollToBottom = () => {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 格式化消息
const formatMessage = (text: string) => {
  // 简单的文本格式化，实际项目中可能需要更复杂的处理
  return text.replace(/\n/g, '<br>')
}

// 格式化时间
const formatTime = (time?: string) => {
  if (!time) return ''

  const date = new Date(time)
  return date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

// 获取代码类型名称
const getCodeTypeName = (type: string) => {
  const names: Record<string, string> = {
    html: 'HTML应用',
    multi_file: '多文件应用',
    react: 'React应用',
    vue: 'Vue应用',
  }
  return names[type] || type.toUpperCase()
}

// 更新预览URL
const updatePreviewUrl = () => {
  if (currentApp.value?.id && currentApp.value?.codeGenType) {
    previewUrl.value = `http://localhost:8123/api/static/${currentApp.value.codeGenType}_${currentApp.value.id}/`
    previewError.value = false
  }
}

// 刷新预览
const refreshPreview = () => {
  updatePreviewUrl()
  // 强制刷新iframe
  const iframe = document.querySelector('.preview-frame') as HTMLIFrameElement
  if (iframe) {
    iframe.src = iframe.src
  }
}

// 在新标签页打开预览
const openInNewTab = () => {
  if (previewUrl.value) {
    window.open(previewUrl.value, '_blank')
  }
}

// 处理预览加载
const handlePreviewLoad = () => {
  previewError.value = false
}

// 处理预览错误
const handlePreviewError = () => {
  previewError.value = true
}

// 部署应用
const deployApp = async () => {
  if (!currentApp.value?.id) return

  try {
    const result = await appStore.deployAppToServer(currentApp.value.id)

    if (result?.success && result?.url) {
      deployedUrl.value = result?.url
      deployModalVisible.value = true
      messageAntd.success('应用部署成功！')
    } else {
      messageAntd.error(result?.message || '部署失败')
    }
  } catch (error) {
    console.error('部署失败:', error)
    messageAntd.error('部署失败')
  }
}

// 复制部署URL
const copyDeployUrl = async () => {
  try {
    await navigator.clipboard.writeText(deployedUrl.value)
    messageAntd.success('链接已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
    messageAntd.error('复制失败')
  }
}

// 打开已部署的应用
const openDeployedApp = () => {
  if (deployedUrl.value) {
    window.open(deployedUrl.value, '_blank')
  }
}

// 返回上一页
const goBack = () => {
  router.back()
}
</script>

<style scoped>
.chat-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--color-bg-light);
}

/* 顶部栏 */
.chat-header {
  height: 64px;
  background: var(--color-white);
  border-bottom: 1px solid var(--color-border);
  padding: 0 var(--spacing-md);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-light);
  z-index: 10;
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

.app-info {
  display: flex;
  flex-direction: column;
}

.app-name {
  font-size: 18px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0;
  line-height: 1.2;
}

.app-type {
  font-size: 12px;
  color: var(--color-text-light);
}

.deploy-btn {
  height: 36px;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
}

/* 主要内容区 */
.chat-main {
  flex: 1;
  display: flex;
  min-height: 0;
}

/* 左侧对话区 */
.chat-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  background: var(--color-white);
  border-right: 1px solid var(--color-border);
}

.chat-messages {
  flex: 1;
  padding: var(--spacing-md);
  overflow-y: auto;
  scroll-behavior: smooth;
}

/* 消息项 */
.message-item {
  display: flex;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.message-item.user-message {
  flex-direction: row-reverse;
}

.message-avatar {
  flex-shrink: 0;
}

.avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
}

.message-content {
  flex: 1;
  max-width: 70%;
}

.user-message .message-content {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.message-bubble {
  background: var(--color-bg-light);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-sm) var(--spacing-md);
  position: relative;
}

.user-message .message-bubble {
  background: var(--color-primary);
  color: var(--color-white);
}

.ai-message .message-bubble {
  background: var(--color-white);
  border: 1px solid var(--color-border);
}

.message-text {
  line-height: 1.5;
  word-wrap: break-word;
}

.message-time {
  font-size: 12px;
  color: var(--color-text-light);
  margin-top: 4px;
}

.user-message .message-time {
  text-align: right;
}

/* 输入指示器 */
.typing-indicator {
  display: flex;
  gap: 4px;
  align-items: center;
}

.typing-dot {
  width: 6px;
  height: 6px;
  background: var(--color-text-light);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.typing-dot:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%,
  60%,
  100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
}

/* 错误状态 */
.message-error {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: #ff4d4f;
  font-size: 12px;
  margin-top: 4px;
}

/* 空状态 */
.empty-chat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-light);
  text-align: center;
}

.empty-illustration {
  font-size: 48px;
  margin-bottom: var(--spacing-md);
  opacity: 0.5;
}

.empty-chat h3 {
  font-size: 18px;
  margin: 0 0 var(--spacing-xs) 0;
}

.empty-chat p {
  font-size: 14px;
  margin: 0;
}

/* 输入区域 */
.chat-input-container {
  border-top: 1px solid var(--color-border);
  padding: var(--spacing-md);
  background: var(--color-white);
}

.input-wrapper {
  display: flex;
  gap: var(--spacing-sm);
  align-items: flex-end;
}

.chat-input {
  flex: 1;
  border-radius: var(--border-radius-sm);
}

.send-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.input-hint {
  font-size: 12px;
  color: var(--color-text-light);
  margin-top: 4px;
  text-align: center;
}

/* 右侧预览区 */
.preview-container {
  width: 50%;
  display: flex;
  flex-direction: column;
  background: var(--color-white);
}

.preview-header {
  height: 48px;
  padding: 0 var(--spacing-md);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: var(--color-bg-light);
}

.preview-title {
  font-size: 14px;
  font-weight: 500;
  color: var(--color-text);
  margin: 0;
}

.preview-actions {
  display: flex;
  gap: var(--spacing-xs);
}

.preview-content {
  flex: 1;
  position: relative;
  background: var(--color-white);
}

.preview-frame {
  width: 100%;
  height: 100%;
  border: none;
}

/* 预览加载状态 */
.preview-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-light);
}

.loading-spinner {
  width: 48px;
  height: 48px;
  margin-bottom: var(--spacing-md);
}

/* 预览错误状态 */
.preview-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--color-text-light);
  text-align: center;
}

.preview-error svg {
  font-size: 48px;
  color: #ff4d4f;
  margin-bottom: var(--spacing-md);
}

/* 部署成功模态框 */
.deploy-success {
  text-align: center;
  padding: var(--spacing-md);
}

.success-icon {
  font-size: 64px;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-md);
}

.deploy-success h3 {
  font-size: 20px;
  color: var(--color-text);
  margin: 0 0 var(--spacing-sm) 0;
}

.deploy-success p {
  color: var(--color-text-light);
  margin: 0 0 var(--spacing-md) 0;
}

.deploy-url {
  display: flex;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.url-input {
  flex: 1;
}

.deploy-actions {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chat-main {
    flex-direction: column;
  }

  .chat-container,
  .preview-container {
    width: 100%;
  }

  .chat-container {
    height: 60vh;
  }

  .preview-container {
    height: 40vh;
    border-top: 1px solid var(--color-border);
    border-right: none;
  }

  .app-name {
    font-size: 16px;
  }

  .header-right {
    display: none;
  }
}

@media (max-width: 480px) {
  .chat-header {
    padding: 0 var(--spacing-sm);
  }

  .chat-messages {
    padding: var(--spacing-sm);
  }

  .chat-input-container {
    padding: var(--spacing-sm);
  }

  .message-content {
    max-width: 80%;
  }
}
</style>
