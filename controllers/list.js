var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');

exports.mesList = function(req,res){

}

exports.creerList = function(req,res){

}

exports.allitems= function(req, res){
  Item.fetchAll().then(function(tab){
    Itemimg.query().select().then(function(t) {
      res.render('article', {
        title: 'article',
        tabitem : tab.models,
        tabimg : t
      });
      console.log(t[0].id_item)
    });
  });
}

exports.affliste = function(req, res) {
  if (req.user){

}
else{
  return res.redirect('/login');
  res.render('account/login',{
    title: 'Log in'
});
}
};
