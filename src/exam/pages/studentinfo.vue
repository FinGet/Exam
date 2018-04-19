<template>
    <div class="student">
      <el-tabs type="border-card">
        <el-tab-pane label="考试记录">
          <div class="main">
            <div class="pull-left search-warpper marginB10">
              <div class="pull-left search-title marginR10">试卷名称:</div>
              <el-input class=" pull-left input150" v-model="name" @keyup.enter="search"></el-input>
              <el-button class="pull-left marginL10" type="primary" icon="search" @click="search">搜索</el-button>
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
                width="300">
              </el-table-column>
              <el-table-column
                prop="score"
                label="考试成绩">
              </el-table-column>
            </el-table>
            <el-pagination
              class="pull-right marginT10"
              v-if="total > pageSize"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="pageNumber"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="sizes, prev, pager, next"
              :total="total">
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
                    <el-form-item label="学号" prop="userId">
                      <el-input v-model="ruleForm.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="姓名" prop="userName">
                      <el-input v-model="ruleForm.userName"></el-input>
                    </el-form-item>
                    <el-form-item label="年级" prop="grade">
                      <el-select v-model="ruleForm.grade"  placeholder="请选年级">
                        <el-option label="一年级" value="1"></el-option>
                        <el-option label="二年级" value="2"></el-option>
                        <el-option label="三年级" value="3"></el-option>
                        <el-option label="四年级" value="4"></el-option>
                        <el-option label="五年级" value="5"></el-option>
                        <el-option label="六年级" value="6"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="班级" prop="class">
                      <el-input v-model="ruleForm.class"></el-input>
                    </el-form-item>
                    <el-form-item label="账号密码" prop="passWord">
                      <el-input v-model="ruleForm.passWord"></el-input>
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
          userId:'',
          grade:'',
          class:'',
          userName:'',
          passWord:''
        },
        rules: {
          userId: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            {pattern: /^[0-9]+$/, message: '只能输入数字'}
          ],
          userName: [
            {required: true, message: '请输入真实姓名', trigger: 'blur'},
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          grade: [
            {required: true, message: '请输入年级', trigger: 'blur'}
          ],
          class: [
            {required: true, message: '请输入班级', trigger: 'blur'},
            {pattern: /^[0-9]+$/, message: '只能输入数字'}
          ],
          passWord: [
            {required: true, message: '请输入账号密码', trigger: 'blur'},
            { min: 6, max: 20, message: '密码长度6~20', trigger: 'change' },
            { pattern: /^[A-Za-z0-9]+$/, message: '只能输入数字或字母' }
          ]
        },
        tableData:[],
        name:'',
        pageNumber: 1,
        pageSize: 10,
        total: 0
      }
    },
    created(){
      this.getUserInfo();
      this.getExamLogs();
    },
    methods:{
      /**
       * 获取个人信息
       */
      getUserInfo(){
        this.$axios.get('/api/studentinfo',{
          params:{
            userName:this.$getUserData().userName,
            userId:this.$getUserData().userId
          }
        }).then(response => {
          let res = response.data;
          if (res.status == '0') {
            for(var key in this.ruleForm) {
              this.ruleForm[key] = res.result[key];
            }
            this.ruleForm.class+='';
            this.ruleForm.grade+='';
            this.ruleForm.userId+='';
//            console.log(this.ruleForm);
          }
        })
      },
      /**
       * 提交表单
       * @param formName
       */
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('确定修改用户信息吗？', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }).then(() => {
              this.$axios.post('/api/updateStudent',{
                userInfo: this.ruleForm
              }).then(response => {
                let res =response.data;
                if(res.status == '0') {
                  this.$message.success('修改成功!');
                  this.getUserInfo();
                }
              })
            }).catch(err => {

            })

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
        // this.$refs[formName].resetFields();
        this.getUserInfo();
      },
      /**
       * 搜索
       */
      search(){
        this.pageNumber = 1;
        this.getExamLogs();
      },
      /**
       * 每页多少条
       * @param val
       */
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.getExamLogs();
      },
      /**
       * 第几页
       * @param val
       */
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.pageNumber = val;
        this.getExamLogs();
      },
      /**
       * 获取考试记录
       */
      getExamLogs(){
        this.tableData = [];
        this.$axios.get('/api/getexamlogs',{
          params:{
            name: this.name,
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
          }
        }).then(response => {
          let res = response.data;
          let exams = res.result.exams;
          this.total = res.total;
          exams.forEach(item => {
            if(item._paper) {
              this.tableData.push({
                name: item._paper.name,
                score: item.score,
                date: new Date(item.date).toLocaleString()
              })
            }
          })
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
.main{
  .title{
    font-size: 16px;
    color: #000;
  }
}
</style>
