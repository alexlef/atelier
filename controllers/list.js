var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');
var List = require('../models/list');
var uuid = require('uuid');

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

exports.addArticle = function(req,res){
  res.render('addArticle',{
    title: 'Ajout Article'
  });
}

exports.valideArticle = function(req,res){

  var item = new Item({
      nom : req.param('nom'),
      desc: req.param('desc'),
      tarif: req.param('tarif')});

  if(req.param('url')){
    item.set({url : req.param('url')});
  }

  item.save();

  var id = item.get('id');

  if(req.files[0]){
    new Itemimg({
        id_item : id,
        nom : req.files[0].filename
    }).save();
  }

  if(req.files[1]){
    new Itemimg({
      id_item : id,
      nom : req.files[1].filename
    }).save();
  }

  if(req.files[2]){
   new Itemimg({
      id_item : id,
      nom : req.files[2].filename
    }).save();
  }


  res.render('mesList',{
    title: 'mesList'
  });
}
