// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui' // 加载ElementUI
import VueLazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import '../static/font-awesome/css/font-awesome.min.css' // 加载fontawesome字体
import '@/common/css/common.css'

Vue.prototype.$axios=axios

Vue.use(ElementUI) // 全局使用elementUI
Vue.use(VueLazyLoad, { // 全局使用图片懒加载
  loading: 'static/loading-svg/loading-bars.svg',
  try: 1 // default 1
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 使用路由
  store, // 使用vuex
  template: '<App/>',
  components: { App }
})
