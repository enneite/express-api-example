global.APPLICATION_ENV = (process.argv.indexOf('development') >-1) ? 'development' : 'production';
console.log('\n ====== APPLICATION ENV : ', global.APPLICATION_ENV, ' ====== \n');
var debug = require('debug')('application');
var app = require('./app');

app.set('port', process.env.PORT || 8081);

var server = app.listen(app.get('port'), function() {
  debug('Express server listening on port ' + server.address().port);
});
