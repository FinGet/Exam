// var express = require('express');
// var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

// module.exports = router;

module.exports = function(app) {
	app.get('/api', (req, res) => {
		res.render('index', {title: 'Express'});
	})
}