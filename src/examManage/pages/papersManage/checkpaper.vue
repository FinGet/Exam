<template>
  <div class="checkpaper">
    <el-row>
      <el-col>
        <div class="pull-left search-warpper marginB10">
          <div class="pull-left search-title marginR10">学生名称:</div>
          <el-input class=" pull-left input150" v-model="name" @keyup.enter.native="getScores"></el-input>
          <el-button class="pull-left marginL10" type="primary" @click="getScores"  icon="search">搜索</el-button>
        </div>
      </el-col>
      <el-col>
        <el-table
          class="table"
          ref="multipleTable"
          :data="studentScore"
          border
          tooltip-effect="dark"
          style="width: 100%">
          <el-table-column
            label="学生姓名"
            prop="name"
            show-overflow-tooltip>
            <template scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column
            label="试卷名称"
            prop="examName"
            align="center">
          </el-table-column>
          <el-table-column
            prop="date"
            align="center"
            label="考试时间"
          >
            <template scope="scope">
              {{new Date(scope.row.date).toLocaleString()}}
            </template>
          </el-table-column>
          <el-table-column
            align="center"
            label="成绩"
            prop="score"
          >
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="100"
          >
            <template scope="scope">
              <el-button type="info" :disabled="scope.row.isSure" size="mini" @click="checkPaper(scope.row.name,scope.row.date,scope.row.score)">
                批阅
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
      <el-col class="marginT10" v-if="pageTotal>pageSize">
        <div class="page-wrapper pull-right">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageNumber"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="pageTotal">
          </el-pagination>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="阅卷" :visible.sync="dialogVisible">
      <ul>
        <li class="question" v-for="(item, index) in questions">
          <p>{{index+1}}、{{item._question.name}} <span>({{item._question.score}}分)</span></p>
          <p> 学生答案: <span>{{item.answer}}</span></p>
          打分：<el-input class="input" @change="checkType(item.score,item._question.score)" v-model="item.score"></el-input>
          <span v-if='isNumber' class="error">*只能是数字</span>
          <span v-if='isMore' class="error">*不能大于题目总分</span>
        </li>
      </ul>
      <el-button type="primary" class="marginT10 pull-right marginB10" @click="submit">提交</el-button>
      <el-button type="danger" 
        class="marginT10 pull-right marginB10 marginR10"
        @click="dialogVisible = false"
      >取消</el-button>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return {
      id:'',
      examName: '',
      studentScore:[],
      name: '', // 试卷名称 v-model
      pageNumber: 1, // 当前页
      pageSize:10 ,
      pageTotal: 0, // 数据总数
      dialogVisible: false,
      questions: [],
      isNumber: false,
      isMore: false,
      date: '',
      userName: '',
      curryScore: 0
    }
  },
  mounted(){
    this.id = this.$route.query.id;
    this.examName = this.$route.query.name;
    // 如果是地址栏跳转 判断是否有id
    if(!this.id || this.id == '' || !this.examName || this.examName=='') {
      this.$router.go(-1);
    }
    this.getScores();
  },
  methods:{
    /**
     * 获取学生考试成绩
     * @return {[type]} [description]
     */
    getScores(){
      this.studentScore = [];
      this.$axios.get('/api/getScores',{
        params:{
          id: this.id,
          name: this.name,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
      }).then(response => {
        let res = response.data;
        if(res.status == '0') {
          // console.log(res.result);
          if(res.result.length <=0) {
            this.$router.go(-1);
            this.$message.info('没有问答题，不需要阅卷！');
          }
          this.studentScore = res.result;
          this.studentScore.forEach(item => {
            item.examName = this.examName;
          })
          this.pageTotal = res.count;
          
        }
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    /**
     * 批阅
     * @return {[type]} [description]
     */
    checkPaper(name,date,score){
      this.questions=[];
      this.date = date;
      this.userName = name;
      this.curryScore = score;
      this.$axios.get('/api/getCheckPapers',{
        params: {
          date: date,
          userName : name 
        }
      }).then(response => {
        let res = response.data;
        if(res.status == '0' && res.result[0].exams.length>0) {
          this.dialogVisible = true;
          this.isNumber = false;
          this.isMore = false;
          this.questions = res.result[0].exams[0].answers;
        } else if(res.result[0].exams.length == 0){
          this.$message.warning('没有找到数据!');
        }
      }).catch(err => {
        this.$message.error('请稍后再试！');
      })
    },
    /**
     * 提交
     */
    submit(){
      // console.log(this.questions);
      let score = 0;
      this.questions.forEach(item => {
        if(!item.score) {
          this.$message.error('请给所有题目打分!');
          return;
        } else {
          score += (item.score-0);
        }
      })
      if(this.isNumber || this.isMore){
        this.$message.error('请输入正确的分数!')
        return;
      }
      // console.log(score);
      this.$axios.get('/api/submitScore',{
        params:{
          userName: this.userName,
          date: this.date,
          score: score + this.curryScore
        }
      }).then(response => {
        let res = response.data;
        if(res.status == '0') {
          this.dialogVisible = false;
          this.date = '';
          this.userName = '';
          this.curryScore = 0;
          this.$message.success('提交成功!');
          this.getScores();
        }
      })
    },
    /**
     * 输入判断
     */
    checkType(value,score){
      let reg = /^[0-9]+$/ig;
      // console.log(reg.test(value));
      if(!reg.test(value)){
        this.isNumber = true;
      } else {
        this.isNumber = false;
        if(value>score || value<0){
          this.isMore = true;
        } else {
          this.isMore = false;
        }
      }

      if(value == '') {
        this.isNumber = false;
        this.isMore = false;
      }
    }
  }
}
</script>
<style>
.input{
  width: 100px;
}
.question p{
  margin-bottom: 10px;
}
.question p:first-child{
  font-size: 16px;
}
.question p:nth-child(2) span{
  color: #20a0ff;
}
.error{
  font-size: 12px;
  color: red;
}
</style>

