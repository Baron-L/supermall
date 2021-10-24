import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import toast from 'components/common/toast'
Vue.config.productionTip = false
// 事件总线
Vue.prototype.$bus = new Vue()
// 安装插件
Vue.use(toast)
// 安装插件
Vue.use(VueLazyLoad, {
  loading: require('./assets/img/common/placeholder.png')
})

// 解决移动端300毫秒延迟
FastClick.attach(document.body)
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
