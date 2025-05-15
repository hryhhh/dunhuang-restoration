import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue' as unknown as string),
    },
    {
      path: '/repair',
      name: 'repair',
      component: () => import('../views/RepairedView.vue' as unknown as string),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue' as unknown as string),
    },
    {
      path: '/dashboard',
      name: 'admin',
      component: () => import('../views/AdminDashboard.vue' as unknown as string),
    },
]
 const router = createRouter({
   history: createWebHistory(import.meta.env.VITE_APP_BASE_API),
   routes: routes,
 })

export default router

// 模拟获取用户登录状态和角色的函数
const isLoggedIn = () => {
  return localStorage.getItem('token')
}

const getUserRole = () => {
  return localStorage.getItem('role')
}

// router.beforeEach((to, from, next) => {
//   const publicPages = ['/login']
//   const authRequired = !publicPages.includes(to.path)
//   const loggedIn = isLoggedIn()

//   if (authRequired && !loggedIn) {
//     next('/login')
//   } else if (to.name === 'admin') {
//     const role = getUserRole()
//     if (role !== 'admin') {
//       next('/')
//     } else {
//       next()
//     }
//   } else {
//     next()
//   }
// })
