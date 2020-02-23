import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false

//添加事件总线对象
Vue.prototype.$bus = new Vue()

//安装toast
Vue.use(toast)

//解决移动端点击300ms延迟问题
FastClick.attach(document.body)

//使用vue-lazyload
Vue.use(VueLazyLoad,{
  loading: require('assets/img/common/loading.jpg')
})

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
