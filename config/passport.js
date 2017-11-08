var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var User = require('../models/User');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  new User({ id: id}).fetch().then(function(user) {
    done(null, user);
  });
});

// Sign in with Email and Password
passport.use(new LocalStrategy({ usernameField: 'email' }, function(email, password, done) {
  new User({ email: email })
    .fetch()
    .then(function(user) {
      if (!user) {
        return done(null, false, { msg: 'L email' + email + ' n est associé avec aucun compte. ' +
        'Vérifier votre adresse mail et réessayer.' });
      }
      user.comparePassword(password, function(err, isMatch) {
        if (!isMatch) {
          return done(null, false, { msg: 'Invalide email ou mot de passe.' });
        }
        return done(null, user);
      });
    });
}));
