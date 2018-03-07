<template>
	<div class="add">
		<el-row>
			<el-col>
				新增试卷
				<el-button class="pull-right" type="primary" @click="back">返回</el-button>
			</el-col>
		</el-row>
		<div class="main">
			<div class="title-tag">试卷信息</div>
			<el-row>
				<el-col :span="12">
					<el-form :model="form"  ref="ruleForm" :rules="rules" label-width="100px">
						<el-form-item label="试卷名称" prop="name">
							<el-input v-model="form.name" placeholder="请输入试卷名称"></el-input>
						</el-form-item>
						<el-form-item label="试卷总分" prop="total">
							<el-input v-model="form.total" placeholder="请输入试卷总分"></el-input>
						</el-form-item>
					</el-form>
				</el-col>
			</el-row>
			<div class="title-tag">试卷内容</div>
      <div class="question_list">
        <h3>题目控件</h3>
        <ul >
          <li>
            <el-button type="primary" class="button" @click="addNewFormItem('1')">单选题</el-button>
          </li>
          <li>
            <el-button type="primary" class="button" @click="addNewFormItem('2')">多选题</el-button>
          </li>
          <li>
            <el-button type="primary" class="button" @click="addNewFormItem('3')">判断题</el-button>
          </li>
          <li>
            <el-button type="primary" class="button" @click="addNewFormItem('4')">简答题</el-button>
          </li>
        </ul>
      </div>
      <!-- 添加 修改弹窗 -->
      <el-dialog  :title="isEdit?'修改问题':'新增问题'" :visible.sync="dialogVisible" size="tiny" class="form_item_dialog" @close="reloadDialog(resetForm)">
        <el-form :model="dialogForm" ref="dialogForm"  :rules="dialogRules" label-width="70px">
          <el-form-item label="题目：" prop="title">
            <el-input type="textarea" :rows="2" placeholder="请输入题目" v-model="dialogForm.title"></el-input>
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
          <el-form-item label="选项：" v-if="dialogForm.type!=3&&dialogForm.type!=4" required>
            <el-form-item v-for="(item,index) in dialogForm.surveyQuestionOptionList" label-width="0"  prop="optionContent">
              <el-input placeholder="请输入选项" class="dialog_input" v-model="item.optionContent"></el-input>
              <el-button type="text"  style="color:#ff4949" @click="deleteDlalogOption(index)">删除</el-button>
            </el-form-item>
            <el-button type="primary" size="small" @click="addDialogOption">添加选项</el-button>
          </el-form-item>
          <el-form-item label="分值：" prop="score">
            <el-input placeholder="请输入该题的分值" v-model="dialogForm.score"></el-input>
          </el-form-item>
          <el-form-item label="答案：" prop="answer" v-if="dialogForm.type!=4">
            <el-input placeholder="请输入该题的答案，多选题答案用逗号分开" v-model="dialogForm.answer"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="upLoadFormItem">确 定</el-button>
         </span>
      </el-dialog>
      <div class="form_list">
        <h3 v-if="form.questions.length==0" class="text-center">题目为空，请在左侧选择题目添加</h3>
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
				total: '',
			  questions:[]
      },
      isEdit: false,
      // 表单规则
			rules: {
				name: [
					{ required: true, message: '请输入试卷名称', trigger: 'blur' },
				],
				total: [
					{ required: true, message: '请输入试卷总分', trigger: 'blur' },
				]
			},
      dialogVisible: false,
      dialogRules:{
        title:[
          { required: true, message: '请输入题目', trigger: 'blur' }
        ],
        score:[
          { required: true, message: '请输入分值', trigger: 'blur' }
        ],
        answer:[
          { required: true, message: '请输入答案', trigger: 'blur' },
        ],
        type:[
          { required: true, message: '请选择题目类型', trigger: 'blur' },
        ],
        optionContent:[
          { required: true, message: '请输入选项', trigger: 'blur' },
          {min:1,max:200,message:'选项不能超过200个字符',trigger:'change,blur'}
        ]

      },
      // 弹窗表单
      dialogForm:{
        title:'',
        type:'',
        score: '',
        answer: '',
        surveyQuestionOptionList:[
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
          value:'1',
          label:'单选题'
        },
        {
          value:'2',
          label:'多选题'
        },
        {
          value:'3',
          label:'判断题'
        },
        {
          value:'4',
          label:'简答题'
        },
      ]
		}
	},
	created() {
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
			this.$axios.get('xxx').then((response) => {
				params: {
					paperId: paperId
				}
			})
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
    reloadDialog(done){
      this.dialogForm={
        title:'',
        type:'',
        direction:'',
        sort:'',
        surveyQuestionOptionList:[
          {
            optionContent:''
          },
          {
            optionContent:''
          },
        ]
      }
      done('dialogForm');
    },
    /**
     * 确定添加题目
     */
    upLoadFormItem(){

    },
    /**
     * 添加选项
     */
    addDialogOption(){
//      console.log(this.dialogForm);
      this.dialogForm.surveyQuestionOptionList.push({optionContent:''});
    },
    /**
     * 删除选项
     * @param i
     */
    deleteDlalogOption(i){
      this.dialogForm.surveyQuestionOptionList.splice(i,1);
    },
    /**
     * 重置表单
     * @param formName
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
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
    }
	}
}
</style>
