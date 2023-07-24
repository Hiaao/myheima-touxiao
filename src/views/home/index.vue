<template>
  <div class="home-container">
    <!-- nav导航栏 搜索按钮 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button class="search-btn" slot="title" icon="search" size="small" type="primary" round to="/search"
        color="#5babfb">
        搜索
      </van-button>
    </van-nav-bar>
    <!-- /nav导航栏 搜索按钮 -->

    <!-- tab切换栏 -->
    <van-tabs class="tab-wrap" v-model="active" animated swipeable>
      <van-tab class="tab-item" :title="obj.name" v-for="obj in channels" :key="obj.id">
        <ArticleList :channel="obj"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="hambuger-btn" @click="isMoreShow = true">
        <i class="icon icon-gengduo"></i>
      </div>
      <div slot="nav-right" class="placeholder"></div>
    </van-tabs>
    <!-- /tab切换栏 -->

    <!-- 更多频道 -->
    <van-popup v-model="isMoreShow" closeable close-icon-position="top-left" position="bottom"
      :style="{ height: '100%' }">
      <ChannelEdit @push="channels.push($event)" @splice="channels.splice($event, 1)" :userChannels="channels" :onActive="active"
        @onToggleChannel="toggleChannel" @subActive="active = active - 1"></ChannelEdit>
    </van-popup>
    <!-- /更多频道 -->
  </div>
</template>

<script>
import { getUserChannelAPI } from '@/api'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { getItem } from '@/utils/storage'
export default {
  name: 'HomeContainer',
  components: {
    ArticleList,
    ChannelEdit
  },
  data () {
    return {
      active: 0,
      channels: [],
      isMoreShow: false
    }
  },
  async created () {
    try {
      let channels = []
      if (this.$store.state.user) {
        // 已登录获取后台的频道
        const { data } = await getUserChannelAPI()
        // console.log(data);
        channels = data.data.channels
        // console.log(channels);
      } else {
        // 未登录获取本地存储的频道
        const loaclChannels = getItem('CHANNELS')

        // 判断本地是否有数据，如果没有就请求默认推荐的频道列表
        if (loaclChannels) {
          channels = loaclChannels
        } else {
          const { data } = await getUserChannelAPI()
          channels = data.data.channels
          console.log(1)
        }
      }
      this.channels = channels
    } catch (error) {
      this.$toast('获取用户频道失败')
    }
  },
  methods: {
    toggleChannel (index) {
      this.active = index
      this.isMoreShow = false
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {

  // nav导航 搜索按钮
  .page-nav-bar {
    /deep/.van-nav-bar__title {
      max-width: unset;
    }

    .van-button__icon {
      color: #fff;
      font-size: 16px;
    }

    .search-btn {
      width: 278px;
      height: 32px;
      font-size: 14px;
      color: #fff;
    }
  }

  // tab切换栏
  /deep/.tab-wrap {
    position: absolute;
    top: 46px;
    left: 0;
    right: 0;

    .van-tabs__nav--line.van-tabs__nav--complete {
      padding-right: 0;
      padding-left: 0;
    }

    .van-tabs--line .van-tabs__wrap {
      border-bottom: 1xp solid #3296fa;
    }

    .van-tab {
      min-width: 100px;
      height: 42px;
      // border-bottom: 1px solid #edeff3;
      flex: 0;
      font-size: 14px;
      color: #777;
    }

    .van-tab--active {
      font-size: 15px;
      color: #333;
    }

    .van-tabs__line {
      width: 16px;
      height: 3px;
      background-color: #3296fa;
      margin-bottom: 5px;
    }

    // 汉堡按钮
    .hambuger-btn {
      position: fixed;
      top: 46px;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33px;
      height: 40px;
      background-color: #fff;
      opacity: 0.9;
      padding-left: 2px;

      &::before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 29px;
        background: url("~@/assets/gradient-gray-line.png") no-repeat;
        background-size: contain;
      }

      .icon {
        font-size: 17px;
      }
    }
  }

  // 防止最后tab栏被遮住的占位css
  .placeholder {
    flex-shrink: 0;
    width: 33px;
    height: 40px;
  }
}
</style>
