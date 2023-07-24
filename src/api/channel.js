import requset from '@/utils/request'

// 获取用户频道
export const getUserChannel = () => requset({
  method: 'GET',
  url: '/v1_0/user/channels'
})

// 获取所有频道
export const getAllChannel = () => requset({
  method: 'GET',
  url: '/v1_0/channels'
})

// 设置用户频道
export const setUserChannel = channels => requset({
  method: 'PATCH',
  url: '/v1_0/user/channels',
  data: {
    channels
  }
})

// 删除指定用户频道
export const DeleteUserChannel = target => requset({
  method: 'DELETE',
  url: `/v1_0/user/channels/${target}`
})
