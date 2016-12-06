# Passport-first-use


- Learning how to use Passport for user authentication (blocking off pages, etc).


- Passport configuration is intense:

//tell Express to use Passport
app.use(passport.initialize());
app.use(passport.session());

//checks for user LogIn later
passport.use(new localStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
