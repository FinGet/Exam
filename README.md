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
