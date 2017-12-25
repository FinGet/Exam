var Teacher = require('../model/teacher'),
    Paper   = require('../model/papers'),
    Question = require('../model/question');

// 登录
exports.signup = function(req, res) {
  var param = {
    userName: req.body.userName,
    userPwd: req.body.userPwd
  }
  // console.log(param);
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
};
// 登出
exports.signout = function (req, res) {
  req.session.userName = ''
  req.session.userPwd = ''
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
  let papersModel = Paper.find(params).skip(skip).limit(pageSize);
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
}
