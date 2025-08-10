<template>
  <div class="apps-management">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">应用管理</h1>
          <p class="page-description">管理系统中的所有应用，包括编辑、删除和设置精选</p>
        </div>

        <div class="header-actions">
          <a-button @click="refreshData" :loading="isLoading">
            <Icon icon="material-symbols:refresh" />
            刷新数据
          </a-button>
        </div>
      </div>
    </div>

    <!-- 搜索和筛选 -->
    <div class="search-section">
      <a-card>
        <a-form layout="inline" class="search-form">
          <a-form-item label="应用名称">
            <a-input
              v-model:value="searchParams.appName"
              placeholder="输入应用名称搜索"
              style="width: 200px"
              @pressEnter="searchApps"
            />
          </a-form-item>

          <a-form-item label="代码类型">
            <a-select
              v-model:value="searchParams.codeGenType"
              placeholder="选择代码类型"
              style="width: 150px"
              allowClear
            >
              <a-select-option value="html">HTML</a-select-option>
              <a-select-option value="multi_file">多文件</a-select-option>
              <a-select-option value="react">React</a-select-option>
              <a-select-option value="vue">Vue</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="创建者ID">
            <a-input-number
              v-model:value="searchParams.userId"
              placeholder="用户ID"
              style="width: 120px"
              :min="1"
            />
          </a-form-item>

          <a-form-item label="优先级">
            <a-select
              v-model:value="searchParams.priorityRange"
              placeholder="选择优先级"
              style="width: 120px"
              allowClear
            >
              <a-select-option value="featured">精选 (>50)</a-select-option>
              <a-select-option value="normal">普通 (≤50)</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="searchApps" :loading="isLoading">
              <Icon icon="material-symbols:search" />
              搜索
            </a-button>
            <a-button @click="resetSearch" style="margin-left: 8px"> 重置 </a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>

    <!-- 数据表格 -->
    <div class="table-section">
      <a-card>
        <template #title>
          <div class="table-header">
            <span>应用列表 (共 {{ pagination.total }} 条)</span>
            <div class="table-actions">
              <a-button
                type="primary"
                danger
                :disabled="selectedRowKeys.length === 0"
                @click="batchDelete"
              >
                <Icon icon="material-symbols:delete" />
                批量删除 ({{ selectedRowKeys.length }})
              </a-button>
            </div>
          </div>
        </template>

        <a-table
          :columns="columns"
          :data-source="appList"
          :pagination="tablePagination"
          :loading="isLoading"
          :row-selection="rowSelection"
          :scroll="{ x: 1200 }"
          row-key="id"
          @change="handleTableChange"
        >
          <!-- 封面预览 -->
          <template #cover="{ record }">
            <div class="cover-preview">
              <img
                :src="record.cover || getDefaultCover(record.id)"
                :alt="record.appName"
                class="cover-thumb"
              />
            </div>
          </template>

          <!-- 应用信息 -->
          <template #appInfo="{ record }">
            <div class="app-info">
              <div class="app-name">{{ record.appName || '未命名应用' }}</div>
              <div class="app-id">ID: {{ record.id }}</div>
              <div class="app-description" v-if="record.initPrompt">
                {{ truncateText(record.initPrompt, 50) }}
              </div>
            </div>
          </template>

          <!-- 代码类型 -->
          <template #codeType="{ record }">
            <a-tag :color="getCodeTypeColor(record.codeGenType)">
              {{ getCodeTypeName(record.codeGenType) }}
            </a-tag>
          </template>

          <!-- 优先级 -->
          <template #priority="{ record }">
            <div class="priority-cell">
              <a-tag v-if="record.priority > 50" color="gold">
                <Icon icon="material-symbols:star" />
                精选 ({{ record.priority }})
              </a-tag>
              <span v-else class="normal-priority">{{ record.priority || 0 }}</span>
            </div>
          </template>

          <!-- 创建者 -->
          <template #creator="{ record }">
            <div class="creator-info" v-if="record.user">
              <div class="creator-name">{{ record.user.userName || record.user.userAccount }}</div>
              <div class="creator-id">ID: {{ record.user.id }}</div>
            </div>
            <span v-else class="no-data">-</span>
          </template>

          <!-- 状态 -->
          <template #status="{ record }">
            <div class="status-cell">
              <a-tag v-if="record.deployedTime" color="green">
                <Icon icon="material-symbols:cloud-done" />
                已部署
              </a-tag>
              <a-tag v-else color="default">
                <Icon icon="material-symbols:cloud-off" />
                未部署
              </a-tag>
            </div>
          </template>

          <!-- 时间 -->
          <template #createTime="{ record }">
            <div class="time-cell">
              <div>{{ formatDate(record.createTime) }}</div>
              <div class="time-detail">{{ formatTime(record.createTime) }}</div>
            </div>
          </template>

          <!-- 操作 -->
          <template #actions="{ record }">
            <div class="action-buttons">
              <a-tooltip title="编辑应用">
                <a-button
                  type="text"
                  size="small"
                  @click="editApp(record)"
                  class="action-btn edit-btn"
                >
                  <Icon icon="material-symbols:edit" />
                </a-button>
              </a-tooltip>

              <a-tooltip title="设为精选">
                <a-button
                  type="text"
                  size="small"
                  @click="toggleFeatured(record)"
                  class="action-btn star-btn"
                  :class="{ featured: record.priority > 50 }"
                >
                  <Icon icon="material-symbols:star" />
                </a-button>
              </a-tooltip>

              <a-tooltip title="删除应用">
                <a-button
                  type="text"
                  size="small"
                  danger
                  @click="deleteApp(record)"
                  class="action-btn delete-btn"
                >
                  <Icon icon="material-symbols:delete" />
                </a-button>
              </a-tooltip>
            </div>
          </template>
        </a-table>
      </a-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Icon } from '@iconify/vue'
