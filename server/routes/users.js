// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;

module.exports = function(app) {
	app.get('/api/user', (req, res) => {
		res.render('index', {title: 'user info'});
	})
}