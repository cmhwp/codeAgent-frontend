<template>
  <div class="users-management">
    <!-- 页面头部 -->
    <div class="page-header">
      <div class="header-content">
        <div class="header-left">
          <h1 class="page-title">用户管理</h1>
          <p class="page-description">管理系统中的所有用户，包括权限设置和状态管理</p>
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
          <a-form-item label="搜索关键词">
            <a-input
              v-model:value="searchParams.searchText"
              placeholder="用户账号、昵称或邮箱"
              style="width: 200px"
              @pressEnter="searchUsers"
            />
          </a-form-item>

          <a-form-item label="用户角色">
            <a-select
              v-model:value="searchParams.userRole"
              placeholder="选择用户角色"
              style="width: 120px"
              allowClear
            >
              <a-select-option value="user">普通用户</a-select-option>
              <a-select-option value="admin">管理员</a-select-option>
              <a-select-option value="ban">已封禁</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="用户状态">
            <a-select
              v-model:value="searchParams.userStatus"
              placeholder="选择状态"
              style="width: 120px"
              allowClear
            >
              <a-select-option :value="0">正常</a-select-option>
              <a-select-option :value="1">禁用</a-select-option>
            </a-select>
          </a-form-item>

          <a-form-item label="用户ID">
            <a-input-number
              v-model:value="searchParams.id"
              placeholder="用户ID"
              style="width: 120px"
              :min="1"
            />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="searchUsers" :loading="isLoading">
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
            <span>用户列表 (共 {{ pagination.total }} 条)</span>
            <div class="table-actions">
              <a-dropdown :disabled="selectedRowKeys.length === 0">
                <a-button type="primary">
                  批量操作 ({{ selectedRowKeys.length }})
                  <Icon icon="material-symbols:keyboard-arrow-down" />
                </a-button>
                <template #overlay>
                  <a-menu @click="handleBatchAction">
                    <a-menu-item key="ban">
                      <Icon icon="material-symbols:block" />
                      批量封禁
                    </a-menu-item>
                    <a-menu-item key="unban">
                      <Icon icon="material-symbols:check-circle" />
                      批量解封
                    </a-menu-item>
                    <a-menu-divider />
                    <a-menu-item key="delete" class="danger-item">
                      <Icon icon="material-symbols:delete" />
                      批量删除
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
          </div>
        </template>

        <a-table
          :columns="columns"
          :data-source="userList"
          :pagination="tablePagination"
          :loading="isLoading"
          :row-selection="rowSelection"
          :scroll="{ x: 1000 }"
          row-key="id"
          @change="handleTableChange"
        >
          <!-- 用户头像 -->
          <template #avatar="{ record }">
            <a-avatar :src="record.userAvatar || '/src/assets/user-avatar-default.svg'" :size="40">
              {{ record.userName?.charAt(0) || record.userAccount?.charAt(0) || 'U' }}
            </a-avatar>
          </template>

          <!-- 用户信息 -->
          <template #userInfo="{ record }">
            <div class="user-info">
              <div class="user-name">{{ record.userName || '未设置昵称' }}</div>
              <div class="user-account">{{ record.userAccount }}</div>
              <div class="user-email" v-if="record.userEmail">{{ record.userEmail }}</div>
              <div class="user-id">ID: {{ record.id }}</div>
            </div>
          </template>

          <!-- 用户角色 -->
          <template #role="{ record }">
            <a-tag :color="getRoleColor(record.userRole)">
              <Icon :icon="getRoleIcon(record.userRole)" />
              {{ getRoleName(record.userRole) }}
            </a-tag>
          </template>

          <!-- 用户状态 -->
          <template #status="{ record }">
            <a-tag :color="record.userStatus === 0 ? 'green' : 'red'">
              <Icon
                :icon="
                  record.userStatus === 0
                    ? 'material-symbols:check-circle'
                    : 'material-symbols:block'
                "
              />
              {{ record.userStatus === 0 ? '正常' : '禁用' }}
            </a-tag>
          </template>

          <!-- 最后登录 -->
          <template #lastLogin="{ record }">
            <div class="time-cell" v-if="record.lastLoginTime">
              <div>{{ formatDate(record.lastLoginTime) }}</div>
              <div class="time-detail">{{ formatTime(record.lastLoginTime) }}</div>
            </div>
            <span v-else class="no-data">从未登录</span>
          </template>

          <!-- 注册时间 -->
          <template #createTime="{ record }">
            <div class="time-cell">
              <div>{{ formatDate(record.createTime) }}</div>
              <div class="time-detail">{{ formatTime(record.createTime) }}</div>
            </div>
          </template>

          <!-- 操作 -->
          <template #actions="{ record }">
            <div class="action-buttons">
              <a-tooltip title="编辑用户">
                <a-button
                  type="text"
                  size="small"
                  @click="editUser(record)"
                  class="action-btn edit-btn"
                >
                  <Icon icon="material-symbols:edit" />
                </a-button>
              </a-tooltip>

              <a-tooltip title="修改角色">
                <a-dropdown>
                  <a-button type="text" size="small" class="action-btn role-btn">
                    <Icon icon="material-symbols:admin-panel-settings" />
                  </a-button>
                  <template #overlay>
                    <a-menu @click="({ key }) => changeUserRole(record, key as string)">
                      <a-menu-item key="user" :disabled="record.userRole === 'user'">
                        设为普通用户
                      </a-menu-item>
                      <a-menu-item key="admin" :disabled="record.userRole === 'admin'">
                        设为管理员
                      </a-menu-item>
                      <a-menu-item key="ban" :disabled="record.userRole === 'ban'">
                        封禁用户
                      </a-menu-item>
                    </a-menu>
                  </template>
                </a-dropdown>
              </a-tooltip>

              <a-tooltip title="强制下线">
                <a-button
                  type="text"
                  size="small"
                  @click="kickoutUser(record)"
                  class="action-btn kickout-btn"
                >
                  <Icon icon="material-symbols:logout" />
                </a-button>
              </a-tooltip>

              <a-tooltip title="删除用户">
                <a-button
                  type="text"
                  size="small"
                  danger
                  @click="deleteUser(record)"
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
import { Icon } from '@iconify/vue'
import { message, Modal } from 'ant-design-vue'
import {
  listUserVoByPageByAdmin as getAdminUserList,
  deleteUserByAdmin as deleteAdminUser,
  updateUserByAdmin as updateAdminUser,
  banUser,
  unbanUser,
  kickoutUser as kickoutUserAPI,
  batchOperateUsers as batchUserOperation,
} from '@/api/userManagement'
import type { API } from '@/api/typings'

