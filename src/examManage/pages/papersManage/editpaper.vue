<template>
    <div class="edit">
      <el-row>
        <el-col>
          编辑试卷
          <el-button class="pull-right" type="primary" @click="back">返回</el-button>
        </el-col>
      </el-row>
      <div class="main">
        <el-row>
          <div class="title-tag">试卷信息</div>
          <el-col :span="12">
            <el-form :model="paperData"  ref="ruleForm" :rules="rules" label-width="100px">
              <el-form-item label="试卷名称" prop="name">
                <el-input v-model="paperData.name" placeholder="请输入试卷名称"></el-input>
              </el-form-item>
              <el-form-item label="试卷总分" prop="totalPoints">
                <el-input v-model="paperData.totalPoints" placeholder="请输入试卷总分"></el-input>
              </el-form-item>
              <el-form-item label="考试时长" prop="time">
                <el-input v-model="paperData.time" placeholder="请输入考试时长"></el-input>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row class="marginT20">
          <div class="title-tag">试卷题目</div>
          <ul>
            <li v-for="(item,index) in paperData._questions" :key="item.id" class="marginB10">
              <p class="question-title">{{index+1}}、({{item.type=='single'?'单选题'
                :item.type=='multi'?'多选题':item.type=='judgement'?'判断题':item.type=='Q&A'?'简答题':'null'}}){{item.name}} ({{item.score}}分)
                <span class="gray">|</span> <i class="fa fa-edit edit-icon edit-icon-edit"></i>
                <i class="fa fa-trash edit-icon edit-icon-trash"></i></p>
              <span class="option"
                    v-if="item.type!='judgement'&&item.type!='Q&A'"item
                    v-for="(item1,index1) in item.selection" :key="item1.id">
              {{options[index1]}}、{{item1}}
            </span>
            </li>
          </ul>
        </el-row>
      </div>
    </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data() {
      return {
        paperId:'', // 试卷id
        paperData:{
          name: '',
          time: '',
          totalPoints:0,
          _questions:[]
        },
        // 表单规则
        rules: {
          name: [
            { required: true, message: '请输入试卷名称', trigger: 'blur' }
          ],
          totalPoints: [
            { required: true, message: '请输入试卷总分', trigger: 'blur' }
          ],
          time: [
            { required: true, message: '请输入考试时长', trigger: 'blur' }
          ]
        },
        options:['A','B','C','D','E','F','G','H','I','J','K',
          'L','M','N','O','P','Q','R','S','T'],
      }
    },
    created() {
      this.paperId = this.$route.params.id
    },
    mounted() {
      this.init()
    },
    methods: {
      /**
       * 初始化页面 init
       * @return {[type]}
       */
      init() {
        this.$axios.post('/api/findPaper',{
          id: this.paperId
        }).then((response) => {
          let res =response.data;
          if (res.status == '0'){
            // console.log(res);
            res.result.totalPoints+='';
            res.result.time+='';
            this.paperData = res.result;
          }
        })
      },
      /**
       * 返回上一级
       * @return {[type]}
       */
      back() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
  .edit{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .main {
      min-height: 640px;
      padding: 10px;
      margin-top: 10px;
      overflow-y: scroll;
      border: 1px solid #dbdbdb;
      .title-tag {
        position: relative;
        background: #324157;
        width: 80px;
        color: #fff;
        padding: 5px;
        margin-bottom: 10px;
        font-size: 16px;
        line-height: 24px;
        &::after{
          content: ' ';
          position: absolute;
          display: block;
          border-width: 17px 17px 17px 17px;
          border-style:solid;
          border-color:transparent transparent transparent #324157;
          height: 0;
          left: 100%;    //根据三角形的位置，可以随意更改。
          top: 0;
          width: 0;
        }
      }
      .label{
        line-height: 36px;
      }
      .question-title{
        font-size: 16px;
        margin-bottom: 5px;
      }
      .option{
        padding:5px;
        font-size: 14px;
        margin-right: 20px;
      }
      .edit-icon{
        display: inline-block;
        margin:0 5px;
        font-size: 20px;
        line-height: 20px;
        vertical-align: middle;
        cursor: pointer;
      }
      .edit-icon-edit{
        color: #20a0ff;
      }
      .edit-icon-trash{
        color: #ff0000;
      }
      .delete-icon{
        color:#ff0000;
        cursor:pointer;
        font-size: 20px;
      }
      .gray{
        color: rgba(0, 0, 0, 0.32);
      }
    }
  }
  .main::-webkit-scrollbar {
    display:none
  }
</style>
