var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
    userId: Number, // 学号
    userName: String, // 用户名
    passWord: String, // 密码
    grade: String, // 年级 1~6 分别代表一年级到六年级
    class: String, // 班级
    exams:[{ // 参加的考试
      _paper:{ type: Schema.Types.ObjectId, ref: 'Paper' },
      date: Date,
      isSure: Boolean,
      score:Number,
      startTime: Date,
      answers: [{
        _question: {type: Schema.Types.ObjectId, ref: 'Question'},
        answer: String
      }]
    }]
})
module.exports = mongoose.model('Student', StudentSchema);
