<template>
  <div class="markpapers">
    <el-row>
      <el-col>
        <div class="pull-left search-warpper marginB10">
          <div class="pull-left search-title marginR10">试卷名称:</div>
          <el-input class=" pull-left input150" v-model="name" @keyup.enter.native="getExams"></el-input>
          <el-button class="pull-left marginL10" type="primary" @click="getExams"  icon="search">搜索</el-button>
        </div>
      </el-col>
      <el-col>
        <el-table
          class="table"
          ref="multipleTable"
          :data="mypapers"
          border
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            label="试卷名称"
            prop="name"
            show-overflow-tooltip>
            <template scope="scope">
              {{scope.row.name}}
            </template>
          </el-table-column>
          <el-table-column
            label="试卷总分"
            prop="totalPoints"
            align="center"
            width="100">
          </el-table-column>
          <el-table-column
            prop="time"
            width="100"
            align="center"
            label="考试时长"
          >
          </el-table-column>
          <el-table-column
            width="190"
            align="center"s
            label="考试时间"
          >
            <template scope="scope">
              {{scope.row.startTime?new Date(scope.row.startTime).toLocaleString():'还未开考'}}
            </template>
          </el-table-column>
          <el-table-column
            label="考试人数"
            width="100"
            align="center"
          >
            <template scope="scope">
              <p v-if="scope.row.startTime">{{scope.row.examnum}}</p>
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="center"
            width="100"
          >
            <template scope="scope">
              <el-button type="info" size="mini" :disabled="!scope.row.examnum>0" @click="seeDetail(scope.row._id,scope.row.name)">
                阅卷
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
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        selections:[],
        visible:false,
        name: '', // 试卷名称 v-model
        pageNumber: 1, // 当前页
        pageSize:10 ,
        pageTotal: 0, // 数据总数
        mypapers: [] // 试卷数据
      }
    },
    mounted(){
      this.getExams()
    },
    methods: {
      /**
       * [getMypapers 加载试卷信息]
       * @return {[type]} [description]
       */
      getExams(){
        this.$axios.get('/api/getExams',{
          params:{
            name: this.name,
            pageSize: this.pageSize,
            pageNumber: this.pageNumber
          }
        }).then(response => {
          let res = response.data;
          if(res.status == 0) {
            this.mypapers = res.result._papers;
            this.pageTotal = this.mypapers.length;
          }
        }).catch(err => {
          this.$message.error("获取试卷数据失败!")
        })
      },
      /**
       * 将选中项赋值给this.selections
       * @param  {val} 框架自带，选中项
       * @return {[type]}
       */
      handleSelectionChange (val) {
        this.selections = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      },
      seeDetail(id,name){
        this.$router.push({path:'/endhome/checkpaper',query:{'id':id,'name':name}})
      }
    }
  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .markpapers{
    width: 100%;
    height:100%;
    overflow-y: scroll;
  }
  .markpapers::-webkit-scrollbar {
    display:none
  }
</style>
