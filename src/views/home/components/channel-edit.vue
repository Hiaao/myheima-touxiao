<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell title="我的频道" class="myChannels">
      <van-button
        plain
        round
        color="#f85959"
        size="small"
        v-if="isEditShow"
        @click="isEditShow = false"
        >完成</van-button
      >
      <van-button
        plain
        round
        color="#f85959"
        size="small"
        v-else
        @click="isEditShow = true"
        >编辑</van-button
      >
    </van-cell>

    <!-- 跳转 删除区域 -->
    <van-grid class="grid-item on-channle-grid" :gutter="12">
      <van-grid-item
        v-for="(obj, index) in userChannels"
        :key="obj.id"
        :text="obj.name"
        @click="onDeleteChannel(obj.id, index)"
      >
        <van-icon v-if="isEditShow" slot="icon" name="clear" />
      </van-grid-item>
    </van-grid>
    <!-- /我的频道 -->

    <!-- 频道推荐 -->
    <van-cell title="频道推荐" class="allChannels"></van-cell>

    <!-- 添加区域 -->
    <van-grid class="grid-item on-channle-grid" :gutter="12">
      <van-grid-item
        icon="plus"
        v-for="obj in recommendChannels"
        :key="obj.id"
        :text="obj.name"
        @click="addChannel(obj)"
      />
    </van-grid>
    <!-- /频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannelAPI,
  setUserChannelAPI,
  DeleteUserChannelAPI
} from '@/api'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    userChannels: {
      type: Array,
      required: true
    },
    onActive: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 所有频道数据
      isEditShow: false // 控制编辑按钮切换
    }
  },
  async created () {
    try {
      const { data } = await getAllChannelAPI()
      // console.log(data);
      this.allChannels = data.data.channels
      // console.log(this.allChannels);
    } catch (error) {
      this.$toast('获取所有频道数据失败')
    }
  },
  computed: {
    // 通过计算属性 所有数据 - 用户数据 = 推荐频道
    recommendChannels () {
      return this.allChannels.filter((all) => {
        return !this.userChannels.find((user) => all.id === user.id)
      })
    }
  },
  methods: {
    async addChannel (channel) {
      try {
        this.$emit('push', channel)
        if (this.$store.state.user) {
          const { data } = await setUserChannelAPI([
            {
              id: channel.id,
              seq: this.userChannels.length
            }
          ])
          console.log(data)
        } else {
          // 未登录 本地存储
          setItem('CHANNELS', this.userChannels)
        }
      } catch (error) {
        console.log(error)
        this.$toast('添加频道失败')
      }
    },

    async onDeleteChannel (channelId, index) {
      try {
        if (this.isEditShow === true) {
          if (index <= this.onActive) {
            this.$emit('subActive')
          }
          this.$emit('splice', index)

          if (this.$store.state.user) {
            // 已登录 修改后台数据
            const { data } = await DeleteUserChannelAPI(channelId)
            console.log(data)
          } else {
            // 未登录 修改本地数据
            setItem('CHANNELS', this.userChannels)
          }
        } else {
          this.$emit('onToggleChannel', index)
        }
      } catch (error) {}
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit {
  .van-button {
    width: 52px;
    height: 24px;
    vertical-align: middle;
  }
  .van-grid-item {
    height: 43px;
    /deep/.van-grid-item__content {
      background-color: #f4f5f6;
    }
    /deep/.van-grid-item__text {
      font-size: 14px;
      color: #222222;
      flex-shrink: 0;
    }
  }
  /deep/.van-grid-item__content {
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  /deep/.van-grid-item__icon {
    font-size: 12px;
    margin-right: 3px;
  }
  /deep/.van-grid-item__icon + .van-grid-item__text {
    margin-top: 0;
  }

  .myChannels {
    margin-top: 43px;
    margin-bottom: 14px;
  }

  .allChannels {
    margin-top: 28px;
    margin-bottom: 14px;
  }

  /deep/.van-grid-item__icon-wrapper {
    position: absolute;
    top: -5px;
    right: -5px;
    font-size: 14px;
    color: #a7a5a5;
    z-index: 2;
  }
}
</style>
