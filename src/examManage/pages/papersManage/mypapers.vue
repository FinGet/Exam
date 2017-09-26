<template>
    <div class="mypapers">
      <el-row>
        <el-col>
            <div class="pull-left search-warpper marginB10">
              <div class="pull-left search-title marginR10">试卷名称:</div>
              <el-input class=" pull-left input150"></el-input>
              <el-button class="pull-left marginL10" type="primary" icon="search">搜索</el-button>
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
              <el-button type="danger" :disabled="isSelected" v-popover:popover>批量删除</el-button>
            </div>
        </el-col>
        <el-col>
          <el-table
            class="table"
            ref="multipleTable"
            :data="mypapers"
            border
            max-height="610"
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
              prop="total"
              width="100">
            </el-table-column>
            <el-table-column
              prop="time"
              width="100"
              label="考试时长"
             >
            </el-table-column>
            <el-table-column
              prop="date"
              sortable
              label="考试时间"
            >
            </el-table-column>
            <el-table-column
              label="考试人数"
              width="100"
              align="center"
            >
              <template scope="scope">
                <p v-if="scope.row.examnum!='0'">{{scope.row.examnum}}</p>
                <el-tag v-if="scope.row.examnum==='0'" type="danger">未考</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
            >
              <template scope="scope">
                <el-button type="primary" size="mini" :disabled="scope.row.examnum==='0'?false:true">发布</el-button>
                <el-button type="danger" size="mini" @click="deleted(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-col class="marginT10" v-if="this.mypapers.length>10">
          <div class="page-wrapper pull-right">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page.sync="currentPage"
              :page-size="100"
              layout="total, prev, pager, next"
              :total="1000">
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
      currentPage: 1, // 当前页
      mypapers: [
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/05-2017/09/06',
          examnum: '70'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/03-2017/09/04',
          examnum: '50'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/01-2017/09/02',
          examnum: '20'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/11-2017/09/12',
          examnum: '0'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/03-2017/09/04',
          examnum: '50'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/01-2017/09/02',
          examnum: '20'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/11-2017/09/12',
          examnum: '0'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/03-2017/09/04',
          examnum: '50'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/01-2017/09/02',
          examnum: '20'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/11-2017/09/12',
          examnum: '0'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/03-2017/09/04',
          examnum: '50'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/01-2017/09/02',
          examnum: '20'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/01-2017/09/02',
          examnum: '20'
        },
        {
          name: '操作系统Windows XP基础测试',
          total: '100',
          time: '60',
          date: '2017/09/11-2017/09/12',
          examnum: '0'
        }
      ]
    }
  },
  computed: {
    isSelected() {
      if (this.selections.length>0) {
        return false
      }else {
        return true
      }
    }
  },
  methods: {
    // 勾选
    handleSelectionChange (val) {
      this.selections = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 删除当前行
    deleted(val) {
      // console.log(val)
      // 表格存在排序，所以要判断一下，当前删除行在数据中的实际位置
      for (var i in this.mypapers) {
        if (this.mypapers[i] === val) {
          this.mypapers.splice(i, 1);
        }
      }
    },
    // 批量删除
    deleteAll() {
      this.mypapers.splice(this.selections,this.selections.length)
      this.$refs.multipleTable.clearSelection();
      this.visible = false
      this.$message({
        message: '恭喜你，删除成功！',
        type: 'success'
      });
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
