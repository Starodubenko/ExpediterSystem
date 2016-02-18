var User = require('../model/user').User;
var HttpError = require('../error').HttpError;

module.exports = function(app){
    app.get('/users', function (req, resp) {
        User.find({}, function (err, users) {
            resp.json(users);
        });
    });
    app.get('/users/:id', function (req, resp, next) {
        try{
            var id = new ObjectId(req.params.id);
        }catch(e){
            return next(404);
        }

        User.findById(id, function (err, user) {
            if (!user){
                next(new HttpError(404, "User not found"))
            }
            resp.json(user);
        });
    });
};

