<template>
  <div class="search-container">
    <form action="/" class="search-form">
      <van-search
        v-model="searchValue"
        show-action
        shape="round"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
    </form>

    <SearchRisult v-if="isResultShow" :searchValue="searchValue"></SearchRisult>

    <SearchSuggestion
      v-else-if="searchValue"
      :searchValue="searchValue"
      @onSuggestion="onSuggestionFn"
    ></SearchSuggestion>

    <SearchHistory
      v-else
      @splice="searchHistories.splice($event, 1)"
      :searchHistories="searchHistories"
      @reomveAll="searchHistories = []"
      @onHistory="onHistoryFn"
    ></SearchHistory>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchRisult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'
export default {
  name: 'SearchContainers',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchRisult
  },
  data () {
    return {
      searchValue: '',
      isResultShow: false,
      searchHistories: getItem('HISTORY') || [] // 搜索历史
    }
  },
  methods: {
    onCancel () {
      this.$router.back()
    },
    onSearch () {
      this.isResultShow = true

      // 搜索后本地存储历史记录
      const index = this.searchHistories.indexOf(this.searchValue)
      if (index === -1) {
        this.searchHistories.unshift(this.searchValue)
      } else {
        this.searchHistories.splice(index, 1)
        this.searchHistories.unshift(this.searchValue)
      }
      setItem('HISTORY', this.searchHistories)
    },
    onHistoryFn (item) {
      // 搜索栏变为历史搜索的text，并执行搜索方法
      this.searchValue = item
      this.onSearch()
    },
    onSuggestionFn (item) {
      // 搜索栏变为历史搜索的text，并执行搜索方法
      this.searchValue = item
      this.onSearch()
    }
  },
  watch: {
    searchHistories () {
      setItem('HISTORY', this.searchHistories)
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: flex;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
