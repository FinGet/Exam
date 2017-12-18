<template>
    <div class="student">
      <el-tabs type="border-card">
        <el-tab-pane label="考试记录">
          <div class="main">
            <div class="pull-left search-warpper marginB10">
              <div class="pull-left search-title marginR10">试卷名称:</div>
              <el-input class=" pull-left input150" v-model="name"></el-input>
              <el-button class="pull-left marginL10" type="primary" icon="search">搜索</el-button>
            </div>
            <el-table
              :data="tableData"
              stripe
              border
              style="width: 100%">
              <el-table-column
                prop="name"
                label="试卷名称"
                width="300">
              </el-table-column>
              <el-table-column
                prop="date"
                label="考试时间"
                width="180">
              </el-table-column>
              <el-table-column
                prop="score"
                label="考试成绩">
              </el-table-column>
            </el-table>
            <el-pagination
              class="pull-right marginT10"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNumber"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next"
              :total="200">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="修改个人信息">
          <div class="main">
            <span class="title">修改个人信息:</span>
            <hr>
            <div class="input-group">
              <el-row>
                <el-col :span="6">
                  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
                    <el-form-item label="学号" prop="studentNumber">
                      <el-input :disabled="true" v-model="ruleForm.studentNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="name">
                      <el-input v-model="ruleForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="年级" prop="grade">
                      <el-select v-model="ruleForm.grade" :disabled="true" placeholder="请选年级">
                        <el-option label="一年级" value="1"></el-option>
                        <el-option label="二年级" value="2"></el-option>
                        <el-option label="三年级" value="3"></el-option>
                        <el-option label="四年级" value="4"></el-option>
                        <el-option label="五年级" value="5"></el-option>
                        <el-option label="六年级" value="6"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="账号名称" prop="username">
                      <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="账号密码" prop="password">
                      <el-input v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
                      <el-button @click="resetForm('ruleForm')">取消</el-button>
                    </el-form-item>
                  </el-form>
                </el-col>
              </el-row>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        ruleForm: {
          name: '张三',
          studentNumber:'1235621',
          grade:'3',
          username:'zhangsan',
          password:'11111111'
        },
        rules: {
          name: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          grade: [
            {required: true, message: '请输入年级', trigger: 'blur'}
          ],
          username: [
            {required: true, message: '请输入账号名称', trigger: 'blur'},
            {min: 1, message: '长度不能小于1', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '请输入账号密码', trigger: 'blur'},
            {min: 6, message: '长度不能小于6', trigger: 'blur'}
          ]
        },
        tableData:[{
          date: '2016-05-02',
          name: '操作系统Windows XP基础测试',
          score: '90'
        }, {
          date: '2016-05-04',
          name: '操作系统Windows 7基础测试',
          score: '78'
        }, {
          date: '2016-05-01',
          name: '操作系统Windows8基础测试',
          score: '56'
        }, {
          date: '2016-05-03',
          name: '操作系统Windows 10基础测试',
          score: '60'
        }],
        name:'',
        pageNumber: 1,
        pageSize: 10,
        total: 20
      }
    },
    methods:{
      /**
       * 提交表单
       * @param formName
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      /**
       * 取消
       * @param formName
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      /**
       * 每页多少条
       * @param val
       */
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      /**
       * 第几页
       * @param val
       */
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
.main{
  max-width: 1200px;
  margin:30px auto;
  .title{
    font-size: 16px;
    color: #000;
  }
}
</style>
