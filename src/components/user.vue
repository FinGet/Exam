<template>
  <el-dropdown>
      <span class="el-dropdown-link">
          <span class="user-image"><img :src="headImage" alt=""></span>
          <span>{{userData.userName}}</span>
      </span>
    <el-dropdown-menu slot="dropdown" class="user-dropdown">
      <el-dropdown-item>
        <a>
          个人资料
          <i class="fa fa-id-card-o fa-fw"></i>
        </a>
      </el-dropdown-item>
      <el-dropdown-item>
        <a>
          修改密码
          <i class="fa fa-key fa-fw"></i>
        </a>
      </el-dropdown-item>
      <el-dropdown-item>
        <a @click="loginOut">
          退出
          <i class="fa fa-sign-out fa-lg"></i>
        </a>
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
  export default {
    props:{
      userData: {
        type: Object,
        default: function () {
          return {

          }
        }
      }
    },
    data() {
      return {
        headImage: require('../common/img/userdefault.png')
      }
    },
    methods:{
      // 退出登录
      loginOut(){
        this.$axios.post('/api/logout').then(response => {
          let res = response.data
          if (res.status == 0) {
            this.$message.success('退出成功')
            this.$router.push({name:'EndLogin'})
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .user-dropdown{
    font-size: 13px;
    a i{
      float: right;
      line-height: 36px;
    }
  }
  .user-image{
    display: inline-block;
    width: 30px;
    height:30px;
    border-radius: 50%;
    vertical-align: middle;
    margin-right: 8px;
    overflow: hidden;
    cursor: pointer;
    img{
      display: block;
      width: 100%;
    }
  }
</style>
