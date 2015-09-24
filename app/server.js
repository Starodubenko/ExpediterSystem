var port = 8282;
//var serverUrl = "127.0.0.1";

var express = require('express');
var mongojs = require('mongojs');
var app = express();
//var db = mongojs('users', ['users']);
var db = mongojs('test', ['users']);

app.use(express.static(__dirname + '/front'));
app.use(express.static(__dirname + '/../node_modules'));
app.use(express.static(__dirname + '/../bower_components'));

app.get('/users', function (req, resp) {

    db.users.find(function(err, docs){
       resp.json(docs)
    });

    //var humans = [
    //    {name: 'Vasya', lastName: 'Pupkin'},
    //    {name: 'Masha', lastName: 'Lazha'},
    //    {name: 'Lala', lastName: 'Shala'}
    //];

    //resp.json(humans);
});

app.post('/users', function(req,resp){

});

app.listen(port);