// 状态
const isLoading = ref(false)
const userList = ref<API.UserVO[]>([])
const selectedRowKeys = ref<number[]>([])

// 搜索参数
const searchParams = reactive({
  searchText: '',
  userRole: '',
  userStatus: undefined as number | undefined,
  id: undefined as number | undefined,
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
    title: '头像',
    dataIndex: 'userAvatar',
    key: 'avatar',
    width: 80,
    slots: { customRender: 'avatar' },
  },
  {
    title: '用户信息',
    dataIndex: 'userInfo',
    key: 'userInfo',
    width: 200,
    slots: { customRender: 'userInfo' },
  },
  {
    title: '角色',
    dataIndex: 'userRole',
    key: 'role',
    width: 120,
    slots: { customRender: 'role' },
  },
  {
    title: '状态',
    dataIndex: 'userStatus',
    key: 'status',
    width: 100,
    slots: { customRender: 'status' },
  },
  {
    title: '最后登录',
    dataIndex: 'lastLoginTime',
    key: 'lastLogin',
    width: 150,
    slots: { customRender: 'lastLogin' },
    sorter: true,
  },
  {
    title: '注册时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 150,
    slots: { customRender: 'createTime' },
    sorter: true,
  },
  {
    title: '操作',
    key: 'actions',
    width: 180,
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
  getCheckboxProps: (record: API.UserVO) => ({
    disabled: record.userRole === 'admin', // 禁止选择管理员
    name: record.userAccount,
  }),
}))

// 页面初始化
onMounted(() => {
  loadUserList()
})

// 加载用户列表
const loadUserList = async () => {
  try {
    isLoading.value = true

    const params: API.UserQueryRequest = {
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      searchText: searchParams.searchText || undefined,
      userRole: searchParams.userRole || undefined,
      userStatus: searchParams.userStatus,
      id: searchParams.id || undefined,
    }

    const response = await getAdminUserList(params)

    if (response.data?.success && response.data.data) {
      const { records = [], total = 0, current = 1 } = response.data.data
      userList.value = records
      pagination.total = total
      pagination.current = current
    } else {
      message.error(response.data?.message || '加载用户列表失败')
    }
  } catch (error) {
    console.error('加载用户列表失败:', error)
    message.error('加载用户列表失败')
  } finally {
    isLoading.value = false
  }
}

// 搜索用户
const searchUsers = () => {
  pagination.current = 1
  loadUserList()
}

// 重置搜索
const resetSearch = () => {
  Object.assign(searchParams, {
    searchText: '',
    userRole: '',
    userStatus: undefined,
    id: undefined,
  })
  pagination.current = 1
  loadUserList()
}

// 刷新数据
const refreshData = () => {
  loadUserList()
}

