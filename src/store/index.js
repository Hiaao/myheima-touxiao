import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: {}
    // user: JSON.parse(window.localStorage.getItem('TOKEN_KEY'))
    user: getItem('TOKEN_KEY')
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      // 将token存储在本地
      // window.localStorage.setItem('TOKEN_KEY', JSON.stringify(state.user))
      setItem('TOKEN_KEY', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
