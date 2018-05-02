var Teacher = require('../controllers/teacher'),
    Student = require('../controllers/student');
// 初始化一个学生
// Student.init;
module.exports = function(app) {

  /*----------------------教师用户----------------------*/
  app.post('/api/register',Teacher.register);
  // 用户登录
  app.post('/api/login', Teacher.signup);
  // 登出
  app.post("/api/logout", Teacher.signout);
  // 获取用户信息
  app.post('/api/getUserInfo',Teacher.getUserInfo);
  // 修改用户信息
  app.post('/api/updateUser', Teacher.updateUser);
  // 获取试卷(分页、模糊查询)
  app.get('/api/mypapers', Teacher.getPapers);
  // 保存试卷
  app.post('/api/savePaper', Teacher.savePaper);
  // 发布试卷
  app.post('/api/publishPaper', Teacher.publishPaper);
  // 删除试卷
  app.post('/api/deletePaper', Teacher.deletePaper);
  // 查找试卷
  app.post('/api/findPaper', Teacher.findPaper);
  // 修改试题
  app.post('/api/updateQuestion', Teacher.updateQuestion);
  // 修改试卷
  app.post('/api/updatePaper', Teacher.updatePaper);
  // 获取已发布的考试
  app.get('/api/getPublishExams',Teacher.getPublishExams);


  /*----------------------学生用户----------------------*/
  // 学生注册
  app.post('/api/studentregister',Student.register);
  // 学生登录
  app.post('/api/studentlogin', Student.signup);
  // 学生登出
  app.post('/api/studentlogout', Student.signout);
  // 获取考试记录
  app.get('/api/getexamlogs', Student.getExamLogs);
  // 获取个人信息
  app.get('/api/studentinfo', Student.getInfo);
  // 获取考试信息
  app.get('/api/getExams',Student.getExams);
  // 获取试卷信息
  app.get('/api/getExamInfo',Student.getExamInfo);
  // 提交考试信息
  app.post('/api/submitExam',Student.submitExam);

}
