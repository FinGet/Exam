<template>
    <div class="bread">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in breadData" :key="item.id" :to="{ name: item.meta.breadName=='管理系统'?'Index':item.name }">{{item.meta.breadName}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        breadData:[]
      }
    },
    watch: {
      $route () {
        this.initBreadData();
      }
    },
    methods:{
      //面包屑
      initBreadData(){
        this.breadData=this.$router.currentRoute.matched;
        console.log(this.breadData)
      }
    },
    created(){
      this.initBreadData();
    }
  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">

</style>
