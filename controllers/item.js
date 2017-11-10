var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');
var Reserve = require('../models/Reserve');
var List = require('../models/list');
var uuid = require('uuid');
var App = require('../models/Appartient');

exports.itemReserve = function(req,res){

  var reserve = new Reserve({
      id_liste : req.param('id_liste'),
      id_item: req.param('id_produit'),
      nom: req.param('nom'),
      msgGlobal : req.param('msgGlobal'),
      msgPrive : req.param('msgPrive')});
  reserve.save();

  List.where('id',req.param('id_liste')).fetch().then(function(liste) {
    res.redirect('/url/'+ liste.attributes.url + '?id_liste=' + req.param('id_liste'));
  });

}

exports.delItem = function(req,res){
  
  App.where({id_liste : req.param('id_liste'), id_item : req.param('id_produit')}).fetch().then(function(liste) {
    liste.destroy();
  });

  res.redirect(req.get('referer'));
}


exports.delItemCree = function(req,res){

  Item.where({id_list : req.param('id_liste'), id : req.param('id_produit')}).fetch().then(function(liste) {
    liste.destroy();
  });

  res.redirect(req.get('referer'));
}


exports.reserveForm= function(req, res){
      res.render('reserve', {
        title: 'reserve',
        idproduit : req.param('id_produit'),
        idliste : req.param('id_liste')
      });
}
