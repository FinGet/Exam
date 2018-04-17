const Student = require('../model/student');
const Paper   = require('../model/papers');
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

//注册
exports.register = function (req,res) {
  let userInfo = req.body.userInfo;
  Student.findOne(userInfo,(err,doc) => {
    if(err) {
      res.json({
        status:'1',
        msg:err.message
      })
    } else {
      if(doc) {
        res.json({
          status:'2',
          msg: '用户已存在'
        })
      } else {
        userInfo.exams = [];
        Student.create(userInfo,(err1,doc1) => {
          if(err1) {
            res.json({
              status:'1',
              msg: err1.message
            })
          }else {
            if(doc1) {
              res.json({
                status: '0',
                msg: 'sucess'
              })
            } else {
              res.json({
                status:'1',
                msg:'注册失败'
              })
            }
          }
        })
      }
    }
  })
}
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
};
// 修改用户信息
exports.updateUser = function (req, res) {
  let userName = req.session.userName;
  let userInfo = req.body.userInfo;
  Student.update({'userName':userName},userInfo,(err,doc)=>{
    if(err) {
      res.json({
        status:'1',
        msg:err.message
      })
    }else {
      if(doc){
        res.json({
          status:'0',
          msg:'success'
        })
      } else {
        res.json({
          status:'1',
          msg:'没有找到该用户'
        })
      }
    }
  })
}
// 获取考试信息
exports.getExams = function (req,res) {
  let userName =req.session.userName;
  let name = req.param('name');
    // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
  let  pageSize = parseInt(req.param('pageSize'));
  let  pageNumber = parseInt(req.param('pageNumber'));
  let skip = (pageNumber-1)*pageSize; // 跳过几条
  let reg = new RegExp(name,'i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
  Student.findOne({"userName":userName},(err,doc)=>{
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if(doc) {
        Paper.find({startTime:{$exists:true},name:reg}).skip(skip).limit(pageSize).populate({path:'_questions'}).exec((err1,doc1)=>{
          if(err1) {
            res.json({
              status: '1',
              msg: err1.message
            })
          } else {
            if(doc1){
              res.json({
                status: '0',
                result: doc1,
                total: doc1.length,
                msg: 'success'
              })
            } else {
              res.json({
                status: '1',
                msg: '没有可以参加的考试'
              })
            }
          }
        })
      } else {
        res.json({
          status:'1',
          msg:'请登录'
        })
      }
    }
  })
};

// 获取考试记录
exports.getExamLogs = function (req,res) {
  let userName = req.session.userName;
  let name = req.param('name');
  // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
  let  pageSize = parseInt(req.param('pageSize'));
  let  pageNumber = parseInt(req.param('pageNumber'));
  let skip = (pageNumber-1)*pageSize; // 跳过几条
  let reg = new RegExp(name,'i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
  Student.findOne({'userName':userName}).populate({path:'exams._paper',match:{name: reg},options:{skip:skip,limit:pageSize}})
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
            total: doc.exams.length
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

