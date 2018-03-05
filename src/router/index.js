import Vue from 'vue'
import Router from 'vue-router'
// 前台考试
import FrontLogin from '@/exam/login'
import FrontHome from '@/exam/home'
import FrontIndex from '@/exam/pages/index' // 学生端首页
import FrontStudentInfo from '@/exam/pages/studentinfo'  // 学生端个人信息
//------------ 后台管理----------------//
import EndLogin from '@/examManage/login'
import EndHome from '@/examManage/home'
import Index from '@/examManage/pages/index'
// 试卷管理
import MyPapers from '@/examManage/pages/papersManage/mypapers'
import MarkPapers from '@/examManage/pages/papersManage/markpapers'
import EditPaper from '@/examManage/pages/papersManage/editpaper'
import AddPaper from '@/examManage/pages/papersManage/addpaper'
// 我的信息管理
import User from '@/examManage/pages/usermsg'

// 404
import NoFind from '@/errpages/404'
Vue.use(Router)

export default new Router({
  routes: [
    // 前台考试
    { path: '/', name: 'FrontLogin', component: FrontLogin},
    { path: '/fronthome', name: 'FrontHome', component: FrontHome,
      children: [
        { path: 'frontindex', name: 'FrontIndex', component: FrontIndex},
        { path: 'frontstudentinfo', name: 'FrontStudentInfo', component: FrontStudentInfo}
      ]
    },
    // 后台管理
    { path: '/managelogin', name: 'EndLogin', component: EndLogin}, //后台登录
    { path: '/endhome', name: 'EndHome', component: EndHome, meta: {breadName:'管理系统'},
      children: [
        { path: 'index', name: 'Index', component: Index, meta: {breadName:'首页'},}, // 后台首页
        // 试卷管理
        { path: 'mypapers', name: 'MyPapers', component: MyPapers, meta: {breadName: '我的试卷'}},
        { path: 'edit/:id', name: 'EditPaper', component: EditPaper, meta: {breadName: '编辑试卷'}},
        { path: 'add', name: 'AddPaper', component: AddPaper, meta: {breadName: '新增试卷'}},
        { path: 'markpapers', name: 'MarkPapers', component: MarkPapers, meta: {breadName: '阅卷'}},
        // 我的信息
        { path: 'user', name: 'User', component: User, meta: {breadName:'我的信息'},} // 我的信息管理
      ]
    },
    { path: '/*', name: '404', component: NoFind }
  ]
})
