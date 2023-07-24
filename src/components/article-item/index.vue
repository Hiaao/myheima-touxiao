<template>
  <van-cell class="article-item" :to="{
    name: 'article',
    params: {
      articleId: article.art_id
    }
  }">
    <div class="item-wrap">
      <div slot="title" class="title">{{ article.title }}</div>

      <!-- 三张图片 -->
      <div slot="label">
        <div v-if="article.cover.type === 3" class="cover-wrap">
          <div
            class="cover-item"
            v-for="(img, index) in article.cover.images"
            :key="index"
          >
            <van-image class="cover-item-img" fit="cover" :src="img" />
          </div>
        </div>
        <div class="label-info-wrap">
          <span>{{ article.aut_name }}</span>
          <span>{{ article.comm_count }}评论</span>
          <span>{{ article.pubdate | relativeTime }}</span>
        </div>
      </div>
      <!-- /三张图片 -->
    </div>

    <!-- 一张图片 -->
    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
    <!-- /一张图片 -->
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
    border-bottom: 1px solid #edeff3;
  .item-wrap {
    .title {
      font-size: 16px;
      color: #3a3a3a;
    }

    .label-info-wrap {
      span {
        font-size: 12px;
        color: #b4b4b4;
        margin-right: 14px;
      }
    }
  }

  .right-cover {
    flex-shrink: 0;
    margin-left: 13px;
  }

  .van-cell__value {
    display: flex;
  }

  .van-image {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    margin-top: 10px;
    .cover-item {
      .cover-item-img {
        margin-right: 2px;
      }
    }
  }
}
</style>
