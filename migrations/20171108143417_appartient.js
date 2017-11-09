exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('appartient', function(table) {
      table.increments();
      table.integer('id_liste');
      table.integer('id_item');
      table.string('url');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('appartient')
  ]);
};
