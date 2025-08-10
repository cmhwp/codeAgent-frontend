import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import {
  addApp,
  listMyAppVoByPage,
  listGoodAppVoByPage,
  getAppVoById,
  updateApp,
  deleteApp,
  deployApp,
  getAppVoByIdByAdmin,
  updateAppByAdmin,
  deleteAppByAdmin,
} from '@/api/appManagement'
import { message } from 'ant-design-vue'
export const useAppStore = defineStore('app', () => {
  // 状态
  const myApps = ref<API.AppVO[]>([])
  const featuredApps = ref<API.AppVO[]>([])
  const currentApp = ref<API.AppVO | null>(null)
  const isLoading = ref(false)
  const isDeploying = ref(false)

  // 分页状态
  const myAppsPage = ref({
    current: 1,
    size: 20,
    total: 0,
    hasMore: true,
  })

  const featuredAppsPage = ref({
    current: 1,
    size: 20,
    total: 0,
    hasMore: true,
  })

  // 计算属性
  const myAppsCount = computed(() => myApps.value.length)
  const featuredAppsCount = computed(() => featuredApps.value.length)

  // 操作方法

  // 创建应用
  const createApp = async (appData: API.AppAddRequest) => {
    try {
      isLoading.value = true
      const response = await addApp(appData)

      if (response.code === 0 && response.data) {
        // 创建成功后重新加载我的应用列表
        await loadMyApps(true)
        return { success: true, data: response.data }
      } else {
        message.error(response.message || '创建应用失败')
      }
    } catch (error: any) {
      console.error('创建应用失败:', error)
      return {
        success: false,
        message: error?.response?.data?.message || error.message || '创建应用失败',
      }
    } finally {
      isLoading.value = false
    }
  }

  // 加载我的应用列表
  const loadMyApps = async (reset = false, searchText = '') => {
    try {
      if (reset) {
        myAppsPage.value.current = 1
        myApps.value = []
      }

      isLoading.value = true
      const response = await listMyAppVoByPage({
        pageNum: myAppsPage.value.current,
        pageSize: myAppsPage.value.size,
        appName: searchText || undefined,
      })

      if (response.code === 0 && response.data) {
        const { records = [], total = 0, current = 1 } = response.data || {}

        if (reset) {
          myApps.value = records
        } else {
          myApps.value.push(...records)
        }

        myAppsPage.value.total = total
        myAppsPage.value.current = current
        myAppsPage.value.hasMore = records.length === myAppsPage.value.size

        return { success: true, data: response.data }
      } else {
        throw new Error(response.message || '加载应用列表失败')
      }
    } catch (error: any) {
      console.error('加载我的应用失败:', error)
      return { success: false, message: '加载应用列表失败' }
    } finally {
      isLoading.value = false
    }
  }

  // 加载更多我的应用
  const loadMoreMyApps = async (searchText = '') => {
    if (!myAppsPage.value.hasMore || isLoading.value) return

    myAppsPage.value.current += 1
    return await loadMyApps(false, searchText)
  }

  // 加载精选应用列表
  const loadFeaturedApps = async (reset = false, searchText = '') => {
    try {
      if (reset) {
        featuredAppsPage.value.current = 1
        featuredApps.value = []
      }

      isLoading.value = true
      const response = await listGoodAppVoByPage({
        pageNum: featuredAppsPage.value.current,
        pageSize: featuredAppsPage.value.size,
        appName: searchText || undefined,
      })

      if (response.code === 0 && response.data) {
        const { records = [], total = 0, current = 1 } = response.data

        if (reset) {
          featuredApps.value = records
        } else {
          featuredApps.value.push(...records)
        }

        featuredAppsPage.value.total = total
        featuredAppsPage.value.current = current
        featuredAppsPage.value.hasMore = records.length === featuredAppsPage.value.size

        return { success: true, data: response.data }
      } else {
        throw new Error(response.message || '加载精选应用失败')
      }
    } catch (error: any) {
      console.error('加载精选应用失败:', error)
      return { success: false, message: '加载精选应用失败' }
    } finally {
      isLoading.value = false
    }
  }

  // 加载更多精选应用
  const loadMoreFeaturedApps = async (searchText = '') => {
    if (!featuredAppsPage.value.hasMore || isLoading.value) return

    featuredAppsPage.value.current += 1
    return await loadFeaturedApps(false, searchText)
  }

  // 获取应用详情
  const fetchAppDetail = async (appId: number) => {
    try {
      isLoading.value = true
      const response = await getAppVoById({ id: appId })

      if (response.code === 0 && response.data) {
        currentApp.value = response.data
        return { success: true, data: response.data }
      } else {
        throw new Error(response.message || '获取应用详情失败')
      }
    } catch (error: any) {
      console.error('获取应用详情失败:', error)
      return { success: false, message: '获取应用详情失败' }
    } finally {
      isLoading.value = false
    }
  }

  // 更新应用
  const updateAppInfo = async (appId: number, updateData: API.AppUpdateRequest) => {
    try {
      isLoading.value = true
      const response = await updateApp({ ...updateData, id: appId })

      if (response.code === 0) {
        // 更新本地状态
        if (currentApp.value && currentApp.value.id === appId) {
          currentApp.value = { ...currentApp.value, ...updateData }
        }

        // 更新列表中的应用
        const updateAppInList = (list: API.AppVO[]) => {
          const index = list.findIndex((app) => app.id === appId)
          if (index !== -1) {
            list[index] = { ...list[index], ...updateData }
          }
        }

        updateAppInList(myApps.value)
        updateAppInList(featuredApps.value)

        return { success: true }
      } else {
        throw new Error(response.message || '更新应用失败')
      }
    } catch (error: any) {
      console.error('更新应用失败:', error)
      return { success: false, message: '更新应用失败' }
    } finally {
      isLoading.value = false
    }
  }

  // 删除应用
  const removeApp = async (appId: number) => {
    try {
      isLoading.value = true
      const response = await deleteApp({ id: appId })

      if (response.code === 0) {
        // 从本地列表中删除
        myApps.value = myApps.value.filter((app) => app.id !== appId)
        featuredApps.value = featuredApps.value.filter((app) => app.id !== appId)

        // 如果删除的是当前应用，清空当前应用
        if (currentApp.value && currentApp.value.id === appId) {
          currentApp.value = null
        }

        return { success: true }
      } else {
        throw new Error(response.message || '删除应用失败')
      }
    } catch (error: any) {
      console.error('删除应用失败:', error)
      return { success: false, message: '删除应用失败' }
    } finally {
      isLoading.value = false
    }
  }

  // 部署应用
  const deployAppToServer = async (appId: number) => {
    try {
      isDeploying.value = true
      const response = await deployApp({ appId })

      if (response.code === 0 && response.data) {
        return { success: true, url: response.data }
      } else {
        throw new Error(response.message || '部署应用失败')
      }
    } catch (error: any) {
      console.error('部署应用失败:', error)
      return { success: false, message: '部署应用失败' }
    } finally {
      isDeploying.value = false
    }
  }

  // 设置当前应用
  const setCurrentApp = (app: API.AppVO | null) => {
    currentApp.value = app
  }

  // 清空应用列表
  const clearApps = () => {
    myApps.value = []
    featuredApps.value = []
    currentApp.value = null
    myAppsPage.value = { current: 1, size: 20, total: 0, hasMore: true }
    featuredAppsPage.value = { current: 1, size: 20, total: 0, hasMore: true }
  }

  return {
    // 状态
    myApps,
    featuredApps,
    currentApp,
    isLoading,
    isDeploying,
    myAppsPage,
    featuredAppsPage,

    // 计算属性
    myAppsCount,
    featuredAppsCount,

    // 方法
    createApp,
    loadMyApps,
    loadMoreMyApps,
    loadFeaturedApps,
    loadMoreFeaturedApps,
    fetchAppDetail,
    updateAppInfo,
    removeApp,
    deployAppToServer,
    setCurrentApp,
    clearApps,
  }
})
