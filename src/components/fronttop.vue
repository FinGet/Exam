<template>
    <div class="fronttop">
      <div class="top"></div>
      <div class="top-user">
        <ul class="user-info">
          <li>欢迎！{{userData.userName}}同学</li>
          <li>学号: {{userData.userId}}</li>
          <li>年级: {{userData.grade}} 年级</li>
          <li>班级: {{userData.class}} 班</li>
        </ul>
        <el-button type="danger" size="mini" class="login-out" @click="loginOut">退出</el-button>
        <router-link class="person" :to="{name:'FrontStudentInfo'}">个人中心</router-link>
        <router-link class="index" :to="{name:'FrontIndex'}">首页</router-link>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default{
  props:{
    userData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  methods:{
    // 退出登录
    loginOut(){
      this.$axios.post('/api/studentlogout').then(response => {
        let res = response.data
        if (res.status == 0) {
          this.$message.success('退出成功')
          this.$router.push({name:'FrontLogin'})
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .top {
    width: 100%;
    height:110px;
    margin:0 auto;
    background: url("../common/img/logobanner.png") center center;
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
