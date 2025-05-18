import { getToken } from '@/utils/token'
import useUserStore from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 定义需要权限访问的路由
const authRequiredRoutes = ['/repair', '/admin']

// 定义需要管理员权限访问的路由
const adminRoutes = ['/admin']

router.beforeEach(async (to, from, next) => {
  const token = getToken()
  const userStore = useUserStore()
  const isAuthRequired = authRequiredRoutes.includes(to.path)

  if (isAuthRequired && !token) {
    ElMessage.warning('请先登录')
    next('/login')
    return
  }

  if (token && !userStore.roles.length) {
    try {
      await userStore.getInfo()
    } catch (error) {
      ElMessage.error('获取用户信息失败，请重新登录')
      // await userStore.logout()
      next('/login')
      return
    }
  }

  if (adminRoutes.includes(to.path) && !userStore.roles.includes('admin')) {
    ElMessage.warning('您没有权限访问该页面')
    next('/')
    return
  }
  next()

})
