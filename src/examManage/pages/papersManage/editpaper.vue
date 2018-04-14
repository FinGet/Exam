<template>
	<div class="add">
		<el-row>
			<el-col>
				{{paperId==1?'新增试卷':'编辑试卷'}}
				<el-button class="pull-right" type="primary" @click="back">返回</el-button>
			</el-col>
		</el-row>
		<div class="main">
      <div class="pull-right" v-if="form._questions.length!=0" >
        <el-button type="primary" @click="savePaper">保存试卷</el-button>
        <el-button type="danger" @click="cancel">取消</el-button>
      </div>
			<div class="title-tag">试卷信息</div>
			<el-row>
				<el-col :span="12">
					<el-form :model="form"  ref="ruleForm" :rules="rules" label-width="100px">
						<el-form-item label="试卷名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入试卷名称"></el-input>
						</el-form-item>
						<el-form-item label="试卷总分" prop="totalPoints">
							<el-input v-model="form.totalPoints" placeholder="请输入试卷总分"></el-input>
						</el-form-item>
            <el-form-item label="考试时长" prop="time">
              <el-input v-model="form.time" placeholder="请输入考试时长"></el-input>
            </el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="title-tag">试卷内容</div>
      <div class="question_list">
        <h3>题目控件</h3>
        <ul >
          <li>
            <el-button type="primary" class="button" @click="addNewFormItem('single')">单选题</el-button>
          </li>
          <li>
            <el-button type="primary" class="button" @click="addNewFormItem('multi')">多选题</el-button>
          </li>
          <li>
            <el-button type="primary" class="button" @click="addNewFormItem('judgement')">判断题</el-button>
          </li>
          <li>
            <el-button type="primary" class="button" @click="addNewFormItem('Q&A')">简答题</el-button>
          </li>
        </ul>
      </div>


      <!-- 添加 修改弹窗 -->
      <el-dialog  :title="isEdit?'修改问题':'新增问题'" :visible.sync="dialogVisible" size="tiny" class="form_item_dialog" @close="reloadDialog">
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
            <el-button type="primary" @click="upLoadFormItem">确 定</el-button>
         </span>
      </el-dialog>


      <div class="form_list">
        <h3 v-if="form._questions.length==0" class="text-center">题目为空，请在左侧选择题目添加</h3>
        <ul>
          <li v-for="(item,index) in form._questions" :key="item.id" class="marginB10">
            <p class="question-title">{{index+1}}、({{item.type=='single'?'单选题'
              :item.type=='multi'?'多选题':item.type=='judgement'?'判断题':item.type=='Q&A'?'简答题':'null'}}){{item.name}} ({{item.score}}分)
               <span class="gray">|</span> <i class="fa fa-edit edit-icon edit-icon-edit" @click="editQuestion(item)"></i>
              <i class="fa fa-trash edit-icon edit-icon-trash" @click="deleteQuestion(index)"></i></p>
            <span class="option"
                  v-if="item.type!='judgement'&&item.type!='Q&A'"item
                  v-for="(item1,index1) in item.selection" :key="item1.id">
              {{options[index1]}}、{{item1.optionContent}}
            </span>
          </li>
        </ul>

      </div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
