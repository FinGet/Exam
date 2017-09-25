import Vue from 'vue'
import Router from 'vue-router'
import FrontLogin from '@/exam/login'
import FrontHome from '@/exam/home'
import EndLogin from '@/examManage/login'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', name: 'FrontLogin', component: FrontLogin},
    { path: 'fronthome', name: 'FrontHome', component: FrontHome,
      children: [
      ]
    },
    { path: '/managelogin', name: 'EndLogin', component: EndLogin}
  ]
})
