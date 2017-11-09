var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Reserve = bookshelf.Model.extend({
  tableName: 'reserve',
  hasTimestamps: false




});

module.exports = Reserve;
