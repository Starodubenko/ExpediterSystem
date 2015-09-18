var port = 8080;
var serverUrl = "127.0.0.1";

var http = require('http');
var express = require('express');
var url = require('url');
var fs = require('fs');

console.log("Starting web server at " + serverUrl + ":" + port);

//var app = express();

//app.use(express.static(__dirname + "app"));

//app.listen(3000);

var server = new http.Server(function(req, res){
    //console.log(req.method, req.url);
    //console.log(req.headers);
    var page;


    fs.readFile('index.html', function(err, page){
        if (err) {
            console.error(err);
            res.statusCode = 500;
            res.end('Server error occurred!');
            return;
        }
        res.end(page);
    });



});

server.listen(port, serverUrl);