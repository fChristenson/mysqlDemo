var express = require('express'),
    routes = require('./routes'),
    user = require('./routes/user'),
    task = require('./routes/task'),
    db = require('./models'),
    app = express();

// set app vars
app.set('views', __dirname + '/public/views');
app.set('port', process.env.PORT || 3000);

// set middleware
app.use(express.static(__dirname + '/public'));
app.use(app.router);

// set template engine
app.engine('jade', require('jade').__express);

// set routes
app.get('/', routes.index);
app.post('/user', user.create);
app.post('/user/:userId/task', task.create);
app.get('/user/:userId/task/:taskId', task.destroy);

db.sequelize
  .sync({force: true})
  .complete(function (err) {
    if (err){
        throw err[0];

        } else {
        app.listen(app.get('port'), function () {
            console.log('Running on port: ', app.get('port'));
        });
    }
  })