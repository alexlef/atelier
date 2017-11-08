exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('appartient', function(table) {
      table.increments();
      table.interger('id_liste');
      table.interger('id_item');
      table.string('url');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('appartient')
  ]);
};
