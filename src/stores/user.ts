import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { userLogin, userLogout, getLoginUser } from '@/api/userManagement'

export const useUserStore = defineStore('user', () => {
  // 状态
  const user = ref<API.LoginUserVO | null>(null)
  const token = ref<string | null>(localStorage.getItem('token'))
  const isLoading = ref(false)

  // 计算属性
  const isLoggedIn = computed(() => !!token.value && !!user.value)
  const isAdmin = computed(() => user.value?.userRole === 'admin')
  const userAvatar = computed(() => user.value?.userAvatar || '/src/assets/user-avatar-default.svg')
  const userName = computed(() => user.value?.userName || user.value?.userAccount || '未知用户')

  // 操作方法
  const login = async (credentials: API.UserLoginRequest) => {
    try {
      isLoading.value = true
      const response = await userLogin(credentials)

      if (response.code === 0 && response.data) {
        const userData = response.data
        user.value = userData
        token.value = userData.token || null

        // 存储到localStorage
        if (userData.token) {
          localStorage.setItem('token', userData.token)
        }
        localStorage.setItem('userInfo', JSON.stringify(userData))

        return { success: true, data: userData }
      } else {
        const errorMessage = response.message || '登录失败'
        return { success: false, message: errorMessage }
      }
    } catch (error: any) {
      console.error('登录失败:', error)
      return {
        success: false,
        message: error?.response?.data?.message || error.message || '登录失败',
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      await userLogout()
    } catch (error) {
      console.error('注销请求失败:', error)
    } finally {
      // 无论请求是否成功，都清空本地状态
      user.value = null
      token.value = null
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
    }
  }

  const fetchCurrentUser = async () => {
    if (!token.value) return

    try {
      isLoading.value = true
      const response = await getLoginUser()

      if (response.code === 0 && response.data) {
        user.value = response.data
        localStorage.setItem('userInfo', JSON.stringify(response.data))
        return { success: true, data: response.data }
      } else {
        // 如果获取用户信息失败，可能token已过期
        await logout()
        return { success: false, message: '获取用户信息失败' }
      }
    } catch (error: any) {
      console.error('获取用户信息失败:', error)
      await logout()
      return { success: false, message: '获取用户信息失败' }
    } finally {
      isLoading.value = false
    }
  }

  const updateUserInfo = (newUserInfo: Partial<API.LoginUserVO>) => {
    if (user.value) {
      user.value = { ...user.value, ...newUserInfo }
      localStorage.setItem('userInfo', JSON.stringify(user.value))
    }
  }

  // 初始化：从localStorage恢复用户信息
  const initializeUser = () => {
    const savedUserInfo = localStorage.getItem('userInfo')
    if (savedUserInfo && token.value) {
      try {
        user.value = JSON.parse(savedUserInfo)
      } catch (error) {
        console.error('解析用户信息失败:', error)
        localStorage.removeItem('userInfo')
      }
    }
  }

  // 立即初始化
  initializeUser()

  return {
    // 状态
    user,
    token,
    isLoading,

    // 计算属性
    isLoggedIn,
    isAdmin,
    userAvatar,
    userName,

    // 方法
    login,
    logout,
    fetchCurrentUser,
    updateUserInfo,
    initializeUser,
  }
})
