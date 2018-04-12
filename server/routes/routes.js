var Teacher = require('../controllers/teacher'),
    Student = require('../controllers/student');
// 初始化一个学生
// Student.init;
module.exports = function(app) {

  /*----------------------教师用户----------------------*/
  // 用户登录
  app.post('/api/login', Teacher.signup);
  // 登出
  app.post("/api/logout", Teacher.signout);
  // 获取试卷
  app.get('/api/mypapers', Teacher.getPapers);
  // 保存试卷
  app.post('/api/savePaper', Teacher.savePaper);
  // 发布试卷
  app.post('/api/publishPaper', Teacher.publishPaper);
  // 删除试卷
  app.post('/api/deletePaper', Teacher.deletePaper);


  /*----------------------学生用户----------------------*/
  // 学生登录
  app.post('/api/studentlogin', Student.signup);
  // 学生登出
  app.post('/api/studentlogout', Student.signout);
  // 获取个人信息
  app.get('/api/studentinfo', Student.getInfo);
}
