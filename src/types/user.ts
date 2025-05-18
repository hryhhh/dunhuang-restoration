export interface UserInfoResponse {
  user: {
    id: string
    email: string
    userName: string
    nickName: string
    avatarUrl: string
    gender: number
    phone: string
    userStatus: number
    createTime: string
    updateTime: string
    introduction: string
  }
  roles: string[]
  permissions: string[]
}


