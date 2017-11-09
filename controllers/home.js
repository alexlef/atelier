var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');
var Reserve = require('../models/Reserve');
var App = require('../models/Appartient');

exports.index = function(req, res) {
  res.render('Home', {
    title: 'Accueil'
  });
};

exports.allitems= function(req, res){
  Item.where('id_list',null).query().select().then(function(tab){

      Itemimg.query().select().then(function(t) {
        res.render('article', {
          title: 'article',
          tabitem : tab,
          tabimg : t,
          idliste : req.param('id_liste')
        });
    });
  });
}

exports.addart = function(req, res) {
  new App ({id_liste : req.param("idliste"),id_item : req.param("id")}).save(null,{method:"insert"});
  res.redirect('/article?id_liste='+req.param('idliste'));
};
