var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Item = bookshelf.Model.extend({
  tableName: 'list',
  hasTimestamps: true
});

module.exports = List;
