var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Item = bookshelf.Model.extend({
  tableName: 'item',
  hasTimestamps: true




});

module.exports = Item;
