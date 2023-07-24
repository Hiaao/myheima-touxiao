import requset from '@/utils/request'

// 获取评论或评论回复
export const getComments = params => requset({
  method: 'GET',
  url: '/v1_0/comments',
  params
})

// 获取评论或评论点赞
export const addCommentLiking = target => requset({
  method: 'POST',
  url: '/v1_0/comment/likings',
  params: {
    target
  }
})

// 移除评论或评论点赞
export const deleteCommentLiking = target => requset({
  method: 'DELETE',
  url: `/v1_0/comment/likings/${target}`
})

// 对文章或评论进行评论
export const addComment = params => requset({
  method: 'POST',
  url: '/v1_0/comments',
  params
})
