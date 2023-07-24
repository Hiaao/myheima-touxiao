<template>
  <div class="search-result">
    <!-- 文章搜索结果列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(obj, index) in list" :key="index" :title="obj.title" />
    </van-list>
  </div>
</template>

<script>
import { getSearchAPI } from '@/api'
export default {
  name: 'SearchRisult',
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1, // list 页数
      error: false
    }
  },
  methods: {
    async onLoad () {
      try {
        const { data } = await getSearchAPI({
          page: this.page, // 页数
          per_page: 20, // 每页数量
          q: this.searchValue // 搜索关键词
        })
        this.list.push(...data.data.results)

        if (data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (error) {
        this.error = true
      }
      this.loading = false
    }
  }
}
</script>

<style>
</style>
