import requset from '@/utils/request'

// 获取联想建议
export const getSuggestion = q => requset({
  method: 'GET',
  url: '/v1_0/suggestion',
  params: {
    q
  }
})

// 搜索结果
export const getSearch = params => requset({
  method: 'GET',
  url: '/v1_0/search',
  params
})
