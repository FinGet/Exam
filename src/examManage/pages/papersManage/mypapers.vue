<template>
    <div class="mypapers">
      <el-row>
        <el-col>
            <div class="pull-left search-warpper marginB10">
              <div class="pull-left search-title marginR10">试卷名称:</div>
              <el-input class=" pull-left input150" v-model="name" @keyup.enter.native="getMypapers"></el-input>
              <el-button class="pull-left marginL10" type="primary" @click="getMypapers"  icon="search">搜索</el-button>
            </div>
            <div class="pull-right">
              <router-link :to="{path:'edit',query:{'id':'1'}}"><el-button type="primary">新增试卷</el-button></router-link>
              <el-button type="danger" :disabled="isSelected" @click="deletePaper">批量删除</el-button>
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
              type="selection"
              width="55">
            </el-table-column>
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
              label="操作"
              align="center"
            >
              <template scope="scope">
                <el-button type="primary" size="mini" v-if="scope.row.startTime&&(nowTime - new Date(scope.row.startTime))/(1000*60) > 60" @click="publish(scope.row._id)">再次发布</el-button>
                <el-button type="primary" size="mini" v-else :disabled="scope.row.startTime?true:false" @click="publish(scope.row._id)">{{scope.row.startTime?'已发布':'发布'}}</el-button>
                <el-button type="danger" size="mini" icon="delete" @click="deletePaper(scope.row)"></el-button>
                <router-link :to="{path:'edit',query:{'id':scope.row._id}}">
                  <el-button type="info" size="mini" icon="edit" :disabled="scope.row.startTime&&(nowTime - new Date(scope.row.startTime))/(1000*60) < 60"></el-button>
                </router-link>
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
  computed: {
    /**
     * 判断是否有选中项
     * @return {Boolean}
     */
    isSelected() {
      if (this.selections.length>0) {
        return false
      }else {
        return true
      }
    },
    nowTime(){
      return new Date();
    }
  },
  mounted(){
    this.getMypapers()
  },
  methods: {
    /**
     * [getMypapers 加载试卷信息]
     * @return {[type]} [description]
     */
    getMypapers(){
      this.$axios.get('/api/mypapers',{
        params:{
          name: this.name,
          pageSize: this.pageSize,
          pageNumber: this.pageNumber
        }
      }).then(response => {
        let res = response.data;
        if(res.status == 0) {
          this.mypapers = res.result._papers;
          this.pageTotal = res.count;
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
    /**
     * 删除试卷
     * @return {[type]}
     */
    deletePaper(val) {
      let arrIds = [];
      if(this.selections.length>0){
        this.selections.forEach(item => {
          arrIds.push(item._id);
        })
      } else if(val) {
        arrIds.push(val._id);
      }
      this.$confirm('确定删除选中的试卷吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$axios.post('/api/deletePaper',{
          id: arrIds
        }).then(response => {
          let res = response.data;
          if (res.status == '0') {
            this.$refs.multipleTable.clearSelection();
            this.$message.success('删除成功！');
            this.getMypapers();
          }
        }).catch(err => {
          this.$message.error("获取试卷数据失败!")
        })
      }).catch(()=>{

      })
    },
    /**
     * 发布试卷
     * @param id 试卷id
     */
    publish(id){
      this.$confirm('确定发布该试卷吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$axios.post('/api/publishPaper',{
          id: id
        }).then(response => {
          let res = response.data;
          if (res.status == '0') {
            this.$message.success('发布成功！');
            this.getMypapers();
          }
        }).catch(err => {
          this.$message.error("获取试卷数据失败!")
        })
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消发布!'
        });
      })

    }
  }
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .mypapers{
    width: 100%;
    height:100%;
    overflow-y: scroll;
  }
  .mypapers::-webkit-scrollbar {
    display:none
  }
</style>
