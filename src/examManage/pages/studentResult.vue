<template>
  <div class="student_result"></div>
</template>

<script>
    export default {
      name: "student-result",
      data(){
        return {
          id:''
        }
      },
      mounted(){
        this.id = this.$route.query.id;
        // 如果是地址栏跳转 判断是否有id
        if(!this.id || this.id == '') {
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>

</style>
