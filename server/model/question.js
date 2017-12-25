var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var QuestionSchema = new Schema({
  name: String, // 问题名
  _teacher: { type: Schema.Types.ObjectId, ref: 'Teacher' }, // 所属老师
  _papers: [{ type: Schema.Types.ObjectId, ref: 'Paper' }], // 所属试卷
  content: String, // 内容
  selection: [String], // 选项
  type: {type:String,enum:[ // 类型
    'single selection', // 单选
    'multi selection', // 多选
    'Q&A', // 简答
    'judgement' // 判断
  ]},
  score: Number, // 分值
  answer: String // 答案
});
module.exports = mongoose.model('Question', QuestionSchema);
