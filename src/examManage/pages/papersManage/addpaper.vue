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
				<el-col span="12">
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
				total: ''
			},
			rules: {
				name: [
					{ required: true, message: '请输入试卷名称', trigger: 'blur' },
				],
				total: [
					{ required: true, message: '请输入试卷总分', trigger: 'blur' },
				]
			}
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
		}
	}
}
</script>

<style rel="stylesheet/scss" scoped="scoped" lang="scss">
.add {
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
	}
}

.main::-webkit-scrollbar {
	display: none
}
</style>
