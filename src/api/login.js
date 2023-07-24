import requset from '@/utils/request'

// 用户认证登录注册
export const authorLogin = data => requset({
  method: 'POST',
  url: '/v1_0/authorizations',
  data
})

// 用户认证登录注册
export const getSms = mobile => requset({
  method: 'GET',
  url: `/v1_0/sms/codes/${mobile}`
})
