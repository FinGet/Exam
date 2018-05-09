var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var sessionParser = require('express-session')
var mongoStore = require('connect-mongo')(sessionParser)
var bodyParser = require('body-parser');

// 链接数据库
require('./db');

// var index = require('./routes/index');
// var users = require('./routes/users');


var app = express(); // 生成一个express实例 app

// view engine setup
// // 设置 views 文件夹为存放视图文件的目录,
// 即存放模板文件的地方,__dirname 为全局变量,存储当前正在执行的脚本所在的目录
app.set('views', path.join(__dirname, 'views'));
// 设置视图模板引擎为jade
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); // 设置/public/favicon.ico为favicon图标
app.use(logger('dev')); // 加载日志中间件
app.use(bodyParser.json()); // 加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false })); // 加载解析urlencoded请求体的中间件
app.use(cookieParser()); // 加载解析cookie的中间件

// 加载解析session的中间件
// session 的 store 有四个常用选项：1）内存 2）cookie 3）缓存 4）数据库
// 数据库 session。除非你很熟悉这一块，知道自己要什么，否则还是老老实实用缓存吧 需要用到（connect-mongo插件 line 7）
// app.use(sessionParser({ 会在数据库中新建一个session集合存储session
// 	secret: 'express',
// 	store: new mongoStore({
// 		url:'mongodb://127.0.0.1:27017/examSystem',
// 		collection:'session'
// 	})
// }));

// 默认使用内存来存 session，对于开发调试来说很方便
app.use(sessionParser({
	secret: '12345', // 建议使用 128 个字符的随机字符串
  name: 'userInfo',
  cookie: { maxAge: 3600000 },
  resave:true,
  rolling:true,
  saveUninitialized:false
}));

app.use(function (req,res,next) {
  var _userName = req.session.userName;
  app.locals.userName = _userName;
  return next();
})

app.use(express.static(path.join(__dirname, 'public'))); // __dirname表示当前文件的绝对路径 设置public文件夹为存放静态文件的目录

var indexs = require('./routes/index');
var routes = require('./routes/routes');

// 路由控制器
// app.use('/', index);
// app.use('/users', users);
indexs(app);
routes(app);


// catch 404 and forward to error handler 捕获404错误，并转发到错误处理器
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler 生产环境下的错误处理器，将错误信息渲染error模版并显示到浏览器中
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; // 导出app实例供其他模块调用
