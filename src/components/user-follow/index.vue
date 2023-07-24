<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    :loading="followLoading"
    v-if="!isFollow"
    @click="onFollow"
    >关注</van-button
  >
  <van-button
    class="follow-btn"
    round
    size="small"
    v-else
    :loading="followLoading"
    @click="onFollow"
    >已关注</van-button
  >
</template>

<script>
import { deleteFollowAPI, addFollowAPI } from '@/api'
export default {
  name: 'UserFollow',
  props: {
    isFollow: {
    //   type: Boolean,
      required: true,
      undefined
    },
    userId: {
      // type: [String, Number, Object],
      required: true
    }
  },
  data () {
    return {
      followLoading: false // 关注按钮loading效果
    }
  },
  methods: {
    async onFollow () {
      this.followLoading = true
      try {
        if (this.isFollow) {
          // 已关注
          await deleteFollowAPI(this.userId)
        } else {
          await addFollowAPI(this.userId)
        }
        this.$emit('toggleFollow')
        this.followLoading = false
      } catch (error) {
        let message = '操作失败，请重试'
        if (error.response && error.response.status === 400) {
          message = '你不能关注你自己'
        }
        // console.log(error);
        this.$toast(message)
      }
    }
  }
}
</script>

<style>
</style>
