<template>
    <div class="mypapers">
      <el-row>
        <el-col>
            <div class="pull-left search-warpper marginB10">
              <div class="pull-left search-title marginR10">试卷名称:</div>
              <el-input class=" pull-left input150" v-model="name"></el-input>
              <el-button class="pull-left marginL10" type="primary" @click="getMypapers" icon="search">搜索</el-button>
            </div>
            <div class="pull-right">
              <el-popover
                ref="popover"
                placement="top"
                width="160"
                v-model="visible">
                <p>确定删除选中的试卷嘛吗？</p>
                <div style="text-align: right; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="deleteAll">确定</el-button>
                </div>
              </el-popover>
              <router-link :to="{path:'add'}"><el-button type="primary">新增试卷</el-button></router-link>
              <el-button type="danger" :disabled="isSelected" v-popover:popover>批量删除</el-button>
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
            :default-sort = "{prop: 'date', order: 'descending'}"
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
              prop="date"
              width="190"
              align="center"
              label="考试时间"
            >
            <template scope="scope">
              {{scope.row.startTime}}
            </template>
            </el-table-column>
            <el-table-column
              label="考试人数"
              width="100"
              align="center"
            >
              <template scope="scope">
                <p v-if="scope.row.examnum!=0">{{scope.row.examnum}}</p>
                <el-tag v-if="scope.row.examnum===0" type="danger">未考</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              align="center"
            >
              <template scope="scope">
                <el-button type="primary" size="mini" :disabled="scope.row.examnum===0?false:true">发布</el-button>
                <el-button type="danger" size="mini" icon="delete" @click="deleted(scope.row)"></el-button>
                <router-link :to="{path:'edit/' + scope.row._id}"><el-button type="info" size="mini" icon="edit"></el-button></router-link>
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
        let res = response.data
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
     * 删除当前行
     * @param  {[val]}，当前删除项
     * @return {[type]}
     */
    deleted(val) {
      // console.log(val)
      // 表格存在排序，所以要判断一下，当前删除行在数据中的实际位置
      for (var i in this.mypapers) {
        if (this.mypapers[i] === val) {
          this.mypapers.splice(i, 1);
        }
      }
    },
    /**
     * 批量删除
     * @return {[type]}
     */
    deleteAll() {
      for(var index in this.mypapers){
        if(this.selections.indexOf(this.mypapers[index])>=0);
          // 一个个的判断mypapers中的元素是否存在于selection，如果有，正好删除当前这个值。
          // 而不是去判断selections的值存在于mypapers中的位置
          this.mypapers.splice(index,1);
      }
      this.visible = false;
      this.$refs.multipleTable.clearSelection();
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
