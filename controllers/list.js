var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');
var List = require('../models/list');

exports.mesList = function(req,res){

  if (req.user){
    List.forge().query(function (qb) {
      qb.where('list.email', '=', req.user.attributes.email);
    }).fetchAll().then(function(tab) {
      res.render('mesList',{
        title: 'MesList',
        tabList : tab.models
      });
    });
  }
  else{
    return res.redirect('/login');
    res.render('account/login',{
      title: 'Log in'
    });
  }
}

exports.creerList = function(req,res){

  if(req.user){
    res.render('creerList',{
      title: 'Creer Liste'
    });
  }
  else{
    return res.redirect('/login');
    res.render('account/login',{
      title: 'Log in'
    });
  }
}

exports.addList = function(req, res){

  new List({
    email: req.user.attributes.email,
    titre: req.param('titre'),
    titre: req.param('nom'),
    desc : req.param('desc'),
    destinataire : req.param('destinataire'),
    dateLim : req.param('date')}).save();

  res.render('home',{
    title: ''
  });
}

exports.affliste = function(req, res) {

}