import { message, Modal } from 'ant-design-vue'
import {
  listAppVoByPageByAdmin as getAdminAppList,
  deleteAppByAdmin as deleteAdminApp,
  updateAppByAdmin as updateAdminApp,
} from '@/api/appManagement'
import type { API } from '@/api/typings'

const router = useRouter()

// 状态
const isLoading = ref(false)
const appList = ref<API.AppVO[]>([])
const selectedRowKeys = ref<number[]>([])

// 搜索参数
const searchParams = reactive({
  appName: '',
  codeGenType: '',
  userId: undefined as number | undefined,
  priorityRange: '',
})

// 分页参数
const pagination = reactive({
  current: 1,
  pageSize: 20,
  total: 0,
})

// 表格列定义
const columns = [
  {
    title: '封面',
    dataIndex: 'cover',
    key: 'cover',
    width: 80,
    slots: { customRender: 'cover' },
  },
  {
    title: '应用信息',
    dataIndex: 'appInfo',
    key: 'appInfo',
    width: 250,
    slots: { customRender: 'appInfo' },
  },
  {
    title: '类型',
    dataIndex: 'codeGenType',
    key: 'codeGenType',
    width: 100,
    slots: { customRender: 'codeType' },
  },
  {
    title: '优先级',
    dataIndex: 'priority',
    key: 'priority',
    width: 120,
    slots: { customRender: 'priority' },
    sorter: true,
  },
  {
    title: '创建者',
    dataIndex: 'creator',
    key: 'creator',
    width: 150,
    slots: { customRender: 'creator' },
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    width: 100,
    slots: { customRender: 'status' },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150,
    slots: { customRender: 'createTime' },
    sorter: true,
  },
  {
    title: '操作',
    key: 'actions',
    width: 150,
    fixed: 'right',
    slots: { customRender: 'actions' },
  },
]

// 表格分页配置
const tablePagination = computed(() => ({
  current: pagination.current,
  pageSize: pagination.pageSize,
  total: pagination.total,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total: number, range: number[]) => `第 ${range[0]}-${range[1]} 条，共 ${total} 条`,
}))

