var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PapersSchema = new Schema({
    name: String, // 试卷名
    name: String, // 试卷名称
    totalPoints: Number, // 总分
    time: String, // 考试时间
    startTime: Date, // 开始时间
    examnum: Number, // 考试人数
    _teacher: { type: Schema.Types.ObjectId, ref: 'Teacher'}, // 老师
    _questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }] // 题
})
module.exports = mongoose.model('Paper', PapersSchema);

