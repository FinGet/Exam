var mongoose = require('./../db');
var Schema = mongoose.Schema;
var PapersSchema = new Schema({
    teacher: String, // 老师
    name: String, // 试卷名称
    totalPoints: Number, // 总分
    time: String, // 考试时间
    startTime: Date, // 开始时间
    endTime: Date, // 结束时间
    examnum: Number // 考试人数
})
module.exports = mongoose.model('Paper', PapersSchema);

