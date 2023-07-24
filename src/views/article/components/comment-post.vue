<template>
  <div class="comment-post">
    <van-field
      class="postText"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入评论"
      show-word-limit
    />
    <van-button @click="onPostBtn">发布</van-button>
  </div>
</template>

<script>
import { addCommentAPI } from '@/api'
export default {
  name: 'CommentPost',
  data () {
    return {
      message: ''
    }
  },
  inject: {
    articleId: {
      type: [String, Number, Object],
      required: true
    }
  },
  methods: {
    async onPostBtn () {
      try {
        const { data } = await addCommentAPI({
          target: this.articleId, // 文章id/评论id
          content: this.message,
          art_id: this.articleId // 文章id，对评论内容发表回复时，需要传递此参数，表明所属文章id。对文章进行评论，不要传此参数。
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.comment-post {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 150px;
  .postText {
    width: 80%;
    height: 100px;
    background-color: rgb(234, 234, 234);
  }
}
</style>
