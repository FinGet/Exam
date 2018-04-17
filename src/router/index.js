import Vue from 'vue'
import Router from 'vue-router'
// 前台考试
import FrontLogin from '@/exam/login'
import FrontRegister from '@/exam/register'
import FrontHome from '@/exam/home'
import FrontIndex from '@/exam/pages/index' // 学生端首页
import FrontStudentInfo from '@/exam/pages/studentinfo'  // 学生端个人信息
import ForntExamIndex from '@/exam/pages/examindex'
import ForntExam from '@/exam/pages/exam'
//------------ 后台管理----------------//
import EndLogin from '@/examManage/login'
import EndRegister from '@/examManage/register'
import EndHome from '@/examManage/home'
import Index from '@/examManage/pages/index'
// 试卷管理
import MyPapers from '@/examManage/pages/papersManage/mypapers'
import MarkPapers from '@/examManage/pages/papersManage/markpapers'
// import EditPaper from '@/examManage/pages/papersManage/editpaper'
import EditPaper from '@/examManage/pages/papersManage/editpaper'
// 我的信息管理
import User from '@/examManage/pages/usermsg'
// 学生成绩管理
import StudentManage from '@/examManage/pages/studentManage'
// 404
import NoFind from '@/errpages/404'
Vue.use(Router)

export default new Router({
  routes: [
    // 前台考试
    { path: '/', name: 'FrontLogin', component: FrontLogin},
    { path: '/frontregister', name: 'FrontRegister', component: FrontRegister },
    { path: '/fronthome', name: 'FrontHome', component: FrontHome,
      children: [
        { path: 'frontindex', name: 'FrontIndex', component: FrontIndex},
        { path: 'frontstudentinfo', name: 'FrontStudentInfo', component: FrontStudentInfo},
        { path: 'forntexamindex', name: 'ForntExamIndex', component: ForntExamIndex},
        { path: 'forntexam', name: 'ForntExam', component: ForntExam}
      ]
    },
    // 后台管理
    { path: '/managelogin', name: 'EndLogin', component: EndLogin}, //后台登录
    { path: '/manageregister', name: 'EndRegister', component: EndRegister }, // 后台注册
    { path: '/endhome', name: 'EndHome', component: EndHome, meta: {breadName:'管理系统'},
      children: [
        { path: 'index', name: 'Index', component: Index, meta: {breadName:'首页'},}, // 后台首页
        // 试卷管理
        { path: 'mypapers', name: 'MyPapers', component: MyPapers, meta: {breadName: '我的试卷'}},
        // { path: 'edit/:id', name: 'EditPaper', component: EditPaper, meta: {breadName: '编辑试卷'}},
        { path: 'edit', name: 'EditPaper', component: EditPaper, meta: {breadName: '编辑试卷'}},
        { path: 'markpapers', name: 'MarkPapers', component: MarkPapers, meta: {breadName: '阅卷'}},
        { path: 'studentmanage', name: 'StudentManage', component: StudentManage, meta: {breadName: '学生成绩管理'}},
        // 我的信息
        { path: 'user', name: 'User', component: User, meta: {breadName:'我的信息'},} // 我的信息管理
      ]
    },
    { path: '/*', name: '404', component: NoFind }
  ]
})
