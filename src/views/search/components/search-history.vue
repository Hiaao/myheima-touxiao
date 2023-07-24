<template>
  <!-- 搜索历史 -->
  <div class="search-history">
    <van-cell title="历史记录" class="history-header">
      <span class="delete-all" v-if="isDelteShow" @click="$emit('reomveAll')">全部删除</span>
      <span v-if="isDelteShow" @click="isDelteShow = false">完成</span>
      <van-icon v-else name="delete" @click="isDelteShow = true" />
    </van-cell>
    <van-cell
      v-for="(item, index) in searchHistories"
      :key="index"
      :title="item"
      @click="deleteHistory(index, item)"
    >
      <van-icon v-if="isDelteShow" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isDelteShow: false
    }
  },
  methods: {
    deleteHistory (index, item) {
      if (this.isDelteShow) {
        this.$emit('splice', index)
      } else {
        // 不删除搜索
        this.$emit('onHistory', item)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.search-history {
  .history-header {
    .delete-all {
      margin-right: 10px;
    }
  }
}
</style>
