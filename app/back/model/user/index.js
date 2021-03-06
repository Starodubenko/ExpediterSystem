var crypto = require('crypto');
var mongoose = require('../../libs/mongoose.js'),
    Schema = mongoose.Schema;

var schema = new Schema({
    login: {
        type: String,
        unique: true,
        required: true
    },
    hashedPassword: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
});

schema.methods.encryptPassword = function(password){
  return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
};

schema.virtual('password')
    .set(function(password){
        this.__plainPassword = password;
        this.salt = Math.random() + '';
        this.hashedPassword = this.encryptPassword(password)
    })
    .get(function(){
        return this.__plainPassword;
    });

schema.methods.checkPassword = function(password){
  return this.encryptPassword(password) === this.hashedPassword;
};

exports.User = mongoose.model('User', schema);

