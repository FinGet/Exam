var Teacher = require('../controllers/teacher');
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
