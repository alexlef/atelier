var async = require('async');
var crypto = require('crypto');
var nodemailer = require('nodemailer');
var passport = require('passport');
var User = require('../models/User');

/**
 * Login required middleware
 */
exports.ensureAuthenticated = function(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect('/login');
  }
};

/**
 * GET /login
 */
exports.loginGet = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/login', {
    title: 'Se connecter'
  });
};

/**
 * POST /login
 */
exports.loginPost = function(req, res, next) {
  req.assert('email', 'Email invalide').isEmail();
  req.assert('email', 'Email ne peut pas être vide.').notEmpty();
  req.assert('password', 'Mot de passe ne peut pas être vide.').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/login');
  }

  passport.authenticate('local', function(err, user, info) {
    if (!user) {
      req.flash('error', info);
      return res.redirect('/login')
    }
    req.logIn(user, function(err) {
      res.redirect('/');
    });
  })(req, res, next);
};

/**
 * GET /logout
 */
exports.logout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * GET /signup
 */
exports.signupGet = function(req, res) {
  if (req.user) {
    return res.redirect('/');
  }
  res.render('account/signup', {
    title: 'Inscription'
  });
};

/**
 * POST /signup
 */
exports.signupPost = function(req, res, next) {
  req.assert('name', 'Nom ne peut pas être vide.').notEmpty();
  req.assert('email', 'Email invalide').isEmail();
  req.assert('email', 'Email ne peut pas être vide.').notEmpty();
  req.assert('password', 'Le mot de passe doit comporter au moins 4 caractères.').len(4);
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/signup');
  }

  new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  }).save()
    .then(function(user) {
        req.logIn(user, function(err) {
          res.redirect('/');
        });
    })
    .catch(function(err) {
      if (err.code === 'ER_DUP_ENTRY' || err.code === '23505') {
        req.flash('error', { msg: 'L adresse e-mail que vous avez entrée est déjà associée à un autre compte.' });
        return res.redirect('/signup');
      }
    });
};

/**
 * GET /account
 */
exports.accountGet = function(req, res) {
  res.render('account/profile', {
    title: 'Mon compte'
  });
};

/**
 * PUT /account
 * Update profile information OR change password.
 */
exports.accountPut = function(req, res, next) {
  if ('password' in req.body) {
    req.assert('password', 'Le mot de passe doit comporter au moins 4 caractères.').len(4);
    req.assert('confirm', 'Les mots de passe doivent correspondre').equals(req.body.password);
  } else {
    req.assert('email', 'Email invalide').isEmail();
    req.assert('email', 'Email ne peut pas être vide.').notEmpty();
    req.sanitize('email').normalizeEmail({ remove_dots: false });
  }

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/account');
  }
  var user_changes ={};
  var user = new User({ id: req.user.id });
  if ('password' in req.body) {
    user_changes={ password: req.body.password };
  } else {
    user_changes={
      email: req.body.email,
      name: req.body.name,
      gender: req.body.gender,
      location: req.body.location,
      website: req.body.website
    };
  }
  user.save(user_changes,{patch:true}).then(function(user) {
    if ('password' in req.body) {
      req.flash('success', { msg: 'Mot de passe changé' });
    } else {
      req.flash('success', { msg: 'Profil mis à jour.' });
    }
    res.redirect('/account');
  }).catch(function(err) {
    if (err.code === 'ER_DUP_ENTRY') {
      req.flash('error', { msg: 'L adresse e-mail que vous avez entrée est déjà associée à un autre compte.' });
    }
  });
};

/**
 * DELETE /account
 */
exports.accountDelete = function(req, res, next) {
  new User({ id: req.user.id }).destroy().then(function(user) {
    req.logout();
    req.flash('info', { msg: 'Compte supprimé définitivement.' });
    res.redirect('/');
  });
};

/**
 * GET /unlink/:provider
 */
exports.unlink = function(req, res, next) {
  new User({ id: req.user.id })
    .fetch()
    .then(function(user) {
      switch (req.params.provider) {
        case 'facebook':
          user.set('facebook', null);
          break;
        case 'google':
          user.set('google', null);
          break;
        case 'twitter':
          user.set('twitter', null);
          break;
        case 'vk':
          user.set('vk', null);
          break;
        default:
        req.flash('error', { msg: 'Invalid OAuth Provider' });
        return res.redirect('/account');
      }
      user.save(user.changed, { patch: true }).then(function() {
      req.flash('success', { msg: 'Votre compte a été délié.' });
      res.redirect('/account');
      });
    });
};

