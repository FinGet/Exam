var mongoose = require('./../db');
var Schema = mongoose.Schema;
var UserSchema = new Schema({
	userName: {type: String}, // 用户账号
	userPwd: {type: String}, // 密码
	type: {type: Number} // 账号类型 0:系统管理员 1:教师 2:学生
})
module.exports = mongoose.model('User', UserSchema);
