var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var ItemCree = bookshelf.Model.extend({
  tableName: 'itemCree',
  hasTimestamps: true

});

module.exports = ItemCree;
