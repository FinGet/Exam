<template>
    <div class="index">
      <div class="rule">
        <ul>
          <li v-for="(item,index) in rules" :key="item.id">
            {{index+1}}.{{item}}
          </li>
        </ul>
      </div>
      <div class="text-center">
        <el-checkbox v-model="checked" class="agree">我同意遵守以上考试纪律</el-checkbox>
        <el-button :disabled="!checked" type="primary" @click="next">已阅读考试规则</el-button>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
  data() {
    return {
      checked: false,
      rules:[
        '不得携带笔记、便携式计算机、书包或其他物品进入考场。请将这些物品交给考试管理员妥善保管',
        '考场内请保持安静，不得交谈和走动',
        '不得参阅其他人屏幕上的答案',
        '如有任何疑问，请暂停考试、举手示意管理员解决',
        '若出现意外情况（如停电、机器故障等），请立即示意管理员解决',
        '不得以任何方式将考题内容带出考场',
        '凡有违反上述规定中的任何一条者，考场管理员有权提出警告直至终止其考试、取消考试成绩',
        '任何人都有权利和义务维护认证考试的公平性和公正性，举报一切违反考场规则的行为'
      ],
      isRead: false
    }
  },
  mounted(){
    this.isRead = this.$mySessionStorage.get('read');
    this.readGo();
  },
  methods:{
    next(){
      this.$mySessionStorage.set('read',true);
      this.$router.push({path:'forntexamindex'});
    },
    readGo(){
      if(this.isRead) {
        this.$router.push({path:'forntexamindex'});
        this.$message.success('已阅读考试规则并遵守！');
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .index{
    .rule{
      margin: 50px auto;
      padding: 10px;
      width: 800px;
      font-size: 14px;
      border: 1px solid #eeeeee;
      border-radius: 10px;
      background: #fff;
      box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.05);
      ul {
        li {
          margin-bottom: 5px;
        }
      }
    }
    .agree{
      color: #b0b0b0;
    }
  }
</style>
