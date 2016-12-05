var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
  username : String,
  password : String
});

//will add new methods from passport-local onto our user schema
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);


module.exports = User;
