<template>
  <div class="article-list">
    <van-pull-refresh
      success-duration="1000"
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="refreshSuccessText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <!-- 文章列表 -->
        <ArticleItem
          class="article-item"
          v-for="(obj, index) in articleList"
          :key="index"
          :article="obj"
        ></ArticleItem>
        <!-- /文章列表 -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  components: {
    ArticleItem
  },
  data () {
    return {
      loading: false,
      finished: false,
      timestamp: null, // 时间戳用于获取新的数据
      articleList: [], // 存储获取的新闻列表数据
      refreshing: false, // 下拉完毕设置为false
      refreshSuccessText: '刷新失败，请重试',
      error: false
    }
  },
  created () {},
  methods: {
    async onLoad () {
      try {
        this.error = false
        const { data } = await getArticlesAPI(
          this.channel.id,
          this.timestamp || Date.now()
        )

        // if(Math.random() > 0.5) {
        //     JSON.parse('HDSFHDOFOjkjm')
        // }

        // console.log(data);
        this.articleList.push(...data.data.results)
        // console.log(this.articleList);
        this.loading = false

        if (data.data.results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
        this.loading = false
      }
    },

    async onRefresh () {
      try {
        const { data } = await getArticlesAPI(this.channel.id, Date.now())

        // if(Math.random() > 0.2) {
        //     JSON.parse('HDSFHDOFOjkjm')
        // }

        // console.log(data);
        this.articleList.unshift(...data.data.results)

        this.refreshSuccessText = `刷新成功，更新了${data.data.results.length}条数据`
      } catch (error) {
        this.refreshSuccessText = '刷新失败，请重试'
      }
      this.refreshing = false
    }
  }
}
</script>

<style lang="less" scoped>
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
