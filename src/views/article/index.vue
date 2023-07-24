<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-if="status === 200">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
          <div slot="label" class="publish-date">
            {{ articleInfo.pubdate | relativeTime }}
          </div>
          <!-- 关注按钮组件 -->
          <UserFollow
            class="follow-btn"
            :userId="articleInfo.aut_id"
            :isFollow="articleInfo.is_followed"
            @toggleFollow="articleInfo.is_followed = !articleInfo.is_followed"
          ></UserFollow>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleInfo.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 文章评论 -->
        <ArticleComment @totalCount="totalCount = $event"></ArticleComment>
        <!-- /文章评论 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small" @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="totalCount" color="#777" />
      <!-- 收藏按钮组件 -->
      <ArticleCollection
        v-if="isCollocted"
        :isCollected="articleInfo.is_collected"
        @onCollect="articleInfo.is_collected = !articleInfo.is_collected"
      ></ArticleCollection>

      <!-- 点赞组件 -->
      <ArticleLiking
        v-if="isCollocted"
        :isLike="articleInfo.attitude"
        @onLike="articleInfo.attitude = -articleInfo.attitude"
      ></ArticleLiking>
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom" >
      <CommentPost></CommentPost>
    </van-popup>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getArticlesInfoAPI } from '@/api'
import UserFollow from '@/components/user-follow'
import ArticleCollection from '@/components/article-collection'
import ArticleLiking from '@/components/article-liking'
import './github-markdown.css'
import ArticleComment from './components/article-comment.vue'
import CommentPost from './components/comment-post.vue'
import { ImagePreview } from 'vant'
export default {
  name: 'ArticleIndex',
  components: {
    UserFollow,
    ArticleCollection,
    ArticleLiking,
    ArticleComment,
    CommentPost
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  // 依赖注入，给所有子组件传递值
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  data () {
    return {
      articleInfo: {},
      loading: true, // 加载状态
      status: 200, // 报错状态
      isCollocted: false,
      totalCount: 0, // 评论总数
      isPostShow: false // 发布评论弹出层
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle()
  },
  mounted () {},
  methods: {
    async loadArticle () {
      this.status = 200
      this.loading = true
      try {
        const { data } = await getArticlesInfoAPI(this.articleId)
        console.log(data)
        this.articleInfo = data.data
        this.isCollocted = true

        // 图片点击预览
        const _this = this
        setTimeout(function () {
          _this.previewImage()
        }, 0)
      } catch (error) {
        this.status = error.response.statues
        console.log(error.response.statues)
      }
      this.loading = false
    },
    previewImage () {
      // 得到所有的img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)

        // 点击图片，执行预览效果
        img.addEventListener('click', function () {
          ImagePreview({
            images,
            startPosition: index
          })
        })
        // img.click();
      })
      // console.log(images);
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 20px;
      padding: 25px 16px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 16px;
      .avatar {
        width: 35px;
        height: 35px;
        margin-right: 9px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 12px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 11px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 85px;
        height: 29px;
      }
    }

    .article-content {
      padding: 28px 16px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 100px 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 100px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 61px;
      color: #b4b4b4;
    }
    .text {
      font-size: 15px;
      color: #666666;
      margin: 16px 0 23px;
    }
    .retry-btn {
      width: 140px;
      height: 35px;
      line-height: 35px;
      border: 1px solid #c3c3c3;
      font-size: 15px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 44px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 141px;
      height: 23px;
      border: 2px solid #eeeeee;
      font-size: 15px;
      line-height: 23px;
      color: #a7a7a7;
    }
    /deep/.van-icon {
      font-size: 20px;
      .van-info {
        font-size: 18px;
        background-color: #e22829;
      }
    }
  }
}
</style>
