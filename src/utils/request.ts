import axios, { type AxiosResponse } from 'axios'
import type { InternalAxiosRequestConfig } from 'axios'
import { removeToken, getToken, setToken } from './token'
import { tansParams } from './common'
import cache from './cache'
import { ElNotification, ElMessageBox, ElMessage, ElLoading } from 'element-plus'
import errorCode from './errorCode'
import useUserStore from '@/store/modules/user'
import { encrypt } from './encrypt'


// 定义重试相关的常量
const MAX_RETRIES = 3
const RETRY_DELAY = 1000

// 扩展 AxiosRequestConfig 类型
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  retryCount?: number
  istoken?: boolean
  isRepeatSubmit?: boolean
}
export let isRelogin = { show: false }

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    // 添加请求计数
    config.retryCount = config.retryCount || 0

    const token = getToken()
    const excludeUrls = ['/user/login', '/user/register']
    // 是否需要设置 token
    const istoken = (config.headers || {})?.istoken === false
    const isRepeatSubmit = (config.headers || {}).isRepeatSubmit === false


    if (token && !excludeUrls.includes(config.url || '')) {
      config.headers = config.headers || {}
      config.headers['Authorization'] = 'Bearer ${token}'

      // 添加token过期检查
      if (token.includes('.')) {
        try {
          const tokenExp = JSON.parse(atob(token.split('.')[1])).exp
          if (tokenExp && Date.now() >= tokenExp * 1000) {
            throw new Error('Token已过期')
          }
        } catch (error) {
          // token刷新失败，清除用户信息
          // useUserStore().logout()
          return Promise.reject('Token已过期，请重新登录')
        }
      }
    }


    // get请求映射params参数
    if (config.method === 'get' && config.params) {
      let url = config.url + '?' + tansParams(config.params)
      url = url.slice(0, -1)
      config.params = {}
      config.url = url
    }

    if (!isRepeatSubmit && (config.method === 'post' || config.method === 'put')) {
      const requestObj = {
        url: config.url,
        data: typeof config.data === 'object' ? JSON.stringify(config.data) : config.data,
        time: new Date().getTime(),
      }
      const requestSize = Object.keys(JSON.stringify(requestObj)).length // 请求数据大小
      const limitSize = 5 * 1024 * 1024 // 限制存放数据5M

      if (requestSize >= limitSize) {
        console.warn(`[${config.url}]: ` + '请求数据大小超出允许的5M限制，无法进行防重复提交验证。')
        return config
      }
      const sessionObj = cache.session.getJSON('sessionObj')
      if (sessionObj === undefined || sessionObj === null || sessionObj === '') {
        cache.session.setJSON('sessionObj', requestObj)
      } else {
        const s_url = sessionObj.url // 请求地址
        const s_data = sessionObj.data // 请求数据
        const s_time = sessionObj.time // 请求时间
        const interval = 1000 // 间隔时间(ms)，小于此时间视为重复提交
        if (
          s_data === requestObj.data &&
          requestObj.time - s_time < interval &&
          s_url === requestObj.url
        ) {
          const message = '数据正在处理，请勿重复提交'
          console.warn(`[${s_url}]: ` + message)
          return Promise.reject(new Error(message))
        } else {
          cache.session.setJSON('sessionObj', requestObj)
        }
      }
    }

      // 加密敏感数据
    if (config.method === 'post' && config.data?.password) {
      config.data.password = encrypt(config.data.password)
    }
    return config
  },
  async (error:any) => {
    // 请求重试机制
    const config = error.config as CustomAxiosRequestConfig
    if (config?.retryCount && config.retryCount < MAX_RETRIES) {
      config.retryCount += 1
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY))
      return request(config)
    }
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  (res: AxiosResponse) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200
    // 获取错误信息
    // 将数字 code 转换为字符串，并断言为 errorCode 的有效键类型
    const codeKey = String(code) as keyof typeof errorCode
    const msg = errorCode[codeKey] || res.data.msg || errorCode['default']
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
      return res.data
    }
    if (code === 401) {
      if (!isRelogin.show) {
        isRelogin.show = true
        ElMessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            isRelogin.show = false
            useUserStore()
            .logout()
            .then(() => {
              location.href = '/index'
            })
          })
          .catch(() => {
            isRelogin.show = false
          })
      }
      return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
    } else if (code === 500) {
      ElMessage({ message: msg, type: 'error' })
      return Promise.reject(new Error(msg))
    } else if (code === 601) {
      ElMessage({ message: msg, type: 'warning' })
      return Promise.reject(new Error(msg))
    } else if (code !== 200) {
      ElNotification.error({ title: msg })
      return Promise.reject('error')
    } else {
      return Promise.resolve(res.data)
    }
  },
  (error:any) => {
    console.log('err' + error)
    let { message } = error
    if (message == 'Network Error') {
      message = '后端接口连接异常'
    } else if (message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (message.includes('Request failed with status code')) {
      message = '系统接口' + message.substr(message.length - 3) + '异常'
    }
    ElMessage({ message: message, type: 'error', duration: 5 * 1000 })
    return Promise.reject(error)
  },
)

export default request
