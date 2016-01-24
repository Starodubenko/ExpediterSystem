var port = 8282;
//var serverUrl = "127.0.0.1";

var express = require('express');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var url = require('url');
var jsonFile = require('json-file-plus');
var app = express();
//var db = mongojs('users', ['users']);
var db = mongojs('test', ['users']);

app.use(express.static(__dirname + '/front'));
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../bower_components'));
app.use(bodyParser.json());


app.get('/users', function (req, resp) {

    db.users.find(function (err, docs) {
        resp.json(docs)
    });

    //var humans = [
    //    {name: 'Vasya', lastName: 'Pupkin'},
    //    {name: 'Masha', lastName: 'Lazha'},
    //    {name: 'Lala', lastName: 'Shala'}
    //];

    //resp.json(humans);
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

app.listen(port);