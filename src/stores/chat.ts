import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { addChatHistory, getChatContext } from '@/api/chatHistoryController'
import { retryGenerate } from '@/api/chatHistoryController'
import { message as AntdMessage } from 'ant-design-vue'

export interface ChatMessage extends API.ChatHistory {
  isStreaming?: boolean
  error?: string
}

export const useChatStore = defineStore('chat', () => {
  // 状态
  const messages = ref<ChatMessage[]>([])
  const currentAppId = ref<number | null>(null)
  const isGenerating = ref(false)
  const currentStreamingMessage = ref<string>('')
  const lastUserMessageId = ref<number | null>(null)

  // 计算属性
  const messagesCount = computed(() => messages.value.length)
  const hasMessages = computed(() => messages.value.length > 0)
  const canRetry = computed(() => lastUserMessageId.value !== null && !isGenerating.value)

  // 操作方法

  // 设置当前应用ID
  const setCurrentAppId = (appId: number) => {
    if (currentAppId.value !== appId) {
      currentAppId.value = appId
      messages.value = []
      lastUserMessageId.value = null
    }
  }

  // 加载聊天历史
  const loadChatHistory = async (appId: number, maxCount = 50) => {
    try {
      const response = await getChatContext({ appId, maxCount })

      if (response.code === 0 && response.data) {
        // 按时间排序，确保消息顺序正确
        const sortedMessages = response.data.sort((a: API.ChatHistory, b: API.ChatHistory) => {
          const timeA = new Date(a.createTime || 0).getTime()
          const timeB = new Date(b.createTime || 0).getTime()
          return timeA - timeB
        })

        messages.value = sortedMessages

        // 找到最后一个用户消息
        for (let i = sortedMessages.length - 1; i >= 0; i--) {
          if (sortedMessages[i].messageType === 'user') {
            lastUserMessageId.value = sortedMessages[i].id || null
            break
          }
        }

        return { success: true, data: sortedMessages }
      } else {
        AntdMessage.error(response.message || '加载聊天历史失败')
      }
    } catch (error: any) {
      console.error('加载聊天历史失败:', error)
      return { success: false, message: '加载聊天历史失败' }
    }
  }

  // 发送用户消息
  const sendUserMessage = async (message: string, appId: number) => {
    if (!message.trim() || isGenerating.value)
      return { success: false, message: '消息不能为空或正在生成中' }

    try {
      // 添加用户消息到本地状态
      const tempUserMessage: ChatMessage = {
        id: Date.now(), // 临时ID
        message: message.trim(),
        messageType: 'user',
        appId,
        createTime: new Date().toISOString(),
      }

      messages.value.push(tempUserMessage)

      // 保存到服务器
      const response = await addChatHistory({
        message: message.trim(),
        messageType: 'user',
        appId,
        parentId: lastUserMessageId.value || undefined,
      })

      if (response.code === 0 && response.data) {
        // 更新临时消息的真实ID
        const messageIndex = messages.value.findIndex((msg) => msg.id === tempUserMessage.id)
        if (messageIndex !== -1) {
          messages.value[messageIndex].id = response.data
        }
        lastUserMessageId.value = response.data

        return { success: true, messageId: response.data }
      } else {
        // 如果保存失败，移除临时消息
        messages.value.pop()
        throw new Error(response.message || '发送消息失败')
      }
    } catch (error: any) {
      console.error('发送用户消息失败:', error)
      return { success: false, message: '发送消息失败' }
    }
  }

  // 开始流式生成AI回复
  const startStreamingResponse = (appId: number, userMessageId: number) => {
    if (isGenerating.value) return

    isGenerating.value = true
    currentStreamingMessage.value = ''

    // 添加AI消息占位符
    const aiMessage: ChatMessage = {
      id: Date.now(), // 临时ID
      message: '',
      messageType: 'ai',
      appId,
      parentId: userMessageId,
      isStreaming: true,
      createTime: new Date().toISOString(),
    }

    messages.value.push(aiMessage)
    return aiMessage
  }

  // 更新流式消息内容
  const updateStreamingMessage = (content: string) => {
    currentStreamingMessage.value = content

    // 更新最后一条AI消息
    const lastMessage = messages.value[messages.value.length - 1]
    if (lastMessage && lastMessage.messageType === 'ai' && lastMessage.isStreaming) {
      lastMessage.message = content
    }
  }

  // 完成流式生成
  const finishStreamingResponse = async (
    appId: number,
    userMessageId: number,
    finalContent: string,
  ) => {
    try {
      // 保存AI回复到服务器
      const response = await addChatHistory({
        message: finalContent,
        messageType: 'ai',
        appId,
        parentId: userMessageId,
      })

      if (response.code === 0 && response.data) {
        // 更新最后一条AI消息
        const lastMessage = messages.value[messages.value.length - 1]
        if (lastMessage && lastMessage.messageType === 'ai' && lastMessage.isStreaming) {
          lastMessage.id = response.data
          lastMessage.message = finalContent
          lastMessage.isStreaming = false
          delete lastMessage.error
        }

        return { success: true, messageId: response.data }
      } else {
        AntdMessage.error(response.message || '保存AI回复失败')
      }
    } catch (error: any) {
      console.error('保存AI回复失败:', error)

      // 标记错误
      const lastMessage = messages.value[messages.value.length - 1]
      if (lastMessage && lastMessage.messageType === 'ai' && lastMessage.isStreaming) {
        lastMessage.isStreaming = false
        lastMessage.error = '保存回复失败'
      }

      return { success: false, message: '保存AI回复失败' }
    } finally {
      isGenerating.value = false
      currentStreamingMessage.value = ''
    }
  }

  // 处理生成错误
  const handleGenerationError = (error: string) => {
    const lastMessage = messages.value[messages.value.length - 1]
    if (lastMessage && lastMessage.messageType === 'ai' && lastMessage.isStreaming) {
      lastMessage.isStreaming = false
      lastMessage.error = error
      lastMessage.message = '生成失败，请重试'
    }

    isGenerating.value = false
    currentStreamingMessage.value = ''
  }

  // 重新生成AI回复
  const retryLastResponse = async (appId: number) => {
    if (!lastUserMessageId.value || isGenerating.value) {
      return { success: false, message: '无法重试' }
    }

    try {
      // 移除最后一条AI消息（如果存在且是错误的）
      const lastMessage = messages.value[messages.value.length - 1]
      if (
        lastMessage &&
        lastMessage.messageType === 'ai' &&
        (lastMessage.error || lastMessage.isStreaming)
      ) {
        messages.value.pop()
      }

      // 调用重试API，这会返回流式响应
      const response = await retryGenerate({
        userMessageId: lastUserMessageId.value,
        appId,
      })

      return { success: true }
    } catch (error: any) {
      console.error('重试失败:', error)
      return { success: false, message: '重试失败' }
    }
  }

  // 清空聊天记录
  const clearMessages = () => {
    messages.value = []
    currentAppId.value = null
    lastUserMessageId.value = null
    isGenerating.value = false
    currentStreamingMessage.value = ''
  }

  // 删除指定消息
  const removeMessage = (messageId: number) => {
    const index = messages.value.findIndex((msg) => msg.id === messageId)
    if (index !== -1) {
      messages.value.splice(index, 1)
    }
  }

  return {
    // 状态
    messages,
    currentAppId,
    isGenerating,
    currentStreamingMessage,
    lastUserMessageId,

    // 计算属性
    messagesCount,
    hasMessages,
    canRetry,

    // 方法
    setCurrentAppId,
    loadChatHistory,
    sendUserMessage,
    startStreamingResponse,
    updateStreamingMessage,
    finishStreamingResponse,
    handleGenerationError,
    retryLastResponse,
    clearMessages,
    removeMessage,
  }
})
