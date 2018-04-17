<template>
    <div class="sidebar">
      <el-row>
        <el-col class="text-center marginT10">
          <img width="150" v-lazy="logoSrc" alt="logo">
        </el-col>
        <el-col>
          <el-menu theme="dark" :default-active="activeIndex" class="el-menu-vertical" @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="/endhome/index"><i class="fa-icon fa fa-home"></i>首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title"><i class="fa-icon fa fa-folder"></i>试卷管理</template>
                <el-menu-item index="/endhome/mypapers">我的试卷</el-menu-item>
                <el-menu-item index="/endhome/markpapers">阅卷</el-menu-item>
            </el-submenu>
            <el-menu-item index="/"><i class="fa-icon fa fa-group"></i>学生成绩管理</el-menu-item>
            <el-menu-item index="/endhome/user"><i class="fa-icon fa fa-user"></i>我的信息管理</el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        activeIndex:'/endhome/index',
        logoSrc:require('../common/img/sm-logo.png')
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      },
      //初始化列表active状态
      initActiveIndex(){
        // var str =this.$router.currentRoute.path;
        this.activeIndex=this.$router.currentRoute.path;
        // console.log(str)
        /*  if(str=='userrouter'){
            this.activeIndex=this.$router.currentRoute.path;
         } */
//        if(str=='materialrouter'){
//          this.activeIndex='/materialrouter/materials';
//        }

      }
    },
    watch:{
      '$route':'initActiveIndex'
    },
    created(){
      this.initActiveIndex();
    }
  }
</script>

<style scoped="scoped">

</style>
