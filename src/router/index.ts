import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 声明路由元信息类型
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    roles?: string[]
  }
}

// 扩展 RouteRecordRaw 类型确保 meta 存在
interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  meta: {
    title: string
    roles?: string[]
  }
}

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue' as unknown as string),
    meta: { title: '首页' },
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue' as unknown as string),
    meta: { title: '登录' },
  },

]

// 动态路由
export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/repair',
    name: 'repair',
    component: () => import('../views/RepairedView.vue'),
    meta: {
      title: '壁画修复',
      roles: ['user', 'admin']
    }
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/AdminDashboard.vue'),
    meta: {
      title: '管理后台',
      roles: ['admin']
    }
  }
]



const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes, // 初始只挂载静态路由
})

// 添加动态路由的方法
export function addRoutes(roles: string[]) {
  // 根据角色过滤路由
  const accessRoutes = asyncRoutes.filter((route) => {
    // 将route断言为AppRouteRecordRaw类型
    const typedRoute = route as AppRouteRecordRaw
    const routeRoles = typedRoute.meta.roles
    if (routeRoles) {
      return roles.some((role) => routeRoles.includes(role))
    }
    return true
  })

  // 动态添加路由
  accessRoutes.forEach((route) => {
    router.addRoute(route)
  })
}

export default router

// 1. 登录成功后的重定向
// 2. 路由元信息
// 3. 动态路由
