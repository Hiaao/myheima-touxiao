<template>
  <van-icon
    v-if="isCollected"
    color="#777"
    name="star"
    @click="onCollection"
  />
  <van-icon
    v-else
    color="#777"
    name="star-o"
    @click="onCollection"
  />
</template>

<script>
import { addCollectionAPI, deleteCollectionAPI } from '@/api'
export default {
  name: 'ArticleCollection',
  props: {
    isCollected: {
      type: Boolean,
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
    async onCollection () {
      this.$toast.loading({
        duration: 0,
        message: '操作中...',
        forbidClick: true
      })
      try {
        if (this.isCollected) {
          // 已收藏，delete
          await deleteCollectionAPI(this.articleId)
          this.$toast.success('取消收藏')
        } else {
          // 没收藏，add
          await addCollectionAPI(this.articleId)
          this.$toast.success('收藏成功')
        }
        this.$emit('onCollect')
      } catch (error) {
        console.log(error)
        this.$toast('操作失败，请重试')
      }
    }
  }
}
</script>

<style>
</style>
