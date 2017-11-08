var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var List = bookshelf.Model.extend({
  tableName: 'list',
  hasTimestamps: true
});

module.exports = List;
