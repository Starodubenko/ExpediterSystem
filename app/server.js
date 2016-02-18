var express = require('express');
var config = require('./back/config');
var app = express();
var server = require('http').createServer(app);
server.listen(config.get('port'));
var io = require('socket.io').listen(server);

var bodyParser = require('body-parser');
var url = require('url');
var jsonFile = require('json-file-plus');

var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var mongoose = require('./back/libs/mongoose');
//var MongoStore = require('connect-mongo')(express);


//var mongojs = require('mongojs');
//var db = mongojs('users', ['users']);
//var db = mongojs('test', ['users']);

var HttpError = require('./back/error').HttpError;

require('./back/routes')(app);

app.use(express.static(__dirname + '/front'));
app.use(express.static(__dirname + '/back'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../bower_components'));

app.use(bodyParser.json());


app.use(cookieParser());
//app.use(cookieSession({
//    secret: config.get('session:secret'),
//    keys: config.get('session:keys')
//    //cookie: config.get('session:cookie'),
//    //store: new MongoStore({mongoose_connection: mongoose.connection})
//}));

//var expressSessions = require('express-sessions');
//bson = require('bson');
////mongoose.connect();
//app.use(express.session({
//    secret: 'a4f8071f-c873-4447-8ee2',
//    cookie: { maxAge: 2628000000 },
//    store: expressSessions({
//        storage: 'mongodb',
//        instance: mongoose, // optional
//        host: 'localhost', // optional
//        port: 27017, // optional
//        db: 'test', // optional
//        collection: 'sessions', // optional
//        expire: 86400 // optional
//    })
//}));

app.use(function(req, res, next){
    req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
    res.send("Visits" + req.session.numberOfVisits);
});

//app.use(require('./back/middleware/sendHttpError'));
app.use(function (err, req, res, next) {

    res.sendHttpError = function (error) {
        res.status(error.status);
        if (res.req.headers['x-requested-width'] == 'XMLHttpRequest') {
            res.json(error);
        } else {
            //res.render("error", {error: error})
            res.send(error);
        }
    };

    if (typeof err == 'number') {
        err = new HttpError(err);
    }

    if (err instanceof HttpError){
        res.sendHttpError(err);
    } else {
        if (app.get('env') == 'development'){
            //express.errorHandler()(err, req, res, next);
        } else {
            err = new HttpError(500);
            res.sendHttpError(err);
        }
    }
});


io.sockets
    .on('connection', function (socket) {
        console.log('Somebody connected !!!');
        socket.on('message', function (data) {
            socket.broadcast.emit('message', {newMessage: data.newMessage});
        });
    })
    .on('disconnect', function (socket) {
        console.log('Somebody disconnected !!!');
        socket.broadcast.emit('message', {newMessage: "Connection is lost"});
        socket.emit('message', {newMessage: "Connection is lost"});
    });


app.get('/chat-history/:interlocutorId', function (req, resp) {

    var parsedURL = url.parse(req.url, true);

    var userId = req.params.userId;
    var interlocutorId = req.params.interlocutorId;

    switch (interlocutorId) {
        case '1':
            jsonFile('app/front/directives/chat/chat-with-johnson.json', function (err, file) {
                resp.json(file.data);
            });
            break;
        case '2':
            jsonFile('app/front/directives/chat/chat-with-harper.json', function (err, file) {
                resp.json(file.data);
            });
            break;
        case '3':
            jsonFile('app/front/directives/chat/chat-with-white.json', function (err, file) {
                resp.json(file.data);
            });
            break;
    }


});

app.post('/chat-history', function (req, resp) {
    console.log('Save history started');
    console.log('req.body =' + req.body.from);
    console.log('req.body =' + req.body.to);
    console.log('req.body =' + req.body.newMessage);
    resp.send();
});

