// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
var User = require('./../model/user')
// 初始化一条数据 本地若无数据，第一次运行将注释去掉
// function insert() {
// 	var user = new User({
// 		userName: 'Bios',
// 		userPwd: '123',
// 		type: 0,
// 		papers: [
// 			{
// 		      name: '操作系统Windows XP基础测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,05),
// 		      endTime: new Date(2017,09,06),
// 		      examnum: 70
// 		    },
// 		    {
// 		      name: '操作系统Windows XP基础测试',
// 		      totalPoints: 100,
// 		      time: '50',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 20
// 		    },
// 		    {
// 		      name: '操作系统Windows 7基础测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 20
// 		    },
// 		    {
// 		      name: '操作系统Windows8基础测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 10
// 		    },
// 		    {
// 		      name: '操作系统Windows 10基础测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 80
// 		    },
// 		    {
// 		      name: '操作系统Windows office',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 30
// 		    },
// 		    {
// 		      name: '操作系统Windows XP基础测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 50
// 		    },
// 		    {
// 		      name: '操作系统PPT基础测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 30
// 		    },
// 		    {
// 		      name: '操作系统execl基础测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 50
// 		    },
// 		    {
// 		      name: '操作系统Windows XP基础测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 50
// 		    },
// 		    {
// 		      name: '操作系统Windows XP初级测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 20
// 		    },
// 		    {
// 		      name: '操作系统Windows XP中级测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 20
// 		    },
// 		    {
// 		      name: '操作系统Windows7高级测试',
// 		      totalPoints: 100,
// 		      time: '60',
// 		      startTime: new Date(2017,09,04),
// 		      endTime: new Date(2017,09,04),
// 		      examnum: 30
// 		    }
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
// insert();


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
		var name = req.param('name'), userName = req.session.userName;
		User.findOne({'userName' : userName},(err, doc) => {
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
						result:doc.papers
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
}