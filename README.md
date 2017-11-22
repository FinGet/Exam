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