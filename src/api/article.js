import requset from '@/utils/request'

// 获取文章新闻推荐
export const getArticles = (channel_id, timestamp) => requset({
  method: 'GET',
  url: '/v1_0/articles',
  params: {
    channel_id,
    timestamp
  }
})

// 获取文章新闻详情
export const getArticlesInfo = article_id => requset({
  method: 'GET',
  url: `/v1_0/articles/${article_id}`
})

// 收藏文章
export const addCollection = target => requset({
  method: 'POST',
  url: '/v1_0/article/collections',
  data: {
    target
  }
})

// 取消收藏文章
export const deleteCollection = target => requset({
  method: 'DELETE',
  url: `/v1_0/article/collections/${target}`
})

// 点赞文章
export const addLiking = target => requset({
  method: 'POST',
  url: '/v1_0/article/likings',
  data: {
    target
  }
})

// 取消点赞文章
export const deleteLiking = target => requset({
  method: 'DELETE',
  url: `/v1_0/article/likings/${target}`
})
