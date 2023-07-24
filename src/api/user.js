import requset from '@/utils/request'

// 用户认证登录注册
export const getUserInfo = () => requset({
  method: 'GET',
  url: '/v1_0/user'
})

// 关注用户
export const addFollow = target => requset({
  method: 'POST',
  url: '/v1_0/user/followings',
  data: {
    target
  }
})

// 取消关注用户
export const deleteFollow = target => requset({
  method: 'DELETE',
  url: `v1_0/user/followings/${target}`
})
