// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
var User = require('./../model/user')
var Papers = require('../model/papers')
// 初始化一条数据 本地若无数据，第一次运行将注释去掉
// function insertUser() {
// 	var user = new User({
// 		userName: 'Bios',
// 		userPwd: '123',
// 		type: 0,
// 		papers: ['操作系统Windows XP基础测试','操作系统Windows 7基础测试','操作系统Windows8基础测试','操作系统Windows 10基础测试',
// 		'操作系统Windows office','操作系统PPT基础测试','操作系统execl基础测试','操作系统Windows XP初级测试','操作系统Windows XP中级测试',
// 		 '操作系统Windows7高级测试'
// 		]
// 	});
// 	user.save((err, res) => {
// 		if (err) {
// 			console.log('Error:'+ err);
// 		} else {
// 			console.log("Res"+res)
// 		}
// 	})
// }
// insertUser();

// function insertPapers() {
// 	var paper = new Papers(
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统Windows XP基础测试',
//  //    totalPoints: 100,
//  //    time: '60',
//  //    startTime: new Date(2017,09,05),
//  //    endTime: new Date(2017,09,06),
//  //    examnum: 20
// 	// },
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统Windows 7基础测试',
//  //    totalPoints: 100,
//  //    time: '60',
//  //    startTime: new Date(2017,09,04),
//  //    endTime: new Date(2017,09,06),
//  //    examnum: 40
// 	// },
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统Windows8基础测试',
//  //    totalPoints: 100,
//  //    time: '60',
//  //    startTime: new Date(2017,09,05),
//  //    endTime: new Date(2017,09,05),
//  //    examnum: 25
// 	// },
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统Windows 10基础测试',
//  //    totalPoints: 100,
//  //    time: '60',
//  //    startTime: new Date(2017,09,05),
//  //    endTime: new Date(2017,09,08),
//  //    examnum: 60
// 	// },
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统Windows office',
//  //    totalPoints: 100,
//  //    time: '60',
//  //    startTime: new Date(2017,08,05),
//  //    endTime: new Date(2017,08,06),
//  //    examnum: 67
// 	// },
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统PPT基础测试',
//  //    totalPoints: 60,
//  //    time: '60',
//  //    startTime: new Date(2017,09,01),
//  //    endTime: new Date(2017,09,06),
//  //    examnum: 10
// 	// },
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统execl基础测试',
//  //    totalPoints: 60,
//  //    time: '60',
//  //    startTime: new Date(2017,09,01),
//  //    endTime: new Date(2017,09,02),
//  //    examnum: 65
// 	// },
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统Windows XP初级测试',
//  //    totalPoints: 100,
//  //    time: '60',
//  //    startTime: new Date(2017,09,01),
//  //    endTime: new Date(2017,09,02),
//  //    examnum: 79
// 	// },
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统Windows XP中级测试',
//  //    totalPoints: 100,
//  //    time: '60',
//  //    startTime: new Date(2017,09,01),
//  //    endTime: new Date(2017,09,02),
//  //    examnum: 65
// 	// },
// 	// {
// 	// 	teacher: 'Bios',
// 	// 	name: '操作系统Windows7高级测试',
//  //    totalPoints: 100,
//  //    time: '60',
//  //    startTime: new Date(2017,09,01),
//  //    endTime: new Date(2017,09,04),
//  //    examnum: 78
// 	// }
// 	)
// 	paper.save((err, res) => {
// 		if (err) {
// 			console.log('Error:' + err);
// 		} else {
// 			console.log('Res'+res)
// 		}
// 	})
// }
// insertPapers();

module.exports = function(app) {
	// 用户登录
	app.post('/api/login', (req, res) => {
		// res.render('index', {title: 'user info'});
		var param = {
			userName: req.body.userName,
			userPwd: req.body.userPwd
		}
		console.log(param);
		User.findOne(param, (err,doc)=>{
			// console.log(err) When the findOne query doesn't find at least one matching document, 
			//the second parameter of the callback (in this case user) is set to null.
			//It's not an error, so err is also null.  
			if (err) {
				res.json({
					status:'1',
					msg: err.message
				})
			} else {
				if (doc) {
			        req.session.userName = doc.userName
			        req.session.userPwd = doc.userPwd
				    // console.log(req.session)
					res.json({
						status: '0',
						msg:'success',
						result:{
							userName: doc.userName
						}
					})
				} else {
					res.json({
						status: '2',
						msg:'没有该用户'
					})
				}
			}
		})
	})
	// 登出
	app.post("/api/logout", (req, res) => {
	  req.session.userName = ''
	  req.session.userPwd = ''
	  res.json({
	    status:'0',
	    msg:'',
	    result:'退出成功'
	  })
	})
	// 获取试卷
	app.get('/api/mypapers', (req, res) => {
		let name = req.param('name'), 
				// 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
				pageSize = parseInt(req.param('pageSize')),
				pageNumber = parseInt(req.param('pageNumber')),
				userName = req.session.userName;
		let skip = (pageNumber-1)*pageSize; // 跳过几条
		let reg = new RegExp(name,'i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
		let params = {
			name: reg
		};
		let papersModel = Papers.find(params).skip(skip).limit(pageSize);
		papersModel.exec({},(err, doc) => {
			if (err) {
				res.json({
					status:'1',
					msg: err.message
				})
			} else {
				if (doc) {
					res.json({
						status: '0',
						msg:'success',
						result:doc,
						count: doc.length
					})
				} else {
					res.json({
						status: '2',
						msg:'没有该试卷'
					})
				}
			}
		})
	})
}