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
