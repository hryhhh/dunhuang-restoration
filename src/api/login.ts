import request from '@/utils/request'

export function login(email: string, userPassword: string) {
  const data = {
    email,
    userPassword,
  }
  return request({
    url: '/user/login',
    headers: {
      isToken: false,
      repeatSubmit: false,
    },
    method: 'post',
    data: data,
  })
}

export function register(email: string, userPassword: string) {
  const data = {
    email,
    userPassword,
  }
  return request({
    url: '/user/register',
    headers: {
      isToken: false,
    },
    method: 'post',
    data: data,
  })
}

// 获取用户信息
export function getInfo() {
  return request({
    url: '/user/getInfo',
    method: 'get',
  })
}
// export function logout() {
//   return request({
//     url: '/user/logout',
//     method: 'post',
//   })
// }
