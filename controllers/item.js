var bookshelf = require('../config/bookshelf');
var Item = require('../models/Item');
var Itemimg = require('../models/itemimg');
var Reserve = require('../models/Reserve');
var List = require('../models/list');
var uuid = require('uuid');
var App = require('../models/Appartient');

exports.itemReserve = function(req,res){

  var reserve = new Reserve({
      //id_liste : recup id liste via url
      //id_produit: recup id du produits via url
      msgGlobal : req.param('msgGlobal'),
      msgPrive : req.param('msgPrive')});
  reserve.save();
}
