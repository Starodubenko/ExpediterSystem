var mongoose = require('./back/libs/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers
], function(err){
    console.log(arguments);
    mongoose.disconnect();
});

function open(callback){
   mongoose.connection.on('open', callback);
}

function dropDatabase(callback){
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback){
    require('./back/model/user');
    async.each(Object.keys(mongoose.models), function(modelName, callback){
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback){
    var users = [
        {login: "admin", password: "1", firstName: "Rodion", lastName: "Starodubenko", image:""},
        {login: "john", password: "1", firstName: "John", lastName: "Silver", image:""},
        {login: "milla", password: "1", firstName: "Milla", lastName: "Smith", image:""}
    ];

    async.each(users, function(userData, callback){
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}