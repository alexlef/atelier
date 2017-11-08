var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var bookshelf = require('../config/bookshelf');

var Itemimg = bookshelf.Model.extend({
  tableName: 'itemimg',
  hasTimestamps: true




});

module.exports = Itemimg;
