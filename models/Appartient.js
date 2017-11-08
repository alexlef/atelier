var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Appartient = bookshelf.Model.extend({
  tableName: 'appartient',
  hasTimestamps: true




});

module.exports = Appartient;
