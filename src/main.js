import Vue from 'vue'
import App from './App.vue'
import 'assets/css/base.css'
import router from './router'
import store from './store'

import toast from 'components/common/toast'

Vue.config.productionTip = false

// 添加事件总线
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
