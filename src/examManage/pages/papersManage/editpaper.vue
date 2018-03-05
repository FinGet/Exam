<template>
    <div class="edit">
      <el-row>
        <el-col>
          编辑试卷
          {{paperId}}
          <el-button class="pull-right" type="primary" @click="back">返回</el-button>
        </el-col>
      </el-row>
      <div class="main">
        <el-row>
          <el-col>
            <h3 class="text-center">{{title}}</h3>
          </el-col>
        </el-row>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        paperId:'', // 试卷id
        title: '试卷名称'
      }
    },
    created() {
      this.paperId = this.$route.params.id
      // console.log(this.$route.params.id)
    },
    mounted() {
      this.init()
    },
    methods: {
      /**
       * 初始化页面 init
       * @return {[type]}
       */
      init() {
        this.$axios.get('xxx').then((response) => {
          params: {
            paperId: paperId
          }
        })
      },
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
  .edit{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .main {
      min-height: 640px;
      padding: 10px;
      margin-top: 10px;
      overflow-y: scroll;
      border: 1px solid #dbdbdb;
    }
  }
  .main::-webkit-scrollbar {
    display:none
  }
</style>