// 处理表格变化
const handleTableChange = (paginationInfo: any, filters: any, sorter: any) => {
  pagination.current = paginationInfo.current
  pagination.pageSize = paginationInfo.pageSize

  // TODO: 处理排序
  if (sorter.field) {
    console.log('排序:', sorter)
  }

  loadUserList()
}

// 编辑用户
const editUser = (user: API.UserVO) => {
  // TODO: 实现用户编辑功能
  message.info('用户编辑功能开发中')
}

// 修改用户角色
const changeUserRole = async (user: API.UserVO, newRole: string) => {
  try {
    const response = await updateAdminUser({
      id: user.id!,
      userRole: newRole,
    })

    if (response.data?.success) {
      message.success('角色修改成功')
      user.userRole = newRole
    } else {
      message.error(response.data?.message || '角色修改失败')
    }
  } catch (error) {
    console.error('修改用户角色失败:', error)
    message.error('角色修改失败')
  }
}

// 强制用户下线
const kickoutUser = async (user: API.UserVO) => {
  Modal.confirm({
    title: '确认操作',
    content: `确定要强制用户"${user.userName || user.userAccount}"下线吗？`,
    okText: '确认',
    cancelText: '取消',
    onOk: async () => {
      try {
        const response = await kickoutUserAPI({ userId: user.id! })

        if (response.data?.success) {
          message.success('用户已强制下线')
        } else {
          message.error(response.data?.message || '操作失败')
        }
      } catch (error) {
        console.error('强制下线失败:', error)
        message.error('操作失败')
      }
    },
  })
}

// 删除用户
const deleteUser = (user: API.UserVO) => {
  Modal.confirm({
    title: '确认删除',
    content: `确定要删除用户"${user.userName || user.userAccount}"吗？此操作不可撤销。`,
    okText: '确认删除',
    okType: 'danger',
    cancelText: '取消',
    onOk: async () => {
      try {
        const response = await deleteAdminUser({ id: user.id! })

        if (response.data?.success) {
          message.success('删除成功')
          loadUserList()
        } else {
          message.error(response.data?.message || '删除失败')
        }
      } catch (error) {
        console.error('删除用户失败:', error)
        message.error('删除失败')
      }
    },
  })
}

// 批量操作
const handleBatchAction = async ({ key }: { key: string }) => {
  if (selectedRowKeys.value.length === 0) return

  const actionNames: Record<string, string> = {
    ban: '批量封禁',
    unban: '批量解封',
    delete: '批量删除',
  }

  const actionName = actionNames[key]

  Modal.confirm({
    title: actionName,
    content: `确定要${actionName}选中的 ${selectedRowKeys.value.length} 个用户吗？`,
    okText: '确认',
    okType: key === 'delete' ? 'danger' : 'primary',
    cancelText: '取消',
    onOk: async () => {
      try {
        const response = await batchUserOperation({
          userIds: selectedRowKeys.value,
          operation: key,
        })

        if (response.data?.success) {
          message.success(`${actionName}成功`)
          selectedRowKeys.value = []
          loadUserList()
        } else {
          message.error(response.data?.message || `${actionName}失败`)
        }
      } catch (error) {
        console.error(`${actionName}失败:`, error)
        message.error(`${actionName}失败`)
      }
    },
  })
}

// 工具函数
const getRoleName = (role: string) => {
  const names: Record<string, string> = {
    user: '普通用户',
    admin: '管理员',
    ban: '已封禁',
  }
  return names[role] || role
}

const getRoleColor = (role: string) => {
  const colors: Record<string, string> = {
    user: 'default',
    admin: 'gold',
    ban: 'red',
  }
  return colors[role] || 'default'
}

const getRoleIcon = (role: string) => {
  const icons: Record<string, string> = {
    user: 'material-symbols:person',
    admin: 'material-symbols:admin-panel-settings',
    ban: 'material-symbols:block',
  }
  return icons[role] || 'material-symbols:person'
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
.users-management {
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
.user-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.user-name {
  font-weight: 500;
  color: var(--color-text);
  line-height: 1.4;
}

.user-account {
  font-size: 13px;
  color: var(--color-text);
  font-family: monospace;
}

.user-email {
  font-size: 12px;
  color: var(--color-text-light);
}

.user-id {
  font-size: 12px;
  color: var(--color-text-light);
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
  font-style: italic;
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

.role-btn:hover {
  background: #fff7e6;
  color: #fa8c16;
}

.kickout-btn:hover {
  background: #f6ffed;
  color: #52c41a;
}

.delete-btn:hover {
  background: #fff2f0;
  color: #ff4d4f;
}

/* 危险操作样式 */
:deep(.danger-item) {
  color: #ff4d4f !important;
}

:deep(.danger-item:hover) {
  background-color: #fff2f0 !important;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .users-management {
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

  .action-buttons {
    flex-wrap: wrap;
  }
}
</style>
