<template>
  <div class="login_page">
    <div class="login-page-inner">
      <div class="input-text-wrapper">
        <div class="login-logo marginB10"><img width="300" v-lazy="logoSrc" alt="logo"></div>
        <el-input v-model="userName" placeholder="请输入账号" @keyup.enter="submit"></el-input>
        <el-input v-model="passWord" placeholder="请输入密码" type="password" @keyup.enter="submit" class="marginT10"></el-input>
      </div>
      <div class="input-text-wrapper marginT30 text-center">
        <el-button type="warning" @click="submit" class="loginBtn">注册</el-button>
      </div>
      <div class="marginT20">
        <router-link class="note  pull-right" to="/">去登录</router-link>
      </div>
    </div>
    <div id="canvas"></div>
  </div>
</template>

<script>
  //  初始化一些数据
  import { CanvasBackground } from '@/common/js/canvas_bg.js'
  export default {
    data() {
      return {
        userName: '',
        passWord: '',
        userId: '',
        logoSrc:require('../common/img/logo1.png')
      }
    },
    methods: {
      // 登录
      submit() {
        if (this.userName == '' || this.passWord == '') {
          this.$message.error('请输入用户名或密码！')
          return
        }
        this.$axios.post('/api/studentregister',{
          userName: this.userName,
          userPwd: this.passWord,
          userId: this.userId
        }).then(response => {
          let res = response.data;
          if (res.status == '0') {
            this.$message({
              showClose: true,
              message: '恭喜你，注册成功！',
              type: 'success'
            });
            // 登录成功跳到后台首页
            this.$router.push('/endhome/index')
          } else {
            this.$message({
              showClose: true,
              message: '用户名或密码错误！',
              type: 'warning'
            });
            this.password = ''
          }
        }).catch(err => {
          this.$message({
            showClose: true,
            message: '登录失败，请稍后再试！',
            type: 'warning'
          });
        })
      }
    },
    mounted() {
      var bg = new CanvasBackground({
        canvasContainerID: "canvas",
        circleColor: "rgba(255,128,0,1)",
        lineColor: "rgba(255,159,64,1)",
        canvasOpacity: 0.3
      });
    }
  }
</script>

<style scoped>
  .note {
    color: #f7ba2a;
    font-size: 14px;
  }
  /*必填项 * 图标*/

  .note>p:after {
    content: ' *';
    color: red;
    font-size: 120%;
  }

  .login_page {
    width: 100%;
    height: 100%;
  }

  .login-page-inner {
    height: 420px;
    max-width: 300px;
    margin: 0 auto;
    position: relative;
    top: 50%;
    margin-top: -230px;
    padding: 20px;
    z-index: 10;
  }

  .login-logo {
    text-align: center;
  }

  #canvas {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
  }

  .loginBtn {
    width: 100%;
  }
</style>
