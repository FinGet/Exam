<template>
  <div class="login_page">
    <div class="login-page-inner">
      <div class="input-text-wrapper">
        <div class="login-logo marginB10"><img width="300"  v-lazy="logoSrc" alt="logo"></div>
        <el-input v-model="userId" placeholder="请输入教师工号" @keyup.native.enter="submit" @change="checkType('userId')"></el-input>
        <span class="error" v-if="error && userId!=''">*只能输入数字</span>
        <el-input v-model="userName" placeholder="请输入用户名" @keyup.native.enter="submit" class="marginT10"></el-input>
        <el-input type="password" v-model="passWord" placeholder="请输入密码不少于6位" @change="checkType('passWord')"  @keyup.native.enter="submit" class="marginT10"></el-input>
        <span class="error" v-if="passError && passWord!=''">*只能输入数字和字母</span>
        <span class="error" v-if="passErrorLen && passWord!=''">*密码不能少于6位</span>
      </div>
      <div class="input-text-wrapper marginT30 text-center">
        <el-button type="primary" @click="submit" class="loginBtn">注册</el-button>
      </div>
      <div class="marginT20">
        <router-link class="note  pull-right" to="/managelogin">去登录</router-link>
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
        logoSrc:require('../common/img/logo.png'),
        error: false,
        passError:false,
        passErrorLen: false
      }
    },
    methods: {
      checkType(type){
        if(type == 'userId'){
          let reg = /^(\s|[0-9])+$/;
          if(!reg.test(this.userId)){
//          this.$message.error('只能输入数字！')
            this.error = true;
          }else {
            this.error = false;
          }
        } else if(type == 'passWord') {
          let reg = /^(\s|[0-9A-Za-z])+$/;
          if(!reg.test(this.passWord)){
            this.passError = true;
          }else {
            this.passError = false;
            if(this.passWord.length < 6) {
              this.passErrorLen = true;
            } else if (this.passWord.length >= 6){
              this.passErrorLen = false;
            }
          }

        }

      },
      // 登录
      submit() {
        if (this.userId == '') {
          this.$message.error('请输入教师工号！');
          return
        } else if (this.userName == ''){
          this.$message.error('请输入用户名！');
          return
        } else if (this.passWord == ''){
          this.$message.error('请输入密码！');
          return
        } else if(this.passWord.length <6) {
          this.$message.error('密码不能少于6位！');
          return
        }
        this.$axios.post('/api/register',{
          userInfo:{
            userName: this.userName,
            passWord: this.passWord,
            userId: this.userId
          }
        }).then(response => {
          let res = response.data;
          if (res.status == '0') {
            this.$message({
              showClose: true,
              message: '恭喜你，注册成功！',
              type: 'success'
            });
            // 注册成功跳到登录
            this.$router.push('/managelogin')
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
            message: '注册失败，请稍后再试！',
            type: 'warning'
          });
        })
      }
    },
    mounted() {
      var bg = new CanvasBackground({
        canvasContainerID: "canvas",
        circleColor: "rgba(49,210,142,1)",
        lineColor: "rgba(49,210,142,1)",
        canvasOpacity: 0.3
      });
    }
  }
</script>

<style scoped>
  .note {
    color: #20a0ff;
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
  .error{
    color:red;
    font-size: 12px;
  }
</style>
