var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var StudentSchema = new Schema({
    userId: Number, // 学号
    userName: String, // 用户名
    passWord: String, // 密码
    grade: Number, // 年级 1~6 分别代表一年级到六年级
    class: Number, // 班级
    exams:[{ // 参加的考试
      _papers:{ type: Schema.Types.ObjectId, ref: 'Paper' },
      score:Number
    }]
})
module.exports = mongoose.model('Student', StudentSchema);