export default {
	data() {
		return {
			paperId: '', // 试卷id
			form:{ // 试卷信息
				name: '',
        time:'',
        totalPoints: '',
			  _questions:[]
      },
      options:['A','B','C','D','E','F','G','H','I','J','K',
      'L','M','N','O','P','Q','R','S','T'],
      isEdit: false,
      // 表单规则
			rules: {
				name: [
					{ required: true, message: '请输入试卷名称', trigger: 'blur' },
				],
        totalPoints: [
					{ required: true, message: '请输入试卷总分', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '只能输入数字' }
				],
        time: [
          { required: true, message: '请输入考试时长', trigger: 'blur' },
          { pattern: /^[0-9]+$/, message: '只能输入数字' }
        ]
			},
      dialogVisible: false,
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
      // 弹窗表单
      dialogForm:{
        name:'',
        type:'',
        score: '',
        answer: '',
        selection:[
          {
            optionContent:''
          },
          {
            optionContent:''
          },
        ]
      },
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
	  this.paperId = this.$route.query.id;
	  // console.log(this.paperId);
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
      if(this.paperId != 1) {
        this.$axios.post('/api/findPaper',{
          id: this.paperId
        }).then((response) => {
          let res =response.data;
          if (res.status == '0'){
            this.form = res.result;
            console.log(this.form);
            this.form.totalPoints+='';
            this.form.time+='';
            this.form._questions.forEach(item => {
              item.score+='';
              var arr = [];
              item.selection.forEach(item1 => {
                arr.push({optionContent:item1});
              })
              item.selection=[].concat(arr);
            })
          }
        })
      }
    },
		/**
		 * 返回上一级
		 * @return {[type]}
		 */
		back() {
			this.$router.go(-1)
		},
    /**
     * 添加题目
     * @param i
     */
    addNewFormItem(i){
      this.isEdit=false;
      this.dialogForm.type=i;
      this.dialogVisible=true;
    },
    /**
     * 当关闭弹窗时
     * @param done
     */
    reloadDialog(){
      this.dialogForm={
        name:'',
        type:'',
        score: '',
        answer: '',
        selection:[
          {
            optionContent:''
          },
          {
            optionContent:''
          }
        ]
      }
    },
    /**
     * 确定添加题目/修改题目
     */
    upLoadFormItem(){
      this.$refs.dialogForm.validate((valid)=>{
        if (valid) {
          if(!this.isEdit){
            this.form._questions.push(this.dialogForm);
          }
//          this.dialogVisible=false;
//          this.form._questions.forEach(item => {
//            if(item._id == this.dialogForm._id) {
////                console.log(item);
//              item = this.$deepCopy(this.dialogForm);
//              console.log(item);
//            }
//          })
          this.dialogVisible=false;
//          console.log(this.form._questions);
        } else {
          this.$message.error('请输入正确的内容！');
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
     * 重置表单
     * @param formName
     */
    resetForm() {
      this.$refs.dialogForm.resetFields();
    },
    /**
     * 保存试卷
     */
    savePaper(){
      if(this.form.name=='' || this.form.totalPoints == '' || this.form.time == '') {
          this.$message.error('请正确输入试卷信息!')
          return;
      }
      this.form._questions.forEach(item => {
         var arr = [];
         item.selection.forEach(item1 => {
           arr.push(item1.optionContent);
         })
        item.selection = [].concat(arr);
      });
      if(this.paperId == 1){
        // 新增试卷
        this.$confirm('确定新增试卷吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$axios.post('/api/savePaper',{
            paperForm: this.form
          }).then((response) => {
            this.form = { // 试卷信息
              name: '',
              totalPoints: '',
              _questions:[]
            };
            let res = response.data;
            if (res.status == '0') {
              this.$message.success('保存成功！');
            }
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        })

      }else {
        // 修改试卷
        this.$confirm('确定修改并保存试卷吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          this.$axios.post('/api/updatePaper',{
            params: this.form
          }).then(response => {
            let res = response.data;
            if(res.status == '0') {
              this.$message.success("保存成功！");
              this.back();
            }
          })
        }).catch(()=>{
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        })
      }
    },
    /**
     * 删除试题，此时的试题并没存到数据库
     * @param item
     */
    deleteQuestion(index){
      this.form._questions.splice(index,1);
    },
    /**
     * 取消
     */
    cancel(){
      this.form = { // 试卷信息
        name: '',
        time:'',
        totalPoints: '',
        _questions:[]
      }
      if(this.paperId != 1) {
          this.back();
      }
    },
    /**
     * 编辑试题
     * @param item
     */
    editQuestion(item){
      // console.log(item);
      this.isEdit=true;
      this.dialogForm=item;
      this.dialogVisible=true;
    }
	}
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
.add {
	width: 100%;
	height: 100%;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display:none
  }
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
    .question_list{
      float: left;
      width: 15%;
      li {
        margin-top: 10px;
      }
    }
    .form_list{
      float: left;
      width: 80%;
      min-height:500px;
      padding:0 10px;
      border-left:1px solid #a0a0a0;
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
    }
    .dialog_input{
      width:268px;
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
</style>
