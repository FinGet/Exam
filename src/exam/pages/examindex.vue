<template>
  <div class="examindexindex">
    <el-row v-if="exams.length>0">
      <h3 class="text-center marginT10 marginB10">可以参加的考试</h3>
      <el-col :span="20" :offset="2" class="box">
        <el-row>
          <el-col :span="7" class="search">
            <el-input v-model="name" placeholder="请输入试卷名" @keyup.enter.native="search"></el-input>
          </el-col>
          <el-col :span="3" class="search">
            <el-button type="primary" icon="search" @click="search">搜索</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="7" v-for="item in exams" :key="item.id" class="box-item marginB20">
            <el-card :body-style="{ padding: '0px',cursor:'pointer'}" v-if="(nowTime - new Date(item.startTime))/(1000*60) < item.time">
              <div style="padding: 14px;">
                <p>{{item.name}}</p>
                <p class="time">考试时间: {{ new Date(item.startTime).toLocaleString()}}</p>
                <p>考试时长: {{item.time}} 分钟</p>
                <p>总分: {{item.totalPoints}} 分</p>
                <!--<p>{{(nowTime - new Date(item.startTime))/(1000*60)}}</p>-->
                <!-- <p v-if="(nowTime - new Date(item.startTime))/(1000*60) > 60" class="over">考试时间已过</p> -->
                <el-button type="text" @click="goToExam(item)" class="pull-right" :disabled="item._questions.length == 0">参加考试</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-pagination
              v-if="total > pageSize"
              class="pull-right marginR10"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              layout="prev, pager, next"
              :total="total">
            </el-pagination>
          </el-col>
        </el-row>
      </el-col>

    </el-row>
    <h2 v-else class="text-center marginT50">没有可以参加的考试，请等待老师发布考试！</h2>
  </div>
</template>

<script>
    export default {
      name: "examindex",
      data(){
        return {
          exams:[],
          name: '',
          pageNumber: 1,
          pageSize:12,
          total: 0,
          examLogs: [],
          isExam: false
        }
      },
      computed:{
        nowTime(){
          return new Date();
        }
      },
      mounted(){
        this.init();
        this.getExamLogs();
      },
      methods: {
        /**
         * 初始化页面
         */
        init(){
          this.$axios.get('/api/getExamsPaper',{
            params:{
              name : this.name,
              pageNumber: this.pageNumber,
              pageSize: this.pageSize
            }
          }).then(response => {
            let res = response.data;
            if(res.status == '0') {
              this.exams = res.result;
              this.total = res.total;
            }
          })
        },
        /**
         * 搜索
         */
        search(){
          this.pageNumber = 1;
          this.init();
        },
        handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
          this.pageSize = val;
          this.init();
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          this.pageNumber = val;
          this.init();
        },
        /**
         * 参加考试
         * @param id
         */
        goToExam(paper){
          this.judgeTime(paper);
        },
        /**
       * 获取考试记录
       */
        getExamLogs(){
          this.$axios.get('/api/getexamlogs',{
            params:{
              name: '',
              pageNumber: 1,
              pageSize: 10000,
            }
          }).then(response => {
            let res = response.data;
            this.examLogs = res.result.exams || [];
          })
        },
        judgeTime(paper){
          // console.log(paper)
          this.isExam = false;
          if(this.examLogs.length > 0){
            this.examLogs.forEach(item => {
              // console.log(item);
              if(item._paper&&item._paper._id == paper._id && item.startTime == paper.startTime){
                this.isExam = true;
                this.$message.error('已经参加过本次考试，不能重复参加!');
                return;
              }
            })
            if(!this.isExam){
              this.$router.push({name:'ForntExam',params:{id:paper._id}});
            }
          }else {
            this.$router.push({name:'ForntExam',params:{id:paper._id}});
          }
          
        }
      }
      
    }
</script>

<style scoped rel="stylesheet/scss" lang="scss">
  .examindexindex{
    padding: 20px 0;
    .box{
      border: 1px solid #b7b7b7;
      padding: 20px 0;
      border-radius: 5px;
      box-shadow: 2px 2px 3px #D7D6D6;
      .search{
        margin-bottom: 20px;
      }
      .search,.box-item{
        margin-left: 37px;
        .over{
          float: right;
          color: #ff0000;
          margin-bottom: 10px;
        }
      }
    }
  }
</style>
