<template>
  <div class="endhome">
    <div class="sidebar-wrapper">
      <div class="in-wrapper">
        <side-bar></side-bar>
      </div>
    </div>
    <div class="nav-top">
      <div class="nav-top-user">
        <user :userData="userData"></user>
      </div>
      <div class="breadcrumb-wrapper">
        <bread-nav></bread-nav>
      </div>
    </div>
    <div class="app-main">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import SideBar from '@/components/sidebar'
  import User from '@/components/user'
  import BreadNav from '@/components/breadnav'
export default {
  name: 'endhome',
  components: {
    SideBar,
    User,
    BreadNav
  },
  computed:{
    userData(){
      return this.$getUserData();
    },
  },
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .endhome{
    height:100%;
    width: 100%;
  }
  .sidebar-wrapper{
    position: fixed;
    z-index: 1000;
    top:0;
    overflow: hidden;
    height: 100%;
    width: 200px;
    background: #324157;
    .in-wrapper{
      height: 100%;
      width: 220px;
      overflow-y: scroll;
    }
  }
  /*底部导航*/
  .nav-top{
    height:38px;
    width: 100%;
    line-height: 38px;
    text-align: left;
    position: fixed;
    top:0;
    left:0;
    z-index: 999;
    background-color: #324157;
    /*顶部用户*/
    .nav-top-user{
      float: right;
      margin-right: 18px;
    }
    /*面包屑导航*/
    .breadcrumb-wrapper{
      display: inline-block;
      margin-left: 220px;
      transition: all 0.28s;
    }

  }
</style>
