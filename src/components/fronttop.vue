<template>
    <div class="fronttop">
      <div class="top"></div>
      <div class="top-user">
        <ul class="user-info">
          <li>姓名: 张三</li>
          <li>学号: 1235621</li>
          <li>性别: 男</li>
        </ul>
        <el-button type="danger" size="mini" class="login-out">退出</el-button>
        <router-link class="person" :to="{name:'FrontStudentInfo'}">个人中心</router-link>
        <router-link class="index" :to="{name:'FrontIndex'}">首页</router-link>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">

</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .top {
    width: 100%;
    height:110px;
    margin:0 auto;
    background: url("../common/img/banner.png") center center;
  }
  .top-user{
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin:0 auto;
    font-size: 16px;
    background: #08829f;
    .user-info{
      float: left;
      color: #fff;
      line-height:30px;
      li {
        float: left;
        margin-left: 20px;
      }
    }
    .person,.index{
      color: #c2c2c4;
      float: right;
      margin-right: 30px;
      cursor: pointer;
      &:hover{
        color: #fff;
      }
    }
    .login-out{
      float: right;
      margin-right: 50px;
      margin-top: 4px;
    }
  }
</style>
