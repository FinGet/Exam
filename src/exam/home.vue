<template>
  <div id="fronthome">
    <front-top></front-top>
    <router-view></router-view>
  </div>
</template>

<script>
  import FrontTop  from '@/components/fronttop'
export default {
  name: 'fronthome',
  components:{
    FrontTop
  }
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
#fronthome {

}
</style>
