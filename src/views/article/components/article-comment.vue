<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem v-for="(obj, index) in list" :key="index" :comment="obj"></CommentItem>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getCommentsAPI } from '@/api'
import CommentItem from './comment-item.vue'
export default {
  name: 'ArticleComment',
  components: {
    CommentItem
  },
  inject: {
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      list: [],

      loading: false,
      finished: false,
      type: 'a', // 获取评论的类型
      offset: null, // 评论数据的偏移量
      totalCount: 0 // 评论总数
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getCommentsAPI({
          type: this.type, // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
          source: this.articleId, // 源id，文章id或评论id
          offset: this.offset, // 获取评论数据的偏移量，值为评论id,不传表示从第一页开始读取数据
          limit: 10 // 获取的评论数据个数
        })
        // console.log(data);

        this.totalCount = data.data.total_count

        const { results } = data.data
        // console.log(results);
        this.list.push(...results)

        if (results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }

        // 返回评论总数
        this.$emit('totalCount', this.totalCount)
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 22px;
}
</style>
