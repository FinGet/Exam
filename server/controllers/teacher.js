var Teacher = require('../model/teacher'),
    Paper   = require('../model/papers'),
    Question = require('../model/question');


// 初始化几条数据

	// var teacher = new Teacher({
  //   userId: 1001, // 教师工号
  //   userName: '张老师', // 用户名
  //   passWord: '123456', // 密码
  //   _papers:[]
	// });
  // teacher.save((err, res) => {
	// 	if (err) {
	// 		console.log('Error:'+ err);
	// 	} else {
	// 		console.log("Res"+res)
	// 	}
	// });
  // var paper = new Paper({
  //   name: '操作系统Windows XP基础测试', // 试卷名
  //   totalPoints: 100, // 总分
  //   time: 60, // 考试时间
  //   startTime: new Date(2017,9,5), // 开始时间
  //   examnum: 0, // 考试人数
  //   _teacher: teacher._id, // 老师
  //   _questions: [] // 题
  // });
  // paper.save((err, res) => {
  //   if (err) {
  //     console.log('Error:'+ err);
  //   } else {
  //     console.log("Res"+res)
  //   }
  // });
  // var question = new Question({
  //   name: '什么是操作系统', // 问题名
  //   _teacher: teacher._id, // 所属老师
  //   _papers: paper._id, // 所属试卷
  //   content: '', // 内容
  //   selection: ['选项1','选项2','选项3','选项4'], // 选项
  //   type: 'single selection',
  //   score: 5, // 分值
  //   answer: '选项1' // 答案
  // })
  // question.save();
  // teacher._papers.push(paper);
  // paper._questions.push(question);
  //


// 登录
exports.signup = function(req, res) {
  var param = {
    userName: req.body.userName,
    passWord: req.body.userPwd
  }
  // console.log(param);
  Teacher.findOne(param, (err,doc)=>{
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
        req.session.passWord = doc.passWord
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
};
// 登出
exports.signout = function (req, res) {
  req.session.userName = ''
  req.session.passWord = ''
  res.json({
    status:'0',
    msg:'',
    result:'退出成功'
  })
};

// 获取试卷
exports.getPapers = function (req, res) {
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
  Teacher.findOne({'username':userName}).populate({path:'_papers',match:{name: reg},options:{skip:skip,limit:pageSize}})
    .exec((err, doc) => {
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
            count: doc._papers.length
          })
        } else {
          res.json({
            status: '2',
            msg:'没有该试卷'
          })
        }
      }
    })
}
