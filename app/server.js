var port = 8181;
//var serverUrl = "127.0.0.1";

var express = require('express');
var oracledb = require('oracledb');
var app = express();

app.use(express.static(__dirname + '/front'));
app.use(express.static(__dirname + '/node_modules'));

oracledb.getConnections(

)

app.get('/humans', function (req, resp) {

    var humans = [
        {name: 'Vasya', lastName: 'Pupkin'},
        {name: 'Masha', lastName: 'Lazha'},
        {name: 'Lala', lastName: 'Shala'}
    ];

    resp.json(humans);
});

app.post('/humans', function(req,resp){

});

app.listen(port);