<template>
    <div class="sidebar">
      <el-row>
        <el-col class="text-center marginT10">
          <img width="150" v-lazy="logoSrc" alt="logo">
        </el-col>
        <el-col>
          <el-menu theme="dark" default-active="1" class="el-menu-vertical" @open="handleOpen" @close="handleClose" router>
            <el-menu-item index="/endhome/index"><i class="fa-icon fa fa-home"></i>首页</el-menu-item>
            <el-submenu index="2">
              <template slot="title"><i class="fa-icon fa fa-folder"></i>试卷管理</template>
                <el-menu-item index="/endhome/mypapers">我的试卷</el-menu-item>
                <el-menu-item index="2-2">阅卷</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="fa-icon fa fa-bullhorn"></i>组织考试</template>
              <el-menu-item index="3-1">已组织的考试</el-menu-item>
              <el-menu-item index="3-2">发布公告</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="fa-icon fa fa-group"></i>学生成绩管理</template>
              <el-menu-item index="4-1">全部学生成绩</el-menu-item>
              <el-menu-item index="4-2">班级成绩</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-edit"></i>试题管理</template>
              <el-menu-item index="5-1">单选题管理</el-menu-item>
              <el-menu-item index="5-2">多选题管理</el-menu-item>
              <el-menu-item index="5-3">填空题管理</el-menu-item>
              <el-menu-item index="5-4">判断题管理</el-menu-item>
              <el-menu-item index="5-5">问答题管理</el-menu-item>
            </el-submenu>
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
        logoSrc:require('../common/img/sm-logo.png')
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        // console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        // console.log(key, keyPath);
      }
    }
  }
</script>

<style scoped="scoped">

</style>
