var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');
var List = require('../models/list');
var App = require('../models/Appartient');

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

exports.affliste = function(req, res) {
Item.fetchAll().then(function(t){
  App.fetchAll().then(function(tab){
    Itemimg.fetchAll().then(function(ta){
      res.render('list',{
        title: 'Liste',
        tabapp : tab.models,
        tabitem : t.models,
        tabimg : ta.models,
        idliste : req.param('id_liste')
      });
    });
  });
});
}
