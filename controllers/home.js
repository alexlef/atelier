var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');

exports.index = function(req, res) {
  res.render('Home', {
    title: 'Accueil'
  });
};

exports.allitems= function(req, res){
  Item.fetchAll().then(function(tab){
    Itemimg.query().select().then(function(t) {
      res.render('article', {
        title: 'article',
        tabitem : tab.models,
        tabimg : t
      });
    });
  });
}
