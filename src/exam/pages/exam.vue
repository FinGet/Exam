<template>
  <div class="exam">
    <h3 class="text-center marginT10">{{paperData.name}}</h3>
    <div class="text-center marginT10">考试时长：{{paperData.time}}分钟  总分：{{paperData.totalPoints}}分</div>
    <hr>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        id: '',
        paperData:''
      }
    },
    mounted(){
      this.id = this.$route.params.id;
      this.init();
    },
    methods:{
      /**
       * 初始化
       */
      init(){
        if(this.id == '' || !this.id ){
            this.$router.push({path:'forntexamindex'});
            return
        } else {
          this.$axios.get('/api/getExamInfo',{
            params:{
              id: this.id
            }
          }).then(response => {
            let res = response.data;
            if(res.status == '0') {
              this.paperData = res.result;
            }
          }).catch(err => {
            this.$message.error(err);
          })
        }
      }
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .exam{
    padding: 20px 0;
  }
</style>
