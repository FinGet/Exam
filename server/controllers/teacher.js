const Teacher = require('../model/teacher');
const Paper   = require('../model/papers');
const Question = require('../model/question');
const Student = require('../model/student');
const crypto = require('crypto');


let mdHash = function(data){
  const hash = crypto.createHash('md5');
  return hash.update(data).digest('hex');
}

// var teacher = new Teacher();
// var paper = new Paper();
// var question = new Question();
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

// 注册
exports.register = function (req,res) {
  let userInfo = req.body.userInfo;
  userInfo.passWord = mdHash(userInfo.passWord);
  Teacher.findOne(userInfo,(err,doc) => {
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
        userInfo._papers = [];
        Teacher.create(userInfo,(err1,doc1) => {
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
    passWord: mdHash(req.body.userPwd)
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
        req.session.userName = doc.userName;
        req.session.passWord = doc.passWord;
        // console.log(req.session);
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
// 获取用户信息
exports.getUserInfo = function (req, res) {
  let userName = req.session.userName;
  Teacher.findOne({'userName':userName},(err,doc)=>{
    if(err){
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if(doc){
        res.json({
          status:'0',
          result:doc,
          msg:'success'
        })
      } else {
        res.json({
          status:'1',
          msg:'没找到该用户'
        })
      }
    }
  })
};
// 修改用户信息
exports.updateUser = function (req, res) {
  let userName = req.session.userName;
  let userInfo = req.body.userInfo;
  Teacher.update({'userName':userName},userInfo,(err,doc)=>{
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
};
// 获取所有试卷的考试
exports.getAllExams = function (req,res) {
  let userName =req.session.userName;
  Teacher.findOne({"userName":userName}).populate({path:'_papers'})
    .exec((err,doc)=>{
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if(doc) {
        res.json({
          status: '0',
          result: doc,
          total: doc.length,
          msg: 'success'
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
// 获取试卷(分页、模糊查询)
exports.getPapers = function (req, res) {
  // console.log(req.session.userName);
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
  Teacher.findOne({'userName':userName}).populate({path:'_papers',match:{name: reg},options:{skip:skip,limit:pageSize}})
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
};

// 保存试卷
exports.savePaper = function (req, res) {
  let paperForm = req.body.paperForm;
  let userName = req.session.userName;

  // console.log(paperForm);
  // console.log(userName);
  if(paperForm == {}){
    res.json({
      status:'5',
      msg: '数据不能为空'
    })
  }
  Teacher.findOne({"userName": userName}, (err,doc)=>{
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if (doc) {
        let paperData = {
          name:paperForm.name,
          totalPoints:paperForm.totalPoints,
          time:paperForm.time,
          _teacher: doc._id,
          _questions: [],
          examnum:0
        }
        Paper.create(paperData,function (err1,doc1) {
          if (err1) {
            res.json({
              status:'1',
              msg: err1.message
            })
          } else {
            if (doc1) {
              // console.log('doc1 paper:'+doc1._id);
              doc._papers.push(doc1._id); // 教师中添加该试卷
              doc.save(); // 很重要 不save则没有数据
              // console.log('doc teacher'+doc._papers);
              paperForm._questions.forEach(item => {
                item._papers = [];
                item._papers.push(doc1._id);
                item._teacher = doc._id;
              })
              Question.create(paperForm._questions,function (err2,doc2) {
                if (err2) {
                  res.json({
                    status:'1',
                    msg: err2.message
                  })
                } else {
                  if (doc2) {
                    console.log('doc2 ques:'+doc2);
                    doc2.forEach(item => {
                      doc1._questions.push(item._id);
                    })
                    doc1.save(); // 很重要 不save则没有数据
                   res.json({
                      status:'0',
                      msg: 'success'
                    })
                  } else {
                    res.json({
                      status: '2',
                      msg:'没找到题目'
                    })
                  }
                }
              })
            } else {
              res.json({
                status: '2',
                msg:'没找到试卷'
              })
            }
          }
        })
      }
      else {
        res.json({
          status: '2',
          login: false,
          msg:'请登录'
        })
      }
    }
  })
};

// 发布试卷
exports.publishPaper = function(req, res) {
  let id = req.body.id;
  let userName = req.session.userName;
  // console.log(param);
  Teacher.findOne({"userName":userName}, (err,doc)=>{
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if (doc) {
        Paper.update({'_id':id},{$set:{"startTime": new Date}},function (err1,doc1) {
          if (err1) {
            res.json({
              status:'1',
              msg: err1.message
            })
          } else {
            if (doc1) {
              res.json({
                status:'0',
                msg: 'success',
                data: doc1
              })
            } else {
              res.json({
                status:'1',
                msg: '没找到试卷！'
              })
            }
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

// 删除试卷
exports.deletePaper = function (req, res) {
  let id = req.body.id;
  let userName = req.session.userName;
  Teacher.update({"userName":userName},{'$pull':{'_papers':{$in:id}}}, (err,doc)=>{
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if (doc) {
        Paper.remove({"_id":{$in:id}},function (err1,doc1){
          if(err1) {
            res.json({
              status:'1',
              msg: err1.message
            })
          } else {
            if (doc1) {
              Question.updateMany({'_papers':{$in:id}},{'$pull':{'_papers':{$in:id}}},function (err2,doc2) {
                if(err2){
                  res.json({
                    status:'1',
                    msg: err2.message
                  })
                } else {
                  if (doc2){
                    res.json({
                      status:'0',
                      msg: 'success'
                    })
                  }
                }
              })
            } else {
              res.json({
                status:'1',
                msg: '没有该试卷'
              })
            }
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

// 修改试卷-查找试卷
exports.findPaper = function (req, res) {
  let userName = req.session.userName;
  let id = req.body.id;
  Teacher.findOne({'userName':userName},(err,doc)=>{
    if(err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if (doc){
        Paper.findOne({'_id':id}).populate({path:'_questions'}).exec((err1,doc1) => {
          if (err1) {
            res.json({
              status:'1',
              msg: err.message
            })
          } else {
            if (doc1) {
              res.json({
                status: '0',
                msg:'success',
                result:doc1
              })
            } else {
              res.json({
                status: '2',
                msg:'没有该试卷'
              })
            }
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

// 修改试卷-修改试题
exports.updateQuestion = function (req,res) {
  let userName = req.session.userName;
  let params = req.body.params;
  Teacher.findOne({'userName':userName},(err,doc)=>{
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if (doc) {
        Question.update({"_id":params._id},params,(err1,doc1)=>{
          if(err1) {
            res.json({
              status:'1',
              msg: err1.message
            })
          } else {
            if(doc1){
              res.json({
                status:'0',
                msg: 'success'
              })
            } else {
              res.json({
                status:'1',
                msg: '没找到题目'
              })
            }
          }
        })
      }
    }
  })
};

// 修改试卷-修改试卷
exports.updatePaper = function (req,res) {
  let userName = req.session.userName;
  let params = req.body.params;
  let paperParams = {
    name: params.name,
    totalPoints: params.totalPoints,
    time: params.time
  }
  let updateQuestion = [];
  let addQuestion = [];
  params._questions.forEach(item => {
    if(item._id) {
      updateQuestion.push(item);
    } else {
      addQuestion.push(item);
    }
  })
  // console.log(updateQuestion,addQuestion);
  Teacher.findOne({'userName':userName},(err,doc)=>{
    if (err) {
      res.json({
        status:'1',
        msg: err.message
      })
    } else {
      if (doc) {
        Paper.findOneAndUpdate({"_id":params._id},paperParams,(err1,doc1) => {
          if(err1) {
            res.json({
              status:'1',
              msg: err1.message
            })
          }else {
            if(doc1){
              updateQuestion.forEach((item,index)=>{
                Question.update({"_id":item._id},item,(err2,doc2)=>{
                  if(err2){
                    res.json({
                      status:'1',
                      msg: err2.message
                    })
                  }else {
                    if(doc2){
                      if(index == (updateQuestion.length-1)){
                        console.log('doc1'+doc1._id)
                        if (addQuestion.length>0){
                          // console.log('addQuestion'+addQuestion);
                          addQuestion.forEach(item => {
                            item._papers = [];
                            item._papers.push(doc1._id);
                            item._teacher = doc._id;
                          })
                          Question.create(addQuestion,(err3,doc3) => {
                            if(err3) {
                              res.json({
                                status:'1',
                                msg: err3.message
                              })
                            } else {
                              if(doc3) {
                                // console.log(doc3);
                                doc3.forEach(item => {
                                  doc1._questions.push(item._id);
                                })

                                doc1.save(); // 很重要 不save则没有数据
                                res.json({
                                  status:'0',
                                  msg: 'success'
                                })
                              } else {
                                res.json({
                                  status:'1',
                                  msg: 'error'
                                })
                              }
                            }
                          })
                        } else {
                          res.json({
                            status:'0',
                            msg: 'success'
                          })
                        }

                      }
                    } else {
                      res.json({
                        status:'1',
                        msg: '没找到题目'
                      })
                    }
                  }
                })
              })
            } else {
              res.json({
                status:'1',
                msg: '没找到试卷'
              })
            }
          }
        })
      }else{
        res.json({
          status:'1',
          msg: '没找到该老师'
        })
      }
    }
  })
};

// 获取有人考试的试卷
exports.getExams = function (req, res) {
  // console.log(req.session.userName);
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
  Teacher.findOne({'userName':userName}).populate({path:'_papers',match:{name: reg,examnum:{"$gt":0}},options:{skip:skip,limit:pageSize}})
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
};

// 获取考试成绩
exports.getScores = function (req, res) {
  let id = req.param('id'), 
    name = req.param('name'),
    // 通过req.param()取到的值都是字符串，而limit()需要一个数字作为参数
    pageSize = parseInt(req.param('pageSize')),
    pageNumber = parseInt(req.param('pageNumber')),
    userName = req.session.userName;
  let skip = (pageNumber-1)*pageSize; // 跳过几条
  let reg = new RegExp(name,'i'); // 在nodejs中，必须要使用RegExp，来构建正则表达式对象。
  let params = {
    name: reg
  };
  Teacher.findOne({'userName':userName},(err, doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if(doc) {
        Student.find({"userName": reg}).skip(skip).limit(pageSize)
        .exec((err,doc) => {
          if (err) {
            res.json({
              status:'1',
              msg: err.message
            })
          } else {
            if (doc) {
              let result = [];
              doc.forEach(item => {
                item.exams.forEach(item1=> {
                  if(item1._paper == id){
                    result.push({
                      name: item.userName,
                      score: item1.score,
                      isSure: item1.isSure,
                      date: item1.date
                    })
                  }
                }) 
              })
              res.json({
                status: '0',
                msg:'success',
                result:result,
                count: result.length
              })
            } else {
              res.json({
                status: '2',
                msg:'没有该试卷'
              })
            }
          }
        })
      } else {
        res.json({
          status:'1',
          msg: '请登录'
        })
      }
    }
  })
};

// 获取需要阅卷的试卷
exports.getCheckPapers = function (req, res) {
  let name = req.param('userName'),
    date = req.param('date'),
    userName = req.session.userName;
  Teacher.findOne({'userName':userName},(err,doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if(doc) {
        Student.find({"userName": name},{"exams":{$elemMatch:{"date":date}}}).populate({path:'exams.answers._question'}).exec((err1, doc1) => {
          if(err1) {
            res.json({
              status: '1',
              msg: err1.message
            })
          } else {
            if(doc1) {
              res.json({
                status: '0',
                result: doc1,
                msg: 'success'
              })
            } else {
              res.json({
                status: '1',
                msg: '没找到'
              })
            }
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '请登录'
        })
      }
    }
  })
};

// 打分提交
exports.submitScore = function (req, res) {
  let name = req.param('userName'),
    date = req.param('date'),
    score = req.param('score') - 0,
    userName = req.session.userName;
  Teacher.findOne({'userName':userName},(err,doc) => {
    if(err) {
      res.json({
        status: '1',
        msg: err.message
      })
    } else {
      if(doc) {
        Student.update({"userName":name,"exams.date":date},{$set:{"exams.$.score":score,"exams.$.isSure":true}},(err1, doc1) => {
          if(err1) {
            res.json({
              status:'1',
              msg: err1.message
            })
          } else {
            if(doc1) {
              res.json({
                status:'0',
                msg: 'success'
              })
            } else {
              res.json({
                status:'1',
                msg: '报存失败'
              })
            }
          }
        })
      } else {
        res.json({
          status: '1',
          msg: '请登录'
        })
      }
    }
  })
};
