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

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;

app.listen('4000', function(){
  console.log('Passport Test Running!');
});
