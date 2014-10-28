
var IndexController = function() {
	
}

IndexController.prototype.indexAction = function(req, res) {
  res.render('index', { title: 'Express' });
}

var indexController = module.exports = exports = new IndexController();