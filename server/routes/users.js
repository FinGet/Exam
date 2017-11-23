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
// 		type: 0
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

// 用户登录
module.exports = function(app) {
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
}