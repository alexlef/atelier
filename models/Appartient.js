var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Appartient = bookshelf.Model.extend({
  tableName: 'appartient',
  hasTimestamps: false




});

module.exports = Appartient;
