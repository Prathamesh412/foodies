var passport = require('passport');
var localStrategies = require('passport-local');
var User = require('../models/User');


// This is to have session ids..the session is stored in a stack and the removed 
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

//This is to check for password and match it
passport.use(new localStrategies({usernameField: 'email'},function(email, password, done){
  User.findOne({email: email}, function(err, user){
    if(user.password==password)
    {
      return done(null,user);
    }
    else
      return done(null,false,{message: "Invalid password and email"});
  });
}))