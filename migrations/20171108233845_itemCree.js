
exports.up = function(knex, Promise) {

  return Promise.all([
    knex.schema.createTable('itemCree', function(table) {
      table.increments();
      table.string('nom');
      table.string('desc', 1000);
      table.decimal('tarif',6,2);
      table.string('url');
      table.string('id_list');
      table.timestamps();
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('itemCree')
  ]);
};
