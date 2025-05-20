import { getToken } from '@/utils/auth'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import router from '@/router'
import NProgress from 'nprogress'

// 白名单：无需登录即可访问的页面
const whiteList = ['/login', '/register']

// 定义需要权限访问的路由
const authRoutes = ['/repair', '/admin']

// 定义需要管理员权限访问的路由
const adminRoutes = ['/admin']

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  const userStore = useUserStore()

  // 开启页面加载进度条
  NProgress.start()

  // 如果访问的是白名单页面，直接放行
  if (whiteList.includes(to.path)) {
    next()
    return
  }

  //访问需要登录权限的路由但未登录
  const isAuthRequired = authRoutes.includes(to.path)

  if (isAuthRequired && !token) {
    ElMessage.warning('请先登录')
    next(`/login?redirect=${to.path}`)
    return
  }

  //已登录但用户信息未加载（登录状态失效）
  if (token && !userStore.roles.length) {
    try {
      await userStore.getInfo()
    } catch (error) {
      ElMessage.error('获取用户信息失败，请重新登录')
      await userStore.logout()
      next(`/login?redirect=${to.path}`)
      return
    }
  }

  // 访问需要管理员权限的路由但用户不是管理员
  if (adminRoutes.includes(to.path) && !userStore.roles.includes('admin')) {
    ElMessage.warning('您没有权限访问该页面')
    next('/repair')
    return
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})
