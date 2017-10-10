<template>
    <div class="edit">
      编辑试卷
      {{id}}
      <el-button class="pull-right" type="primary" @click="back">返回</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        id:''
      }
    },
    created() {
      this.id = this.$route.params.id
      // console.log(this.$route.params.id)
    },
    methods: {
      /**
       * 返回上一级
       * @return {[type]}
       */
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">

</style>
