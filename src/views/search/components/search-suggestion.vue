<template>
  <!-- 文章搜索提示 -->
  <div class="search-suggestion">
    <van-cell v-for="(item, index) in options" :key="index" icon="search" @click="$emit('onSuggestion', item)">
      <div slot="title" v-html="highlight(item)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestionAPI } from '@/api'
// 加载防抖函数
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggestion',
  props: {
    searchValue: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      options: []
    }
  },
  watch: {
    searchValue: {
      handler: debounce(function (value) {
        this.getSearchSuggestion(value)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async getSearchSuggestion (value) {
      try {
        const { data } = await getSuggestionAPI(value)
        this.options = data.data.options
        // console.log(this.options);
      } catch (error) {
        console.log(error)
        this.$toast('获取关键字失败')
      }
    },

    highlight (item) {
      if (!item) {
        return
      }
      const reg = new RegExp(this.searchValue, 'gi')
      return item.replace(
        reg,
        `<span style="color: #3296fa">${this.searchValue}</span>`
      )
    }
  }
}
</script>

<style>
</style>
