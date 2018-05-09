<template>
  <div class="usermsg">
    <el-row>
      <el-col :span="12">
        <el-form :model="userInfo" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item label="教师工号" prop="userId">
            <el-input v-model="userInfo.userId"></el-input>
          </el-form-item>
          <el-form-item label="教师姓名" prop="userName">
            <el-input v-model="userInfo.userName"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="passWord">
            <el-input v-model="userInfo.passWord"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateUser">修改</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script type="text/ecmascript-6">
  export default{
    data(){
      return {
        userInfo:{
          userId:'',
          userName:'',
          passWord:''
        },
        rules:{
          userId:[
            {required:true, message:'请输入工号',trigger:'blur'},
            {pattern: /^[0-9]+$/, message: '只能输入数字'}
          ],
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur' },
            {min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur'}
          ],
          passWord: [
            {required: true, message: '请输入密码', trigger: 'blur' },
            { pattern: /^[A-Za-z0-9]+$/, message: '只能输入英文和数字' },
            { min: 6, max: 20, message: '密码长度6~20', trigger: 'change' },
          ],
        }
      }
    },
    mounted(){
      this.init();
    },
    methods:{
      /**
       * 初始化页面
       */
      init(){
        this.$axios.post('/api/getUserInfo').then(response=>{
          let res = response.data;
          if(res.status == '0') {
            this.userInfo = res.result;
            this.userInfo.userId += '';
            this.userInfo.passWord = '';
          }
        })
      },
      /**
       * 重置表单
       * @param formName
       */
      resetForm(formName) {
        this.$refs[formName].resetFields();
        this.init();
      },
      /**
       * 更新用户数据
       */
      updateUser(){
        this.$confirm('确定修改用户信息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$axios.post('/api/updateUser',{
            userInfo : this.userInfo
          }).then(response => {
            let res = response.data;
            if(res.status == '0') {
              this.$message.success('修改成功!');
              this.init();
            }
          })
        }).catch(() => {
          this.init();
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      }
    }

  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">

</style>
