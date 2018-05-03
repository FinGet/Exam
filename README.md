# exam

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

# 小坑总集
## vue-lazyload 路径问题
```
<img width="300" height="53" v-lazy="logoSrc" alt="">
logoSrc:require('../common/img/logo.png')
// 不能写成：<img width="300" height="53" v-lazy="../common/img/logo.png" alt="">
```
## 全局定义axios
首先axios不支持vue.use()式声明
```
在main.js中如下声明使用
import axios from 'axios';
Vue.prototype.$axios=axios;
那么在其他vue组件中就可以this.$axios调用使用
```
# 面包屑导航
> 绑定面包屑要根据实际情况来定，但是`this.$router.currentRoute.matched`是最主要的

```
<template>
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadData" :key="item.id" :to="{ name: item.meta.breadName=='管理系统'?'Index':item.name }">{{item.meta.breadName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        breadData:[]
      }
    },
    watch: {
      $route () {
        this.initBreadData();
      }
    },
    methods:{
      //面包屑
      initBreadData(){
        this.breadData=this.$router.currentRoute.matched;
        // console.log(this.breadData)
      }
    },
    created(){
      this.initBreadData();
    }
  }
</script>

```
# elementui面包屑导航与左侧导航相对应
> 根据实际情况来，不能套用，要看你的路由怎么写的 `this.$router.currentRoute.path`
`:default-active="activeIndex"`

```
//初始化列表active状态
  methods:{
      initActiveIndex(){
        // var str =this.$router.currentRoute.path;
        this.activeIndex=this.$router.currentRoute.path;
        // console.log(str)
      }
    },
    watch:{
      '$route':'initActiveIndex'
    },
    created(){
      this.initActiveIndex();
    }
```
# 配置代理
配置代理之后，localhost:8088/api/* -> localhost:3000/api/*
```
config/index.js
proxyTable: {
        // proxy all requests starting with /api to jsonplaceholder
        '/api': {
            target: 'http://127.0.0.1:3000/api',
            changeOrigin: true,
            pathRewrite: {
                '^/api': ''  // 若target中没有/api、这里又为空，则404；
            }
        }
    },
```
# 修改api接口配置
```
server/api
var routes = require('./routes/index');
routes(app);
```

```
server/routes/index.js
module.exports = function(app) {
  app.get('/api', (req, res) => {
    res.render('index', {title: 'Express'});
  })
}
```

>这里我们在 routes/index.js 中通过module.exports 导出了一个函数接口，在 app.js 中通过 require 加载了 index.js 然后通过routes(app) 调用了 index.js 导出的函数。

# 用户登录(连接数据库迈出第一步,看的再多不如动手写一写)
```
var User = require('./../model/user')

// 初始化一条数据 本地若无数据，第一次运行将注释去掉
// function insert() {
// 	var user = new User({
// 		userName: 'Bios',
// 		userPwd: '123',
// 		type: 0
// 	});
// 	user.save((err, res) => {
// 		if (err) {
// 			console.log('Error:'+ err);
// 		} else {
// 			console.log("Res"+res)
// 		}
// 	})
// }
// insert();

// 用户登录
module.exports = function(app) {
	app.post('/api/login', (req, res) => {
		// res.render('index', {title: 'user info'});
		var param = {
			userName: req.body.userName,
			userPwd: req.body.userPwd
		}
		console.log(param);
		User.findOne(param, (err,doc)=>{
			// console.log(err) When the findOne query doesn't find at least one matching document,
			// the second parameter of the callback (in this case user) is set to null.
			// It's not an error, so err is also null.
			if (err) {
				res.json({
					status:'1',
					msg: err.message
				})
			} else {
				if (doc) {
					res.json({
						status: '0',
						msg:'success',
						result:{
							userName: doc.userName
						}
					})
				} else {
					res.json({
						status: '2',
						msg:'没有该用户'
					})
				}
			}
		})
	})
}
```
# 设置session实现用户登录存储用户信息，退出时清空

> session设置要放在所有路由前面

```
app.js
  var sessionParser = require('express-session')

  // 加载解析session的中间件
// session 的 store 有四个常用选项：1）内存 2）cookie 3）缓存 4）数据库
// 数据库 session。除非你很熟悉这一块，知道自己要什么，否则还是老老实实用缓存吧 需要用到（connect-mongo插件 line 7）
// app.use(sessionParser({ 会在数据库中新建一个session集合存储session
//  secret: 'express',
//  store: new mongoStore({
//    url:'mongodb://127.0.0.1:27017/examSystem',
//    collection:'session'
//  })
// }));

// 默认使用内存来存 session，对于开发调试来说很方便
app.use(sessionParser({
	secret: '12345', // 建议使用 128 个字符的随机字符串
  name: 'userInfo',
  cookie: { maxAge: 1800000 },
  resave:true,
  rolling:true,
  saveUninitialized:false
}));
```
```
teacher.js
// 登录时
if (doc) {
  req.session.userName = doc.userName
  req.session.userPwd = doc.userPwd
// console.log(req.session)
  res.json({
    status: '0',
    msg:'success',
    result:{
      userName: doc.userName
    }
  })
}
// 退出时 (退出成功路由跳转我是用vue-louter实现的，并没有用重定向)
  req.session.userName = ''
  req.session.userPwd = ''
  res.json({
    status:'0',
    msg:'',
    result:'退出成功'
  })
```
# 模糊查询+分页查询
```
// 获取试卷
  app.get('/api/mypapers', (req, res) => {
    let name = req.param('name'),
        // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
        pageSize = parseInt(req.param('pageSize')),
        pageNumber = parseInt(req.param('pageNumber')),
        userName = req.session.userName;
    let skip = (pageNumber-1)*pageSize; // 跳过几条
    let reg = new RegExp(name,'i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
    let params = {
      name: reg
    };
    let papersModel = Papers.find(params).skip(skip).limit(pageSize);
    papersModel.exec({},(err, doc) => {
      ……
    })
  })
```
12-25号，修改了数据库模型的关联关系和文档目录结构。新的模糊查询，分页查询
![](https://i.imgur.com/gaMLMqu.png)

## 测试修改
1. 阅卷查询是否需要阅卷
2. 学生考试，已参加的只能在下次参加，只显示在考试时间范围内的考试
3. 学生考试倒计时，应该已考试时长与当前时间差值做基数