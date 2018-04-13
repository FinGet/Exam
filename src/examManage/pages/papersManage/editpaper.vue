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
          <el-button class="pull-right marginL10" type="primary" @click="savePaper">保存试卷</el-button>
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
                <span class="gray">|</span> <i class="fa fa-edit edit-icon edit-icon-edit" @click="editQuestion(item)"></i>
                <i class="fa fa-trash edit-icon edit-icon-trash" @click="deleteQuestion(item)"></i></p>
              <span class="option"
                    v-if="item.type!='judgement'&&item.type!='Q&A'"item
                    v-for="(item1,index1) in item.selection" :key="item1.id">
              {{options[index1]}}、{{item1.optionContent}}
            </span>
            </li>
          </ul>
        </el-row>
      </div>

      <el-dialog  title="修改问题" :visible.sync="dialogVisible" size="tiny">
        <el-form :model="dialogForm" ref="dialogForm"  :rules="dialogRules" label-width="72px">
          <el-form-item label="题目：" prop="name">
            <el-input placeholder="请输入题目" v-model="dialogForm.name"></el-input>
          </el-form-item>
          <el-form-item label="类型：" prop="type">
            <el-select v-model="dialogForm.type" placeholder="请选择题目类型" >
              <el-option
                v-for="item in dialogOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <div  v-if="dialogForm.type!='judgement'&&dialogForm.type!='Q&A'">
            <el-form-item v-for="(item,index) in dialogForm.selection"
                          :key="item.key"
                          :label="'选项'+(index+1) +'：'"
                          :prop="'selection.' + index + '.optionContent'"
                          :rules="{
              required:true, message:'选项不能为空', trigger:'blur'
            }"
            >
              <el-input placeholder="请输入选项" class="dialog_input" v-model="item.optionContent"></el-input>
              <i class="el-icon-delete delete-icon" @click="deleteDlalogOption(index)"></i>
            </el-form-item>
            <el-button type="primary" size="small" class="marginB10" @click="addDialogOption">添加选项</el-button>
          </div>
          <el-form-item label="分值：" prop="score">
            <el-input placeholder="请输入该题的分值" v-model="dialogForm.score"></el-input>
          </el-form-item>
          <el-form-item label="答案：" prop="answer" v-if="dialogForm.type!='Q&A'">
            <el-input placeholder="例：A 或者 A,B" v-model="dialogForm.answer"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="updateQuestion">确 定</el-button>
         </span>
      </el-dialog>
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
        dialogRules:{
          name:[
            { required: true, message: '请输入题目', trigger: 'blur' }
          ],
          score:[
            { required: true, message: '请输入分值', trigger: 'blur' },
            { pattern: /^[0-9]+$/, message: '只能输入数字' }
          ],
          answer:[
            { required: true, message: '请输入答案', trigger: 'blur' },
            { pattern: /(^[A-Z]|[A-Z],[A-Z])+$/, message: '请按正确格式输入答案' }
          ],
          type:[
            { required: true, message: '请选择题目类型', trigger: 'blur' },
          ]
        },
        options:['A','B','C','D','E','F','G','H','I','J','K',
          'L','M','N','O','P','Q','R','S','T'],
        dialogVisible: false,
        dialogForm:{},
        dialogOptions:[
          {
            value:'single',
            label:'单选题'
          },
          {
            value:'multi',
            label:'多选题'
          },
          {
            value:'judgement',
            label:'判断题'
          },
          {
            value:'Q&A',
            label:'简答题'
          },
        ]
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
            this.paperData = res.result;
            this.paperData.totalPoints+='';
            this.paperData.time+='';
            this.paperData._questions.forEach(item => {
              item.score+='';
              var arr = [];
              item.selection.forEach(item1 => {
                arr.push({optionContent:item1});
              })
              item.selection=[].concat(arr);
            })
          }
        })
      },
      /**
       * 添加选项
       */
      addDialogOption(){
        this.dialogForm.selection.push({optionContent:''});
      },
      /**
       * 删除选项
       * @param i
       */
      deleteDlalogOption(i){
        this.dialogForm.selection.splice(i,1);
      },
      /**
       * 返回上一级
       * @return {[type]}
       */
      back() {
        this.$router.go(-1)
      },

      /**
       * 编辑试题
       * @param item
       */
      editQuestion(item){
        this.dialogForm =item;
        this.dialogVisible=true;
      },
      /**
       * 修改试题
       */
      updateQuestion(){
        this.dialogVisible=false;
        // console.log(this.dialogForm);
        // var arr = [];
        // this.dialogForm.selection.forEach(item1 => {
        //   arr.push(item1.optionContent);
        // })
        // this.dialogForm.selection = [].concat(arr);
        // console.log(this.dialogForm);
        // this.$axios.post('/api/updateQuestion',{
        //   params: this.dialogForm
        // }).then(response => {
        //   let res = response.data;
        //   if(res.status == '0') {
        //     this.dialogVisible=false;
        //     this.init();
        //   }
        // })
      },
      /**
       * 保存试卷
       */
      savePaper(){
        // console.log(this.paperData);
        let params = this.$deepCopy(this.paperData);
        // console.log(params);
        params._questions.forEach(item => {
          var arr = [];
          item.selection.forEach(item1 => {
            arr.push(item1.optionContent);
          })
          item.selection = [].concat(arr);
        });
        // console.log(params);
        this.$axios.post('/api/updatePaper',{
          params: params
        }).then(response => {
          let res = response.data;
          if(res.status == '0') {
            // this.dialogVisible=false;
            // this.init();
          }
        })
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
      .gray{
        color: rgba(0, 0, 0, 0.32);
      }
    }
    .dialog_input{
      width:268px;
    }
    .delete-icon{
      color:#ff0000;
      cursor:pointer;
      font-size: 20px;
    }
  }
  .main::-webkit-scrollbar {
    display:none
  }
</style>
