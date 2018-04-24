<template>
  <div class="exam">
    <h3 class="text-center marginT10">{{paperData.name}}</h3>
    <div class="text-center marginT10">考试时长：{{paperData.time}}分钟  总分：{{paperData.totalPoints}}分</div>
    <hr>
    <div class="main">
      <div class="single">
        <h4>单选题（只有一个正确答案）</h4>
        <ul>
          <li class="marginB10" v-for="(item,index) in singleQuestions" :key="item.id">
            <p class="question-title">{{index+1}} 、{{item.name}}</p>

            <span class="option"
                  v-if="item.type!='judgement'&&item.type!='Q&A'"item
                  v-for="(item1,index1) in item.selection" :key="item1.id">
              <el-radio v-model="item.sanswer" :label="options[index1]" :key="index1">
              {{options[index1]}}、{{item1}}
              </el-radio>
              </span>
          </li>
        </ul>
      </div>
      <div class="multi">
        <h4>多选题（有多个正确答案）</h4>
        <ul>
          <li class="marginB10" v-for="(item,index) in multiQuestions" :key="item.id">
            <p class="question-title">{{index+1}} 、{{item.name}}</p>

            <span class="option"
                  v-if="item.type!='judgement'&&item.type!='Q&A'"item
                  v-for="(item1,index1) in item.selection" :key="item1.id">
              <el-checkbox v-model="item.sanswer" :label="options[index1]" :key="index1">
              {{options[index1]}}、{{item1}}
              </el-checkbox>
              </span>
          </li>
        </ul>
      </div>
    </div>
    <div class="scroll_top" @click="scrollTop" v-if="scroll>500">
      <i class="el-icon-caret-top"></i>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        id: '',
        paperData:{
          name:'',
          time:'',
          totalPoints:''
        },
        singleQuestions:[],
        multiQuestions:[],
        QAQuestions:[],
        judgeQuestions:[],
        options:['A','B','C','D','E','F','G','H','I','J','K',
          'L','M','N','O','P','Q','R','S','T'],
        scroll: document.body.scrollTop
      }
    },
    mounted(){
      this.id = this.$route.params.id;
      this.init();
      window.onscroll=() => {
        this.scroll = document.body.scrollTop;
      }
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
              for(let key in this.paperData) {
                  this.paperData[key] = res.result[key];
              }
              res.result._questions.forEach(item => {
                if(item.type=='single'){
                  item.sanswer = '';
                  this.singleQuestions.push(item);
                } else if(item.type == 'multi'){
                  item.sanswer = [];
                  this.multiQuestions.push(item);
                } else if(item.type == 'Q&A') {
                  this.QAQuestions.push(item);
                } else if(item.type == 'judgement'){
                  this.judgeQuestions.push(item);
                }
              })
            }
          }).catch(err => {
            this.$message.error(err);
          })
        }
      },
      /**
       * 回到顶部
       * @return {[type]} [description]
       */
      scrollTop(){
        let timer = setInterval(() => {
          let top = document.body.scrollTop || document.documentElement.scrollTop;
          let speed = Math.ceil(top / 5);
          document.body.scrollTop = top - speed;
          if (top === 0) {
            clearInterval(timer);
          }
        }, 20)
      }
    }
  }
</script>
<style scoped rel="stylesheet/scss" lang="scss">
  .exam{
    padding: 20px 0;
    .main{
      padding: 20px 40px;
      .question-title{
        font-size: 16px;
        margin-bottom: 5px;
      }
      .option{
        display: block;
        margin:5px 0 0 15px;
      }
    }
    .scroll_top{
      background-color: #fff;
      position: fixed;
      right: 100px;
      bottom: 150px;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      cursor: pointer;
      transition: .3s;
      box-shadow: 0 0 6px rgba(0,0,0,.12);
      z-index: 5;
      i{
        color: #409eff;
        display: block;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
      }
    }
  }
</style>
