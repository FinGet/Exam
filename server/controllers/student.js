var Student = require('../model/student');
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//
// var student = new Student({
//     userId: 12001, // 学号
//     userName: '张三', // 用户名
//     passWord: '123321', // 密码
//     grade: 3, // 年级 1~6 分别代表一年级到六年级
//     class: 3, // 班级
//     exams:[{ // 参加的考试
//       _papers:Schema.Types.ObjectId("5a40a4ef485a584d44764ff1"),
//       score:100
//     }]
// })
//
// exports.init = student.save((err,doc) => {
//   console.log(err);
// });

// 登录
exports.signup = function(req, res) {
  var param = {
    userName: req.body.userName,
    passWord: req.body.userPwd
  }
  // console.log(param);
  Student.findOne(param, (err,doc)=>{
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
            userName: doc.userName,
            userId: doc.userId,
            grade: doc.grade,
            class: doc.class
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

// 获取个人信息
exports.getInfo = function (req, res) {
  var userName = req.param('userName'),
      userId   = req.param('userId');
  // console.log(userName);
  Student.findOne({'userName':userName,'userId':userId},(err, doc) => {
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else if (doc) {
      res.json({
        status: '0',
        msg:'success',
        result:doc
      })
    } else {
      res.json({
        status: '2',
        msg:'没有该用户'
      })
    }
  })
}