// 行选择配置
const rowSelection = computed(() => ({
  selectedRowKeys: selectedRowKeys.value,
  onChange: (keys: number[]) => {
    selectedRowKeys.value = keys
  },
  getCheckboxProps: (record: API.AppVO) => ({
    disabled: false,
    name: record.appName,
  }),
}))

// 页面初始化
onMounted(() => {
  loadAppList()
})

// 加载应用列表
const loadAppList = async () => {
  try {
    isLoading.value = true

    const params: API.AppQueryRequest = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      appName: searchParams.appName || undefined,
      codeGenType: searchParams.codeGenType || undefined,
      userId: searchParams.userId || undefined,
    }

    // 处理优先级范围
    if (searchParams.priorityRange === 'featured') {
      params.priority = 51 // 大于50的会在后端处理
    } else if (searchParams.priorityRange === 'normal') {
      params.priority = 50 // 小于等于50的会在后端处理
    }

    const response = await getAdminAppList(params)

    if (response.data?.success && response.data.data) {
      const { records = [], total = 0, current = 1 } = response.data.data
      appList.value = records
      pagination.total = total
      pagination.current = current
    } else {
      message.error(response.data?.message || '加载应用列表失败')
    }
  } catch (error) {
    console.error('加载应用列表失败:', error)
    message.error('加载应用列表失败')
  } finally {
    isLoading.value = false
  }
}

// 搜索应用
const searchApps = () => {
  pagination.current = 1
  loadAppList()
}

// 重置搜索
const resetSearch = () => {
  Object.assign(searchParams, {
    appName: '',
    codeGenType: '',
    userId: undefined,
    priorityRange: '',
  })
  pagination.current = 1
  loadAppList()
}

// 刷新数据
const refreshData = () => {
  loadAppList()
}

// 处理表格变化
const handleTableChange = (paginationInfo: any, filters: any, sorter: any) => {
  pagination.current = paginationInfo.current
  pagination.pageSize = paginationInfo.pageSize

  // TODO: 处理排序
  if (sorter.field) {
    console.log('排序:', sorter)
  }

  loadAppList()
}

// 编辑应用
const editApp = (app: API.AppVO) => {
  router.push({ name: 'AppEdit', params: { id: app.id! } })
}

// 切换精选状态
const toggleFeatured = async (app: API.AppVO) => {
  try {
    const newPriority = (app.priority || 0) > 50 ? 10 : 99
    const action = newPriority > 50 ? '设为精选' : '取消精选'

    const response = await updateAdminApp({
      id: app.id!,
      priority: newPriority,
    })

    if (response.data?.success) {
      message.success(`${action}成功`)
      app.priority = newPriority
    } else {
      message.error(response.data?.message || `${action}失败`)
    }
  } catch (error) {
    console.error('更新应用失败:', error)
    message.error('操作失败')
  }
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
        const response = await deleteAdminApp({ id: app.id! })

        if (response.data?.success) {
          message.success('删除成功')
          loadAppList()
        } else {
          message.error(response.data?.message || '删除失败')
        }
      } catch (error) {
        console.error('删除应用失败:', error)
        message.error('删除失败')
      }
    },
  })
}

// 批量删除
const batchDelete = () => {
  if (selectedRowKeys.value.length === 0) return

  Modal.confirm({
    title: '批量删除',
    content: `确定要删除选中的 ${selectedRowKeys.value.length} 个应用吗？此操作不可撤销。`,
    okText: '确认删除',
    okType: 'danger',
    cancelText: '取消',
    onOk: async () => {
      try {
        const promises = selectedRowKeys.value.map((id) => deleteAdminApp({ id }))

        await Promise.all(promises)

        message.success(`批量删除成功`)
        selectedRowKeys.value = []
        loadAppList()
      } catch (error) {
        console.error('批量删除失败:', error)
        message.error('批量删除失败')
      }
    },
  })
}

