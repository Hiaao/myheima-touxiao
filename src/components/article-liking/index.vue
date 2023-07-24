<template>
  <van-icon
    @click="onLike"
    color="#777"
    :name="isLike === 1 ? 'good-job' : 'good-job-o'"
  />
</template>

<script>
import { addLikingAPI, deleteLikingAPI } from '@/api'
export default {
  name: 'ArticleLiking',
  props: {
    isLike: {
      type: Number,
      required: true
    }
  },
  inject: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onLike () {
      this.$toast.loading({
        message: '操作中...',
        forbidClick: true,
        duration: 0
      })
      let status = -1
      try {
        if (this.isLike === 1) {
          // 喜欢，delete
          await deleteLikingAPI(this.articleId)
        } else {
          // add
          await addLikingAPI(this.articleId)
          status = 1
        }
        this.$emit('onLike')
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (error) {
        this.$toast('操作失败，请重试')
      }
    }
  }
}
</script>

<style>
</style>
