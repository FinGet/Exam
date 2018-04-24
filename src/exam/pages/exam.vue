<template>
  <div class="exam">
    <h3 class="text-center marginT10">{{paperData.name}}</h3>
    <div class="text-center marginT10">考试时长：{{paperData.time}}分钟  总分：{{paperData.totalPoints}}分</div>
    <hr>  
    <div class="submit-box" ref="submitBox">
      <el-button @click="submit" type="primary" class="submit-btn">提交试卷</el-button>
      <div class="timeout">
        <p>距离考试结束</p>
        <p>{{time}}</p>
      </div>
    </div>
    <div class="main">
      <div class="single" v-if="singleQuestions.length>0">
        <h3>一、单选题（只有一个正确答案）</h3>
        <ul class="question-item">
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
      <div class="multi" v-if="multiQuestions.length>0">
        <h3>二、多选题（有多个正确答案）</h3>
        <ul class="question-item">
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
      <div class="judge" v-if="judgeQuestions.length>0">
        <h3>三、判断题</h3>
        <ul class="question-item">
          <li class="marginB10" v-for="(item,index) in judgeQuestions" :key="item.id">
            <p class="question-title">{{index+1}} 、{{item.name}}</p>
            <el-radio v-model="item.sanswer" label="A" :key="index">正确</el-radio>
            <el-radio v-model="item.sanswer" label="B" :key="index">错误</el-radio>
          </li>
        </ul>
      </div>
      <div class="judge" v-if="QAQuestions.length>0">
        <h3>四、简答题</h3>
        <ul class="question-item">
          <li class="marginB10" v-for="(item,index) in QAQuestions" :key="item.id">
            <p class="question-title">{{index+1}} 、{{item.name}}</p>
            <el-input
             class="textarea"
              type="textarea"
              :rows="3"
              placeholder="请输入内容"
              v-model="item.sanswer">
            </el-input>
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
        examTime: '',
        timer: null,
        singleQuestions:[],
        multiQuestions:[],
        QAQuestions:[],
        judgeQuestions:[],
        options:['A','B','C','D','E','F','G','H','I','J','K',
          'L','M','N','O','P','Q','R','S','T'],
        scroll: document.body.scrollTop
      }
    },
    computed:{
      time:function(){
        let time = this.examTime;
        let hour = 0;
        let mm = 0;
        let ss = 0;
        hour = Math.floor(time / 3600);
        mm = Math.floor((time / 60 % 60));
        ss = Math.floor((time % 60));
        return  `${hour}小时${mm}分钟${ss}秒`;
      }
    },
    mounted(){
      this.id = this.$route.params.id;
      // this.startTime = new Date();
      this.init();
      window.onscroll=() => {
        this.scroll = document.body.scrollTop;
        if(this.scroll>250) {
          this.$refs.submitBox.style.top=10+'px';
        } else {
          this.$refs.submitBox.style.top=250+'px';
        }
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
              this.examTime = this.paperData.time*60 ;
              this.getCode();
              // this.timeOut();
              res.result._questions.forEach(item => {
                if(item.type=='single'){
                  item.sanswer = '';
                  this.singleQuestions.push(item);
                } else if(item.type == 'multi'){
                  item.sanswer = [];
                  this.multiQuestions.push(item);
                } else if(item.type == 'Q&A') {
                  item.sanswer = '';
                  this.QAQuestions.push(item);
                } else if(item.type == 'judgement'){
                  item.sanswer = '';
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
      },
      /**
       * 计时器
       * @return {[type]} [description]
       */
      timeOut(){
        let timer = setInterval(function(){
          // if(this.examTime == 0) {
          //   clearInterval(timer);
          //   return;
          // }
          this.examTime--;
        },1000)
      },
      getCode(){
        const TIME_COUNT = this.examTime;
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.examTime > 0 && this.examTime <= TIME_COUNT) {
              this.examTime--;
            } else {
              clearInterval(this.timer);
              this.timer = null;
            }
          }, 1000)
        }
      },
      /**
       * 提交试卷
       * @return {[type]} [description]
       */
      submit(){
        console.log(this.singleQuestions)
        console.log(this.multiQuestions)
        console.log(this.QAQuestions)
        console.log(this.judgeQuestions)
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
      .question-item{
        margin-left: 15px;
      }
      .textarea{
        width: 500px;
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
    .submit-box{
      position: fixed;
      right: 30px;
      padding: 30px;
      transition: 1s;
      text-align: center;
      border: 1px solid #ffffff;
      box-shadow: 1px 1px 1px #c5c5c5;
      background: rgba(193, 193, 193, 0.1);
      border-radius: 20px;
      .timeout{
        margin-top: 10px;
        text-align: center;
      }
    }
  }
</style>
