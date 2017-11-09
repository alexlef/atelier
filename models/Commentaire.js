var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Commentaire = bookshelf.Model.extend({
  tableName: 'commentaire',
  hasTimestamps: false




});

module.exports = Commentaire;
