import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

// 路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomePage.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/auth',
    component: () => import('@/layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('@/views/auth/LoginPage.vue'),
        meta: { requiresGuest: true },
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/auth/RegisterPage.vue'),
        meta: { requiresGuest: true },
      },
    ],
  },
  {
    path: '/app/:id/chat',
    name: 'AppChat',
    component: () => import('@/views/app/ChatPage.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/app/:id/edit',
    name: 'AppEdit',
    component: () => import('@/views/app/EditPage.vue'),
    meta: { requiresAuth: true },
    props: true,
  },
  {
    path: '/admin',
    component: () => import('@/layouts/AdminLayout.vue'),
    meta: { requiresAuth: true, requiresAdmin: true },
    children: [
      {
        path: 'apps',
        name: 'AdminApps',
        component: () => import('@/views/admin/AppsManagement.vue'),
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/UsersManagement.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFoundPage.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 如果有token但没有用户信息，尝试获取用户信息
  if (userStore.token && !userStore.user) {
    await userStore.fetchCurrentUser()
  }

  // 检查是否需要登录
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
    return
  }

  // 检查是否需要游客状态（已登录用户不能访问登录页）
  if (to.meta.requiresGuest && userStore.isLoggedIn) {
    next({ name: 'Home' })
    return
  }

  // 检查是否需要管理员权限
  if (to.meta.requiresAdmin && !userStore.isAdmin) {
    next({ name: 'Home' })
    return
  }

  next()
})

// 设置页面标题
router.afterEach((to) => {
  const titles: Record<string, string> = {
    Home: '一句话呈所想 - 首页',
    Login: '登录 - 一句话呈所想',
    Register: '注册 - 一句话呈所想',
    AppChat: '应用对话 - 一句话呈所想',
    AppEdit: '编辑应用 - 一句话呈所想',
    AdminApps: '应用管理 - 一句话呈所想',
    AdminUsers: '用户管理 - 一句话呈所想',
    NotFound: '页面未找到 - 一句话呈所想',
  }

  document.title = titles[to.name as string] || '一句话呈所想'
})

export default router
