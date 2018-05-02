// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// import store from './store'
import ElementUI from 'element-ui' // 加载ElementUI
import VueLazyLoad from 'vue-lazyload'
import 'element-ui/lib/theme-default/index.css'
import axios from 'axios'
import '../static/font-awesome/css/font-awesome.min.css' // 加载fontawesome字体
import '@/common/css/common.css'

import * as commonFun from './common/js/commonFun.js'

Vue.prototype.$axios=axios
Vue.prototype.$mySessionStorage = commonFun.mySessionStorage;
//全局封装一个获取用户信息方法
var getUserData=function () {
  var sessionData = commonFun.mySessionStorage.get('currentUser', 'json')||{};
  //console.log(sessionData)
  return {
    userName: sessionData.userName,
    userId: sessionData.userId,
    grade: sessionData.grade,
    class: sessionData.class
  }
};
Vue.prototype.$getUserData=getUserData;
/**
 * 深拷贝
 * @param p
 * @param c
 * @returns {*|{}}
 */
var deepCopy = function(p, c) {
  var c = c || {};
  for (var i in p) {
    if (typeof p[i] === 'object') {
      c[i] = (p[i].constructor === Array) ? [] : {};
      deepCopy(p[i], c[i]);
    } else {
      c[i] = p[i];
    }
  }
  return c;
}
Vue.prototype.$deepCopy=deepCopy;

Vue.use(ElementUI) // 全局使用elementUI
Vue.use(VueLazyLoad, { // 全局使用图片懒加载
  loading: 'static/loading-svg/loading-bars.svg',
  try: 1 // default 1
})
Vue.config.productionTip = false

// 登录判断
router.beforeEach((to, from, next) => {
  var userdata = getUserData();
  if (to.path != '/managelogin'&&to.name!='404'&&to.path != '/'&&to.path != "/frontregister"&&to.path!='/manageregister') {  // 判断是否登录
    if(!userdata.userName){
      // ElementUI.$message.danger('请登陆!');
      ElementUI.Message.error('抱歉，您还没有登录！');
      if(to.path.indexOf('front')>0){
        router.push({path:'/'});
      } else {
        router.push({path:'/managelogin'});
      }
    } else {
      next();
    }
  }
  else {
    next();
  }
})

/**
 * 判断两个数组中的元素是否相同（元素顺序无关）
 * @param  {[type]} array [description]
 * @return {[type]}       [description]
 */
Array.prototype.equals = function (array) {
  // if the other array is a falsy value, return
  if (!array)
    return false;
  // compare lengths - can save a lot of time 
  if (this.length != array.length)
    return false;
  for (var i = 0, l = this.length; i < l; i++) {
    // Check if we have nested arrays
    if (this[i] instanceof Array && array[i] instanceof Array) {
      // recurse into the nested arrays
      if (!this[i].equals(array[i]))
        return false;    
    }      
    else if (!(array.indexOf(this[i])>=0)) { 
      // Warning - two different object instances will never be equal: {x:20} != {x:20}
      return false;  
    }      
  }    
  return true;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router, // 使用路由
  // store, // 使用vuex
  template: '<App/>',
  components: { App }
})
