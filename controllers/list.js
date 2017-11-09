var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');
var List = require('../models/list');
var uuid = require('uuid');
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
  var r = false;
  if( req.param('testDestinataire')=='Oui'){
    r=true;
  }
  new List({
    email: req.user.attributes.email,
    titre: req.param('titre'),
    desc : req.param('desc'),
    destinataire : req.param('destinataire'),
    dateLim : req.param('date'),
    testDestinataire :r}).save();

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

exports.addArticle = function(req,res){
  res.render('addArticle',{
    title: 'Ajout Article',
    idliste : req.param('id_liste')
  });
}

exports.valideArticle = function(req,res){


  var item = new Item({
      nom : req.param('nom'),
      desc: req.param('desc'),
      tarif: req.param('tarif'),
      id_list : req.param('id_liste')});

  if(req.param('url')){
    item.set({url : req.param('url')});
  }

  item.save();

  Item.where({nom : req.param('nom'), desc : req.param('desc')}).fetch().then(function(item) {
    var id = item.attributes.id;

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
  });



  res.render('home',{
    title: 'mesList'
  });
}
