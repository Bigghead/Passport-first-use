var express  = require('express'),
    path     = require('path'),
    favicon  = require('serve-favicon'),
    logger   = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    localStrategy = require('passport-local'),
    passpotLocalMongoose = require('passport-local-mongoose'),
    session = require('express-session');

//setup DB
mongoose.connect('mongodb://localhost/auth_demo_app');

//User Model
var User = require('./models/user.js');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//tell Express to use Passport
app.use(passport.initialize());
app.use(passport.session());

//checks for user LogIn later
passport.use(new localStrategy(User.authenticate()));

//use express-session
app.use(session({
  secret: 'This is Sparta!',
  resave: false,
  saveUninitialized: false
}));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



//=============ROUTES=============

app.get('/', function(req, res){
  res.render('home');
});

app.get('/secret', function(req, res){
  res.render('secret');
});


//=============AUTHENTICATION ROUTES======

app.get('/register', function(req, res){
  res.render('register');
});

//handle user registration
app.post('/register', function(req, res){
  var username = req.body.username;
  var password = req.body.password;

  User.register(new User({username: username}), password, function(err, user){
    if(err){
      //if err, go back to registration form
      console.log(err);
      res.render('register');
    } else {
      //make a new user
      passport.authenticate('local')(req,res, function(){
        res.redirect('/secret');
      });
    }
  });
});


//=====LOGIN ROUTES========
app.get('/login', function(req, res){
  res.render('login');
});

//Login Post
// app.post('url', passport.authenticate('local', {
//   successRedirect: url,
//   failurerediect: otherUrl
// }), function(req, res){
//
// });

app.post('/login', passport.authenticate('local', {
  successRedirect: '/secret',
  failureRedirect: '/login'
}) ,function(req, res){

});

app.listen('4000', function(){
  console.log('Passport Test Running!');
});