/**
 * GET /forgot
 */
exports.forgotGet = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  res.render('account/forgot', {
    title: 'Mot de passe oublié.'
  });
};

/**
 * POST /forgot
 */
exports.forgotPost = function(req, res, next) {
  req.assert('email', 'Email invalide.').isEmail();
  req.assert('email', 'Email ne peut pas être vide.').notEmpty();
  req.sanitize('email').normalizeEmail({ remove_dots: false });

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('/forgot');
  }

  async.waterfall([
    function(done) {
      crypto.randomBytes(16, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      new User({ email: req.body.email })
        .fetch()
        .then(function(user) {
          if (!user) {
        req.flash('error', { msg: 'L\'email ' + req.body.email + ' est lié avec aucun compte.' });
        return res.redirect('/forgot');
          }
          user.set('passwordResetToken', token);
          user.set('passwordResetExpires', new Date(Date.now() + 3600000)); // expire in 1 hour
          user.save(user.changed, { patch: true }).then(function() {
            done(null, token, user.toJSON());
          });
        });
    },
    function(token, user, done) {
      var transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD
        }
      });
      var mailOptions = {
        to: user.email,
        from: 'support@yourdomain.com',
        subject: '✔ Reset your password on Mega Boilerplate',
        text: 'Vous recevez cet e-mail parce que vous (ou quelqu un d autre) avez demandé la réinitialisation du mot de passe pour votre compte.\n\n' +
        'Veuillez cliquer sur le lien suivant, ou collez-le dans votre navigateur pour terminer le processus:\n\n' +
        'http://' + req.headers.host + '/reset/' + token + '\n\n' +
        'Si vous ne l avez pas demandé, veuillez ignorer cet e-mail et votre mot de passe restera inchangé.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('info', { msg: 'Un email a été envoyé à' + user.email + ' avec d autres instructions.' });
        res.redirect('/forgot');
      });
    }
  ]);
};

/**
 * GET /reset
 */
exports.resetGet = function(req, res) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }
  new User({ passwordResetToken: req.params.token })
    .where('passwordResetExpires', '>', new Date())
    .fetch()
    .then(function(user) {
      if (!user) {
        req.flash('error', { msg: 'Le jeton de réinitialisation de mot de passe est invalide ou a expiré.' });
        return res.redirect('/forgot');
      }
      res.render('account/reset', {
        title: 'Mot de passe réinitialisé'
      });
    });
};

/**
 * POST /reset
 */
exports.resetPost = function(req, res, next) {
  req.assert('password', 'Le mot de passe doit comporter au moins 4 caractères').len(4);
  req.assert('confirm', 'Les mots de passe doivent correspondre').equals(req.body.password);

  var errors = req.validationErrors();

  if (errors) {
    req.flash('error', errors);
    return res.redirect('back');
  }

  async.waterfall([
    function(done) {
      new User({ passwordResetToken: req.params.token })
        .where('passwordResetExpires', '>', new Date())
        .fetch()
        .then(function(user) {
          if (!user) {
          req.flash('error', { msg: 'Le jeton de réinitialisation de mot de passe est invalide ou a expiré.' });
          return res.redirect('back');
          }
          user.set('password', req.body.password);
          user.set('passwordResetToken', null);
          user.set('passwordResetExpires', null);
          user.save(user.changed, { patch: true }).then(function() {
          req.logIn(user, function(err) {
            done(err, user.toJSON());
          });
          });
        });
    },
    function(user, done) {
      var transporter = nodemailer.createTransport({
        service: 'Mailgun',
        auth: {
          user: process.env.MAILGUN_USERNAME,
          pass: process.env.MAILGUN_PASSWORD
        }
      });
      var mailOptions = {
        from: 'support@yourdomain.com',
        to: user.email,
        subject: 'Your Mega Boilerplate password has been changed',
        text: 'Hello,\n\n' +
        'Ceci est une confirmation que le mot de passe pour votre compte ' + user.email + ' vient d être changé.\n'
      };
      transporter.sendMail(mailOptions, function(err) {
        req.flash('success', { msg: 'Votre mot de passe a été changé avec succès.' });
        res.redirect('/account');
      });
    }
  ]);
};
