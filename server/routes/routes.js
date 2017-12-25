var Teacher = require('../controllers/teacher');
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

  /*----------------------教师用户----------------------*/
  // 用户登录
  app.post('/api/login', Teacher.signup);
  // 登出
  app.post("/api/logout", Teacher.signout);
  // 获取试卷
  app.get('/api/mypapers', Teacher.getPapers);


  /*----------------------学生用户----------------------*/
}
