<template>
  <div class="login-container">
    <!-- nav导航栏 -->
    <van-nav-bar class="page-nav-bar" title="登录" />
    <!-- nav导航栏 -->

    <!-- form 输入框和登录区域 -->
    <van-form @submit="onSubmit" class="login-form" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        required
        placeholder="请输入手机号"
        maxlength="11"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="icon icon-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        required
        maxlength="6"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="icon icon-yanzhengma"></i>
        <van-count-down
          slot="button"
          v-if="isTimeShow"
          :time="time"
          format="ss s"
          @finish="isTimeShow = false"
        />
        <van-button
          v-else
          class="get-code-btn"
          slot="button"
          round
          size="mini"
          type="primary"
          @click="onSendCode"
          native-type="button"
        >
          获取验证码
        </van-button>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit"
          >登录</van-button
        >
      </div>
    </van-form>
    <!-- form 输入框和登录区域 -->
  </div>
</template>

<script>
import { authorLoginAPI, getSmsAPI } from '@/api'
export default {
  name: 'LoginContainer',
  data () {
    return {
      user: {
        mobile: '',
        code: 246810
      },
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      time: 60 * 1000,
      isTimeShow: false
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await authorLoginAPI(this.user)
        this.$store.commit('setUser', data.data)
        // console.log(data);
        this.$toast.success('登录成功')
        this.$router.push('/')
      } catch (error) {
        if (error.response && error.response.status === 400) {
          this.$toast.fail('输入的手机号或验证码不正确')
        } else {
          this.$toast.fail('登录失败，请重试')
        }
        console.log(error)
      }
    },

    async onSendCode () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return this.$toast.fail('手机号验证失败')
      }
      // 开启获取验证码倒计时
      this.isTimeShow = true

      // 调用获取验证码接口
      try {
        const { data } = await getSmsAPI(this.user.mobile)
        console.log(data)
        this.$toast('发送成功')
      } catch (error) {
        // 发送失败关闭倒计时
        this.isTimeShow = false
        // 接口访问受限
        if (error.response && error.response.status === 429) {
          this.$toast('发送太频繁了，请稍后重试')
        } else {
          this.$toast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-form {
    .icon {
      margin-right: 10px;
      font-size: 19px;
    }
  }
  .login-btn-wrap {
    margin: 27px 14px;
  }
  .get-code-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    color: #666666;
    font-size: 11px;
    border: 0;
    padding-left: 10px;
    &::before {
      content: "";
      background: url("~@/assets/gradient-gray-line.png");
    }
  }
}
</style>
