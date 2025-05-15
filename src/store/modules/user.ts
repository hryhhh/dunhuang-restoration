import { defineStore } from 'pinia'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { login, getInfo as getUserInfo } from '@/api/login'
import { isHttp, isEmpty } from '@/utils/validate'


const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken(),
    id: '',
    username: '',
    avatarUrl: '',
    gender: 0,
    email: '',
    roles: [],
    permissions: [],
    nickName: '',
  }),
  actions: {
    async login(userInfo:any) {
      const email = userInfo.email.trim()
      const userPassword = userInfo.userPassword
      try {
        const res = await login(email, userPassword)
        if (res.data && res.data.token) {
          setToken(res.data.token)
          this.token = res.data.token
        } else {
          // 如果 API 响应结构不符合预期，可以抛出错误或进行其他处理
          console.error('Login response does not contain token:', res.data)
          throw new Error('Login failed: Token not found in response')
        }

      } catch (error) {
        throw error
      }
    },
    async getInfo() {
      try {
        const res = await getUserInfo()
        if (res.data && res.data.user) {
          const user = res.data.user
          let avatar = user.avatar || ''
          if (!isHttp(avatar)) {
            // avatar = isEmpty(avatar) ? defAva : `${import.meta.env.VITE_APP_BASE_API}${avatar}`
          }
          this.id = user.userId
          this.email = user.email
          this.username = user.userName
          this.nickName = user.nickName
          this.avatarUrl = avatar
          this.roles = Array.isArray(res.data.roles) && res.data.roles.length > 0 ? res.data.roles : ['ROLE_DEFAULT']
          this.permissions = res.data.permissions || []
          return res
        } else {
          throw new Error('用户信息不完整')
        }
      } catch (error) {
        throw error
      }
    },
  },
  getters: {},
})
export default useUserStore
