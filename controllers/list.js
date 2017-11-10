var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');
var Reserve = require('../models/Reserve');
var Commentaire = require('../models/Commentaire');
var List = require('../models/list');
var User = require('../models/user');
var uuid = require('uuid');
var App = require('../models/Appartient');
var dateFormat = require('dateformat');


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
    url : uuid.v4(),
    testDestinataire :r}).save();
    if(req.param('testDestinataire')=='Oui'){
     res.cookie('datelimite', req.param('titre'), {expires:new Date(dateFormat(req.param('date'),"d, mmmm yyyy h:MM:ss TT")), httpOnly: true });
    }

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

  if(req.user){

    User.where('id',req.user.attributes.id).fetch().then(function(user){

      List.where('id', req.param("id_liste")).fetch().then(function(list){

        if(user.attributes.email == list.attributes.email){

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
        }else{
              res.redirect('/login');
          }
      });
    });
  }else{
      res.redirect('/login');
  }
}

exports.afflisteUrl = function(req, res) {

  List.where('url', req.param("url")).query().select().then(function(liste){

    Commentaire.where('id_liste', req.param("id_liste")).query().select().then(function(commentaire){

      Item.fetchAll().then(function(t){
        App.fetchAll().then(function(tab){

          Reserve.where('id_liste', req.param('id_liste')).query().select().then(function(reserve){

            Itemimg.fetchAll().then(function(ta){

              if(typeof liste[0] === 'undefined'){
                if(req.cookies.datelimite==liste[0]){
                  res.render('prop',{
                    title: 'Liste',
                    tabapp : tab.models,
                    tabitem : t.models,
                    tabimg : ta.models,
                    tabres : reserve,
                    tabcomm : commentaire,
                    idliste : req.param('id_liste')
                  });
                }else{
                  res.render('listUrl',{
                    title: 'Liste',
                    tabapp : tab.models,
                    tabitem : t.models,
                    tabimg : ta.models,
                    tabres : reserve,
                    tabcomm : commentaire,
                    idliste : req.param('id_liste')
                  });
                }
              }
            });
          });
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

exports.geneURL = function(req,res){

  List.where('id', req.param('id')).fetch().then(function(list) {
    res.render('geneURL',{
      title: 'URL Généré.',
      url : req.param('id'),
      sha1 : list.attributes.url
    });
  });
}

exports.addComm = function(req,res){

  new Commentaire({
      nom: req.param('nom'),
      msg : req.param('msg'),
      id_liste : req.param('idliste')}).save();

    backURL=req.header('Referer') || '/';
    res.redirect(backURL);

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

    res.redirect('/Liste?id_liste='+req.param('id_liste'));
}
