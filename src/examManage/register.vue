<template>
  <div class="login_page">
    <div class="login-page-inner">
      <div class="input-text-wrapper">
        <div class="login-logo marginB10"><img width="300"  v-lazy="logoSrc" alt="logo"></div>
        <el-form :model="userForm" :rules="rules" ref="ruleForm"  class="demo-ruleForm">
          <el-form-item label="" prop="userId">
            <el-input v-model="userForm.userId" placeholder="请输入教师工号"></el-input>
          </el-form-item>
          <el-form-item label="" prop="userName">
            <el-input v-model="userForm.userName" placeholder="请输入教师姓名"></el-input>
          </el-form-item>
          <el-form-item label="" prop="passWord">
            <el-input type="password" v-model="userForm.passWord" placeholder="请输入账号密码"></el-input>
          </el-form-item>
        </el-form>
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
        userForm:{
          userName: '',
          passWord: '',
          userId: ''
        },
        logoSrc:require('../common/img/logo.png'),
        rules:{
          userId: [
            { required: true, message: '请输入教师工号', trigger: 'blur' },
            { pattern: /^[0-9]+$/, message: '只能输入数字' }
          ],
          userName: [
            { required: true, message: '请输入教师姓名', trigger: 'blur' },
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          passWord: [
            { required: true, message: '请输入账号密码', trigger: 'blur' },
            { min: 6, max: 20, message: '密码不能小于6位', trigger: 'change' },
            { pattern: /^[A-Za-z0-9]+$/, message: '只能输入数字或字母' }
          ]
        }
      }
    },
    methods: {
      // 登录
      submit() {
        this.$refs.ruleForm.validate((valid)=> {
          if (valid) {
            this.$axios.post('/api/register',{
              userInfo:this.userForm
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