// 工具函数
const getDefaultCover = (id: number) => {
  const covers = [
    '/src/assets/cover-default-1.svg',
    '/src/assets/cover-default-2.svg',
    '/src/assets/cover-default-3.svg',
  ]
  return covers[id % covers.length]
}

const getCodeTypeName = (type: string) => {
  const names: Record<string, string> = {
    html: 'HTML',
    multi_file: '多文件',
    react: 'React',
    vue: 'Vue',
  }
  return names[type] || type.toUpperCase()
}

const getCodeTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    html: 'orange',
    multi_file: 'blue',
    react: 'cyan',
    vue: 'green',
  }
  return colors[type] || 'default'
}

const truncateText = (text: string, maxLength: number) => {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength) + '...'
}

const formatDate = (datetime: string) => {
  if (!datetime) return '-'
  return new Date(datetime).toLocaleDateString('zh-CN')
}

const formatTime = (datetime: string) => {
  if (!datetime) return ''
  return new Date(datetime).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<style scoped>
.apps-management {
  padding: var(--spacing-md);
}

/* 页面头部 */
.page-header {
  margin-bottom: var(--spacing-md);
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--color-text);
  margin: 0 0 var(--spacing-xs) 0;
}

.page-description {
  color: var(--color-text-light);
  margin: 0;
}

.header-actions {
  display: flex;
  gap: var(--spacing-sm);
}

/* 搜索区域 */
.search-section {
  margin-bottom: var(--spacing-md);
}

.search-form {
  gap: var(--spacing-sm);
}

/* 表格区域 */
.table-section {
  background: var(--color-white);
  border-radius: var(--border-radius-md);
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.table-actions {
  display: flex;
  gap: var(--spacing-sm);
}

/* 表格内容样式 */
.cover-preview {
  width: 60px;
  height: 40px;
  border-radius: var(--border-radius-sm);
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.cover-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.app-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.app-name {
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.4;
}

.app-id {
  font-size: 12px;
  color: var(--color-text-light);
}

.app-description {
  font-size: 12px;
  color: var(--color-text-light);
  line-height: 1.3;
  margin-top: 4px;
}

.priority-cell {
  display: flex;
  align-items: center;
}

.normal-priority {
  color: var(--color-text-light);
}

.creator-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.creator-name {
  font-weight: 500;
  color: var(--color-text);
}

.creator-id {
  font-size: 12px;
  color: var(--color-text-light);
}

.status-cell {
  display: flex;
  align-items: center;
}

.time-cell {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.time-detail {
  font-size: 12px;
  color: var(--color-text-light);
}

.no-data {
  color: var(--color-text-light);
}

/* 操作按钮 */
.action-buttons {
  display: flex;
  gap: 4px;
}

.action-btn {
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
  transition: all 0.2s ease;
}

.edit-btn:hover {
  background: var(--color-primary-light);
  color: var(--color-primary);
}

.star-btn:hover {
  background: #fff7e6;
  color: #fa8c16;
}

.star-btn.featured {
  background: #fff7e6;
  color: #fa8c16;
}

.delete-btn:hover {
  background: #fff2f0;
  color: #ff4d4f;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .apps-management {
    padding: var(--spacing-sm);
  }

  .header-content {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: stretch;
  }

  .search-form {
    flex-direction: column;
    gap: var(--spacing-sm);
  }

  .search-form .ant-form-item {
    margin-right: 0;
    margin-bottom: var(--spacing-xs);
  }

  .table-header {
    flex-direction: column;
    gap: var(--spacing-sm);
    align-items: stretch;
  }
}

/* 表格滚动样式 */
:deep(.ant-table-body) {
  scrollbar-width: thin;
  scrollbar-color: var(--color-border) transparent;
}

:deep(.ant-table-body::-webkit-scrollbar) {
  height: 6px;
}

:deep(.ant-table-body::-webkit-scrollbar-thumb) {
  background: var(--color-border);
  border-radius: 3px;
}

:deep(.ant-table-body::-webkit-scrollbar-track) {
  background: transparent;
}
</style>
