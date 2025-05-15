// import auth from '@/plugins/auth'
// import router, { constantRoutes, dynamicRoutes } from '@/router'
// import { getRouters } from '@/api/menu'
// import Layout from '@/layout/index'
// import ParentView from '@/components/ParentView'
// import InnerLink from '@/layout/components/InnerLink'
// import { RouteRecordRaw } from 'vue-router'
// import { defineStore } from 'pinia'

// // 匹配views里面所有的.vue文件
// const modules = import.meta.glob('./../../views/**/*.vue')

// export interface PermissionState {
//   routes: RouteRecordRaw[]
//   addRoutes: RouteRecordRaw[]
//   defaultRoutes: RouteRecordRaw[]
//   topbarRouters: RouteRecordRaw[]
//   sidebarRouters: RouteRecordRaw[]
// }

// const usePermissionStore = defineStore('permission', {
//   state: (): PermissionState => ({
//     routes: [],
//     addRoutes: [],
//     defaultRoutes: [],
//     topbarRouters: [],
//     sidebarRouters: []
//   }),
//   actions: {
//     setRoutes(this: PermissionState, routes: RouteRecordRaw[]) {
//       this.addRoutes = routes
//       this.routes = constantRoutes.concat(routes)
//     },
//     setDefaultRoutes(this: PermissionState, routes: RouteRecordRaw[]) {
//       this.defaultRoutes = constantRoutes.concat(routes)
//     },
//     setTopbarRoutes(this: PermissionState, routes: RouteRecordRaw[]) {
//       this.topbarRouters = routes
//     },
//     setSidebarRouters(this: PermissionState, routes: RouteRecordRaw[]) {
//       this.sidebarRouters = routes
//     },
//     generateRoutes(this: PermissionState, roles: string[]): Promise<RouteRecordRaw[]> {
//       return new Promise(resolve => {
//         getRouters().then(res => {
//           const sdata = JSON.parse(JSON.stringify(res.data))
//           const rdata = JSON.parse(JSON.stringify(res.data))
//           const defaultData = JSON.parse(JSON.stringify(res.data))
//           const sidebarRoutes = filterAsyncRouter(sdata)
//           const rewriteRoutes = filterAsyncRouter(rdata, false, true)
//           const defaultRoutes = filterAsyncRouter(defaultData)
//           const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
//           asyncRoutes.forEach(route => { router.addRoute(route) })
//           this.setRoutes(rewriteRoutes)
//           this.setSidebarRouters(constantRoutes.concat(sidebarRoutes))
//           this.setDefaultRoutes(sidebarRoutes)
//           this.setTopbarRoutes(defaultRoutes)
//           resolve(rewriteRoutes)
//         })
//       })
//     }
//   }
// })

// // 遍历后台传来的路由字符串，转换为组件对象
// type AsyncRouter = any // 可根据后端返回结构进一步细化
// function filterAsyncRouter(asyncRouterMap: AsyncRouter[], lastRouter: any = false, type = false): RouteRecordRaw[] {
//   return asyncRouterMap.filter((route: any) => {
//     if (type && route.children) {
//       route.children = filterChildren(route.children)
//     }
//     if (route.component) {
//       // Layout ParentView 组件特殊处理
//       if (route.component === 'Layout') {
//         route.component = Layout
//       } else if (route.component === 'ParentView') {
//         route.component = ParentView
//       } else if (route.component === 'InnerLink') {
//         route.component = InnerLink
//       } else {
//         route.component = loadView(route.component)
//       }
//     }
//     if (route.children != null && route.children && route.children.length) {
//       route.children = filterAsyncRouter(route.children, route, type)
//     } else {
//       delete route['children']
//       delete route['redirect']
//     }
//     return true
//   })
// }

// function filterChildren(childrenMap: any[], lastRouter: any = false): any[] {
//   let children: any[] = []
//   childrenMap.forEach(el => {
//     el.path = lastRouter ? lastRouter.path + '/' + el.path : el.path
//     if (el.children && el.children.length && el.component === 'ParentView') {
//       children = children.concat(filterChildren(el.children, el))
//     } else {
//       children.push(el)
//     }
//   })
//   return children
// }

// // 动态路由遍历，验证是否具备权限
// export function filterDynamicRoutes(routes: any[]): any[] {
//   const res: any[] = []
//   routes.forEach(route => {
//     if (route.permissions) {
//       if (auth.hasPermiOr(route.permissions)) {
//         res.push(route)
//       }
//     } else if (route.roles) {
//       if (auth.hasRoleOr(route.roles)) {
//         res.push(route)
//       }
//     }
//   })
//   return res
// }

// export const loadView = (view: string): (() => Promise<unknown>) | undefined => {
//   let res: (() => Promise<unknown>) | undefined
//   for (const path in modules) {
//     const dir = path.split('views/')[1].split('.vue')[0]
//     if (dir === view) {
//       res = () => modules[path]()
//     }
//   }
//   return res
// }

// export default usePermissionStore
