<template>
  <div class="my-container">
    <!-- 已登录 -->
    <div class="user-info-wrap" v-if="user">
      <div class="wrap-top">
        <div class="left">
          <van-image
            class="user-photo"
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span class="user-name">{{ userInfo.name }}</span>
        </div>
        <div class="right">
          <van-button class="edit-btn" size="mini" round type="info"
            >编辑资料</van-button
          >
        </div>
      </div>
      <div class="wrap-bottom">
        <ul class="stats">
          <li class="stats-item">
            <span class="count">{{ userInfo.art_count }}</span>
            <p class="text">头条</p>
          </li>
          <li class="stats-item">
            <span class="count">{{ userInfo.follow_count }}</span>
            <p class="text">关注</p>
          </li>
          <li class="stats-item">
            <span class="count">{{ userInfo.fans_count }}</span>
            <p class="text">粉丝</p>
          </li>
          <li class="stats-item">
            <span class="count">{{ userInfo.follow_count }}</span>
            <p class="text">获赞</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- /已登录 -->

    <!-- 未登录 -->
    <div class="header" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="mobile-img" src="~@/assets/mobile.png" alt="" />
        <span class="login-text">登录 / 注册</span>
      </div>
    </div>
    <!-- /未登录 -->

    <!-- 收藏历史(宫格导航) -->
    <van-grid class="gtid-wrap" clickable :column-num="2">
      <van-grid-item class="gtid-item">
        <span slot="text" class="text">收藏</span>
        <i slot="icon" class="icon icon-shoucang"></i>
      </van-grid-item>
      <van-grid-item class="gtid-item">
        <span slot="text" class="text">历史</span>
        <i slot="icon" class="icon icon-lishi"></i>
      </van-grid-item>
    </van-grid>
    <!-- /收藏历史(宫格导航) -->

    <!-- 单元格导航 -->
    <van-cell-group class="cell-wrap">
      <van-cell is-link class="cell">
        <span class="title" slot="title">消息通知</span>
      </van-cell>
      <van-cell is-link class="cell">
        <span class="title" slot="title">小智同学</span>
      </van-cell>
    </van-cell-group>

    <van-cell v-if="user" title="退出登录" class="exit-btn" @click="onLogout">
      <!-- <span slot="title" class="">退出登录</span> -->
    </van-cell>
    <!-- /单元格导航 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfoAPI } from '@/api'
export default {
  name: 'MyContainer',
  data () {
    return {
      userInfo: {}
    }
  },
  async created () {
    try {
      const { data } = await getUserInfoAPI()
      // console.log(data);
      this.userInfo = data.data
      console.log(this.userInfo)
    } catch (error) {
      console.log(error)
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    onLogout () {
      this.$dialog
        .confirm({
          title: '退出提示',
          message: '确认退出吗？'
        })
        .then(() => {
          // 确认触发
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // 取消触发
        })
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  // 未登录头部
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    height: 201px;
    width: 100%;
    .login-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      .mobile-img {
        width: 66px;
        height: 66px;
      }
      .login-text {
        margin-top: 8px;
        font-size: 14px;
        color: #fff;
      }
    }
  }

  // 已登录头部
  .user-info-wrap {
    background: url("~@/assets/banner.png") no-repeat;
    background-size: cover;
    height: 201px;
    width: 100%;
    .wrap-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 51px 17px 0 16px;
      .left {
        display: flex;
        align-items: center;
        justify-content: center;
        .user-photo {
          width: 66px;
          height: 66px;
          border: 1px solid #fff;
          margin-right: 11px;
        }
        .user-name {
          font-size: 15px;
          color: #fff;
        }
      }

      .right {
        .edit-btn {
          color: #666;
          font-size: 10px;
          background-color: #fff;
          border: none;
          width: 58px;
          height: 17px;
          line-height: 17px;
          vertical-align: middle;
        }
      }
    }

    .wrap-bottom {
      .stats {
        display: flex;
        justify-content: space-around;
        align-items: center;
        margin-top: 28px;
        .stats-item {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          color: #fff;
          .count {
            font-size: 18px;
          }
          .text {
            margin: 0;
            font-size: 12px;
          }
        }
      }
    }
  }

  // 我的页面主体内容
  .gtid-wrap {
    margin-bottom: 5px;
    .gtid-item {
      .icon {
        font-size: 23px;
      }
      .icon-shoucang {
        color: #eb5253;
      }
      .icon-lishi {
        color: #ff9d1d;
      }
      .text {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .cell-wrap {
    margin-bottom: 5px;
    .cell {
      height: 50px;
      line-height: 30px;
      &:first-child {
        border-bottom: 1px solid #edeff3;
      }
      .title {
        font-size: 15px;
        color: #333;
      }
    }
    .van-cell__right-icon {
      line-height: 30px;
    }
  }

  .exit-btn {
    font-size: 15px;
    color: #d86262;
    text-align: center;
    height: 50px;
    line-height: 30px;
  }
}
</style>
