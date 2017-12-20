var mongoose = require('mongoose');
var dbUrl = 'mongodb://127.0.0.1:27017/examSystem';
var db = mongoose.connect(dbUrl);
db.connection.on('error',function(error) {
	console.log('数据库链接失败：'+ error);
});
db.connection.on('connected',function() {
	console.log('数据库链接成功!');
});
db.connection.on('disconnected',function() {
	console.log('Mongoose connection disconnected');
});

module.exports = db;
