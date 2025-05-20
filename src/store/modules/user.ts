import { defineStore } from 'pinia'
import { ref } from 'vue'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo as getUserInfo } from '@/api/login'
import { isHttp, isEmpty } from '@/utils/validate'
import type { UserInfoResponse } from '@/types/user'
import { addRoutes } from '@/router'

interface LoginParams {
  email: string
  password: string
}

// 1. 持久化存储
// 2. 状态重置功能
// 3. 登出功能

export const useUserStore = defineStore('user', () => {
  // 定义状态
  const token = ref(getToken() || '')
  const id = ref('')
  const userName = ref('')
  const avatarUrl = ref('')
  const gender = ref(0)
  const email = ref('')
  const roles = ref<string[]>([])
  const permissions = ref<string[]>([])
  const nickName = ref('')

  // 定义 actions
  const loginAction = async (userInfo: LoginParams) => {
    const email = userInfo.email.trim()
    const userPassword = userInfo.password
    try {
      const res = await login(email, userPassword)
      if (res.data && res.data.token) {
        setToken(res.data.token)
        token.value = res.data.token
      } else {
        // 如果 API 响应结构不符合预期，可以抛出错误或进行其他处理
        console.error('Login response does not contain token:', res.data)
        throw new Error('Login failed: Token not found in response')
      }
    } catch (error) {
      throw error
    }
  }

  const getInfo = async () => {
    try {
      const res = await getUserInfo()
      const { user, roles: userRoles, permissions: userPermissions } = res.data as UserInfoResponse

      if (!user) {
        throw new Error('用户信息不完整')
      }

      let avatar = user.avatarUrl || ''

      id.value = user.id
      userName.value = user.userName
      nickName.value = user.nickName
      avatarUrl.value = avatar
      gender.value = user.gender
      email.value = user.email
      roles.value = userRoles?.length > 0 ? userRoles : ['ROLE_DEFAULT']
      permissions.value = userPermissions || []

      // 添加动态路由
      addRoutes(userRoles)
      return res
    } catch (error) {
      throw error
    }
  }

  // 定义登出功能
  const logoutAction = async () => {
    try {
      // 可以添加调用登出 API
      // await logout()

      // 清理状态
      token.value = ''
      id.value = ''
      userName.value = ''
      avatarUrl.value = ''
      gender.value = 0
      email.value = ''
      roles.value = []
      permissions.value = []
      nickName.value = ''

      // 移除token
      removeToken()

      return true
    } catch (error) {
      console.error('登出失败:', error)
      throw error
    }
  }

  return {
    token,
    id,
    userName,
    avatarUrl,
    gender,
    email,
    roles,
    permissions,
    nickName,
    login: loginAction,
    loginAction,
    getInfo,
    logout: logoutAction,
    logoutAction,
  }
})
export default useUserStore
