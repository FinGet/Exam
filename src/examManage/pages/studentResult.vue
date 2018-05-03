<template>
  <div class="student_result">
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
  </div>
</template>

<script>
    export default {
      name: "student-result",
      data(){
        return {
          id:'',
          examName: '',
          studentScore:[],
          name: '', // 试卷名称 v-model
          pageNumber: 1, // 当前页
          pageSize:10 ,
          pageTotal: 0, // 数据总数
        }
      },
      mounted(){
        this.id = this.$route.query.id;
        this.examName = this.$route.query.name;
        // 如果是地址栏跳转 判断是否有id
        if(!this.id || this.id == '') {
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
      }
    }
</script>

<style scoped>

</style>
