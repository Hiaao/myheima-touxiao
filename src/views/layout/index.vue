<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view></router-view>
    <!-- /子路由出口 -->

    <!-- 标签导航栏 -->
    <van-tabbar v-model="active" route class="layout-tabbar">
      <van-tabbar-item icon="home-o" replace to="/home">
        <i slot="icon" class="icon icon-shouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" replace to="/wenda">
        <i slot="icon" class="icon icon-wenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" replace to="/video">
        <i slot="icon" class="icon icon-shipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item icon="home-o" replace to="/my">
        <i slot="icon" class="icon icon-wode"></i>
        <span class="text">{{ user ? "我的" : "未登录" }}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'LayoutContainer',
  data () {
    return {
      active: 0
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  .layout-tabbar {
    color: #666;
    .icon {
      font-size: 20px;
    }
    .text {
      font-size: 10px;
    }
  }
}
</style>
