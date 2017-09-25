<template>
    <div class="login_page">
        <div class="login-page-inner">
            <div class="input-text-wrapper">
                <div class="login-logo marginB10"><img width="300"  v-lazy="logoSrc" alt="logo"></div>
                <el-input v-model="userName" placeholder="请输入账号" @keyup.enter="submit"></el-input>
                <el-input v-model="password" placeholder="请输入密码" @keyup.enter="submit" class="marginT10"></el-input>
            </div>
            <div class="input-text-wrapper marginT30 text-center">
                <el-button type="primary" @click="submit" class="loginBtn">登录</el-button>
            </div>
            <div class="marginT20">
                <a href="javascript:;">注册账号</a>
                <a href="javascript:;">忘记密码？</a>
                <router-link class="note  pull-right" to="/">学生登录</router-link>
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
            password: '',
            logoSrc:require('../common/img/logo.png')
        }
    },
    methods: {
		// 登录
        submit() {
            if (this.userName && this.password) {
                this.$message({
                    showClose: true,
                    message: '恭喜你，登录成功！',
                    type: 'success'
                });
                // 登录成功跳到后台首页
                this.$router.push('/endhome/index')
            } else {
                this.$message({
                    showClose: true,
                    message: '请输入用户名和密码！',
                    type: 'warning'
                });
            }
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
</style>
