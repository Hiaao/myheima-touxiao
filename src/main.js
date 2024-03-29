import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant, { ImagePreview } from 'vant'
import 'vant/lib/index.css'
import '@/styles/index.less'
import '@/utils/dayjs'

Vue.use(Vant)
Vue.use(ImagePreview)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
